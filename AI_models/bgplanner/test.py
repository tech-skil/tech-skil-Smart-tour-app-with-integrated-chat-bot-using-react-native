# Import necessary libraries
import pandas as pd
import joblib

# Load the saved model, encoder, and scaler
model_path = 'xgboost_travel_budget_predictor.pkl'
encoder = joblib.load('encoder.pkl')
scaler = joblib.load('scaler.pkl')
best_xgb_model = joblib.load(model_path)

# Load new data (make sure to have the same columns as the original data)
new_data_path = 'new_travel_budget_data.csv'  # Path to the new data
new_data = pd.read_csv(new_data_path)

# Ensure column names have no extra spaces
new_data.columns = new_data.columns.str.strip()

# Add 'From_Place' column as an example origin (ensure all values are consistent)
new_data['From_Place'] = 'Origin_City'

# Separate categorical and numerical fields
categorical_features = ['From_Place', 'Destination', 'Travel_Mode', 'Accommodation_Type', 'Food_Preference', 'Activity', 'Purpose', 'Season', 'Month']
numerical_features = [
    'Group_Size', 'Distance_in_km', 'Cost_Transportation', 
    'Cost_Accommodation', 'Cost_Food', 'Cost_Activities'
]

# One-Hot Encode categorical variables
encoded_categorical = pd.DataFrame(encoder.transform(new_data[categorical_features]), 
                                    columns=encoder.get_feature_names_out(categorical_features))

# Standardize numerical features
scaled_numerical = pd.DataFrame(scaler.transform(new_data[numerical_features]), 
                                columns=numerical_features)

# Combine processed features
processed_new_data = pd.concat([scaled_numerical, encoded_categorical], axis=1)

# Predict on new data
predictions = best_xgb_model.predict(processed_new_data)

# Add predictions to the new data DataFrame
new_data['Predicted_Budget'] = predictions

# Save the predictions to a CSV file (optional)
predictions_output_path = 'predicted_travel_budget.csv'
new_data.to_csv(predictions_output_path, index=False)

print(f"Predictions saved to: {predictions_output_path}")