// src/Navigation/AppNavigator.js
import React from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { Feather } from "@expo/vector-icons";
import Homepage from "../components/Homepage";
import { DiscoverScreen } from "../components/Discover";
import { Budgetplanner } from "../components/Budgetplanner";
import { Tourguid } from "../components/Tourguid";

const Tab = createBottomTabNavigator();

export const AppNavigator = () => {
  return (
    <Tab.Navigator
      screenOptions={{
        headerShown: false,
        tabBarStyle: {
          backgroundColor: "white",
          borderTopWidth: 0,
          elevation: 10,
          shadowColor: "#000",
          shadowOffset: { width: 0, height: -2 },
          shadowOpacity: 0.1,
          shadowRadius: 4,
        },
        tabBarActiveTintColor: "#3b82f6",
        tabBarInactiveTintColor: "#9ca3af",
      }}
    >
      <Tab.Screen
        name="Home"
        component={Homepage}
        options={{
          tabBarIcon: ({ color, size }) => (
            <Feather name="home" size={size} color={color} />
          ),
        }}
      />
      <Tab.Screen
        name="Discover"
        component={DiscoverScreen}
        options={{
          tabBarIcon: ({ color, size }) => (
            <Feather name="star" size={size} color={color} />
          ),
        }}
      />
      <Tab.Screen
        name="Budget Planner"
        component={Budgetplanner}
        options={{
          tabBarIcon: ({ color, size }) => (
            <Feather name="dollar-sign" size={size} color={color} />
          ),
        }}
      />
      <Tab.Screen
        name="Travel Guid"
        component={Tourguid}
        options={{
          tabBarIcon: ({ color, size }) => (
            <Feather name="message-circle" size={size} color={color} />
          ),
        }}
      />
    </Tab.Navigator>
  );
};
