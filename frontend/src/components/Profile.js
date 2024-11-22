import React, { useState } from "react";
import { View, Text, TouchableOpacity, ScrollView, Image } from "react-native";
import Icon from "react-native-vector-icons/FontAwesome";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useNavigation } from "@react-navigation/native";

// ProfileOption component with Tailwind classes
const ProfileOption = ({ iconName, iconColor, title, onPress }) => (
  <TouchableOpacity
    className="flex-row items-center py-8 px-6 border-b border-gray-200"
    onPress={onPress}
  >
    <Icon name={iconName} size={24} color={iconColor} />
    <Text className="ml-4 text-base text-gray-700">{title}</Text>
  </TouchableOpacity>
);

const Profile = () => {
  const navigation = useNavigation();

  const handleOnClose = () => {
    navigation.navigate("MainApp");
  };

  const handleOnLogout = async () => {
    try {
      // Remove token and user data
      await AsyncStorage.removeItem("userToken");
      await AsyncStorage.removeItem("userEmail");

      // Navigate back to login screen
      navigation.replace("Login");
    } catch (error) {
      console.error("Logout error:", error);
    }
  };

  const [userData] = useState({
    name: "John Doe",
    email: "john.doe@example.com",
    profilePic: null,
  });

  const profileOptions = [
    {
      iconName: "map",
      iconColor: "#4A90E2",
      title: "My Trips",
      onPress: () => {},
    },
    {
      iconName: "bookmark",
      iconColor: "#50C878",
      title: "Saved Destinations",
      onPress: () => {},
    },
    {
      iconName: "credit-card",
      iconColor: "#FF6B6B",
      title: "Payment Methods",
      onPress: () => {},
    },
    {
      iconName: "cogs",
      iconColor: "#9C27B0",
      title: "Settings",
      onPress: () => {},
    },
    {
      iconName: "question-circle",
      iconColor: "#FFA500",
      title: "Help & Support",
      onPress: () => {},
    },
  ];

  return (
    <View className="flex-1 bg-white">
      <View className="bg-blue-50 p-6 pt-12 items-center">
        <TouchableOpacity onPress={handleOnClose} className="self-start mb-4">
          {/* <Text className="text-blue-600">Close</Text> */}
          <Icon name="arrow-left" size={25} color="#4A90E2" />
        </TouchableOpacity>

        {userData.profilePic ? (
          <Image
            source={userData.profilePic}
            className="w-32 h-32 rounded-full mb-4"
          />
        ) : (
          <Icon name="user-circle" size={108} color="#888" />
        )}

        <Text className="text-xl font-bold text-gray-800">{userData.name}</Text>
        <Text className="text-gray-500">{userData.email}</Text>
        <TouchableOpacity className="mt-4 bg-blue-500 px-6 py-2 rounded-full">
          <Text className="text-white">Edit Profile</Text>
        </TouchableOpacity>
      </View>

      <ScrollView>
        {profileOptions.map((option, index) => (
          <ProfileOption
            key={index}
            iconName={option.iconName}
            iconColor={option.iconColor}
            title={option.title}
            onPress={option.onPress}
          />
        ))}

        <TouchableOpacity
          className="flex-row items-center py-3 px-4 bg-red-50"
          onPress={handleOnLogout}
        >
          <Icon name="sign-out" size={24} color="#DC3545" />
          <Text className="ml-4 text-base text-red-600">Logout</Text>
        </TouchableOpacity>
      </ScrollView>
    </View>
  );
};

export default Profile;
