import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  TextInput,
  Image,
  ActivityIndicator,
} from "react-native";
import { Feather } from "@expo/vector-icons";
import YoutubePlayer from "react-native-youtube-iframe";
import { fetchVideos } from "./YouTubeService"; 

export const DiscoverScreen = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [activeTab, setActiveTab] = useState("articles");
  const [vlogs, setVlogs] = useState([]);
  const [loading, setLoading] = useState(false);
  const [selectedVideoId, setSelectedVideoId] = useState(null); 

  const articles = [
    {
      "title": "Top 7 Must-Visit Destinations in Karnataka",
      "author": "Jane Smith",
      "thumbnail": "https://tse4.mm.bing.net/th?id=OIP.9WQ2cPoA-3tjTAex0XJcUwHaE8&pid=Api&P=0&h=180"
  },
  {
      "title": "How to Experience Karnataka's Culture to the Fullest",
      "author": "Sarah Brown",
      "thumbnail": "https://tse1.mm.bing.net/th?id=OIP.lHXbUcnWwyLhHNUI2fK3dgHaE8&pid=Api&P=0&h=180"
  },
  {
      "title": "A Minimalist's Guide to Packing for a Karnataka Adventure",
      "author": "Mike Johnson",
      "thumbnail": "https://tse4.mm.bing.net/th?id=OIP.coH49hD9d4qS1NNxv9voyAHaEj&pid=Api&P=0&h=180"
  },
  {
      "title": "Exploring Karnataka's Hidden Gems: 8 Underrated Travel Spots",
      "author": "Emma Watson",
      "thumbnail": "https://tse4.mm.bing.net/th?id=OIP.Rtj43mhLV8lhSlf89X9vZQHaEK&pid=Api&P=0&h=180"
  },
  {
      "title": "Travel Sustainably in Karnataka: Tips and Guidelines",
      "author": "Alex Green",
      "thumbnail": "https://tse1.mm.bing.net/th?id=OIP.pONg1syl8yFnfZholvD43AHaFj&pid=Api&P=0&h=180"
    },

  ];

  
  useEffect(() => {
    if (activeTab === "vlogs" && searchQuery.trim() !== "") {
      const fetchVlogData = async () => {
        setLoading(true);
        try {
          const videoResults = await fetchVideos(searchQuery);
          const vlogsData = videoResults.map((video) => ({
            title: video.snippet.title,
            channel: video.snippet.channelTitle,
            thumbnail: video.snippet.thumbnails.medium.url,
            videoId: video.id.videoId,
          }));
          setVlogs(vlogsData);
        } catch (error) {
          console.error("Failed to fetch vlog videos:", error);
        } finally {
          setLoading(false);
        }
      };

      fetchVlogData();
    }
  }, [searchQuery, activeTab]);

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
                className="bg-white rounded-lg p-4 mb-4 shadow-md border border-gray-100 flex-row items-center"
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
        ) : selectedVideoId ? (
          <View className="relative w-full h-56 mb-4">
            {/* Video Player */}
            <YoutubePlayer
              height={300}
              play={true}
              videoId={selectedVideoId} 
              onChangeState={(event) => {
                if (event === "ended") {
                  setSelectedVideoId(null); 
                }
              }}
            />
            {/* Close Button */}
            <TouchableOpacity
              onPress={() => setSelectedVideoId(null)} 
              style={{
                position: "absolute",
                top: 10,
                right: 10,
                backgroundColor: "rgba(0, 0, 0, 0.7)",
                borderRadius: 50,
                padding: 8,
              }}
            >
              <Feather name="x" size={24} color="#fff" />
            </TouchableOpacity>
          </View>
        ) : (
          <>
            <Text className="text-2xl font-bold mb-4">Recommended Vlogs</Text>
            {loading ? (
              <ActivityIndicator size="large" color="#0000ff" />
            ) : (
              vlogs.map((vlog, index) => (
                <TouchableOpacity
                  key={index}
                  className="bg-white rounded-lg p-4 mb-4 shadow-md border border-gray-100 flex-row items-center"
                  onPress={() => setSelectedVideoId(vlog.videoId)} 
                >
                  <Image
                    source={{ uri: vlog.thumbnail }}
                    className="w-24 h-24 rounded-lg mr-4"
                  />
                  <View>
                    <Text className="text-lg w-[95%] font-semibold mb-1">
                      {vlog.title}
                    </Text>
                    <Text className="text-gray-500">
                      Channel: {vlog.channel}
                    </Text>
                  </View>
                </TouchableOpacity>
              ))
            )}
          </>
        )}
      </ScrollView>
    </View>
  );
};
