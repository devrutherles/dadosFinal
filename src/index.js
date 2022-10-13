import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import "react-native-gesture-handler";
import { createStackNavigator } from "@react-navigation/stack";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { LoginApi } from "../src/screens/hooks/LoginApi";
import { HStack, Spinner } from "native-base";

import WalletScreen from "../src/screens/Wallet";

import Config from "../src/screens/config";
import Profile from "../src/screens/profile";
import { NativeBaseProvider } from "native-base";
import { AntDesign, Ionicons, Foundation, Feather } from "@expo/vector-icons";
import PayButton from "./components/PayButton";
import Pay from "../src/screens/Pay";

import Results from "../src/screens/Results/Results";
import Detalhes from "../src/screens/Detalhes/Detalhes";
import Login from "../src/screens/Login/Login";
import Register from "../src/screens/Login/Register";
import Pix from "../src/screens/Pix/Pix";
import Deposito from "../src/screens/Pix/Deposito";
import Jogo from "../src/screens/Jogo";

const icons = {
  Home: {
    lib: Feather,
    name: "user",
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
export function Tabs() {
  return (
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
        component={Profile}
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
  );
}
export default function App() {
  const { token, loading } = LoginApi();
  console.log(token);
  console.log(loading);

  return (
    <NativeBaseProvider>
      <NavigationContainer>
        <Stack.Navigator initialRouteName={!token ? "Pay" : "Login"}>
          <Stack.Screen
            name="tab"
            component={Tabs}
            options={{
              headerShown: false,
              title: "Perfil",
            }}
          />
          <Stack.Screen
            name="Profile"
            component={Profile}
            options={{
              headerShown: false,
              title: "Perfil",
            }}
          />
          <Stack.Screen
            name="Detalhes"
            component={Detalhes}
            options={{
              headerShown: false,
              title: "detalhes",
            }}
          />
          <Stack.Screen
            name="Login"
            component={Login}
            options={{
              headerShown: false,
              title: "Perfil",
            }}
          />
          <Stack.Screen
            name="Register"
            component={Register}
            options={{
              headerShown: false,
              title: "detalhes",
            }}
          />
          <Stack.Screen
            name="Pix"
            component={Pix}
            options={{
              headerShown: false,
              title: "detalhes",
            }}
          />
          <Stack.Screen
            name="Deposito"
            component={Deposito}
            options={{
              headerShown: false,
              title: "detalhes",
            }}
          />
        </Stack.Navigator>
      </NavigationContainer>
    </NativeBaseProvider>
  );
}
