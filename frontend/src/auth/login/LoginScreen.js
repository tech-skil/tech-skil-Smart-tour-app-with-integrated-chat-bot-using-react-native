import React from 'react';
import {
  SafeAreaView,
  View,
  Text,
  TouchableOpacity,
  Image,
} from 'react-native';
import tw from 'twrnc';

import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import Ionicons from 'react-native-vector-icons/Ionicons';

import LoginSVG from '../../../assets/images/image.png';
import CustomButton from '../../../components/CustomButton.js';
import InputField from '../../../components/InputField.js';

const LoginScreen = ({ navigation }) => {
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
        />

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
          fieldButtonLabel={"Forgot?"}
          fieldButtonFunction={() => {}}
        />

        <CustomButton label={"Login"} onPress={() => {}} />

        <View className="flex-row justify-center mb-8">
          <Text className="underline">New to the app?</Text>
          <TouchableOpacity onPress={() => navigation.navigate('Register')}>
            <Text className="text-purple-600 font-semibold "> Register</Text>
          </TouchableOpacity>
        </View>
      </View>
    </SafeAreaView>
  );
};

export default LoginScreen;
