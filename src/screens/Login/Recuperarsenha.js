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
import { useState } from "react";
import { useAposta } from "../hooks/useAposta";
import axios from "axios";
import { useNavigation } from "@react-navigation/native";
export function Recuperar() {
  const [status, setStatus] = useState(null);
  const { token } = useAposta();
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
    setLoad(true);
    var config = {
      method: "get",
      url:
        "https://orvalhosj.com/envioemail.php?email=" +
        data.email +
        "&codigo=" +
        codigo,
      headers: {},
    };

    axios(config)
      .then(function (response) {
        //console.error(JSON.stringify(response.data));
        navigation.navigate("Codigo", {
          email: data.email,
        });
      })
      .catch(function (error) {
        console.log(error);
      });
  }

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
  const { email } = route.params;
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
    navigation.navigate("Senha", {
      email: email,
    });
  }

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
  let id = "";
  const navigation = useNavigation();
  const { email } = route.params;
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
    const options2 = {
      method: "GET",
      url: "https://rutherles.site/api/usuarios",
      headers: {
        Accept: "application/json",
        Authorization:
          "Token eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpc3MiOiJodHRwczovL3J1dGhlcmxlcy5zaXRlL2FwaS9sb2dpbiIsImlhdCI6MTY2NzIwNjc2OCwiZXhwIjoyMjY2NTM3NDc5OTg4LCJuYmYiOjE2NjcyMDY3NjgsImp0aSI6IjQ0Q2szeWVzWXpFdzNkbUciLCJzdWIiOiI4MSIsInBydiI6IjIzYmQ1Yzg5NDlmNjAwYWRiMzllNzAxYzQwMDg3MmRiN2E1OTc2ZjcifQ.ZfDOFYHldK62hgJwUBmxtAvk1WzYtvJAcTnoI1xGs9Y",
      },
    };

    axios
      .request(options2)
      .then(function (response) {
        let usuarios = response.data;
        let user = usuarios.find((item) => item.email == email);
        id = user.id;

        if (dados.senha1 == dados.senha2) {
          navigation.navigate("Login");
          var data = JSON.stringify({
            password: dados.senha1,
          });

          var config = {
            method: "put",
            url: "http://rutherles.site/api/usuario/" + id,
            headers: {
              Authorization:
                "Bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpc3MiOiJodHRwczovL3J1dGhlcmxlcy5zaXRlL2FwaS9sb2dpbiIsImlhdCI6MTY2NzIwNjc2OCwiZXhwIjoyMjY2NTM3NDc5OTg4LCJuYmYiOjE2NjcyMDY3NjgsImp0aSI6IjQ0Q2szeWVzWXpFdzNkbUciLCJzdWIiOiI4MSIsInBydiI6IjIzYmQ1Yzg5NDlmNjAwYWRiMzllNzAxYzQwMDg3MmRiN2E1OTc2ZjcifQ.ZfDOFYHldK62hgJwUBmxtAvk1WzYtvJAcTnoI1xGs9Y",
              "Content-Type": "application/json",
            },
            data: data,
          };

          axios(config)
            .then(function (response) {
              console.error(JSON.stringify(response.data));
              alert("senha alterada com sucesso");
            })
            .catch(function (error) {
              console.error(error);
            });
        } else {
          alert("as senhas não sao iguais!");
        }
      })
      .catch(function (error) {
        console.error(error);
      });
  }

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
            name="senha1"
            render={({ field: { onChange, onBlur, value } }) => (
              <Input
                color={"#fff"}
                variant="underlined"
                placeholder=""
                onChangeText={onChange}
                value={value}
                autoCapitalize="none"
                keyboardType="numeric"
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
