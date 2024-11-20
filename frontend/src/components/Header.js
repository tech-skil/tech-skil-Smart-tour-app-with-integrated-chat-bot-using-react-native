import React from "react";
import { View, Text, TouchableOpacity } from "react-native";
import Icon from "react-native-vector-icons/FontAwesome";
import { useNavigation } from "@react-navigation/native";
const Header = () => {
  const navigation = useNavigation();
  const onProfilePress = () => {
    navigation.navigate("Profile");
  };

  return (
    <View className="flex-row items-center justify-between py-3 px-4 bg-white shadow-sm">
      <View className="flex-row items-center">
        <View className="justify-between">
          <Text className="text-2xl font-bold text-gray-800">Triplo</Text>
          <Text className="text-sm text-gray-500">Your Travel Buddy</Text>
        </View>
      </View>
      <TouchableOpacity onPress={onProfilePress}>
        <Icon name="user-circle" size={32} color="#666" />
      </TouchableOpacity>
    </View>
  );
};

export default Header;
