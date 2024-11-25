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
import loaderGif from "../../assets/loader.gif"; // Import the loader image

const YOUTUBE_API_KEY = process.env.YOUTUBE_API_KEY || "YOUR_YOUTUBE_API_KEY";
const ARTICLE_API_KEY = process.env.ARTICLE_API_KEY || "YOUR_ARTICLE_API_KEY";

export const DiscoverScreen = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [activeTab, setActiveTab] = useState("articles");
  const [vlogs, setVlogs] = useState([]);
  const [articles, setArticles] = useState([]);
  const [loading, setLoading] = useState(false);
  const [selectedVideoId, setSelectedVideoId] = useState(null);
  const [page, setPage] = useState(1);
  const [loadingMore, setLoadingMore] = useState(false); // Track loading for infinite scroll

  // Fetch Articles
  const fetchArticles = async (isLoadMore = false) => {
    if (isLoadMore) setLoadingMore(true);
    else setLoading(true);

    try {
      const response = await fetch(
        `https://newsapi.org/v2/everything?q=travel+Karnataka&pageSize=8&page=${page}&apiKey=${ARTICLE_API_KEY}`
      );

      if (!response.ok) {
        throw new Error(`Failed to fetch articles. Status: ${response.status}`);
      }

      const data = await response.json();
      const newArticles = data.articles?.map((article) => ({
        title: article.title || "No Title Available",
        author: article.author || "Unknown",
        thumbnail: article.urlToImage || "https://via.placeholder.com/150",
      }));

      // Append new articles if loading more, otherwise replace existing
      setArticles((prev) => (isLoadMore ? [...prev, ...newArticles] : newArticles || []));
    } catch (error) {
      console.error("Error fetching articles:", error.message);
    } finally {
      if (isLoadMore) setLoadingMore(false);
      else setLoading(false);
    }
  };

  // Fetch Vlogs
  const fetchVlogs = async () => {
    setLoading(true);
    try {
      const query = `${searchQuery} travel vlog`.trim();
      const videoResults = await fetchVideos(query, YOUTUBE_API_KEY);
      const vlogsData = videoResults.map((video) => ({
        title: video.snippet?.title || "No Title Available",
        channel: video.snippet?.channelTitle || "Unknown",
        thumbnail: video.snippet?.thumbnails?.medium?.url || "https://via.placeholder.com/150",
        videoId: video.id?.videoId,
      }));
      setVlogs(vlogsData || []);
    } catch (error) {
      console.error("Error fetching vlogs:", error.message);
    } finally {
      setLoading(false);
    }
  };

  // Trigger fetching of data based on active tab and searchQuery
  useEffect(() => {
    if (activeTab === "articles") {
      fetchArticles();
    } else if (activeTab === "vlogs" && searchQuery.trim() !== "") {
      fetchVlogs();
    }
  }, [activeTab, searchQuery]);

  // Infinite Scroll Handler
  const handleLoadMore = () => {
    if (!loadingMore) {
      setPage((prevPage) => prevPage + 1);
    }
  };

  // Fetch more articles when the page changes
  useEffect(() => {
    if (page > 1) {
      fetchArticles(true);
    }
  }, [page]);

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
          className={`flex-1 p-4 ${activeTab === "articles" ? "border-b-2 border-blue-500" : ""}`}
          onPress={() => setActiveTab("articles")}
        >
          <Text
            className={`text-center ${
              activeTab === "articles" ? "text-blue-600 font-bold" : "text-gray-500"
            }`}
          >
            Articles
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          className={`flex-1 p-4 ${activeTab === "vlogs" ? "border-b-2 border-blue-500" : ""}`}
          onPress={() => setActiveTab("vlogs")}
        >
          <Text
            className={`text-center ${
              activeTab === "vlogs" ? "text-blue-600 font-bold" : "text-gray-500"
            }`}
          >
            Vlogs
          </Text>
        </TouchableOpacity>
      </View>

      {/* Content Area */}
      <ScrollView
        className="flex-1"
        contentContainerStyle={{ padding: 16 }}
        onScroll={(event) => {
          const { layoutMeasurement, contentOffset, contentSize } = event.nativeEvent;
          if (layoutMeasurement.height + contentOffset.y >= contentSize.height - 20) {
            handleLoadMore();
          }
        }}
        scrollEventThrottle={400}
      >
        {activeTab === "articles" ? (
          <>
            <Text className="text-2xl font-bold mb-4">Recommended Articles</Text>
            {loading ? (
              <Image source={loaderGif} style={{ width: 50, height: 50, alignSelf: "center" }} />
            ) : (
              articles.map((article, index) => (
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
              ))
            )}
            {loadingMore && (
              <Image
                source={loaderGif}
                style={{ width: 50, height: 50, alignSelf: "center", marginVertical: 16 }}
              />
            )}
          </>
        ) : selectedVideoId ? (
          <View className="relative w-full h-56 mb-4">
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
                    <Text className="text-gray-500">Channel: {vlog.channel}</Text>
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
