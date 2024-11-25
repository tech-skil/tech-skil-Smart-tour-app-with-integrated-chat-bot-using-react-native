import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  ScrollView,
  SafeAreaView,
  StatusBar,
} from "react-native";
import {
  FontAwesome,
  MaterialCommunityIcons,
  Feather,
} from "@expo/vector-icons";

const WeatherIcon = ({ condition, size = 24, className = "" }) => {
  const icons = {
    sunny: (
      <Feather name="sun" size={size} color="#FFD700" className={className} />
    ),
    cloudy: (
      <MaterialCommunityIcons
        name="cloud-outline"
        size={size}
        color="#2563eb"
        className={className}
      />
    ),
    rainy: (
      <Feather
        name="cloud-rain"
        size={size}
        color="#2563eb"
        className={className}
      />
    ),
    partlyCloudy: (
      <MaterialCommunityIcons
        name="weather-partly-cloudy"
        size={size}
        color="#2563eb"
        className={className}
      />
    ),
  };

  return icons[condition] || icons.sunny;
};

const WeatherDetailCard = ({ icon, label, value }) => (
  <View className="bg-white/90 rounded-2xl p-4 items-center flex-1 mx-2">
    {icon}
    <Text className="text-base font-medium text-blue-900 mt-2">{value}</Text>
    <Text className="text-sm text-blue-600">{label}</Text>
  </View>
);

const DayForecast = ({ day, temp, condition }) => (
  <View className="items-center bg-white/60 rounded-xl p-3 min-w-[90px] mx-2">
    <Text className="text-sm font-medium text-blue-900">{day}</Text>
    <WeatherIcon
      condition={condition}
      size={32}
      className="my-3 text-blue-600"
    />
    <Text className="text-xs font-medium text-blue-600">{temp}</Text>
  </View>
);

const Weather = () => {
  const [searchText, setSearchText] = useState("");

  return (
    <SafeAreaView className="flex-1 bg-gradient-to-b from-blue-100 to-white">
      <StatusBar barStyle="dark-content" />
      {/* Search Section */}
      <View className="px-4 pt-4 pb-2">
        <View className="flex-row items-center bg-white/90 rounded-full p-2 shadow-sm">
          <TextInput
            className="flex-1 px-4 py-2 text-base text-blue-900"
            placeholder="Search city..."
            value={searchText}
            onChangeText={setSearchText}
          />
          <TouchableOpacity
            className="bg-blue-500 rounded-full p-3 ml-2"
            activeOpacity={0.8}
          >
            <FontAwesome name="search" size={20} color="white" />
          </TouchableOpacity>
        </View>
      </View>

      <ScrollView
  className="flex-1"
  showsVerticalScrollIndicator={false}
  contentContainerClassName="pb-6"
>
  {/* Location and Date */}
  <View className="items-center mt-6">
    <Text className="text-2xl font-bold text-blue-900">
      Bangalore, India
    </Text>
    <Text className="text-base text-blue-600 mt-1">
      Sunday, 24 November
    </Text>
  </View>

  {/* Current Weather */}
  <View className="items-center mt-8">
    <WeatherIcon
      condition="cloudy"
      size={120}
      className="text-gray-500"
    />
    <View className="flex-row items-start mt-4">
      <Text className="text-8xl font-light text-blue-900">24</Text>
      <Text className="text-4xl font-light text-blue-900 mt-2">°C</Text>
    </View>
    <Text className="text-xl font-medium text-blue-600 mt-2">Cloudy</Text>
  </View>

  {/* Weather Details */}
  <View className="flex-row justify-between mx-4 mt-8">
    <WeatherDetailCard
      icon={<Feather name="wind" size={24} color="#2563eb" />}
      label="Wind"
      value="10 km/h"
    />
    <WeatherDetailCard
      icon={<Feather name="droplet" size={24} color="#2563eb" />}
      label="Humidity"
      value="80%"
    />
    <WeatherDetailCard
      icon={<Feather name="cloud-rain" size={24} color="#2563eb" />}
      label="Rain"
      value="20%"
    />
  </View>

  {/* Weekly Forecast */}
  <View className="mt-8 mx-4">
    <Text className="text-xl font-bold text-blue-900 mb-4">
      7-Day Forecast
    </Text>
    <ScrollView
      horizontal
      showsHorizontalScrollIndicator={false}
      contentContainerClassName="pb-2"
    >
      {[
        { day: "Mon", temp: "25°/19°", condition: "rainy" },
        { day: "Tue", temp: "26°/18°", condition: "cloudy" },
        { day: "Wed", temp: "27°/19°", condition: "sunny" },
        { day: "Thu", temp: "26°/18°", condition: "partlyCloudy" },
        { day: "Fri", temp: "25°/19°", condition: "rainy" },
        { day: "Sat", temp: "27°/20°", condition: "sunny" },
        { day: "Sun", temp: "28°/21°", condition: "cloudy" },
      ].map((day, index) => (
        <DayForecast key={index} {...day} />
      ))}
    </ScrollView>
  </View>
</ScrollView>

    </SafeAreaView>
  );
};

export default Weather;
