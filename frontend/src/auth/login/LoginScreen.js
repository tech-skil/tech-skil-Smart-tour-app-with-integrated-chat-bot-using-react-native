import React, { useState } from 'react';
import {
  SafeAreaView,
  View,
  Text,
  TouchableOpacity,
  Image,
  Alert,
} from 'react-native';
import { CommonActions } from '@react-navigation/native';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import Ionicons from 'react-native-vector-icons/Ionicons';

import LoginSVG from '../../../assets/images/image.png';
import CustomButton from '../../../components/CustomButton.js';
import InputField from '../../../components/InputField.js';

const LoginScreen = ({ navigation }) => {
  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });
  const [showPassword, setShowPassword] = useState(false);
  const [emailError, setEmailError] = useState('');
  const [passwordError, setPasswordError] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const validateEmail = (text) => {
    const emailRegex = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
    if (!emailRegex.test(text)) {
      setEmailError('Please enter a valid email address.');
    } else {
      setEmailError('');
    }
    setFormData(prev => ({ ...prev, email: text }));
  };

  const validatePassword = (text) => {
    if (text.length < 8) {
      setPasswordError('Password must be at least 8 characters long.');
    } else {
      setPasswordError('');
    }
    setFormData(prev => ({ ...prev, password: text }));
  };

  const handleLoginPress = async () => {
    try {
      // Validate before submission
      validateEmail(formData.email);
      validatePassword(formData.password);

      // Check if there are any validation errors
      if (emailError || passwordError) {
        return;
      }

      setIsLoading(true);

      // Replace with your actual API URL
      const API_URL = 'YOUR_API_URL/auth/login';
      
      const response = await fetch(API_URL, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData)
      });

      const result = await response.json();

      if (!response.ok) {
        throw new Error(result.message || 'Login failed');
      }

      // Reset navigation state and navigate to MainApp
      navigation.dispatch(
        CommonActions.reset({
          index: 0,
          routes: [{ name: 'MainApp' }],
        })
      );
    } catch (error) {
      Alert.alert(
        'Login Error',
        error.message || 'An error occurred during login. Please try again.'
      );
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <SafeAreaView className="flex-1 justify-center">
      <View className="px-6">
        <View className="items-center">
          <Image
            source={LoginSVG}
            style={{ height: 300, width: 300, transform: [{ rotate: '-5deg' }] }}
          />
        </View>

        <Text className="font-roboto-medium text-2xl font-medium text-gray-800 mb-8">
          Login
        </Text>

        {emailError ? (
          <Text className="text-red-500 mb-2">{emailError}</Text>
        ) : null}
        <InputField
          label={'Email ID'}
          icon={
            <MaterialIcons
              name="alternate-email"
              size={20}
              color="#666"
              style={{ marginRight: 5 }}
            />
          }
          keyboardType="email-address"
          value={formData.email}
          onChangeText={validateEmail}
        />

        {passwordError ? (
          <Text className="text-red-500 mb-2">{passwordError}</Text>
        ) : null}
        <InputField
          label={'Password'}
          icon={
            <Ionicons
              name="ios-lock-closed-outline"
              size={20}
              color="#666"
              style={{ marginRight: 5 }}
            />
          }
          inputType={showPassword ? 'text' : 'password'}
          fieldButtonLabel={showPassword ? 'Hide' : 'Show'}
          fieldButtonFunction={() => setShowPassword(!showPassword)}
          value={formData.password}
          onChangeText={validatePassword}
        />

        <CustomButton 
          label={isLoading ? "Loading..." : "Login"} 
          onPress={handleLoginPress}
          disabled={isLoading}
        />

        <View className="flex-row justify-center mb-8">
          <Text className="underline">New to the app?</Text>
          <TouchableOpacity onPress={() => navigation.navigate('Register')}>
            <Text className="text-purple-600 font-semibold"> Register</Text>
          </TouchableOpacity>
        </View>
      </View>
    </SafeAreaView>
  );
};

export default LoginScreen;