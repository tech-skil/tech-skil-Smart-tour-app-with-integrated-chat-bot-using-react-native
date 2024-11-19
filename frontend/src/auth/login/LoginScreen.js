import React, { useState, useEffect } from "react";
import {
  SafeAreaView,
  View,
  Text,
  TouchableOpacity,
  Image,
  Alert,
  ActivityIndicator,
  Platform,
} from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import MaterialIcons from "react-native-vector-icons/MaterialIcons";
import Ionicons from "react-native-vector-icons/Ionicons";

import LoginSVG from "../../../assets/images/image.png";
import CustomButton from "../../../components/CustomButton.js";
import InputField from "../../../components/InputField.js";

const LoginScreen = ({ navigation }) => {
  const [email, setEmail] = useState("admin@triplo.com");
  const [password, setPassword] = useState("admin@1234");
  const [showPassword, setShowPassword] = useState(false);
  const [emailError, setEmailError] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  // Check if user is already authenticated on component mount
  useEffect(() => {
    checkAuthentication();
  }, []);

  const checkAuthentication = async () => {
    try {
      const token = await AsyncStorage.getItem("userToken");
      if (token) {
        // If token exists, directly navigate to MainApp
        navigation.replace("MainApp");
      }
    } catch (error) {
      console.error("Authentication check error:", error);
    }
  };

  const validateEmail = (text) => {
    const emailRegex = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
    if (!emailRegex.test(text.trim())) {
      setEmailError("Please enter a valid email address.");
      return false;
    } else {
      setEmailError("");
      return true;
    }
  };

  const validatePassword = (text) => {
    if (text.trim().length < 8) {
      setPasswordError("Password must be at least 8 characters long.");
      return false;
    } else {
      setPasswordError("");
      return true;
    }
  };

  const handleLoginPress = async () => {
    const isEmailValid = validateEmail(email);
    const isPasswordValid = validatePassword(password);

    if (!isEmailValid || !isPasswordValid) {
      return;
    }

    setIsLoading(true);
    const apiUrl = "http://192.168.56.1:5000/auth/login";

    try {
      const response = await fetch(apiUrl, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email: email.trim(),
          password: password.trim(),
        }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || "Authentication failed!");
      }

      const data = await response.json();
      const token = data.token;

      if (!token) {
        throw new Error("No token received!");
      }

      // Store token securely using AsyncStorage
      await AsyncStorage.setItem("userToken", token);
      // Optional: Store user information if needed
      await AsyncStorage.setItem("userEmail", email);

      console.log("Login successful");
      navigation.replace("MainApp");
    } catch (error) {
      console.error("Login Error:", error.message);
      let errorMessage = "Something went wrong. Please try again.";

      if (error.message.includes("Network request failed")) {
        errorMessage =
          Platform.OS === "ios"
            ? "Unable to connect to the server. Please check your internet connection."
            : "Unable to connect to the server. Please check your WiFi or mobile data settings.";
      }

      Alert.alert("Login Failed", errorMessage);
    } finally {
      setIsLoading(false);
    }
  };

  // Logout function to be used in other screens
  const handleLogout = async () => {
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

  if (isLoading) {
    return (
      <View className="flex-1 justify-center items-center">
        <ActivityIndicator size="large" color="#6366f1" />
      </View>
    );
  }

  return (
    <SafeAreaView className="flex-1 bg-white">
      <View className="flex-1 px-6 justify-center">
        <View className="items-center">
          <Image
            source={LoginSVG}
            style={{
              height: 300,
              width: 300,
              transform: [{ rotate: "-5deg" }],
            }}
          />
        </View>

        <Text className="font-roboto-medium text-2xl font-medium text-gray-800 mb-8">
          Login
        </Text>

        {emailError ? (
          <Text className="text-red-500 mb-2">{emailError}</Text>
        ) : null}
        <InputField
          label={"Email ID"}
          icon={
            <MaterialIcons
              name="alternate-email"
              size={20}
              color="#666"
              style={{ marginRight: 5 }}
            />
          }
          keyboardType="email-address"
          value={email}
          onChangeText={(text) => {
            setEmail(text);
            validateEmail(text);
          }}
        />

        {passwordError ? (
          <Text className="text-red-500 mb-2">{passwordError}</Text>
        ) : null}
        <InputField
          label={"Password"}
          icon={
            <Ionicons
              name="ios-lock-closed-outline"
              size={20}
              color="#666"
              style={{ marginRight: 5 }}
            />
          }
          inputType={showPassword ? "text" : "password"}
          fieldButtonLabel={showPassword ? "Hide" : "Show"}
          fieldButtonFunction={() => setShowPassword(!showPassword)}
          value={password}
          onChangeText={(text) => {
            setPassword(text);
            validatePassword(text);
          }}
        />

        <CustomButton
          label={isLoading ? "Logging in..." : "Login"}
          onPress={handleLoginPress}
          disabled={isLoading}
        />

        <View className="flex-row justify-center mt-4 items-center space-x-1">
          <Text className="text-gray-600">New to the app?</Text>
          <TouchableOpacity onPress={() => navigation.navigate("Register")}>
            <Text className="text-purple-600 font-semibold">Register</Text>
          </TouchableOpacity>
        </View>
      </View>
    </SafeAreaView>
  );
};

export default LoginScreen;
