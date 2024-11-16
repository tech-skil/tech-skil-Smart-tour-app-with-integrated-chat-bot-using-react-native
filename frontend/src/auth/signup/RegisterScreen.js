import React, { useState } from 'react';
import {
  SafeAreaView,
  ScrollView,
  View,
  Text,
  TouchableOpacity,
  Image,
} from 'react-native';

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
    // Validate fields
    validateFullName(fullName);
    validateEmail(email);
    validatePassword(password);
    validateConfirmPassword(confirmPassword);

    // If there are no validation errors, print success message
    if (!fullNameError && !emailError && !passwordError && !confirmPasswordError) {
      console.log('Registration successful');
    } else {
      console.log('Please fix validation errors');
    }
  };

  return (
    <SafeAreaView style={{ flex: 1, justifyContent: 'center' }}>
      <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={{ padding: 16 }}>
        <View style={{ alignItems: 'center' }}>
          <Image
            source={RegistrationSVG}
            style={{ height: 300, width: 300, transform: [{ rotate: '-5deg' }] }}
          />
        </View>

        <Text style={{ fontSize: 32, fontWeight: 'bold', color: '#333', marginVertical: 20 }}>Register</Text>
        {/* <Text style={{ textAlign: 'center', color: '#666', marginBottom: 20 }}>
          Or, register with email...
        </Text> */}

        {fullNameError ? (
          <Text style={{ color: 'red', marginBottom: 8 }}>{fullNameError}</Text>
        ) : null}
        <InputField 
          label="Full Name"
          icon={<Ionicons name="person-outline" size={20} color="#666" style={{ marginRight: 5 }} />}
          value={fullName}
          onChangeText={validateFullName}
        />

        {emailError ? (
          <Text style={{ color: 'red', marginBottom: 8 }}>{emailError}</Text>
        ) : null}
        <InputField
          label="Email ID"
          icon={<MaterialIcons name="alternate-email" size={20} color="#666" style={{ marginRight: 5 }} />}
          keyboardType="email-address"
          value={email}
          onChangeText={validateEmail}
        />

        {passwordError ? (
          <Text style={{ color: 'red', marginBottom: 8 }}>{passwordError}</Text>
        ) : null}
        <InputField
          label="Password"
          icon={<Ionicons name="ios-lock-closed-outline" size={20} color="#666" style={{ marginRight: 5 }} />}
          inputType="password"
          value={password}
          onChangeText={validatePassword}
          secureTextEntry
        />

        {confirmPasswordError ? (
          <Text style={{ color: 'red', marginBottom: 8 }}>{confirmPasswordError}</Text>
        ) : null}
        <InputField
          label="Confirm Password"
          icon={<Ionicons name="ios-lock-closed-outline" size={20} color="#666" style={{ marginRight: 5 }} />}
          inputType="password"
          value={confirmPassword}
          onChangeText={validateConfirmPassword}
          secureTextEntry
        />

        <CustomButton label="Register" onPress={handleRegister} />

        <View style={{ flexDirection: 'row', justifyContent: 'center', marginTop: 20 }}>
          <Text>Already registered?</Text>
          <TouchableOpacity onPress={() => navigation.goBack()}>
            <Text style={{ color: '#6A0DAD', fontWeight: '600' }}> Login</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default RegisterScreen;
