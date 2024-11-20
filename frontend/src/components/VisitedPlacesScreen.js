// components/VisitedPlacesScreen.js
import React from "react";
import { View, Text, ScrollView, Image } from "react-native";
import { MaterialIcons } from "@expo/vector-icons";
import tw from "twrnc";

export const VisitedPlacesScreen = () => {
  const visitedPlaces = [
    {
      place: "Paris",
      date: "March 2024",
      rating: 4.8,
      image: require("../../assets/images/image.png"),
    },
    // Add more visited places
  ];

  return (
    <ScrollView style={tw`flex-1 bg-gray-50 pt-12`}>
      <View style={tw`px-6`}>
        <Text style={tw`text-3xl font-bold text-gray-800`}>Travel History</Text>
        <Text style={tw`text-gray-500 mt-2`}>Your previous adventures</Text>
      </View>

      {visitedPlaces.map((place, index) => (
        <View
          key={index}
          style={tw`mx-6 mt-6 bg-white rounded-xl shadow-md overflow-hidden`}
        >
          <Image source={place.image} style={tw`w-full h-48`} />
          <View style={tw`p-4`}>
            <Text style={tw`text-xl font-bold`}>{place.place}</Text>
            <Text style={tw`text-gray-500`}>Visited: {place.date}</Text>
            <View style={tw`flex-row items-center mt-2`}>
              <MaterialIcons
                name="star"
                size={20}
                style={tw`text-yellow-400`}
              />
              <Text style={tw`ml-1`}>{place.rating}</Text>
            </View>
          </View>
        </View>
      ))}
    </ScrollView>
  );
};
