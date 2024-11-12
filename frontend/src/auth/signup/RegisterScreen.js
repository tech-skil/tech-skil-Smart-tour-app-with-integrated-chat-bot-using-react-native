import React, { useState } from 'react';
import {
  SafeAreaView,
  ScrollView,
  View,
  Text,
  TouchableOpacity,
  Image,
} from 'react-native';

import DatePicker from 'react-native-date-picker';
import InputField from '../../../components/InputField';

import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import Ionicons from 'react-native-vector-icons/Ionicons';

import RegistrationSVG from '../../../assets/images/image.png';
import CustomButton from '../../../components/CustomButton';

const RegisterScreen = ({ navigation }) => {
  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [date, setDate] = useState(new Date());
  const [open, setOpen] = useState(false);
  const [dobLabel, setDobLabel] = useState('Date of Birth');
  const [fullNameError, setFullNameError] = useState('');
  const [emailError, setEmailError] = useState('');
  const [passwordError, setPasswordError] = useState('');
  const [confirmPasswordError, setConfirmPasswordError] = useState('');

  const validateFullName = (text) => {
    if (text.length < 3) {
      setFullNameError('Full name must be at least 3 characters long.');
    } else {
      setFullNameError('');
    }
    setFullName(text);
  };

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

  const validateConfirmPassword = (text) => {
    if (text !== password) {
      setConfirmPasswordError('Passwords do not match.');
    } else {
      setConfirmPasswordError('');
    }
    setConfirmPassword(text);
  };

  const handleRegister = () => {
    validateFullName(fullName);
    validateEmail(email);
    validatePassword(password);
    validateConfirmPassword(confirmPassword);

    // If all validations pass, you can proceed with registration
    if (
      !fullNameError &&
      !emailError &&
      !passwordError &&
      !confirmPasswordError
    ) {
      // Perform registration logic here
      console.log('Registration successful');
    }
  };

  return (
    <SafeAreaView className="flex-1 justify-center">
      <ScrollView
        showsVerticalScrollIndicator={false}
        className="px-6"
      >
        <View className="items-center">
          <Image
            source={RegistrationSVG}
            style={{ height: 300, width: 300, transform: [{ rotate: '-5deg' }] }}
          />
        </View>

        <Text className="text-4xl font-medium text-gray-800 mb-8">Register</Text>
        <Text className="text-center text-gray-500 mb-8">Or, register with email ...</Text>

        {fullNameError ? (
          <Text className="text-red-500 mb-2">{fullNameError}</Text>
        ) : null}
        <InputField
          label={'Full Name'}
          icon={
            <Ionicons
              name="person-outline"
              size={20}
              color="#666"
              style={{ marginRight: 5 }}
            />
          }
          value={fullName}
          onChangeText={validateFullName}
        />

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
          inputType="password"
          value={password}
          onChangeText={validatePassword}
        />

        {confirmPasswordError ? (
          <Text className="text-red-500 mb-2">{confirmPasswordError}</Text>
        ) : null}
        <InputField
          label={'Confirm Password'}
          icon={
            <Ionicons
              name="ios-lock-closed-outline"
              size={20}
              color="#666"
              style={{ marginRight: 5 }}
            />
          }
          inputType="password"
          value={confirmPassword}
          onChangeText={validateConfirmPassword}
        />

        <CustomButton label={'Register'} onPress={handleRegister} />

        <View className="flex-row justify-center mb-8">
          <Text>Already registered?</Text>
          <TouchableOpacity onPress={() => navigation.goBack()}>
            <Text className="text-purple-700 font-semibold"> Login</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default RegisterScreen;