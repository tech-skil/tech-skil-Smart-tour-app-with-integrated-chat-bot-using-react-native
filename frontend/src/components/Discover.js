import React, { useState } from "react";
import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  TextInput,
  Image,
} from "react-native";
import { Feather } from "@expo/vector-icons";

export const DiscoverScreen = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [activeTab, setActiveTab] = useState("articles");

  const articles = [
    {
      title: "10 Tips for Traveling on a Budget",
      author: "John Doe",
      thumbnail: "https://via.placeholder.com/150/92c952", // Replace with actual URL
    },
    {
      title: "Top 5 Beach Destinations",
      author: "Jane Smith",
      thumbnail: "https://via.placeholder.com/150/771796", // Replace with actual URL
    },
    {
      title: "How to Pack Light for a Trip",
      author: "Chris Johnson",
      thumbnail: "https://via.placeholder.com/150/24f355", // Replace with actual URL
    },
  ];

  const vlogs = [
    {
      title: "Exploring Bali in 7 Days",
      channel: "Travel Diaries",
      thumbnail: "https://via.placeholder.com/150/d32776", // Replace with actual URL
    },
    {
      title: "Mountain Adventures in Colorado",
      channel: "Hiker's Dream",
      thumbnail: "https://via.placeholder.com/150/f66b97", // Replace with actual URL
    },
    {
      title: "A Guide to Street Food in Bangkok",
      channel: "Foodies' Paradise",
      thumbnail: "https://via.placeholder.com/150/56a8c2", // Replace with actual URL
    },
  ];

  return (
    <View className="flex-1 bg-white">
      {/* Search Bar */}
      <View className="px-4 pt-10 pb-4 bg-gray-100">
        <View className="flex-row items-center bg-white rounded-full px-4 py-2 shadow-sm">
          <Feather name="search" size={20} className="text-gray-500 mr-2" />
          <TextInput
            placeholder="Search..."
            className="flex-1 text-gray-500"
            onChangeText={(text) => setSearchQuery(text)}
            value={searchQuery}
          />
        </View>
      </View>

      {/* Tab Navigation */}
      <View className="flex-row justify-center border-b border-gray-200">
        <TouchableOpacity
          className={`flex-1 p-4 ${
            activeTab === "articles" ? "border-b-2 border-blue-500" : ""
          }`}
          onPress={() => setActiveTab("articles")}
        >
          <Text
            className={`text-center ${
              activeTab === "articles"
                ? "text-blue-600 font-bold"
                : "text-gray-500"
            }`}
          >
            Articles
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          className={`flex-1 p-4 ${
            activeTab === "vlogs" ? "border-b-2 border-blue-500" : ""
          }`}
          onPress={() => setActiveTab("vlogs")}
        >
          <Text
            className={`text-center ${
              activeTab === "vlogs"
                ? "text-blue-600 font-bold"
                : "text-gray-500"
            }`}
          >
            Vlogs
          </Text>
        </TouchableOpacity>
      </View>

      {/* Content Area */}
      <ScrollView className="flex-1" contentContainerStyle={{ padding: 16 }}>
        {activeTab === "articles" ? (
          <>
            <Text className="text-2xl font-bold mb-4">
              Recommended Articles
            </Text>
            {articles.map((article, index) => (
              <TouchableOpacity
                key={index}
                className="bg-white  rounded-lg p-4 mb-4 shadow-md border border-gray-100 flex-row items-center"
              >
                <Image
                  source={{ uri: article.thumbnail }}
                  className="w-24 h-24 rounded-lg mr-4"
                />
                <View>
                  <Text className="text-lg w-[95%] font-semibold mb-1">
                    {article.title}
                  </Text>
                  <Text className="text-gray-500">By {article.author}</Text>
                </View>
              </TouchableOpacity>
            ))}
          </>
        ) : (
          <>
            <Text className="text-2xl font-bold mb-4">Recommended Vlogs</Text>
            {vlogs.map((vlog, index) => (
              <TouchableOpacity
                key={index}
                className="bg-white rounded-lg p-4 mb-4 shadow-md border border-gray-100 flex-row items-center"
              >
                <Image
                  source={{ uri: vlog.thumbnail }}
                  className="w-24 h-24 rounded-lg mr-4"
                />
                <View>
                  <Text className="text-lg w-[95%] font-semibold mb-1">
                    {vlog.title}
                  </Text>
                  <Text className="text-gray-500">Channel: {vlog.channel}</Text>
                </View>
              </TouchableOpacity>
            ))}
          </>
        )}
      </ScrollView>
    </View>
  );
};
