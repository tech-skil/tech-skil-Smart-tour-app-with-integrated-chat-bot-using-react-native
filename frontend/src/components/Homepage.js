import React, { useState } from "react";
import {
  View,
  Text,
  Image,
  ScrollView,
  TouchableOpacity,
  TextInput,
  Dimensions,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import Header from "./Header";

const { width } = Dimensions.get("window");

const PLACES = [
  {
    name: "Stone Chariot",
    location: "Hampi",
    image: require("../../assets/images/hampi.jpg"),
    tags: ["Historic", "Temple"],
  },
  {
    name: "Gol Gumbaz",
    location: "Vijayanagara",
    image: require("../../assets/images/golgumbaz.jpg"),
    tags: ["Historic"],
  },
  {
    name: "Murudeshwara",
    location: "Uttara Kannada",
    image: require("../../assets/images/murudeshwar-beach.jpg"),
    tags: ["Beach", "Temple"],
  },
];

const CITIES = [
  { name: "Mangalore", image: require("../../assets/images/manglore.jpg") },
  { name: "Mysore", image: require("../../assets/images/mysore.jpg") },
  { name: "Bengaluru", image: require("../../assets/images/bengluru.jpg") },
  { name: "Vijayanagara", image: require("../../assets/images/hampi.jpg") },
  { name: "Shivamogga", image: require("../../assets/images/shivamogga.jpg") },
];

const FILTER_CATEGORIES = ["All", "Historic", "Beach", "Temple", "Mountain"];

const Homepage = () => {
  const [activeFilter, setActiveFilter] = useState("All");
  const [searchQuery, setSearchQuery] = useState("");

  const filteredPlaces =
    activeFilter === "All"
      ? PLACES
      : PLACES.filter((place) => place.tags.includes(activeFilter));

  const handleCityPress = (index) => {
    console.log(`City ${CITIES[index].name} pressed`);
    // console.log("clicked")

  };

  const handleSearch = (query) => {
    setSearchQuery(query);
  };

  return (
    <SafeAreaView className="flex-1 bg-blue-50">
      <ScrollView >

      {/* Search Bar */}
      <Header/>
      {/* <View className="px-4 py-2 bg-white">
        <TextInput
          value={searchQuery}
          onChangeText={handleSearch}
          placeholder="Search for places or cities..."
          placeholderTextColor="#9CA3AF"
          className="bg-gray-200 text-gray-800 px-4 py-2 rounded-full"
        />
      </View> */}

      {/* City Stories Section */}
      <View className="bg-white py-2">
        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={{
            paddingHorizontal: 16,
            alignItems: "center",
          }}
        >
          {CITIES.map((city, index) => (
            <TouchableOpacity
              key={index}
              onPress={() => handleCityPress(index)}
              className="mr-3 items-center"
            >
              <View className="w-16 h-16 rounded-full border-2 border-blue-500 overflow-hidden">
                <Image
                  source={city.image}
                  className="w-full h-full"
                  resizeMode="cover"
                />
              </View>
              <Text className="text-xs text-gray-600 mt-1">{city.name}</Text>
            </TouchableOpacity>
          ))}
        </ScrollView>
      </View>

      {/* Filters Section */}
      <View className="px-4 py-2 flex-row space-x-2 bg-white">
        {FILTER_CATEGORIES.map((category) => (
          <TouchableOpacity
            key={category}
            onPress={() => setActiveFilter(category)}
            className={`px-3 py-1 rounded-full ${
              activeFilter === category ? "bg-blue-500" : "bg-gray-200"
            }`}
          >
            <Text
              className={`text-sm ${
                activeFilter === category ? "text-white" : "text-gray-700"
              }`}
            >
              {category}
            </Text>
          </TouchableOpacity>
        ))}
      </View>

      {/* Popular Places Section */}
      <ScrollView className="px-4 mt-2 h-full overflow-clip">
        <Text className="text-xl font-bold  text-gray-800 mb-2">
          Popular Places
        </Text>
        <ScrollView horizontal showsHorizontalScrollIndicator={false}>
          <View className="flex-row space-x-4">
            {filteredPlaces.map((place, index) => (
              <TouchableOpacity
                key={index}
                className="w-40 rounded-lg overflow-hidden shadow-sm"
              >
                <Image
                  source={place.image}
                  className="h-56 w-full"
                  resizeMode="cover"
                />
                <View className="p-2 bg-white">
                  <Text className="font-bold text-gray-800">{place.name}</Text>
                  <Text className="text-blue-500">{place.location}</Text>
                </View>
              </TouchableOpacity>
            ))}
          </View>
        </ScrollView>
      </ScrollView>

      {/* Explore Nearby Section */}
      <View className="px-4 mt-4">
        <Text className="text-xl font-bold text-gray-800 mb-2">
          Explore Nearby
        </Text>
        {CITIES.slice(0, 3).map((city, index) => (
          <TouchableOpacity
            key={index}
            className="flex-row items-center mb-3 bg-white p-2 rounded-lg shadow-sm"
          >
            <Image
              source={city.image}
              className="w-28 h-28 rounded-md"
              resizeMode="cover"
            />
            <View className="ml-3">
              <Text className="font-bold text-gray-800">{city.name}</Text>
              <Text className="text-gray-500">Nearby attractions available</Text>
            </View>
          </TouchableOpacity>
        ))}
      </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default Homepage;