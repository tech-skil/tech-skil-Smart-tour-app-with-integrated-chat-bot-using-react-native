import json
import pickle
import random
import numpy as np
import tensorflow as tf
import nltk
from nltk.stem import WordNetLemmatizer

# Download required nltk data if needed
def download_nltk_data():
    try:
        nltk.data.find('tokenizers/punkt')
        nltk.data.find('corpora/wordnet')
    except LookupError:
        nltk.download('punkt')
        nltk.download('wordnet')

download_nltk_data()

lemmatizer = WordNetLemmatizer()

# Load intents
def load_intents(file_path):
    try:
        with open(file_path) as file:
            return json.load(file)
    except FileNotFoundError:
        print("Error: intents.json file not found.")
        exit(1)

# Extract place-specific information
def load_place_overviews(intent_data):
    place_overviews = {}
    if "information_model" in intent_data:
        for topic in intent_data["information_model"].get("topics", []):
            name = topic["name"]
            overview = topic["details"].get("overview", {})
            place_overviews[name.lower()] = overview
    return place_overviews

# Load intents and overviews
intents = load_intents("intents.json")
place_overviews = load_place_overviews(intents)

# Find overview for a given place
def get_place_overview(place_name):
    key = place_name.lower()
    overview = place_overviews.get(key, None)
    if overview:
        return (f"Purpose of Visit: {overview.get('purpose_of_visit', 'N/A')}\n"
                f"Historical Significance: {overview.get('historical_significance', 'N/A')}\n"
                f"Summary: {overview.get('summary', 'N/A')}")
    return "Overview not found for this place."

# Initialize lists
words = []
classes = []
documents = []
ignore_chars = ['?', '!', ',', '.']

# Extract intents from both greeting and information models
print(f"Top-level keys in the JSON: {list(intents.keys())}")

for key, intent_group in intents.items():
    if 'intents' in intent_group:
        for intent in intent_group['intents']:
            for utterance in intent['utterances']:
                word_list = nltk.word_tokenize(utterance)
                words.extend(word_list)
                documents.append((word_list, intent['intent']))
                if intent['intent'] not in classes:
                    classes.append(intent['intent'])
    else:
        print(f"Skipping '{key}' as it does not contain intents.")

# Lemmatize, lowercase, and remove duplicates
words = sorted(set([lemmatizer.lemmatize(word.lower()) for word in words if word not in ignore_chars]))
classes = sorted(set(classes))

# Save words and classes
pickle.dump(words, open('words.pkl', 'wb'))
pickle.dump(classes, open('classes.pkl', 'wb'))

# Prepare training data
training = []
output_empty = [0] * len(classes)

for document in documents:
    bag = []
    word_patterns = document[0]
    word_lemmatized = [lemmatizer.lemmatize(word.lower()) for word in word_patterns]
    
    for word in words:
        bag.append(1) if word in word_lemmatized else bag.append(0)
    
    output_row = list(output_empty)
    output_row[classes.index(document[1])] = 1
    training.append(bag + output_row)

random.shuffle(training)
training = np.array(training)

# Split into features and labels
train_x = training[:, :len(words)]
train_y = training[:, len(words):]

# Build the model
model = tf.keras.Sequential([
    tf.keras.layers.Dense(128, input_shape=(len(train_x[0]),), activation='relu'),
    tf.keras.layers.Dropout(0.5),
    tf.keras.layers.Dense(64, activation='relu'),
    tf.keras.layers.Dense(len(train_y[0]), activation='softmax')
])

# Compile model
model.compile(optimizer=tf.keras.optimizers.SGD(learning_rate=0.01, momentum=0.9, nesterov=True), 
              loss='categorical_crossentropy', metrics=['accuracy'])

# Train the model
try:
    model.fit(np.array(train_x), np.array(train_y), epochs=200, batch_size=5, verbose=1)
    model.save('TriploChatbot.h5')
    print("Model trained and saved successfully!")
except Exception as e:
    print(f"Error during training: {str(e)}")

# Add logic to handle 'ask_about_place' intent
def respond_to_query(intent, entities):
    if intent == "ask_about_place" and entities:
        place = entities.get("place", "").lower()
        overview = get_place_overview(place)
        return f"Here is some information about {place.title()}:\n{overview}"
    return "Sorry, I don't have detailed information on that."

# Example usage
query_intent = "ask_about_place"
query_entities = {"place": "Hampi"}
response = respond_to_query(query_intent, query_entities)
print(response)
