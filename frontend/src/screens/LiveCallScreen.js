// components/LiveCallScreen.js
import React, { useState } from "react";
import { View, Text, TouchableOpacity, SafeAreaView } from "react-native";
import { useNavigation } from "@react-navigation/native"; // Import for navigation
import Fuse from "react-native-vector-icons/MaterialCommunityIcons"; // Icon library
// import "../ExternalApi/GeminiVoice"
export const LiveCallScreen = () => {
  const [isMicOn, setIsMicOn] = useState(true); // State for microphone toggle
  const [isHold, setIsHold] = useState(false); // State for hold (triggered when mic is off)
  const navigation = useNavigation(); // Navigation hook

  // Handle Microphone toggle
  const handleMicToggle = () => {
    if (isMicOn) {
      // Mic is on, toggle to off and set hold
      setIsMicOn(false);
      setIsHold(true);
    } else {
      // Mic is off, toggle to on and remove hold
      setIsMicOn(true);
      setIsHold(false);
    }
  };

  // Handle End Call navigation
  const handleEndCall = () => {
    navigation.goBack(); // Navigate back
  };

  return (
    <SafeAreaView className="flex-1 bg-gray-400">
      {/* Header */}
      <View className="bg-blue-500 p-4 pt-10">
        <Text className="text-white text-xl font-bold">Live Call</Text>
      </View>

      {/* Notification Bar */}
      <View className="bg-gray-200 p-2">
        <Text className="text-gray-700 text-sm">
          Chats are saved, and you can resume them at any time. To stop this,
          turn off Gemini Apps activity.
        </Text>
      </View>
      {/* Call Controls */}
      <View className="flex-1 justify-center items-center">
        <View className="bg-gray-400 w-2/3 h-1/4 rounded-lg flex items-center justify-center">
          <Text className="text-black text-lg">
            {isHold
              ? "On hold. Chat with Triplo."
              : "In progress. Triplo assisting."}
          </Text>
        </View>
      </View>

      {/* Buttons */}
      <View className="flex-row justify-evenly items-center p-4">
        {/* Mic Toggle */}
        <TouchableOpacity
          onPress={handleMicToggle}
          className={`p-4 px-8 rounded-full ${
            isMicOn ? "bg-green-500" : "bg-gray-500"
          }`}
        >
          <Fuse
            name={isMicOn ? "microphone-outline" : "microphone-off-outline"}
            size={30}
            color="white"
          />
          <Text className="text-white text-lg">{isMicOn ? "On" : "Off"}</Text>
        </TouchableOpacity>
        {/* End Call */}
        <TouchableOpacity
          onPress={handleEndCall}
          className="bg-red-500 p-4 rounded-full"
        >
          <Text className="text-white text-lg">End</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};
