import React, { Component } from "react";
import {
  StyleSheet,
  TextInput,
  Text,
  View,
  TouchableOpacity,
  Image,
  Button,
  SafeAreaView,
} from "react-native";
import { AntDesign } from "@expo/vector-icons";
import AsyncStorage from "@react-native-async-storage/async-storage";
import axios from "axios";
import { useForm, Controller } from "react-hook-form";
import { useEffect, useState } from "react";
import { useNavigation } from "@react-navigation/native";

import { Center, Input, Stack } from "native-base";

export default function Pix() {
  const [text, onChangeText] = React.useState("");
  const [token, setToken] = useState();
  const [valor, setValor] = React.useState();
  const [deposito_id_tabela, setDeposito_id_tabela] = React.useState();

  const [number, onChangeNumber] = React.useState(null);
  const [user, setUser] = React.useState();
  const logo = require("../../images/pix.png");
  const navigation = useNavigation();

  function pix(value) {
    setValor(value);
  }

  function pagar() {
    let users = "";
    users = JSON.parse(user);

    let deposito_id = Math.floor(Math.random() * 65536);

    const options = {
      method: "POST",
      url: "https://rutherles.site/api/depositos",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        Authorization: "token" + token,
      },
      data: {
        deposito_id: deposito_id,
        user_id: users.id,
        valor: valor ? valor : text,
        status: "pendente",
      },
    };

    axios
      .request(options)
      .then(function (response) {
        setDeposito_id_tabela(response.data.user.id);
        console.log(response.data);

        if (!valor && !text) {
          alert("Por favor escolha um valor!");
        } else {
          navigation.navigate("Deposito", {
            valor: valor ? valor : text,
            deposito_id: deposito_id,
            deposito_id_tabela: response.data.user.id,
            user_id: users.id,
            nome: users.nome,
            cep: users.cep,
            endereco: users.endereco,
            cidade: users.cidade,
            estado: users.estado,
            cpf: users.cpf,
            email: users.email,
          });
        }
      })
      .catch(function (error) {
        console.error(error);
        setErro("Email ou senha incorretos");
      });
  }

  useEffect(() => {
    const getData = async () => {
      try {
        const value = await AsyncStorage.getItem("@token");
        if (value !== null) {
          setToken(value);
        }
      } catch (e) {
        // error reading value
      }
    };

    const getUser = async () => {
      try {
        const value = await AsyncStorage.getItem("@user");
        if (value !== null) {
          setUser(value);
        }
      } catch (e) {}
    };

    getData();
    getUser();
  }, []);

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
