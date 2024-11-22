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
    <SafeAreaView style={{ flex: 1, backgroundColor: "#f0f0f0" }}>
      <View style={{ backgroundColor: "#007AFF", padding: 20 }}>
        <Text style={{ color: "white", fontSize: 20, fontWeight: "bold" }}>
          Live Call
        </Text>
      </View>

      <View
        style={{
          padding: 10,
          backgroundColor: "#fff",
          margin: 10,
          borderRadius: 10,
        }}
      >
        <Text style={{ color: "#555", fontSize: 16 }}>
          Interact with Triplo, your travel assistant. Press the mic button to
          speak.
        </Text>
      </View>

      <View
        style={{
          flex: 1,
          justifyContent: "center",
          alignItems: "center",
          backgroundColor: "#eee",
          margin: 10,
          borderRadius: 10,
          padding: 15,
        }}
      >
        {isLoading ? (
          <ActivityIndicator size="large" color="#007AFF" />
        ) : (
          <Text style={{ fontSize: 16, color: "#333", textAlign: "center" }}>
            {response || "Press the mic and ask something about your trip!"}
          </Text>
        )}
      </View>

      <View
        style={{
          flexDirection: "row",
          justifyContent: "space-evenly",
          marginBottom: 20,
        }}
      >
        <TouchableOpacity
          onPress={handleMicToggle}
          style={{
            backgroundColor: isMicOn ? "#28a745" : "#ccc",
            padding: 15,
            borderRadius: 50,
            justifyContent: "center",
            alignItems: "center",
            width: 80,
            height: 80,
          }}
        >
          <Fuse
            name={isMicOn ? "microphone-outline" : "microphone-off"}
            size={30}
            color="white"
          />
          <Text style={{ color: "white", textAlign: "center", marginTop: 5 }}>
            {isMicOn ? "Listening" : "Mic Off"}
          </Text>
        </TouchableOpacity>

        <TouchableOpacity
          onPress={handleEndCall}
          style={{
            backgroundColor: "#dc3545",
            padding: 15,
            borderRadius: 50,
            justifyContent: "center",
            alignItems: "center",
            width: 80,
            height: 80,
          }}
        >
          <Icon name="close" size={30} color="white" />
          <Text style={{ color: "white", textAlign: "center", marginTop: 5 }}>
            End
          </Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

export default LiveCallScreen;
