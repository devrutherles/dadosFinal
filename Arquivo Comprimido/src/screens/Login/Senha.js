import {
  Input,
  KeyboardAvoidingView,
  Text,
  Center,
  VStack,
  Heading,
} from "native-base";
import React from "react";
import { View, StyleSheet, TouchableOpacity, Image } from "react-native";

export default function Senha() {
  return (
    <KeyboardAvoidingView
      style={styles.background}
      behavior={Platform.OS === "ios" ? "padding" : "height"}
    >
      <Center style={{ backgroundColor: "#000" }}>
        <VStack justifyContent="flex-end" w="100%" maxW="300">
          <Heading alignSelf={"center"} color={"#fff"} mb="5">
            Escolha sua senha
          </Heading>
          <Text mb={10} color="muted.400">
            A sua nova senha não pode ter sido usada anteriormente, escolha uma
            senha forte para sua segurança.
          </Text>
          <Text color="muted.400"> Insira sua senha </Text>

          <Input variant="underlined" placeholder="" />

          <Text mt={5} color="muted.400">
            Repita sua senha
          </Text>
          <Input variant="underlined" placeholder="" />

          <TouchableOpacity style={styles.btnSubmit}>
            <Text style={styles.btnSubmitText}> Confirmar </Text>
          </TouchableOpacity>
        </VStack>
      </Center>
    </KeyboardAvoidingView>
  );
}
const styles = StyleSheet.create({
  btnSubmit: {
    backgroundColor: "#ff0000",
    marginTop: 20,
    height: 45,
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 7,
  },
  btnSubmitText: {
    color: "#fff",
  },
  background: {
    flex: 1,

    justifyContent: "center",
    backgroundColor: "#000",
  },
});