
import pandas as pd
import joblib


model_path = 'xgboost_travel_budget_predictor.pkl'
encoder = joblib.load('encoder.pkl')
scaler = joblib.load('scaler.pkl')
best_xgb_model = joblib.load(model_path)


new_data_path = 'new_travel_budget_data.csv'  
new_data = pd.read_csv(new_data_path)


new_data.columns = new_data.columns.str.strip()


new_data['From_Place'] = 'Origin_City'


categorical_features = ['From_Place', 'Destination', 'Travel_Mode', 'Accommodation_Type', 'Food_Preference', 'Activity', 'Purpose', 'Season', 'Month']
numerical_features = [
    'Group_Size', 'Distance_in_km', 'Cost_Transportation', 
    'Cost_Accommodation', 'Cost_Food', 'Cost_Activities'
]


encoded_categorical = pd.DataFrame(encoder.transform(new_data[categorical_features]), 
                                    columns=encoder.get_feature_names_out(categorical_features))


scaled_numerical = pd.DataFrame(scaler.transform(new_data[numerical_features]), 
                                columns=numerical_features)


processed_new_data = pd.concat([scaled_numerical, encoded_categorical], axis=1)


predictions = best_xgb_model.predict(processed_new_data)


new_data['Predicted_Budget'] = predictions


predictions_output_path = 'predicted_travel_budget.csv'
new_data.to_csv(predictions_output_path, index=False)

print(f"Predictions saved to: {predictions_output_path}")