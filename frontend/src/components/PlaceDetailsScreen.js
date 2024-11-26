import React from "react";
import { View, Text, Image, ScrollView, TouchableOpacity } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

const PlaceDetailsScreen = ({ route }) => {
  const { place } = route.params;

  return (
    <SafeAreaView className="flex-1 bg-white">
      <ScrollView className="h-full">
        {/* Header Section */}
        <View>
          <Image
            source={place.image}
            className="w-full h-96 rounded-3xl"
            resizeMode="cover"
          />
          
        </View>

        {/* Content Section */}
        <View className="py-8 ">
          <View className="bg-white rounded-2xl p-6 shadow-lg">
            <Text className="text-xl font-bold text-gray-800">{place.name}</Text>
            <View className="flex-row items-center mt-2">
              <Text className="text-gray-500 text-sm">{place.location}</Text>
              
            </View>
            
          </View>

          {/* Tabs Section */}
          <View className="px-4 justify-around mt-6">
            <TouchableOpacity>
              <Text className="text-blue-500 text-lg font-bold">Information</Text>
            
            </TouchableOpacity>
          </View>

          {/* Description Section */}
          <View className="mt-6 px-6">
            <Text className="text-base text-gray-600">{place.description}</Text>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default PlaceDetailsScreen;
