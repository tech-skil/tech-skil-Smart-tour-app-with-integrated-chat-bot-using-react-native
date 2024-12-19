import pandas as pd
import numpy as np
import joblib

class BudgetPredictor:
    def __init__(self, model, encoder, scaler):
        self.model = model
        self.encoder = encoder
        self.scaler = scaler
        
        # Define the exact feature order used during training
        self.categorical_features = [
            'from_place', 'Destination', 'Travel_Mode', 'Accommodation_Type',
            'Food_Preference', 'Activity', 'Purpose', 'Season', 'Month',
            'Specific_Interests', 'Discounts_Offers', 'Destination_Popularity',
            'Age_Group', 'Income_Level'
        ]
        
        self.numerical_features = [
            'Budget',  # Include Budget first as it was in training
            'Cost_Transportation', 'Cost_Accommodation', 'Cost_Food', 
            'Cost_Activities', 'Distance_in_km', 'Travel_Duration_Days', 'Group_Size'
        ]

    def prepare_input_data(self, from_place, destination, group_size, travel_mode):
        """Prepare input data with default values in the correct order"""
        data = {
            # Categorical features
            'from_place': [from_place],
            'Destination': [destination],
            'Travel_Mode': [travel_mode],
            'Accommodation_Type': ['Homestay'],
            'Food_Preference': ['Non-Vegetarian'],
            'Activity': ['Trekking'],
            'Purpose': ['Work'],
            'Season': ['Winter'],
            'Month': ['April'],
            'Specific_Interests': ['Wildlife'],
            'Discounts_Offers': ['Hotel Membership'],
            'Destination_Popularity': ['Low'],
            'Age_Group': ['Adult'],
            'Income_Level': ['Low'],
            
            # Numerical features (in the same order as training)
            'Budget': [0],  # Dummy value for scaling
            'Cost_Transportation': [2000],
            'Cost_Accommodation': [3000],
            'Cost_Food': [1500],
            'Cost_Activities': [1000],
            'Distance_in_km': [500],
            'Travel_Duration_Days': [5],
            'Group_Size': [group_size]
        }
        return pd.DataFrame(data)

    def predict(self, from_place, destination, group_size, travel_mode, debug=False):
        try:
            # Prepare input data
            input_data = self.prepare_input_data(from_place, destination, group_size, travel_mode)
            
            if debug:
                print("Input data:")
                print(input_data)

            # Transform categorical features (maintaining order)
            categorical_encoded = self.encoder.transform(input_data[self.categorical_features])
            
            # Transform numerical features (maintaining order)
            numerical_scaled = self.scaler.transform(input_data[self.numerical_features])
            
            # Remove the scaled Budget column (first column)
            numerical_scaled = numerical_scaled[:, 1:]
            
            if debug:
                print(f"\nFeature shapes:")
                print(f"Categorical: {categorical_encoded.shape}")
                print(f"Numerical: {numerical_scaled.shape}")

            # Combine features
            final_input = np.hstack([categorical_encoded, numerical_scaled])
            
            if debug:
                print(f"Final: {final_input.shape}")

            # Make prediction and reverse log transformation
            predicted_budget = self.model.predict(final_input)[0]
            predicted_budget = np.expm1(predicted_budget)
            
            return round(predicted_budget, 2)

        except Exception as e:
            print(f"Error: {str(e)}")
            print("Stack trace:")
            import traceback
            traceback.print_exc()
            return None

def format_currency(amount):
    """Format amount as currency"""
    return "${:,.2f}".format(amount)

def main():
    # Load the saved model and preprocessing tools
    model = joblib.load('xgboost_travel_budget_predictor.pkl')
    encoder = joblib.load('encoder.pkl')
    scaler = joblib.load('scaler.pkl')
    
    # Initialize predictor
    predictor = BudgetPredictor(model, encoder, scaler)
    
    # Example values
    from_place = "Bangalore"
    destination = "Kerala"
    group_size = 3
    travel_mode = "Flight"
    
    # Make prediction
    predicted_budget = predictor.predict(from_place, destination, group_size, travel_mode, debug=True)
    
    if predicted_budget is not None:
        print("\nTravel Budget Prediction")
        print("-" * 30)
        print(f"From: {from_place}")
        print(f"To: {destination}")
        print(f"Number of Travelers: {group_size}")
        print(f"Travel Mode: {travel_mode}")
        print("-" * 30)
        print(f"Estimated Budget: {format_currency(predicted_budget)}")
        
        # Show per-person cost
        per_person = predicted_budget / group_size
        print(f"Cost per person: {format_currency(per_person)}")

if __name__ == "__main__":
    main()