import { StatusBar } from 'expo-status-bar';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import LoginScreen from './src/auth/login/LoginScreen';
import RegisterScreen from './src/auth/signup/RegisterScreen';
// import { View } from 'react-native';

const Stack = createStackNavigator();

export default function App() {
  return (
    <>
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Login">
        <Stack.Screen 
          name="Login" 
          component={LoginScreen} 
          options={{ headerShown: false }}
        />
        <Stack.Screen 
          name="Register" 
          component={RegisterScreen} 
          options={{ headerShown: false }}
        />
        <Stack.Screen name="Home" component={Navigation} />
      </Stack.Navigator>
      <StatusBar style="dark" />
    </NavigationContainer>
    </>
  );
}