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
import { Linking } from "react-native";
import { useContext, useState } from "react";
import axios from "axios";
import { useNavigation } from "@react-navigation/native";
import { AuthContext } from "../hooks/auth";

import {
  CodeField,
  Cursor,
  useBlurOnFulfill,
  useClearByFocusCell,
} from "react-native-confirmation-code-field";
import { useEffect } from "react";
export function Code({ params, navigation, route }) {
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
  const { codigo } = useContext(AuthContext);
  const [value, setValue] = useState("");
  const ref = useBlurOnFulfill({ value, cellCount: 5 });
  const [props, getCellOnLayoutHandler] = useClearByFocusCell({
    value,
    setValue,
  });
  const CELL_COUNT = 5;
  function sendSenha() {
    setLoad(true);
    if (value == codigo) {
      navigation.navigate("Register");
      setLoad(false);
    } else {
      Alert.alert("Código inválido");
      setLoad(false);
    }
  }
  //console.warn(codigo);
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

          <CodeField
            ref={ref}
            {...props}
            value={value}
            onChangeText={setValue}
            cellCount={4}
            rootStyle={styles.codeFieldRoot}
            keyboardType="number-pad"
            textContentType="oneTimeCode"
            renderCell={({ index, symbol, isFocused }) => (
              <Text
                color={"#fff"}
                key={index}
                style={[styles.cell, isFocused && styles.focusCell]}
                onLayout={getCellOnLayoutHandler(index)}
              >
                {symbol || (isFocused ? <Cursor /> : null)}
              </Text>
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
  codeFieldRoot: { marginTop: 5 },
  cell: {
    width: 45,
    height: 45,
    lineHeight: 38,
    fontSize: 24,

    borderWidth: 1,
    borderColor: "#c9c9c9",
    textAlign: "center",
    marginHorizontal: "6%",
  },
  focusCell: {
    borderColor: "#c9c9c9",
  },
});
