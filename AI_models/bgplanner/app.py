import pandas as pd
import joblib
from flask import Flask, request, jsonify
from sklearn.preprocessing import OneHotEncoder

# Load the pre-trained models and scalers
model_path = 'xgboost_travel_budget_predictor.pkl'
encoder = joblib.load('encoder.pkl')
scaler = joblib.load('scaler.pkl')
best_xgb_model = joblib.load(model_path)

app = Flask(__name__)

# Define the prediction function
def predict_travel_budget_with_defaults(from_place, destination, group_size, travel_mode):
    # Default values for missing fields
    accommodation_type = "Homestay"  # Default
    food_preference = "Non-Vegetarian"  # Default
    activity = "Trekking"  # Default
    purpose = "Work"  # Default
    season = "Winter"  # Default
    month = "April"  # Default
    distance_km = 2040  # Default (for example, distance from Bangalore to Kerala)
    cost_transportation = 3762  # Default (example transportation cost)
    cost_accommodation = 1158  # Default (example accommodation cost)
    cost_food = 3065  # Default (example food cost)
    cost_activities = 4533  # Default (example activity cost)

    # Prepare the data for prediction
    user_data = {
        'From_Place': [from_place],
        'Destination': [destination],
        'Travel_Mode': [travel_mode],
        'Accommodation_Type': [accommodation_type],
        'Food_Preference': [food_preference],
        'Activity': [activity],
        'Purpose': [purpose],
        'Season': [season],
        'Month': [month],
        'Group_Size': [group_size],
        'Distance_in_km': [distance_km],
        'Cost_Transportation': [cost_transportation],
        'Cost_Accommodation': [cost_accommodation],
        'Cost_Food': [cost_food],
        'Cost_Activities': [cost_activities]
    }

    # Convert input data to DataFrame
    user_df = pd.DataFrame(user_data)

    # Preprocessing categorical and numerical features
    categorical_features = ['From_Place', 'Destination', 'Travel_Mode', 'Accommodation_Type', 'Food_Preference', 'Activity', 'Purpose', 'Season', 'Month']
    numerical_features = ['Group_Size', 'Distance_in_km', 'Cost_Transportation', 'Cost_Accommodation', 'Cost_Food', 'Cost_Activities']

    # Encoding categorical variables with unknown category handling
    encoded_categorical = pd.DataFrame(encoder.transform(user_df[categorical_features]), 
                                        columns=encoder.get_feature_names_out(categorical_features))

    # Scaling numerical variables
    scaled_numerical = pd.DataFrame(scaler.transform(user_df[numerical_features]), 
                                    columns=numerical_features)

    # Combine the processed features
    processed_user_data = pd.concat([scaled_numerical, encoded_categorical], axis=1)

    # Predict the budget using the model
    predicted_budget = best_xgb_model.predict(processed_user_data)

    return predicted_budget[0]

# Define the API endpoint for predicting budget
@app.route('/predict_budget', methods=['POST'])
def predict_budget():
    try:
        # Get input data from the request
        data = request.get_json()

        from_place = data['from_place']
        destination = data['destination']
        group_size = data['group_size']
        travel_mode = data['travel_mode']

        # Get predicted budget
        predicted_budget = predict_travel_budget_with_defaults(from_place, destination, group_size, travel_mode)

        # Return the predicted budget as JSON
        return jsonify({'predicted_budget': predicted_budget})

    except Exception as e:
        return jsonify({'error': str(e)}), 400

if __name__ == '__main__':
    app.run(debug=True)
