// components/HomeScreen.js

import React from 'react';
import { ScrollView, View, Text, Image, TouchableOpacity } from 'react-native';
import { StatusBar } from 'expo-status-bar';
import { Feather, MaterialIcons } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';
import tw from 'twrnc';
import img1 from "../assets/images/image.png";

const PopularDestination = ({ image, place, country, rating }) => (
  <View style={tw`mr-4 bg-white rounded-3xl shadow-lg`}>
    <Image
      source={{ uri: image }}
      style={tw`w-40 h-40 rounded-t-3xl`}
    />
    <View style={tw`p-3`}>
      <Text style={tw`text-lg font-bold`}>{place}</Text>
      <View style={tw`flex-row items-center mt-1`}>
        <Feather name="map-pin" size={14} style={tw`text-gray-400`} />
        <Text style={tw`ml-1 text-gray-400`}>{country}</Text>
      </View>
      <View style={tw`flex-row items-center mt-2`}>
        <MaterialIcons name="star" size={16} style={tw`text-yellow-400`} />
        <Text style={tw`ml-1 font-semibold`}>{rating}</Text>
      </View>
    </View>
  </View>
);

const HomeScreen = () => {
  const destinations = [
    {
      image: img1,
      place: 'Bali',
      country: 'Indonesia',
      rating: '4.8',
    },
    {
      image: img1,
      place: 'Paris',
      country: 'France',
      rating: '4.9',
    },
    {
      image: img1,
      place: 'Santorini',
      country: 'Greece',
      rating: '4.7',
    },
  ];

  return (
    <ScrollView style={tw`flex-1 bg-gray-50`}>
      <StatusBar style="auto" />

      {/* Header */}
      <View style={tw`px-6 pt-12 pb-4`}>
        <View style={tw`flex-row justify-between items-center`}>
          <Feather name="menu" size={24} style={tw`text-gray-800`} />
          <View style={tw`w-10 h-10 bg-gray-200 rounded-full items-center justify-center`}>
            <Feather name="user" size={20} style={tw`text-gray-600`} />
          </View>
        </View>
      </View>

      {/* Welcome Section */}
      <View style={tw`px-6 mt-4`}>
        <Text style={tw`text-4xl font-bold text-gray-800`}>Discover</Text>
        <Text style={tw`text-4xl font-bold text-gray-800`}>Your Dream Place</Text>
        <Text style={tw`mt-2 text-gray-500`}>Explore beautiful destinations around the world</Text>
      </View>

      {/* Search Bar */}
      <View style={tw`mx-6 mt-6`}>
        <View style={tw`flex-row items-center bg-white px-4 py-3 rounded-xl shadow-sm`}>
          <Feather name="search" size={20} style={tw`text-gray-400`} />
          <Text style={tw`ml-3 text-gray-400`}>Search destinations...</Text>
        </View>
      </View>

      {/* Categories */}
      <ScrollView 
        horizontal 
        showsHorizontalScrollIndicator={false}
        style={tw`mt-8 px-6`}
      >
        {['Popular', 'Recommended', 'Most Viewed', 'Beach', 'Mountain'].map((category, index) => (
          <TouchableOpacity
            key={index}
            style={tw`${
              index === 0 
                ? 'bg-blue-500' 
                : 'bg-gray-200'
            } px-6 py-3 rounded-full mr-3`}
          >
            <Text style={tw`${
              index === 0 
                ? 'text-white' 
                : 'text-gray-600'
            } font-semibold`}>
              {category}
            </Text>
          </TouchableOpacity>
        ))}
      </ScrollView>

      {/* Popular Destinations */}
      <View style={tw`mt-8 px-6`}>
        <View style={tw`flex-row justify-between items-center mb-4`}>
          <Text style={tw`text-xl font-bold text-gray-800`}>Popular Destinations</Text>
          <TouchableOpacity>
            <Text style={tw`text-blue-500`}>See all</Text>
          </TouchableOpacity>
        </View>
        
        <ScrollView 
          horizontal 
          showsHorizontalScrollIndicator={false}
        >
          {destinations.map((dest, index) => (
            <PopularDestination key={index} {...dest} />
          ))}
        </ScrollView>
      </View>

      {/* Featured Section */}
      <View style={tw`mt-8 mx-6 mb-8`}>
        <LinearGradient
          colors={['#4c669f', '#3b5998', '#192f6a']}
          style={tw`rounded-3xl p-6`}
        >
          <Text style={tw`text-white text-lg font-bold`}>Special Offer!</Text>
          <Text style={tw`text-white mt-2`}>Get 30% off on your first booking</Text>
          <TouchableOpacity style={tw`bg-white px-6 py-3 rounded-full mt-4 self-start`}>
            <Text style={tw`text-blue-500 font-semibold`}>Book Now</Text>
          </TouchableOpacity>
        </LinearGradient>
      </View>
    </ScrollView>
  );
};

export default HomeScreen;
