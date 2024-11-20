// components/PlanningScreen.js
import React from 'react';
import { View, Text, ScrollView, TouchableOpacity } from 'react-native';
import { Feather } from '@expo/vector-icons';
import tw from 'twrnc';

export const PlanningScreen = () => {
  const plannedTrips = [
    {
      destination: "Tokyo",
      date: "June 2024",
      budget: "$2,500",
      status: "Planning",
    },
    // Add more planned trips
  ];

  return (
    <ScrollView style={tw`flex-1 bg-gray-50 pt-12`}>
      <View style={tw`px-6`}>
        <Text style={tw`text-3xl font-bold text-gray-800`}>Trip Planning</Text>
        <Text style={tw`text-gray-500 mt-2`}>Organize your future adventures</Text>
        
        <TouchableOpacity 
          style={tw`mt-6 bg-blue-500 rounded-full py-4 px-6`}
        >
          <Text style={tw`text-white text-center font-semibold`}>Create New Trip Plan</Text>
        </TouchableOpacity>
      </View>

      {plannedTrips.map((trip, index) => (
        <View key={index} style={tw`mx-6 mt-6 bg-white rounded-xl shadow-md p-6`}>
          <Text style={tw`text-xl font-bold`}>{trip.destination}</Text>
          <View style={tw`mt-4`}>
            <View style={tw`flex-row items-center`}>
              <Feather name="calendar" size={18} style={tw`text-gray-400`} />
              <Text style={tw`ml-2 text-gray-600`}>{trip.date}</Text>
            </View>
            <View style={tw`flex-row items-center mt-2`}>
              <Feather name="dollar-sign" size={18} style={tw`text-gray-400`} />
              <Text style={tw`ml-2 text-gray-600`}>Budget: {trip.budget}</Text>
            </View>
            <View style={tw`flex-row items-center mt-2`}>
              <Feather name="clock" size={18} style={tw`text-gray-400`} />
              <Text style={tw`ml-2 text-gray-600`}>Status: {trip.status}</Text>
            </View>
          </View>
        </View>
      ))}
    </ScrollView>
  );
};