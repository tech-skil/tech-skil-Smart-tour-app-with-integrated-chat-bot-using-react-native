import json

# Specify the file path for the JSON file
file_path = "intents.json"

# Open and load the JSON file
with open(file_path, "r") as file:
    data = json.load(file)

# Check the number of datasets
length_of_dataset = len(data["greeting_model"]["intents"])
length_of_dataset_info = len(data["information_model"]["topics"])

# Print the total number of datasets
print(f"The dataset contains {length_of_dataset} records.")
print(f"The dataset contains info {length_of_dataset_info} records.")


