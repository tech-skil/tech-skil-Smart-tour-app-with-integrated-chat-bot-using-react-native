import React, { useState, useEffect } from "react";
import {
  SafeAreaView,
  View,
  Text,
  TouchableOpacity,
  TextInput,
  Image,
  Alert,
  ActivityIndicator,
  Platform,
} from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import MaterialIcons from "react-native-vector-icons/MaterialIcons";
import Ionicons from "react-native-vector-icons/Ionicons";

import LoginSVG from "../../../assets/images/image.png";

const LoginScreen = ({ navigation }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [emailError, setEmailError] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    checkAuthentication();
  }, []);

  const checkAuthentication = async () => {
    try {
      const token = await AsyncStorage.getItem("userToken");
      if (token) {
        navigation.replace("MainApp");
      }
    } catch (error) {
      console.error("Authentication check error:", error);
    }
  };

  const validateEmail = (text) => {
    const emailRegex = /^\w+([\.-]?\w+)@\w+([\.-]?\w+)(\.\w{2,3})+$/;
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
    const trimmedEmail = email.trim();
    const trimmedPassword = password.trim();

    if (!trimmedEmail || !trimmedPassword) {
      Alert.alert("Error", "Email and password fields cannot be empty.");
      return;
    }

    const isEmailValid = validateEmail(trimmedEmail);
    const isPasswordValid = validatePassword(trimmedPassword);

    if (!isEmailValid || !isPasswordValid) {
      return;
    }

    setIsLoading(true);

    try {
      const apiUrl = "http://192.168.56.1:5000/auth/login";
      const response = await fetch(apiUrl, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email: trimmedEmail,
          password: trimmedPassword,
        }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || "Authentication failed!");
      }

      const data = await response.json();
      const token = data.token;

      if (!token) {
        throw new Error("No token received from server!");
      }

      await AsyncStorage.setItem("userToken", token);
      navigation.replace("MainApp");
    } catch (error) {
      let errorMessage = "Something went wrong. Please try again.";
      if (error.message.includes("Network request failed")) {
        errorMessage =
          Platform.OS === "ios"
            ? "Unable to connect to the server. Please check your internet connection."
            : "Unable to connect to the server. Please check your WiFi or mobile data settings.";
      } else if (error.message.includes("Invalid email or password")) {
        errorMessage = "Incorrect email or password. Please try again.";
      }

      Alert.alert("Login Failed", errorMessage);
    } finally {
      setIsLoading(false);
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
        <View className="flex-row border-b border-gray-300 pb-2 mb-6">
          <MaterialIcons
            name="alternate-email"
            size={20}
            color="#666"
            style={{ marginRight: 5 }}
          />
          <TextInput
            placeholder="Email ID"
            keyboardType="email-address"
            value={email}
            onChangeText={(text) => {
              setEmail(text);
              validateEmail(text);
            }}
            className="flex-1 py-0"
          />
        </View>

        {passwordError ? (
          <Text className="text-red-500 mb-2">{passwordError}</Text>
        ) : null}
        <View className="flex-row border-b border-gray-300 pb-2 mb-6">
          <Ionicons
            name="ios-lock-closed-outline"
            size={20}
            color="#666"
            style={{ marginRight: 5 }}
          />
          <TextInput
            placeholder="Password"
            secureTextEntry={!showPassword}
            value={password}
            onChangeText={(text) => {
              setPassword(text);
              validatePassword(text);
            }}
            className="flex-1 py-0"
          />
          <TouchableOpacity onPress={() => setShowPassword(!showPassword)}>
            <Text className="text-blue-700 font-bold">
              {showPassword ? "Hide" : "Show"}
            </Text>
          </TouchableOpacity>
        </View>

        <TouchableOpacity
          onPress={handleLoginPress}
          className={`bg-blue-700 p-5 rounded-lg mb-8 ${
            isLoading ? "opacity-50" : ""
          }`}
          disabled={isLoading}
        >
          <Text className="text-center font-bold text-lg text-white">
            {isLoading ? "Logging in..." : "Login"}
          </Text>
        </TouchableOpacity>

        <View className="flex-row justify-center mt-4 items-center space-x-1">
          <Text className="text-gray-600">New to the app?</Text>
          <TouchableOpacity onPress={() => navigation.navigate("Register")}>
            <Text className="text-blue-600 font-semibold">Register</Text>
          </TouchableOpacity>
        </View>
      </View>
    </SafeAreaView>
  );
};

export default LoginScreen;