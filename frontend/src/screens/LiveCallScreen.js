import React, { useState } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  SafeAreaView,
  ActivityIndicator,
  Alert,
} from "react-native";
import Voice from "@react-native-voice/voice";
import Fuse from "react-native-vector-icons/MaterialCommunityIcons";
import Icon from "react-native-vector-icons/FontAwesome";

const LiveCallScreen = ({ navigation }) => {
  const [isMicOn, setIsMicOn] = useState(false);
  const [response, setResponse] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const startRecognition = async () => {
    try {
      setIsLoading(true);
      setResponse("Listening...");
      await Voice.start("en-US");
    } catch (error) {
      Alert.alert("Error", "Failed to start voice recognition.");
      console.error(error);
      setIsLoading(false);
    }
  };

  const stopRecognition = async () => {
    try {
      await Voice.stop();
    } catch (error) {
      Alert.alert("Error", "Failed to stop voice recognition.");
      console.error(error);
    }
  };

  const onVoiceResults = (e) => {
    const spokenText = e.value?.[0] || "I didn't catch that. Please try again.";
    setResponse(`Y's assistant says: Halogen`);
    setIsLoading(false);
  };

  const onVoiceError = (error) => {
    console.error("Voice Recognition Error:", error);
    setResponse("Error occurred. Please try again.");
    setIsLoading(false);
  };

  React.useEffect(() => {
    Voice.onSpeechResults = onVoiceResults;
    Voice.onSpeechError = onVoiceError;

    return () => {
      try {
        Voice.destroy().then(() => Voice.removeAllListeners());
      } catch (err) {
        console.error("Error during cleanup:", err);
      }
    };
  }, []);

  const handleMicToggle = async () => {
    if (isMicOn) {
      await stopRecognition();
    } else {
      await startRecognition();
    }
    setIsMicOn(!isMicOn);
  };

  const handleEndCall = () => navigation.goBack();

  return (
    <SafeAreaView className="flex-1 bg-gray-300">
      <View className="bg-blue-600 p-5">
        <Text className="text-white text-xl font-bold">Live Call</Text>
      </View>

      <View className="p-3 bg-white m-3 rounded-lg">
        <Text className="text-gray-600 text-base">
          Interact with Y's Assistant. Press the mic button to speak.
        </Text>
      </View>

      <View className="flex-1 justify-center items-center bg-gray-200 m-3 rounded-lg p-4">
        {isLoading ? (
          <ActivityIndicator size="large" color="#007AFF" />
        ) : (
          <Text className="text-base text-gray-800 text-center">
            {response || "Press the mic and ask something!"}
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
          <Text className="text-white text-center mt-2">
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
