import React, { useContext, useState } from "react";
import "react-native-gesture-handler";
import { createStackNavigator } from "@react-navigation/stack";
import Saques from "../src/screens/Wallet/components/Saque";
import Profile from "../src/screens/profile";
import Login from "../src/screens/Login/Login";
import Register from "../src/screens/Login/Register";
import Pix from "../src/screens/Pix/Pix";
import Deposito from "../src/screens/Pix/Deposito";
import SaquesConta from "../src/screens/saques/Saques";
import { Recuperar, Codigo, Senha } from "../src/screens/Login/Recuperarsenha";
import Chat from "../src/screens/chat/Chat";
import Faq from "../src/screens/faq/Faq";
import { Tabs } from "./tabs";




export const  Autenticate = () => {

const Stack = createStackNavigator();

return (
  <Stack.Navigator initialRouteName="Pay">
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
        title: "Ajuda",
        headerStyle: {
          backgroundColor: "#fff",
        },

        headerShown: true,
        headerTintColor: "#121212",
        headerBackTitleVisible: false,
        headerTitleStyle: {
          fontWeight: "bold",
          fontSize: 20,
        },
      }}
    />
    <Stack.Screen
      name="Faq"
      component={Faq}
      options={{
        title: "Perguntas Frequentes",
        headerStyle: {
          backgroundColor: "#000",
        },

        headerShown: true,
        headerTintColor: "#fff",
        headerBackTitleVisible: false,
        headerTitleStyle: {
          fontWeight: "bold",
          fontSize: 20,
        },
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
        title: "Informações pessoais",
        headerStyle: {
          backgroundColor: "#000",
        },

        headerShown: true,
        headerTintColor: "#fff",
        headerBackTitleVisible: false,
        headerTitleStyle: {
          fontWeight: "bold",
          fontSize: 20,
        },
      }}
    />
    <Stack.Screen
      name="Saque"
      component={Saques}
      options={{
        title: "Meus saques",
        headerStyle: {
          backgroundColor: "#000",
        },
        headerShown: true,
        headerTintColor: "#fff",
        headerTitleStyle: {
          fontWeight: "bold",
        },
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
        title: "Meus saques",
        headerStyle: {
          backgroundColor: "#000",
        },

        headerShown: true,
        headerTintColor: "#fff",
        headerBackTitleVisible: false,
        headerTitleStyle: {
          fontWeight: "bold",
          fontSize: 20,
        },
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
);

          
   
}
