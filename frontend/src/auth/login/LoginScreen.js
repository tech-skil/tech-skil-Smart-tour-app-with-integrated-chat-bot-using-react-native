import React, { useState } from 'react';
import {
  SafeAreaView,
  View,
  Text,
  TouchableOpacity,
  Image,
} from 'react-native';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import Ionicons from 'react-native-vector-icons/Ionicons';

import LoginSVG from '../../../assets/images/image.png';
import CustomButton from '../../../components/CustomButton.js';
import InputField from '../../../components/InputField.js';

const LoginScreen = ({ navigation }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [emailError, setEmailError] = useState('');
  const [passwordError, setPasswordError] = useState('');

  const validateEmail = (text) => {
    const emailRegex = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
    if (!emailRegex.test(text)) {
      setEmailError('Please enter a valid email address.');
    } else {
      setEmailError('');
    }
    setEmail(text);
  };

  const validatePassword = (text) => {
    if (text.length < 8) {
      setPasswordError('Password must be at least 8 characters long.');
    } else {
      setPasswordError('');
    }
    setPassword(text);
  };

  const handleRegisterPress = () => {
    // Validate email and password
    validateEmail(email);
    validatePassword(password);

    // If there are no errors, navigate to the Register screen
    if (!emailError && !passwordError) {
      navigation.navigate('Register');
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
          value={email}
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
          value={password}
          onChangeText={validatePassword}
        />

        <CustomButton label={"Login"} onPress={handleRegisterPress}  />

        <View className="flex-row justify-center mb-8">
          <Text className="underline">New to the app?</Text>
          <TouchableOpacity  onPress={() => navigation.navigate('Register')}>
            <Text className="text-purple-600 font-semibold ">Register</Text>
          </TouchableOpacity>
        </View>
      </View>
    </SafeAreaView>
  );
};

export default LoginScreen;