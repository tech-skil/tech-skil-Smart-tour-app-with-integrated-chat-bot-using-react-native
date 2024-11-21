import React from 'react';
import { View, Text, TouchableOpacity, TextInput } from 'react-native';

export default function InputField({
  label = '',
  icon = null,
  inputType = 'text',
  keyboardType = 'default',
  fieldButtonLabel = '',
  fieldButtonFunction = () => {},
}) {
  return (
    <View className="flex-row border-b border-gray-300 pb-2 mb-6">
      {/* Render Icon */}
      {icon && <View>{icon}</View>}

      {/* Render Input Field */}
      <TextInput
        placeholder={label}
        keyboardType={keyboardType}
        secureTextEntry={inputType === 'password'}
        className="flex-1 py-0"
      />

      {/* Render Button */}
      {fieldButtonLabel && (
        <TouchableOpacity onPress={fieldButtonFunction}>
          <Text className="text-purple-700 font-bold">
            {fieldButtonLabel}
          </Text>
        </TouchableOpacity>
      )}
    </View>
  );
}
