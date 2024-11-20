import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { useNavigation } from '@react-navigation/native';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import { View, TouchableOpacity, Text } from 'react-native';

// Import screen components
import LoginScreen from './auth/login/LoginScreen';
import RegisterScreen from './auth/signup/RegisterScreen';
import HomeScreen from './page/Home';
import WishlistScreen from './page/WishlistScreen';
import MessengerScreen from './page/MessengerScreen';
import CategoryScreen from './page/Category';
import AccountScreen from './page/Account';

const Stack = createStackNavigator();
const Tab = createBottomTabNavigator();

// Tab Bar Button Component
const CustomTabBarButton = ({ onPress, icon, label, isFocused }) => (
  <TouchableOpacity
    className="items-center flex-1 py-2"
    onPress={onPress}
  >
    <FontAwesome 
      name={icon} 
      size={24} 
      color={isFocused ? "#6366f1" : "gray"} 
    />
    <Text className={`text-xs ${isFocused ? "text-indigo-500" : "text-gray-500"}`}>
      {label}
    </Text>
  </TouchableOpacity>
);

// Bottom Tab Navigator
const TabNavigator = () => {
  return (
    <Tab.Navigator
      screenOptions={{
        headerShown: false,
        tabBarShowLabel: false,
        tabBarStyle: {
          backgroundColor: 'white',
          borderTopWidth: 1,
          borderTopColor: '#e5e7eb',
          height: 60,
          paddingBottom: 5,
        },
      }}
    >
      <Tab.Screen
        name="HomeTab"
        component={HomeScreen}
        options={{
          tabBarButton: (props) => (
            <CustomTabBarButton
              {...props}
              icon="home"
              label="Home"
            />
          ),
        }}
      />
      <Tab.Screen
        name="WishlistTab"
        component={WishlistScreen}
        options={{
          tabBarButton: (props) => (
            <CustomTabBarButton
              {...props}
              icon="heart"
              label="Wishlist"
            />
          ),
        }}
      />
      <Tab.Screen
        name="MessengerTab"
        component={MessengerScreen}
        options={{
          tabBarButton: (props) => (
            <CustomTabBarButton
              {...props}
              icon="comments"
              label="Messenger"
            />
          ),
        }}
      />
      <Tab.Screen
        name="CategoryTab"
        component={CategoryScreen}
        options={{
          tabBarButton: (props) => (
            <CustomTabBarButton
              {...props}
              icon="list"
              label="Category"
            />
          ),
        }}
      />
      <Tab.Screen
        name="AccountTab"
        component={AccountScreen}
        options={{
          tabBarButton: (props) => (
            <CustomTabBarButton
              {...props}
              icon="user"
              label="Account"
            />
          ),
        }}
      />
    </Tab.Navigator>
  );
};

// Root Stack Navigator
const RootStackNavigator = () => {
  return (
    <Stack.Navigator 
      initialRouteName="Login"
      screenOptions={{
        headerShown: false,
      }}
    >
      <Stack.Screen name="Login" component={LoginScreen} />
      <Stack.Screen name="Register" component={RegisterScreen} />
      <Stack.Screen name="MainApp" component={TabNavigator} />
    </Stack.Navigator>
  );
};

export default RootStackNavigator;