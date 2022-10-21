import { requireNativeModule } from "expo-modules-core";
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
import { useForm, Controller } from "react-hook-form";
export function Recuperar() {
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm({
    defaultValues: {
      email: "",
    },
  });

  console.log();
  return (
    <KeyboardAvoidingView
      style={styles.background}
      behavior={Platform.OS === "ios" ? "padding" : "height"}
    >
      <Center style={{ backgroundColor: "#000" }}>
        <Image
          style={{ width: 175, height: 100, marginBottom: 70 }}
          source={require("../../images/mail.gif")}
        />
        <VStack justifyContent="flex-end" w="100%" maxW="300">
          <Heading alignSelf={"center"} color={"#fff"} mb="5">
            Esqueceu a senha?
          </Heading>
          <Text mb={10} color="muted.400">
            Sem problema! Insira o email associado a conta e enviaremos um
            código para confirmar sua identidade.
          </Text>

          <Controller
            control={control}
            rules={{
              required: true,
            }}
            name="email"
            render={({ field: { onChange, onBlur, value } }) => (
              <Input
                color={"#fff"}
                variant="underlined"
                placeholder=""
                onChangeText={onChange}
                value={value}
              />
            )}
          />

          <TouchableOpacity onPress={handleSubmit} style={styles.btnSubmit}>
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

export function Codigo() {
  return (
    <KeyboardAvoidingView
      style={styles.background}
      behavior={Platform.OS === "ios" ? "padding" : "height"}
    >
      <Center style={{ backgroundColor: "#000" }}>
        <VStack justifyContent="flex-end" w="100%" maxW="300">
          <Heading alignSelf={"center"} color={"#fff"} mb="5">
            Digite o código
          </Heading>
          <Text mb={10} color="muted.400">
            O código foi enviado para seu email, caso não tenha recebido, clique
            em enviar novamente.
          </Text>
          <Controller
            control={control}
            rules={{
              required: true,
            }}
            name="codigo"
            render={({ field: { onChange, onBlur, value } }) => (
              <Input
                color={"#fff"}
                variant="underlined"
                placeholder=""
                onChangeText={onChange}
                value={value}
              />
            )}
          />

          <TouchableOpacity style={styles.btnSubmit}>
            <Text style={styles.btnSubmitText}> Confirmar </Text>
          </TouchableOpacity>
        </VStack>
      </Center>
    </KeyboardAvoidingView>
  );
}

export function Senha() {
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

          <Controller
            control={control}
            rules={{
              required: true,
            }}
            name="senha"
            render={({ field: { onChange, onBlur, value } }) => (
              <Input
                color={"#fff"}
                variant="underlined"
                placeholder=""
                onChangeText={onChange}
                value={value}
              />
            )}
          />

          <Text mt={5} color="muted.400">
            Repita sua senha
          </Text>
          <Controller
            control={control}
            rules={{
              required: true,
            }}
            name="senha"
            render={({ field: { onChange, onBlur, value } }) => (
              <Input
                color={"#fff"}
                variant="underlined"
                placeholder=""
                onChangeText={onChange}
                value={value}
              />
            )}
          />

          <TouchableOpacity style={styles.btnSubmit}>
            <Text style={styles.btnSubmitText}> Confirmar </Text>
          </TouchableOpacity>
        </VStack>
      </Center>
    </KeyboardAvoidingView>
  );
}
