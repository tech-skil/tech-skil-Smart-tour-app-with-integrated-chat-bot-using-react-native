from flask import Flask, request, jsonify
import sys
import os

# Set up the Python paths once
BASE_DIR = os.path.dirname(os.path.abspath(__file__))
BGPLANNER_DIR = os.path.abspath(os.path.join(BASE_DIR, "../bgplanner"))
CHATBOT_DIR = os.path.abspath(os.path.join(BASE_DIR, "../chatbot"))
sys.path.insert(0, BGPLANNER_DIR)
sys.path.insert(0, CHATBOT_DIR)

# Import required modules
from test import predict_travel_budget_with_defaults  # For travel budget prediction
from chatbot import predict_class, get_response, intents  # For chatbot functionality

# Initialize Flask app
app = Flask(__name__)

# ------------------- Travel Budget Prediction -------------------
@app.route('/predict', methods=['POST'])
def predict():
    try:
        # Extract JSON data from the request
        data = request.json

        # Validate required fields
        required_fields = ['from_place', 'destination', 'group_size', 'travel_mode']
        for field in required_fields:
            if field not in data:
                return jsonify({'error': f"Missing required field: {field}"}), 400

        # Extract inputs
        from_place = data['from_place']
        destination = data['destination']
        group_size = data['group_size']
        travel_mode = data['travel_mode']

        # Predict budget
        predicted_budget = predict_travel_budget_with_defaults(from_place, destination, group_size, travel_mode)
        return jsonify({'predicted_budget': float(predicted_budget)})

    except Exception as e:
        return jsonify({'error': str(e)}), 500

# ------------------- Chatbot Functionality -------------------
@app.route('/chatbot', methods=['POST'])
def chatbot():
    try:
        # Extract JSON data from the request
        data = request.json
        message = data.get('message', '')
        
        # Validate message field
        if not message:
            return jsonify({'error': "Missing 'message' field"}), 400

        # Predict intent and fetch response
        intents_list = predict_class(message)
        response = get_response(intents_list, intents, message)
        return jsonify({'response': response})

    except Exception as e:
        return jsonify({'error': str(e)}), 500

# ------------------- Run the App -------------------
if __name__ == '__main__':
    app.run(debug=True)
