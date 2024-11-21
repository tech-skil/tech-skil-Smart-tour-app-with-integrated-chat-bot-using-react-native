import {Text, TouchableOpacity} from 'react-native';
import React from 'react';

export default function CustomButton({label, onPress}) {
  return (
    <TouchableOpacity
      onPress={onPress}
      className="bg-purple-700 p-5 rounded-lg mb-8"
    >
      <Text className="text-center font-bold text-lg text-white">
        {label}
      </Text>
    </TouchableOpacity>
  );
}