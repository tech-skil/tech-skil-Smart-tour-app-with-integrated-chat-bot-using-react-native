import React from 'react';
import { View, Text, Image } from 'react-native';
import logo from '../../assets/images/logo.jpg';

const Header = () => {
  return (
    <View className="flex-row items-center py-4 px-4">
      <Image source={logo} className="rounded-full h-14 w-14" />
      <View className="px-4 justify-between">
        <Text className="text-3xl font-bold">Triplo</Text>
        <Text className="text-gray-500">Your Travel Buddy</Text>
      </View>
    </View>
  );
};

export default Header;