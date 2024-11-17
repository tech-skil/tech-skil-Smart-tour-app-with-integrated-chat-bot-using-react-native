import React, { useState } from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { createStackNavigator } from "@react-navigation/stack";
import { NavigationContainer } from "@react-navigation/native";
import HomeScreen from "../screens/HomeScreen"; 
import LoginScreen from "../auth/login/LoginScreen"; 
import RegisterScreen from "../auth/signup/RegisterScreen"; 

const Tab = createBottomTabNavigator();
const Stack = createStackNavigator();

// Tab Navigator component (HomeTabs)
function HomeTabs() {
  return (
    <Tab.Navigator
      screenOptions={{
        headerShown: false, 
      }}
    >
      <Tab.Screen name="Homescreen" component={HomeScreen} />
      {/* You can add more screens here as needed */}
    </Tab.Navigator>
  );
}

// Auth Stack Navigator
function AuthStack() {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="Login" component={LoginScreen} />
      <Stack.Screen name="Register" component={RegisterScreen} />
    </Stack.Navigator>
  );
}

// Root Navigator
function RootStack() {
  const [isAuthenticated, setIsAuthenticated] = useState(false); // Mock authentication state

  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      {isAuthenticated ? (
        <Stack.Screen name="HomeTabs" component={HomeTabs} />  
      ) : (
        <Stack.Screen name="Auth" component={AuthStack} />
      )}
    </Stack.Navigator>
  );
}

// Main App Navigation
function AppNavigation() {
  return (
    <NavigationContainer>
      <RootStack />
    </NavigationContainer>
  );
}

export default AppNavigation;
