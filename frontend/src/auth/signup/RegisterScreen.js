import React, { useState } from 'react';
import {
  SafeAreaView,
  ScrollView,
  View,
  Text,
  TouchableOpacity,
  Image,  // Import the Image component
} from 'react-native';

import DatePicker from 'react-native-date-picker';
import InputField from '../../../components/InputField';

import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import Ionicons from 'react-native-vector-icons/Ionicons';

// Correct import for image
import RegistrationSVG from '../../../assets/images/image.png';  // Your image

import CustomButton from '../../../components/CustomButton';

const RegisterScreen = ({ navigation }) => {
  const [date, setDate] = useState(new Date());
  const [open, setOpen] = useState(false);
  const [dobLabel, setDobLabel] = useState('Date of Birth');

  return (
    <SafeAreaView className="flex-1 justify-center">
      <ScrollView
        showsVerticalScrollIndicator={false}
        className="px-6"
      >
        <View className="items-center">
          {/* Use the Image component to display the image */}
          <Image
            source={RegistrationSVG}  // Using Image component to render the image
            style={{ height: 300, width: 300, transform: [{ rotate: '-5deg' }] }}
          />
        </View>

        <Text className="text-4xl font-medium text-gray-800 mb-8">Register</Text>

        <Text className="text-center text-gray-500 mb-8">Or, register with email ...</Text>

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
        />

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
        />

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
        />

        

        <CustomButton label={'Register'} onPress={() => {}} />

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
