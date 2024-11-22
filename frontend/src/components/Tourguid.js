// components/PlanningScreen.js
import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  ScrollView,
  SafeAreaView,
} from "react-native";
import { Feather } from "@expo/vector-icons";
import AntDesign from "@expo/vector-icons/AntDesign";
import { useNavigation } from "@react-navigation/native";

export const Tourguid = () => {
  const [messages, setMessages] = useState([
    { id: 1, text: "Hi there! How can I help you today?", sender: "bot" },
  ]);
  const [inputText, setInputText] = useState("");

  const navigation = useNavigation();

  const handleSend = () => {
    if (inputText.trim() !== "") {
      setMessages((prevMessages) => [
        ...prevMessages,
        { id: prevMessages.length + 1, text: inputText, sender: "user" },
      ]);
      setInputText("");
      // Simulate bot reply
      setTimeout(() => {
        setMessages((prevMessages) => [
          ...prevMessages,
          {
            id: prevMessages.length + 2,
            text: "Got it! Let me check that for you.",
            sender: "bot",
          },
        ]);
      }, 1000);
    }
  };

  return (
    <SafeAreaView className="flex-1 bg-gray-100">
      {/* Header */}
      <View className="bg-blue-500 p-4 ">
        <Text className="text-white text-lg font-bold">Triplo Tour Guide</Text>
        <Text className="text-white text-sm">How can we assist you?</Text>
      </View>

      {/* Chat Messages */}
      <ScrollView className="flex-1 px-4 py-2">
        {messages.map((message) => (
          <View
            key={message.id}
            className={`mb-2 ${
              message.sender === "user" ? "self-end" : "self-start"
            }`}
          >
            <Text
              className={`px-4 py-2 rounded-lg ${
                message.sender === "user"
                  ? "bg-blue-500 text-white"
                  : "bg-gray-200 text-black"
              }`}
            >
              {message.text}
            </Text>
          </View>
        ))}
      </ScrollView>

      {/* Input Field */}
      <View className="flex-row items-center p-2 border-t border-gray-300 bg-white">
        {/* Input and Send Button in one View */}
        <View className="flex-row flex-1 items-center bg-gray-100 rounded-full px-4 py-2">
          <TextInput
            className="flex-1 text-black"
            placeholder="Type a message..."
            placeholderTextColor="gray"
            value={inputText}
            onChangeText={setInputText}
          />
          <TouchableOpacity onPress={handleSend}>
            <Feather name="send" size={20} color="#3B82F6" />
          </TouchableOpacity>
        </View>
        {/* Extra Icon in a separate View aligned to the right */}
        <View className="ml-2 px-4">
          <TouchableOpacity onPress={() => navigation.navigate("LiveCall")}>
            <AntDesign name="dingding-o" size={38} color="#3B82F6" />
          </TouchableOpacity>
        </View>
      </View>
    </SafeAreaView>
  );
};
