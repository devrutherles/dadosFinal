import React, { useContext, useState } from "react";
import "react-native-gesture-handler";
import { createStackNavigator } from "@react-navigation/stack";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import WalletScreen from "../src/screens/Wallet";
import Config from "../src/screens/config";

import {
  AntDesign,
  Ionicons,
  Foundation,
  MaterialIcons,
} from "@expo/vector-icons";
import PayButton from "../src/components/PayButton";
import Results from "../src/screens/Results/Results";
import Jogo from "../src/screens/Jogo";
import Withdrow from "../src/screens/Wallet/components/Saque";

const icons = {
  Home: {
    lib: MaterialIcons,
    name: "attach-money",
  },
  Wallet: {
    lib: Ionicons,
    name: "ios-wallet-outline",
  },
  Bilhetes: {
    lib: Foundation,
    name: "ticket",
  },
  Settings: {
    lib: AntDesign,
    name: "setting",
  },
};

const Stack = createStackNavigator();
const Tab = createBottomTabNavigator();

export const Tabs = () => {

    <Tab.Navigator
      initialRouteName="Pay"
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
      screeOptions={{
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
        component={Withdrow}
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
        name="Bilhetes"
        component={Results}
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

}
