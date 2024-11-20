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

export const Tourguid = () => {
  const [messages, setMessages] = useState([
    { id: 1, text: "Hi there! How can I help you today?", sender: "bot" },
  ]);
  const [inputText, setInputText] = useState("");

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
    <SafeAreaView className="flex-1 bg-gray-50 mt-6">
      {/* Header */}
      <View className="bg-blue-500 py-4 px-6">
        <Text className="text-white text-2xl font-bold">Triplo Tour Guid</Text>
        <Text className="text-white text-sm mt-1">How can we assist you?</Text>
      </View>

      {/* Chat Messages */}
      <ScrollView
        className="flex-1 px-4 pt-4"
        contentContainerStyle={{ paddingBottom: 64 }}
      >
        {messages.map((message) => (
          <View
            key={message.id}
            className={`mb-4 ${
              message.sender === "user"
                ? "self-end bg-blue-500"
                : "self-start bg-gray-200"
            } rounded-lg px-4 py-3 max-w-3/4`}
          >
            <Text
              className={`${
                message.sender === "user" ? "text-white" : "text-gray-800"
              }`}
            >
              {message.text}
            </Text>
          </View>
        ))}
      </ScrollView>

      {/* Input Field */}
      <View className="flex-row items-center bg-white px-4 py-3 border-t border-gray-200">
        <TextInput
          className="flex-1 bg-gray-100 rounded-full px-4 py-2 text-gray-800"
          placeholder="Type your message..."
          value={inputText}
          onChangeText={setInputText}
        />
        <TouchableOpacity onPress={handleSend} className="ml-3">
          <Feather name="send" size={24} className="text-blue-500" />
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};
