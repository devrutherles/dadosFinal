import React, { useContext, useState } from "react";
import { NavigationContainer } from "@react-navigation/native";
import "react-native-gesture-handler";
import { createStackNavigator } from "@react-navigation/stack";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { LoginApi } from "../src/screens/hooks/LoginApi";
import { HStack, Spinner, Text } from "native-base";
import { AuthContext } from "./screens/hooks/auth";
import Saques from "../src/screens/Wallet/components/Saque";
import WalletScreen from "../src/screens/Wallet";
import Config from "../src/screens/config";
import Profile from "../src/screens/profile";
import { NativeBaseProvider } from "native-base";
import {
  AntDesign,
  Ionicons,
  Foundation,
  MaterialIcons,
} from "@expo/vector-icons";
import PayButton from "./components/PayButton";

import Results from "../src/screens/Results/Results";
import Detalhes from "../src/screens/Detalhes/Detalhes";
import Login from "../src/screens/Login/Login";
import Register from "../src/screens/Login/Register";
import Pix from "../src/screens/Pix/Pix";
import Deposito from "../src/screens/Pix/Deposito";
import Jogo from "../src/screens/Jogo";

import SaquesConta from "./screens/saques/Saques";

import { Recuperar, Codigo, Senha } from "./screens/Login/Recuperarsenha";
import Chat from "./screens/chat/Chat";
import Faq from "./screens/faq/Faq";
import Withdrow from "./screens/Wallet/components/Saque";
import { LogBox } from "react-native";

LogBox.ignoreLogs(["Warning: ..."]);

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
  );
}
export default function App() {
  const { token, loading } = LoginApi();

  const { user, handleUser } = useContext(AuthContext);
  const [load4, setLoad] = useState(true);

  if (token && load4) {
    handleUser(token.id);
    setLoad(false);
  }

  return (
    <NativeBaseProvider>
      {loading ? (
        <NavigationContainer>
          <Stack.Navigator initialRouteName={token ? "Pay" : "Login"}>
            <Stack.Screen
              name="tab"
              component={Tabs}
              options={{
                headerShown: false,
                title: "Perfil",
              }}
            />

            <Stack.Screen
              name="Chat"
              component={Chat}
              options={{
                headerShown: false,
                title: "Perfil",
              }}
            />
            <Stack.Screen
              name="Faq"
              component={Faq}
              options={{
                headerShown: false,
                title: "Perfil",
              }}
            />

            <Stack.Screen
              name="Recuperar"
              component={Recuperar}
              options={{
                headerShown: false,
                title: "Perfil",
              }}
            />
            <Stack.Screen
              name="Codigo"
              component={Codigo}
              options={{
                headerShown: false,
                title: "Perfil",
              }}
            />
            <Stack.Screen
              name="Senha"
              component={Senha}
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
              name="Saque"
              component={Saques}
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
              name="Saques"
              component={SaquesConta}
              options={{
                headerShown: false,
                title: "Saque",
                headerLeft: true,
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
      ) : (
        <NavigationContainer>
          <HStack space={8} justifyContent="center" alignItems="center">
            <Spinner size="lg" />
          </HStack>
        </NavigationContainer>
      )}
    </NativeBaseProvider>
  );
}
