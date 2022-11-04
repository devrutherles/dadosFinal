import React, { Component } from "react";
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  Image,
  SafeAreaView,
} from "react-native";
import { AntDesign } from "@expo/vector-icons";
import { useEffect, useState, useContext } from "react";
import { useNavigation } from "@react-navigation/native";
import { AuthContext } from "../hooks/auth";
import { Input, Stack } from "native-base";

export default function Pix() {
  const [text, onChangeText] = React.useState("");
  const [valor, setValor] = React.useState();
  const logo = require("../../images/pix.png");
  const navigation = useNavigation();
  const { user } = useContext(AuthContext);

  function pix(value) {
    setValor(value);
  }

  function pagar() {
    let deposito_id = Math.floor(Math.random() * 65536) + user.id;
    navigation.navigate("Deposito", {
      valor: valor ? valor : text,
      deposito_id: deposito_id,
      deposito_id_tabela: "77",
      carteira: user ? user.carteira : 0,
      user_id: user.id,
      nome: user.nome,
      cep: user.cep,
      endereco: user.endereco,
      cidade: user.cidade,
      estado: user.estado,
      cpf: user.cpf,
      email: user.email,
    });
  }

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: "#fff" }}>
      <View style={styles.title1}>
        <TouchableOpacity onPress={() => navigation.navigate("Wallet")}>
          <AntDesign style={styles.iconRight} name="left" />
        </TouchableOpacity>
        <Text style={styles.title}> Depósito</Text>

        <Text>.</Text>
      </View>

      <View style={{ alignItems: "center", marginTop: 40 }}>
        <Image style={{ height: 50, width: 150 }} source={logo}></Image>

        <Text style={{ marginTop: 40, fontSize: 30 }}>
          R$ {valor ? valor : text}
        </Text>
      </View>

      <View
        style={{
          flexDirection: "row",
          margin: 50,
          justifyContent: "space-between",
        }}
      >
        <TouchableOpacity onPress={() => pix(20)} style={styles.valorFixo}>
          <Text style={styles.fixo}> R$ 20</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => pix(50)} style={styles.valorFixo}>
          <Text style={styles.fixo}>R$ 50</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => pix(100)} style={styles.valorFixo}>
          <Text style={styles.fixo}>R$ 100</Text>
        </TouchableOpacity>
      </View>
      <View style={{ alignItems: "center" }}>
        <Text style={styles.valor}>OUTRO VALOR</Text>
        <Stack space={4} w="75%" maxW="300px" mx="auto">
          <Input
            variant="underlined"
            style={styles.input}
            onChangeText={onChangeText}
            value={text}
          />
        </Stack>

        <TouchableOpacity style={styles.btnSubmit} onPress={() => pagar()}>
          <Text style={styles.RegisterText}>Pagamento</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  input: {
    height: 40,
    width: "50%",
    margin: 12,
    borderWidth: 0,
  },
  btnSubmit: {
    backgroundColor: "#0ed830",
    width: "50%",
    height: 45,
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 7,
    marginTop: 20,
  },
  btnSubmitText: {
    color: "#fff",
  },
  btnRegister: {
    marginTop: 10,
  },
  RegisterText: {
    color: "#fff",
    fontWeight: "bold",
  },
  valor: {
    fontWeight: "bold",
  },
  valorFixo: {
    backgroundColor: "#0ed830",
    width: 60,
    height: 50,
    borderRadius: 10,
    alignItems: "center",
  },
  fixo: {
    color: "#fff",
    textAlign: "center",
    fontSize: 15,
    marginTop: "auto",
    marginBottom: "auto",
    fontWeight: "bold",
  },
  title1: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginTop: 30,
    marginBottom: 20,
  },
  title: {
    fontSize: 20,
    fontWeight: "bold",
    textTransform: "uppercase",

    textAlign: "center",
    color: "#000",
  },
  iconRight: {
    fontSize: 20,
    marginLeft: 20,
    marginRight: -35,

    color: "#000",
  },
});
