import React, { useState } from "react";
import {
  View,
  Text,
  Image,
  ScrollView,
  TouchableOpacity,
  Dimensions,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import Header from "./Header";
import { Video } from "expo-av"; // Using expo-av for video playback
import { useNavigation } from "@react-navigation/native";

const { width } = Dimensions.get("window");

const PLACES = [
  {
    name: "Stone Chariot",
    location: "Hampi",
    image: require("../../assets/images/hampi.jpg"),
    tags: ["Historic", "Temple"],
    description:
      "The Stone Chariot is one of the most famous monuments in Hampi, Karnataka. It is an iconic symbol of Indian history and architecture.",
  },
  {
    name: "Gol Gumbaz",
    location: "Vijayanagara",
    image: require("../../assets/images/golgumbaz.jpg"),
    tags: ["Historic"],
    description:
      "Gol Gumbaz is a historical mausoleum in Vijayapura, Karnataka. It is renowned for its unique acoustic features and architectural design.",
  },
  {
    name: "Murudeshwara",
    location: "Uttara Kannada",
    image: require("../../assets/images/murudeshwar-beach.jpg"),
    tags: ["Beach", "Temple"],
    description:
      "Murudeshwara is famous for its temple and beach, offering a blend of spirituality and relaxation amidst stunning coastal views.",
  },
];

const CITIES = [
  {
    name: "Mangalore",
    image: require("../../assets/images/manglore.jpg"),
  },
  {
    name: "Mysore",
    image: require("../../assets/images/mysore.jpg"),
  },
  {
    name: "Bengaluru",
    image: require("../../assets/images/bengluru.jpg"),
  },
  {
    name: "Vijayanagara",
    image: require("../../assets/images/hampi.jpg"),
    video: require("../../assets/videos/hampi.mp4"),
  },
  {
    name: "Shivamogga",
    image: require("../../assets/images/shivamogga.jpg"),
  },
];

const FILTER_CATEGORIES = ["All", "Historic", "Beach", "Temple", "Mountain"];

const Homepage = () => {
  const [activeFilter, setActiveFilter] = useState("All");
  const [selectedCity, setSelectedCity] = useState(null);
  const navigation = useNavigation();

  const filteredPlaces =
    activeFilter === "All"
      ? PLACES
      : PLACES.filter((place) => place.tags.includes(activeFilter));

  const handleCityPress = (index) => {
    setSelectedCity(CITIES[index]);
  };

  const handleBackToHome = () => {
    setSelectedCity(null);
  };

  const handlePlacePress = (place) => {
    navigation.navigate("PlaceDetails", { place });
  };

  return (
    <SafeAreaView className="flex-1 bg-blue-50">
      {selectedCity ? (
        <View className="flex-1 bg-white">
          {/* Video Player Section */}
          <TouchableOpacity
            onPress={handleBackToHome}
            className="absolute top-5 left-5 z-10 bg-blue-500 px-4 py-2 rounded-full"
          >
            <Text className="text-white font-bold">Back</Text>
          </TouchableOpacity>
          <Text className="text-xl font-bold text-center mt-4">
            {selectedCity.name}
          </Text>
          <Video
            source={selectedCity.video}
            style={{ width: "100%", height: 300 }}
            useNativeControls
            resizeMode="contain"
            shouldPlay
          />
        </View>
      ) : (
        <ScrollView>
          {/* Search Bar */}
          <Header />

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
                  <Text className="text-xs text-gray-600 mt-1">
                    {city.name}
                  </Text>
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
                    onPress={() => handlePlacePress(place)}
                    className="w-40 rounded-lg overflow-hidden shadow-sm"
                  >
                    <Image
                      source={place.image}
                      className="h-56 w-full"
                      resizeMode="cover"
                    />
                    <View className="p-2 bg-white">
                      <Text className="font-bold text-gray-800">
                        {place.name}
                      </Text>
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
                  <Text className="text-gray-500">
                    Nearby attractions available
                  </Text>
                </View>
              </TouchableOpacity>
            ))}
          </View>
        </ScrollView>
      )}
    </SafeAreaView>
  );
};

export default Homepage;
