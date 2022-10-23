import React, { Component } from "react";
import {
  StyleSheet,
  Text,
  View,
  ActivityIndicator,
  TouchableOpacity,
  SafeAreaView,
} from "react-native";
import { WebView } from "react-native-webview";
import { useEffect, useState } from "react";
import axios from "axios";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { Ionicons } from "@expo/vector-icons";
import { FAB } from "react-native-paper";
import { putUser,PutAdm } from "../hooks/PostFunctions";

import { useAposta , } from "../hooks/useAposta";

export default function Deposito({ route, navigation }) {
  const [token, setToken] = useState();
  const [visible, setVisible] = useState(false);
  const [deposito, setDeposito] = useState();

  const [time, setTime] = useState();

  const { depositoStatus, deposito_idget , aprovado ,saldoadm, carteira } = useAposta();

  const {
   
    valor,
    user_id,
    status,
    nome,
    deposito_id_tabela,
    cep,
    endereco,
    cidade,
    estado,
    cpf,
    email,
    deposito_id
  } = route.params;




  useEffect(() => {
    
    putUser(user_id,deposito_id,parseInt(carteira) + parseInt(valor),valor,"pendente" )


    console.warn(carteira)
    //console.warn(depositoStatus)



        if (
          aprovado == "approved" &&
          depositoStatus == "pendente"
        ) {
          putUser(user_id,deposito_id, parseInt(carteira) + parseInt(valor) ,parseInt(valor),"aprovado" )
          PutAdm(parseInt(saldoadm) + parseInt(valor))
          navigation.navigate("Wallet")}

    


  
  }, [aprovado]);


  



  function saldo() {
    const options = {
      method: "GET",
      url: "https://rutherles.site/api/usuario/" + user_id,
      headers: {
        Accept: "application/json",
        Authorization:
          "Token eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpc3MiOiJodHRwOi8vMTM3LjE4NC40OC42Ny9hcGkvbG9naW4iLCJpYXQiOjE2NjIwMzY2NzksImV4cCI6MjI2NjUzMjMwOTg5OSwibmJmIjoxNjYyMDM2Njc5LCJqdGkiOiJObWxKdHczbmZUTWtLSFRSIiwic3ViIjoiODEiLCJwcnYiOiIyM2JkNWM4OTQ5ZjYwMGFkYjM5ZTcwMWM0MDA4NzJkYjdhNTk3NmY3In0.qDXH1Mqh_MRK-zS5wYysCYgKht9yZB1YUOWUYgWKOaM",
      },
    };

    axios
      .request(options)
      .then(function (response) {
        //console.log(response.data);
        navigation.navigate("Wallet", {
          bilhetes: deposito,
          cart: response.data[0].carteira,
        });
        //console.log(response);
      })
      .catch(function (error) {
        //console.error(error);
      });
  }

  return (
    <SafeAreaView style={styles.container}>
      <WebView
        source={{
          uri:
            "https://rutherles.site/pix?deposito_id=" +
            deposito_id +
            "&valor=" +
            valor +
            "&endereco=" +
            endereco +
            "&user_id=" +
            user_id +
            "&status=" +
            "pendente" +
            "&nome=" +
            nome +
            "&cpf=" +
            cpf +
            "&cep=" +
            cep +
            "&cidade=" +
            cidade +
            "&estado=" +
            estado +
            "&deposito_id_tabela=" +
            deposito_id_tabela +
            "&email=" +
            email,
        }}
        onLoadStart={() => setVisible(true)}
        onLoad={() => setVisible(false)}
      />
      <FAB
        icon="wallet"
        color="#FFF"
        style={styles.fab}
        onPress={() => saldo()}
      />
      <View
        style={{ position: "absolute", left: "50%", backgroundColor: "#fff" }}
      >
        {visible ? <ActivityIndicator size="large" /> : null}
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    backgroundColor: "#ecf0f1",
  },
  fab: {
    position: "absolute",
    marginTop: 60,
    margin: 16,
    right: 0,
    top: 0,
    backgroundColor: "#0ed830",
  },
});
