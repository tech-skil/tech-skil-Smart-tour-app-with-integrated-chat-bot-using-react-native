import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import LoginScreen from "./src/auth/login/LoginScreen";
import RegisterScreen from "./src/auth/signup/RegisterScreen";
import { AppNavigator } from "./src/Navigation/AppNavigator";
import Profile from "./src/components/Profile";
import LiveCallScreen from "./src/screens/LiveCallScreen";
import Homepage from "./src/components/Homepage";
import PlaceDetailsScreen from "./src/components/PlaceDetailsScreen";

const Stack = createStackNavigator();

function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator
        initialRouteName="Login"
        screenOptions={{
          headerShown: false,
        }}
      >
        <Stack.Screen name="Login" component={LoginScreen} />
        <Stack.Screen name="Register" component={RegisterScreen} />
        <Stack.Screen name="MainApp" component={AppNavigator} />
        <Stack.Screen name="Profile" component={Profile} />
        <Stack.Screen name="LiveCall" component={LiveCallScreen} />
        <Stack.Screen name="Homepage" component={Homepage} />
        <Stack.Screen name="PlaceDetails" component={PlaceDetailsScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default App;
