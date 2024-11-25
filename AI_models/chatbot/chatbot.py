import random
import json
import pickle
import numpy as np
import tensorflow as tf
import nltk
from nltk.stem import WordNetLemmatizer
from tensorflow.keras.models import load_model
import re

# Ensure required nltk data is downloaded
nltk.download('punkt')

# Initialize lemmatizer
lemmatizer = WordNetLemmatizer()

# Load intents, words, classes, and the trained model
intents = json.load(open('intents.json'))
words = pickle.load(open("words.pkl", 'rb'))
classes = pickle.load(open("classes.pkl", 'rb'))
model = load_model("TriploChatbot.h5")

def clean_up_sentence(sentence):
    """Tokenizes and lemmatizes the input sentence."""
    sentence_words = nltk.word_tokenize(sentence)
    sentence_words = [lemmatizer.lemmatize(word.lower()) for word in sentence_words]
    return sentence_words

def bag_of_words(sentence):
    """Creates a bag of words representation of the input sentence."""
    sentence_words = clean_up_sentence(sentence)
    bag = [0] * len(words)
    for s in sentence_words:
        if s in words:
            bag[words.index(s)] = 1
    return np.array(bag)

def predict_class(sentence):
    """Predicts the class of the input sentence."""
    bow = bag_of_words(sentence)
    res = model.predict(np.array([bow]))[0]
    ERROR_THRESHOLD = 0.25
    results = [[i, r] for i, r in enumerate(res) if r > ERROR_THRESHOLD]
    results.sort(key=lambda x: x[1], reverse=True)
    return [{"intent": classes[r[0]], "probability": r[1]} for r in results]

def get_overview(place_name, intents_json):
    """Fetches the overview for the given place name."""
    place_name = place_name.lower()
    if "information_model" in intents_json:
        for topic in intents_json["information_model"].get("topics", []):
            if topic["name"].lower() == place_name:
                overview = topic["details"]["overview"]
                return (
                    f"Purpose of Visit: {overview.get('purpose_of_visit', 'N/A')}\n"
                    f"Historical Significance: {overview.get('historical_significance', 'N/A')}\n"
                    f"Summary: {overview.get('summary', 'N/A')}"
                )
    return "Overview not found for this place."

def extract_place_name(message):
    """Extracts a place name from the user's message."""
    match = re.search(r'\babout (\w+)', message.lower())
    return match.group(1) if match else "Unknown"

def get_response(intents_list, intents_json, message):
    """Fetches a response or detailed overview based on the predicted intent."""
    if intents_list:
        tag = intents_list[0]['intent']
        if tag == "ask_about_place":
            place_name = extract_place_name(message)
            if place_name == "Unknown":
                return "Could you specify which place you want to know about?"
            overview = get_overview(place_name, intents_json)
            return f"Here is what I know about {place_name.title()}:\n{overview}"
        else:
            for group_key, group_value in intents_json.items():
                if "intents" in group_value:
                    for intent in group_value["intents"]:
                        if intent["intent"] == tag:
                            return random.choice(intent["responses"])
    return "Sorry, I didn't understand that."

print("Great! Bot is Running...")

# Chat loop
while True:
    message = input("You: ")
    if message.lower() in ["exit", "quit", "bye"]:
        print("Bot: Goodbye! Have a great day!")
        break
    intents_list = predict_class(message)
    response = get_response(intents_list, intents, message)
    print("Bot:", response)
