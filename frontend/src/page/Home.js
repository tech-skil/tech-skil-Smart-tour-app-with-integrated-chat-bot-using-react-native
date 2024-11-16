import React, { useState } from 'react';
import { View, Text, Image, ScrollView, TouchableOpacity } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import hampi from '../../assets/images/hampi.jpg';
import murudeshwara from '../../assets/images/murudeshwar-beach.jpg';
import golgumbaz from '../../assets/images/golgumbaz.jpg';
import malpe from '../../assets/images/malpebeach.jpg'
import kumaraparvata from '../../assets/images/kumaraparvatha.jpeg'
import yana from '../../assets/images/yana.jpg'
import Header from './Header';

const Home = () => {
  const [filter, setFilter] = useState('All');
  const [modalVisible, setModalVisible] = useState(false);

  const places = [
    { name: 'Stone Chariot', location: 'Hampi', image: hampi, tags: ['Historic', 'Temple'] },
    { name: 'Gol Gumbaz', location: 'Vijayanagara', image: golgumbaz, tags: ['Historic'] },
    { name: 'Kumara Parvatha', location: 'Vijayanagara', image: kumaraparvata, tags: ['Mountain'] },
    { name: 'Malpe Beach', image: malpe, tags: ['Beach'], details: 'A beautiful sandy beach popular for water sports and sunsets.' },
    { name: 'Murudeshwara', location: 'Uttara Kannada', image: murudeshwara, tags: ['Beach', 'Temple'], details: 'Beautiful view' },
    { name: 'Yana', location: 'Vijayanagara', image: yana, tags: ['Mountain', 'Temple'] },
  ];

  const filteredPlaces = filter === 'All'
    ? places
    : places.filter(place => place.tags.includes(filter));

  const midIndex = Math.ceil(filteredPlaces.length / 2);
  const popularPlaces = filteredPlaces.slice(0, midIndex);
  const topAttractions = filteredPlaces.slice(midIndex);

  return (
    <SafeAreaView className="flex-1 bg-white">
      <Header />

      <View className="px-4 py-2">
        <ScrollView horizontal showsHorizontalScrollIndicator={false} className="flex-row">
          {[
            { name: 'Mangalore', image: require('../../assets/images/manglore.jpg') },
            { name: 'Mysore', image: require('../../assets/images/mysore.jpg') },
            { name: 'Bengaluru', image: require('../../assets/images/bengluru.jpg') },
            { name: 'Vijayanagara', image: require('../../assets/images/hampi.jpg') },
            { name: 'Shivamogga', image: require('../../assets/images/shivamogga.jpg') },
          ].map((city, index) => (
            <TouchableOpacity key={index} className="mr-3 items-center">
              <View className="w-16 h-16 rounded-full bg-gray-300 overflow-hidden justify-center items-center">
                <Image source={city.image} className="w-full h-full" resizeMode="cover" />
              </View>
              <Text className="text-xs text-center text-gray-600 mt-1">{city.name}</Text>
            </TouchableOpacity>
          ))}
        </ScrollView>
      </View>

      <ScrollView className="flex-1 px-4" showsVerticalScrollIndicator={false}>
        <Text className="text-black text-lg font-semibold">Popular Places</Text>
        <Text className="text-gray-500 text-sm mb-4">Let's find out what best places</Text>

        <ScrollView horizontal showsHorizontalScrollIndicator={false}>
          <View className="flex-row">
            {popularPlaces.map((place, index) => (
              <TouchableOpacity key={index} className="w-40 mr-4">
                <View className="relative">
                  <Image source={place.image} className="h-40 w-full rounded-lg" />
                </View>
                <Text className="mt-2 font-semibold">{place.name}</Text>
                <Text className="text-orange-500 mt-1">{place.location}</Text>
                <Text className="mt-1 font-semibold underline">View More</Text>
              </TouchableOpacity>
            ))}
          </View>
        </ScrollView>

        <View className="mt-6">
          <Text className="text-lg font-semibold">Top Attractions</Text>
          <Text className="text-gray-500 text-sm mb-4">Let's find out what's new</Text>

          <ScrollView vertical showsVerticalScrollIndicator={false}>
            <View className="flex-col">
              {topAttractions.map((place, index) => (
                <TouchableOpacity key={index} className="mb-4">
                  <View className="flex-row items-center bg-gray-100 p-4 rounded-lg shadow">
                    <Image source={place.image} className="h-40 w-40 rounded-lg mr-4" />
                    <View className="flex-1">
                      <Text className="font-semibold text-lg">{place.name}</Text>
                      <Text className="text-orange-500 mt-1">{place.location}</Text>
                      <Text className="text-gray-600 mt-1">{place.details}</Text>
                      <Text className="text-blue-500 mt-1 underline font-semibold">View More</Text>
                    </View>
                  </View>
                </TouchableOpacity>
              ))}
            </View>
          </ScrollView>
        </View>
      </ScrollView>

      {/* <Footer /> */}
    </SafeAreaView>
  );
};

export default Home;