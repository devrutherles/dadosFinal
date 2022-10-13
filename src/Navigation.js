import React from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { AntDesign, Ionicons } from "@expo/vector-icons";
import { createStackNavigator } from "@react-navigation/stack";
import PayButton from "./components/PayButton";
import { NativeBaseProvider, Text, Box, Stack } from "native-base";
import HomeScreen from "./screens/Home";
import Jogo from "./screens/Jogo";
//import WalletScreen from "./screens/Wallet";
import PayScreen from "./screens/Pay";
import Config from "./screens/config";
import Profile from "./screens/profile";

const Stacks = createStackNavigator();
const Tab = createBottomTabNavigator();

const icons = {
  Home: {
    lib: AntDesign,
    name: "home",
  },
  Wallet: {
    lib: AntDesign,
    name: "creditcard",
  },
  Notifications: {
    lib: Ionicons,
    name: "ios-notifications-outline",
  },
  Settings: {
    lib: AntDesign,
    name: "setting",
  },
};

export default function Navigation() {
  return (
    <NativeBaseProvider>
      <Tab.Navigator
        initialRouteName="Home"
        screenOptions={({ route, navigation }) => ({
          tabBarIcon: ({ color, size, focused }) => {
            if (route.name === "Pay") {
              return (
                <PayButton
                  onPress={() => navigation.navigate("Pay")}
                  focused={focused}
                />
              );
            }

            const { lib: Icon, name } = icons[route.name];
            return <Icon name={name} size={size} color={color} />;
          },
        })}
        tabBarOptions={{
          style: {
            backgroundColor: "#131418",
            borderTopColor: "rgba(255, 255, 255, 0.2)",
          },
          activeTintColor: "#000",
          inactiveTintColor: "#92929c",
        }}
      >
        <Tab.Screen
          name="Home"
          component={HomeScreen}
          options={{
            title: "",
            headerTransparent: "true",
          }}
        />
        <Tab.Screen
          name="Wallet"
          component={WalletScreen}
          options={{
            title: "",
            headerTransparent: "true",
          }}
        />
        <Tab.Screen
          name="Pay"
          component={Jogo}
          options={{
            title: "",
            headerTransparent: "true",
          }}
        />
        <Tab.Screen
          name="Notifications"
          component={Jogo}
          options={{
            title: "",
            headerTransparent: "true",
          }}
        />
        <Tab.Screen
          name="Settings"
          component={Config}
          options={{
            title: "",
            headerTransparent: "true",
          }}
        />
      </Tab.Navigator>
    </NativeBaseProvider>
  );
}
