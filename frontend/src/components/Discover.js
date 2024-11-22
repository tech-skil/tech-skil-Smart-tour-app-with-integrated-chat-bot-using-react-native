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
import { fetchVideos } from "./YouTubeService"; // Import your YouTube API function

export const DiscoverScreen = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [activeTab, setActiveTab] = useState("articles");
  const [vlogs, setVlogs] = useState([]);
  const [loading, setLoading] = useState(false);
  const [selectedVideoId, setSelectedVideoId] = useState(null); // State for selected video

  const articles = [
    {
      title: "10 Tips for Traveling on a Budget",
      author: "John Doe",
      thumbnail: "https://via.placeholder.com/150/92c952",
    },
    // Other articles...
  ];

  // Fetch vlog videos from YouTube when the search query changes
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
            videoId={selectedVideoId} // Render the selected video
            onChangeState={(event) => {
              if (event === "ended") {
                setSelectedVideoId(null); // Reset player on video end
              }
            }}
          />
          {/* Close Button */}
          <TouchableOpacity
            onPress={() => setSelectedVideoId(null)} // Close video player
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
                  onPress={() => setSelectedVideoId(vlog.videoId)} // Set the selected video ID
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
