import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import LoginScreen from "./src/auth/login/LoginScreen";
import RegisterScreen from "./src/auth/signup/RegisterScreen";
import { AppNavigator } from "./src/Navigation/AppNavigator";
import Profile from "./src/components/Profile";
import { LiveCallScreen } from "./src/screens/LiveCallScreen";

const Stack = createStackNavigator();

function App() {
  return (
    <>
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
          <Stack.Screen
            name="LiveCall"
            component={LiveCallScreen}
            options={{ headerShown: false }}
          />
        </Stack.Navigator>
      </NavigationContainer>
    </>
  );
}

export default App;
