import React from 'react';
import {View, Text, TouchableOpacity, TextInput} from 'react-native';

export default function InputField({
  label,
  icon,
  inputType,
  keyboardType,
  fieldButtonLabel,
  fieldButtonFunction,
}) {
  return (
    <View className="flex-row border-b border-gray-300 pb-2 mb-6">
      {icon}
      {inputType === 'password' ? (
        <TextInput
          placeholder={label}
          keyboardType={keyboardType}
          secureTextEntry={true}
          className="flex-1 py-0"
        />
      ) : (
        <TextInput
          placeholder={label}
          keyboardType={keyboardType}
          className="flex-1 py-0"
        />
      )}
      <TouchableOpacity onPress={fieldButtonFunction}>
        <Text className="text-purple-700 font-bold">{fieldButtonLabel}</Text>
      </TouchableOpacity>
    </View>
  );
}
