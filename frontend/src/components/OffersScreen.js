// components/OffersScreen.js
import React from 'react';
import { View, Text, ScrollView, TouchableOpacity, Image } from 'react-native';
import { Feather } from '@expo/vector-icons';
import * as Animatable from 'react-native-animatable';
import tw from 'twrnc';

export const OffersScreen = () => {
  const offers = [
    {
      title: "Early Bird Special",
      discount: "25% OFF",
      description: "Book 30 days in advance",
      validUntil: "2024-12-31",
    },
    {
      title: "Weekend Getaway",
      discount: "15% OFF",
      description: "Perfect for short trips",
      validUntil: "2024-12-31",
    },
  ];

  return (
    <ScrollView style={tw` flex-1 bg-gray-50 pt-12`}>
      <View style={tw`px-6`}>
        <Text style={tw`text-3xl font-bold text-gray-800`}>Special Offers</Text>
        <Text style={tw`text-gray-500 mt-2`}>Exclusive deals just for you</Text>
      </View>

      {offers.map((offer, index) => (
        <Animatable.View 
          key={index}
          animation="fadeInUp"
          delay={index * 200}
          style={tw`mx-6 mt-6 bg-white rounded-xl shadow-md p-6`}
        >
          <View style={tw`flex-row justify-between items-center`}>
            <Text style={tw`text-2xl font-bold text-blue-500`}>{offer.discount}</Text>
            <Feather name="tag" size={24} style={tw`text-blue-500`} />
          </View>
          <Text style={tw`text-xl font-semibold mt-2`}>{offer.title}</Text>
          <Text style={tw`text-gray-500 mt-1`}>{offer.description}</Text>
          <Text style={tw`text-gray-400 mt-2`}>Valid until {offer.validUntil}</Text>
          <TouchableOpacity style={tw`bg-blue-500 rounded-full py-3 mt-4`}>
            <Text style={tw`text-white text-center font-semibold`}>Claim Offer</Text>
          </TouchableOpacity>
        </Animatable.View>
      ))}
    </ScrollView>
  );
};