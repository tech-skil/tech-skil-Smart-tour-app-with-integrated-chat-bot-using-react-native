import React, { useState } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  SafeAreaView,
  ActivityIndicator,
  Alert,
} from "react-native";
import GeminiVoice from "../ExternalApi/GeminiVoice";
import Fuse from "react-native-vector-icons/MaterialCommunityIcons";
import Icon from "react-native-vector-icons/FontAwesome";

const LiveCallScreen = ({ navigation }) => {
  const [isMicOn, setIsMicOn] = useState(false);
  const [response, setResponse] = useState("");
  const [isListening, setIsListening] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const handleEndCall = () => navigation.goBack();

  const handleMicToggle = async () => {
    if (isListening) {
      try {
        setIsLoading(true);
        const userInput = await GeminiVoice.stopRecognition();

        if (userInput) {
          const assistantResponse = await GeminiVoice.sendToGemini(userInput);
          setResponse(assistantResponse);
          GeminiVoice.speak(assistantResponse);
        } else {
          setResponse("I didn't catch that. Please try again.");
        }
      } catch (error) {
        Alert.alert("Error", "An error occurred while processing your input.");
        console.error(error);
      } finally {
        setIsLoading(false);
        setIsListening(false);
      }
    } else {
      try {
        await GeminiVoice.startRecognition();
        setResponse("Listening...");
        setIsListening(true);
      } catch (error) {
        Alert.alert("Error", "Failed to start voice recognition.");
        console.error(error);
      }
    }
    setIsMicOn(!isMicOn);
  };

  return (
    <SafeAreaView className="flex-1 bg-gray-300">
      <View className="bg-blue-600 p-5">
        <Text className="text-white text-xl font-bold">Live Call</Text>
      </View>

      <View className="p-3 bg-white m-3 rounded-lg">
        <Text className="text-gray-600 text-base">
          Interact with Triplo, your travel assistant. Press the mic button to
          speak.
        </Text>
      </View>

      <View className="flex-1 justify-center items-center bg-gray-200 m-3 rounded-lg p-4">
        {isLoading ? (
          <ActivityIndicator size="large" color="#007AFF" />
        ) : (
          <Text className="text-base text-gray-800 text-center">
            {response || "Press the mic and ask something about your trip!"}
          </Text>
        )}
      </View>

      <View className="flex-row justify-evenly mb-5">
        <TouchableOpacity
          onPress={handleMicToggle}
          className={`${
            isMicOn ? "bg-green-500" : "bg-gray-300"
          } p-4 rounded-full justify-center items-center w-20 h-20`}
        >
          <Fuse
            name={isMicOn ? "microphone-outline" : "microphone-off"}
            size={30}
            color="white"
          />
          <Text className="text-white text-center  mt-2">
            {isMicOn ? "On" : "Mic Off"}
          </Text>
        </TouchableOpacity>

        <TouchableOpacity
          onPress={handleEndCall}
          className="bg-red-600 p-4 rounded-full justify-center items-center w-20 h-20"
        >
          <Icon name="close" size={30} color="white" />
          <Text className="text-white text-center mt-2">End</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

export default LiveCallScreen;
