// components/Budgetplanner.js

import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  ActivityIndicator,
  SafeAreaView,
} from "react-native";

// Correctly export the BudgetPlanner component
export const Budgetplanner = () => {
  const [fromPlace, setFromPlace] = useState("");
  const [toPlace, setToPlace] = useState("");
  const [numTravelers, setNumTravelers] = useState("");
  const [travelMode, setTravelMode] = useState("Flight");
  const [loading, setLoading] = useState(false);
  const [calculatedBudget, setCalculatedBudget] = useState(null);

  const travelModes = ["Flight", "Car", "Train"];

  const handleSubmit = async () => {
    if (!fromPlace || !toPlace || !numTravelers) {
      alert("Please fill in all fields!");
      return;
    }

    setLoading(true);
    setCalculatedBudget(null);

    try {
      // Simulating AI model calculation with a timeout
      const budget = await new Promise((resolve) =>
        setTimeout(() => resolve(Math.random() * 1000 + 100), 2000)
      );

      setCalculatedBudget(budget.toFixed(2));
    } catch (error) {
      alert("Error calculating budget. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <SafeAreaView className="flex-1  bg-gray-50 p-6">
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
        />
      </View>

      <View className="mb-4">
        <Text className="text-lg font-semibold text-gray-700 mb-2">To</Text>
        <TextInput
          className="border border-gray-300 rounded-lg p-3"
          placeholder="Enter destination"
          value={toPlace}
          onChangeText={setToPlace}
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
          onChangeText={setNumTravelers}
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
            Submit
          </Text>
        )}
      </TouchableOpacity>

      {calculatedBudget && (
        <View className="mt-6 bg-green-100 p-4 rounded-lg">
          <Text className="text-lg font-semibold text-green-700">
            Estimated Budget: ${calculatedBudget}
          </Text>
        </View>
      )}
    </SafeAreaView>
  );
};
