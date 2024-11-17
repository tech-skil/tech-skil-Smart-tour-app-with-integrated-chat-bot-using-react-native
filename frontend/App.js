import { StatusBar } from "expo-status-bar";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
// import LoginScreen from "./src/auth/login/LoginScreen";
// import RegisterScreen from "./src/auth/signup/RegisterScreen";
// import { View } from "react-native";
import AppNavigation from "./src/Navigation/AppNavigation";
const Stack = createStackNavigator();

export default function App() {
  return (
    <AppNavigation/>
  );
}
