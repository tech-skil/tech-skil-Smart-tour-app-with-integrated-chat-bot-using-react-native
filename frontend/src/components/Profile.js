import React, { useState } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  ScrollView,
  Image,
  StyleSheet,
} from "react-native";
import Icon from "react-native-vector-icons/FontAwesome";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useNavigation } from "@react-navigation/native";

const ProfileOption = ({ iconName, iconColor, title, onPress }) => (
  <TouchableOpacity style={styles.optionContainer} onPress={onPress}>
    <Icon name={iconName} size={24} color={iconColor} />
    <Text style={styles.optionText}>{title}</Text>
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
    <View style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={handleOnClose} style={styles.closeButton}>
          {/* <Text style={styles.closeButtonText}>Close</Text> */}
          <Icon name="arrow-left" size={25} color="#4A90E2" />
        </TouchableOpacity>

        {userData.profilePic ? (
          <Image
            source={{ uri: userData.profilePic }}
            style={styles.profilePic}
          />
        ) : (
          <Icon name="user-circle" size={96} color="#888" />
        )}

        <Text style={styles.userName}>{userData.name}</Text>
        <Text style={styles.userEmail}>{userData.email}</Text>
        <TouchableOpacity style={styles.editButton}>
          <Text style={styles.editButtonText}>Edit Profile</Text>
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

        <TouchableOpacity style={styles.logoutButton} onPress={handleOnLogout}>
          <Icon name="sign-out" size={24} color="#DC3545" />
          <Text style={styles.logoutText}>Logout</Text>
        </TouchableOpacity>
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
  header: {
    backgroundColor: "#EAF4FC",
    padding: 24,
    paddingTop: 48,
    alignItems: "center",
  },
  closeButton: {
    alignSelf: "flex-start",
    marginBottom: 16,
  },
  closeButtonText: {
    color: "#4A90E2",
    fontSize: 16,
  },
  profilePic: {
    width: 96,
    height: 96,
    borderRadius: 48,
    marginBottom: 16,
  },
  userName: {
    fontSize: 20,
    fontWeight: "bold",
    color: "#333",
  },
  userEmail: {
    color: "#888",
  },
  editButton: {
    marginTop: 16,
    backgroundColor: "#4A90E2",
    paddingVertical: 8,
    paddingHorizontal: 24,
    borderRadius: 24,
  },
  editButtonText: {
    color: "#fff",
    fontSize: 16,
  },
  optionContainer: {
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: 16,
    paddingHorizontal: 16,
    borderBottomWidth: 1,
    borderBottomColor: "#ddd",
  },
  optionText: {
    marginLeft: 16,
    fontSize: 16,
    color: "#333",
  },
  logoutButton: {
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: 16,
    paddingHorizontal: 16,
    backgroundColor: "#FDECEA",
  },
  logoutText: {
    marginLeft: 16,
    fontSize: 16,
    color: "#DC3545",
  },
});

export default Profile;
