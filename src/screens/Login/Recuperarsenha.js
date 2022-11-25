import { requireNativeModule } from "expo-modules-core";
import {
  Input,
  KeyboardAvoidingView,
  Text,
  Center,
  VStack,
  Heading,
  Button,
} from "native-base";
import React from "react";
import { View, StyleSheet, TouchableOpacity, Image, Alert } from "react-native";
import { useForm, Controller } from "react-hook-form";
import email from "react-native-email";
import { Linking } from "react-native";
import { useContext, useState } from "react";
import axios from "axios";
import { useNavigation } from "@react-navigation/native";
import { AuthContext } from "../hooks/auth";
import { DialogDirectionsEnum } from "react-native-ui-lib/src/incubator/Dialog";

import { useEffect } from "react";

export function Recuperar() {
  const [status, setStatus] = useState(null);
  const { email, setEmail, postUser_id, GetUserByemail, user_id } =
    useContext(AuthContext);
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm({
    defaultValues: {
      email: "",
    },
  });

  const navigation = useNavigation();
  const [load, setLoad] = useState(false);

  let codigo = Math.floor(Math.random() * 20000);

  function sendEmail(data) {
    setLoad(false);
    var config = {
      method: "get",
      url:
        "https://orvalhosj.com/envioemail.php?email=" +
        data.email.toLowerCase() +
        "&codigo=" +
        codigo,
      headers: {},
    };

    GetUserByemail(data.email);

    navigation.navigate("Codigo");
  }

  return (
    <KeyboardAvoidingView
      style={styles.background}
      behavior={Platform.OS === "ios" ? "padding" : <></>}
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
                autoCapitalize="none"
              />
            )}
          />
          {load ? (
            <Button
              style={styles.btnSubmit}
              isLoading
              isLoadingText="Enviando"
            ></Button>
          ) : (
            <TouchableOpacity
              onPress={handleSubmit(sendEmail)}
              style={styles.btnSubmit}
            >
              <Text style={styles.btnSubmitText}> Confirmar </Text>
            </TouchableOpacity>
          )}
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

export function Codigo({ params, navigation, route }) {
  const [load, setLoad] = useState(false);
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm({
    defaultValues: {
      email: "",
    },
  });

  function sendSenha() {
    setLoad(true);
    navigation.navigate("Senha");
  }

  return (
    <KeyboardAvoidingView
      style={styles.background}
      behavior={Platform.OS === "ios" ? "padding" : <></>}
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
          {load ? (
            <Button
              style={styles.btnSubmit}
              isLoading
              isLoadingText="Confirmando"
            ></Button>
          ) : (
            <TouchableOpacity style={styles.btnSubmit} onPress={sendSenha}>
              <Text style={styles.btnSubmitText}> Confirmar </Text>
            </TouchableOpacity>
          )}
        </VStack>
      </Center>
    </KeyboardAvoidingView>
  );
}

export function Senha({ route }) {
  const { user_id } = useContext(AuthContext);

  let id = "";
  const navigation = useNavigation();
  const [load, setLoad] = useState(false);
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm({
    defaultValues: {
      senha1: "",
      senha2: "",
    },
  });

  function senhas(dados) {
    setLoad(true);

    if (dados.senha1 == dados.senha2) {
      const options = {
        method: "PUT",
        url: "https://rutherles.site/api/usuario/" + user_id,
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        data: { password: dados.senha1 },
      };

      axios
        .request(options)
        .then(function (response) {
          console.log(response.data);
          setLoad(false);

          alert("senha alterada com sucesso");
          navigation.navigate("Login");
        })
        .catch(function (error) {
          console.error(error);
        });
    } else {
      alert("as senhas não sao iguais!");
    }
  }

  return (
    <KeyboardAvoidingView
      style={styles.background}
      behavior={Platform.OS === "ios" ? "padding" : <></>}
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
            name="senha1"
            render={({ field: { onChange, onBlur, value } }) => (
              <Input
                color={"#fff"}
                variant="underlined"
                placeholder=""
                onChangeText={onChange}
                value={value}
                autoCapitalize="none"
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
            name="senha2"
            render={({ field: { onChange, onBlur, value } }) => (
              <Input
                color={"#fff"}
                variant="underlined"
                placeholder=""
                onChangeText={onChange}
                value={value}
                autoCapitalize="none"
              />
            )}
          />
          {load ? (
            <Button
              style={styles.btnSubmit}
              isLoading
              isLoadingText="Acessando"
            ></Button>
          ) : (
            <TouchableOpacity
              onPress={handleSubmit(senhas)}
              style={styles.btnSubmit}
            >
              <Text style={styles.btnSubmitText}> Confirmar </Text>
            </TouchableOpacity>
          )}
        </VStack>
      </Center>
    </KeyboardAvoidingView>
  );
}
