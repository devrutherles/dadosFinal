import { requireNativeModule } from "expo-modules-core";
import {
  Input,
  KeyboardAvoidingView,
  Text,
  Center,
  VStack,
  Heading,
  Button,
  Box,
} from "native-base";
import React from "react";
import { View, StyleSheet, TouchableOpacity, Image, Alert } from "react-native";
import { useForm, Controller } from "react-hook-form";
import { Linking } from "react-native";
import { useContext, useState } from "react";
import axios from "axios";
import { useNavigation } from "@react-navigation/native";
import { AuthContext } from "../hooks/auth";
import { DialogDirectionsEnum } from "react-native-ui-lib/src/incubator/Dialog";

import { useEffect } from "react";

export default function Email() {
  const navigation = useNavigation();
  const [status, setStatus] = useState(null);
  const {
    email,
    setEmail,
    postUser_id,
    GetUserByemail,
    user_id,
    postCodigo,
    postEmail,
  } = useContext(AuthContext);
  const [register, setRegister] = useState(false);
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm({
    defaultValues: {
      email: "",
      nome: "",
    },
  });

  const [load, setLoad] = useState(false);

  let codigo = Math.floor(Math.random() * 10000)
    .toString()
    .padStart(4, "0");

  async function sendEmail(data, register) {
    setLoad(true);

    try {
      const idResponse = await axios.get(
        "https://morenacaipira.com/api/usuarios",
        {
          headers: { Accept: "application/json" },
        }
      );
      const allUsers = idResponse.data;
      const userId = allUsers.find(
        (user) => user.email.toLowerCase() === data.email.toLowerCase()
      );

      if (userId) {
        alert("Email já cadastrado");
        register = true;
        setLoad(false);
        return;
      }
    } catch (error) {
      //console.error(error);
      alert("Erro ao verificar usuário existente");
      setLoad(false);
      return;
    }

    if (register) {
      try {
        const options = {
          method: "GET",
          url:
            "https://morenacaipira.com/public/envioemail.php?" +
            "email=" +
            data.email +
            "&" +
            "codigo=" +
            codigo +
            "&" +
            "mensagemcadastro=" +
            "Seja bem vindo! ." +
            "&" +
            "usuario=" +
            data.nome,

          headers: { "Content-Type": "application/json" },
        };

        const emailResponse = await axios.request(options);

        setLoad(false);
        postEmail(data.email);
        navigation.navigate("Code");
        postCodigo(codigo);
        //console.error(emailResponse);
      } catch (error) {
        //console.error(error);
        setLoad(false);
        alert("Erro ao enviar email");
      }
    }
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
            Seja bem vindo!
          </Heading>
          <Text alignSelf={"center"} mb={10} color="muted.400">
            Para continuar, informe seu e-mail
          </Text>

          <Controller
            control={control}
            rules={{
              required: true,
            }}
            name="email"
            render={({ field: { onChange, onBlur, value } }) => (
              <Box py={2}>
                <Text style={{ color: "#fff" }}>Email</Text>

                <Input
                  color={"#fff"}
                  variant="underlined"
                  placeholder=""
                  onChangeText={onChange}
                  value={value}
                  autoCapitalize="none"
                  keyboardType="email-address"
                />
              </Box>
            )}
          />
          <Controller
            control={control}
            rules={{
              required: true,
            }}
            name="nome"
            render={({ field: { onChange, onBlur, value } }) => (
              <Box>
                <Text style={{ color: "#fff" }}>Nome</Text>

                <Input
                  mt={5}
                  color={"#fff"}
                  variant="underlined"
                  placeholder="Nome"
                  onChangeText={onChange}
                  value={value}
                  autoCapitalize="words"
                />
              </Box>
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
