import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  ActivityIndicator,
  SafeAreaView,
} from "react-native";

export const Budgetplanner = () => {
  // State for form inputs
  const [fromPlace, setFromPlace] = useState("");
  const [toPlace, setToPlace] = useState("");
  const [numTravelers, setNumTravelers] = useState("");
  const [travelMode, setTravelMode] = useState("Flight");

  // UI states
  const [loading, setLoading] = useState(false);
  const [calculatedBudget, setCalculatedBudget] = useState(null);
  const [error, setError] = useState(null);

  // Current USD to INR conversion rate
  const USD_TO_INR_RATE = 83.12;

  // Backend API URL - Update this to match your backend URL
  const API_URL = "http://10.0.2.2:5000/predict"; // For Android Emulator
  // const API_URL = 'http://localhost:5000/predict'; // For iOS Simulator
  // const API_URL = 'https://your-deployed-backend-url.com/predict'; // For Production

  const travelModes = ["Flight", "Car", "Train"];

  const validateInputs = () => {
    if (!fromPlace.trim()) {
      alert("Please enter starting location");
      return false;
    }
    if (!toPlace.trim()) {
      alert("Please enter destination");
      return false;
    }
    if (!numTravelers || parseInt(numTravelers) <= 0) {
      alert("Please enter a valid number of travelers");
      return false;
    }
    return true;
  };

  const convertToRupees = (usdAmount) => {
    return (parseFloat(usdAmount) * USD_TO_INR_RATE).toFixed(2);
  };

  const handleSubmit = async () => {
    if (!validateInputs()) {
      return;
    }

    const payload = {
      from_place: fromPlace.trim(),
      destination: toPlace.trim(),
      group_size: parseInt(numTravelers),
      travel_mode: travelMode,
    };

    setLoading(true);
    setCalculatedBudget(null);
    setError(null);

    try {
      console.log("Attempting to connect to:", API_URL);
      console.log("Sending payload:", payload);

      const response = await fetch(API_URL, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
        body: JSON.stringify(payload),
        // Add timeout to prevent infinite loading
        timeout: 10000,
      });

      if (!response.ok) {
        const errorText = await response.text();
        throw new Error(
          `Server responded with status ${response.status}: ${errorText}`
        );
      }

      const data = await response.json();
      console.log("Received response:", data);

      if (data && data.predicted_budget !== undefined) {
        const budgetInRupees = convertToRupees(data.predicted_budget);
        setCalculatedBudget({
          usd: parseFloat(data.predicted_budget).toFixed(2),
          inr: budgetInRupees,
        });
      } else {
        throw new Error("Invalid response format from server");
      }
    } catch (error) {
      console.error("API Error:", error);
      let errorMessage =
        "Network request failed. Please check your connection and try again.";

      if (
        error.message.includes("Failed to fetch") ||
        error.message.includes("Network request failed")
      ) {
        errorMessage =
          "Cannot connect to the server. Please check if the backend server is running and accessible.";
      }

      setError(errorMessage);
      alert(errorMessage);
    } finally {
      setLoading(false);
    }
  };

  return (
    <SafeAreaView className="flex-1 bg-gray-50 p-6">
      <Text className="text-3xl font-bold pt-10 text-gray-800 mb-6">
        Budget Planner
      </Text>

      <View className="mb-4">
        <Text className="text-lg font-semibold text-gray-700 mb-2">From</Text>
        <TextInput
          className="border border-gray-300 rounded-lg p-3"
          placeholder="Enter starting location"
          value={fromPlace}
          onChangeText={setFromPlace}
          onBlur={() => setFromPlace(fromPlace.trim())}
        />
      </View>

      <View className="mb-4">
        <Text className="text-lg font-semibold text-gray-700 mb-2">To</Text>
        <TextInput
          className="border border-gray-300 rounded-lg p-3"
          placeholder="Enter destination"
          value={toPlace}
          onChangeText={setToPlace}
          onBlur={() => setToPlace(toPlace.trim())}
        />
      </View>

      <View className="mb-4">
        <Text className="text-lg font-semibold text-gray-700 mb-2">
          Number of Travelers
        </Text>
        <TextInput
          className="border border-gray-300 rounded-lg p-3"
          placeholder="Enter number of travelers"
          keyboardType="numeric"
          value={numTravelers}
          onChangeText={(text) => {
            if (text === "" || /^\d+$/.test(text)) {
              setNumTravelers(text);
            }
          }}
        />
      </View>

      <View className="mb-4">
        <Text className="text-lg font-semibold text-gray-700 mb-2">
          Mode of Travel
        </Text>
        <View className="flex-row justify-around">
          {travelModes.map((mode) => (
            <TouchableOpacity
              key={mode}
              onPress={() => setTravelMode(mode)}
              className={`px-4 py-2 rounded-lg ${
                travelMode === mode ? "bg-blue-500" : "bg-gray-200"
              }`}
            >
              <Text
                className={`text-sm font-medium ${
                  travelMode === mode ? "text-white" : "text-gray-800"
                }`}
              >
                {mode}
              </Text>
            </TouchableOpacity>
          ))}
        </View>
      </View>

      <TouchableOpacity
        className="mt-6 bg-blue-500 rounded-lg p-4"
        onPress={handleSubmit}
        disabled={loading}
      >
        {loading ? (
          <ActivityIndicator color="#fff" />
        ) : (
          <Text className="text-white text-center text-lg font-semibold">
            Calculate Budget
          </Text>
        )}
      </TouchableOpacity>

      {error && (
        <View className="mt-6 bg-red-100 p-4 rounded-lg">
          <Text className="text-lg font-semibold text-red-700">{error}</Text>
          <Text className="text-sm text-red-600 mt-2">
            Make sure your backend server is running at {API_URL}
          </Text>
        </View>
      )}

      {calculatedBudget && (
        <View className="mt-6 bg-green-100 p-4 rounded-lg">
          <Text className="text-lg font-semibold text-green-700">
            Estimated Budget:
          </Text>
          <Text className="text-md text-green-700">
            ${calculatedBudget.usd} USD
          </Text>
          <Text className="text-md text-green-700">
            ₹{calculatedBudget.inr} INR
          </Text>
          <Text className="text-xs text-green-600 mt-1">
            (Exchange Rate: 1 USD = ₹{USD_TO_INR_RATE})
          </Text>
        </View>
      )}
    </SafeAreaView>
  );
};
