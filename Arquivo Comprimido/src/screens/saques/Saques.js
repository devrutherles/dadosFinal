import React from "react";
import {
  ScrollView,
  View,
  Text,
  StyleSheet,
  Image,
  TouchableOpacity,
} from "react-native";
import { useEffect, useState } from "react";
import axios from "axios";
import { AntDesign, Ionicons } from "@expo/vector-icons";
import {
  Card,
  CardBody,
  CardDetails,
  CardTitle,
  CardInfo,
  Img,
  AddButton,
  AddLabel,
} from "./styles";
import { useNavigation } from "@react-navigation/native";
export default function Saques() {
  const navigation = useNavigation();

  const items = [
    {
      key: "#001",
      metodo: "PIX",
      label: "90,00",
      chave: "000.000.000.00",
      data: "19/10/2022",
      status: "Concluído",
    },
    {
      key: "#002",
      metodo: "TED",
      label: "158,00",
      chave: "1234 013 00012357-4",
      data: "19/10/2022",
      status: "Concluído",
    },
  ];


function postSaque(){
var data = JSON.stringify({
  "usuario": "morenacaipira01@gmail.com",
  "user_id": "Moren@2022",
  "cpf": "cpf",
  "pix": "pix",
  "banco": "",
  "op": "op",
  "conta": "conta",
  "digito": "digito",
  "valor": "valor"
});

var config = {
  method: 'post',
  url: 'https://rutherles.site/api/pedido',
  headers: { 
    'Content-Type': 'application/json'
  },
  data : data
};

axios(config)
.then(function (response) {
  console.log(JSON.stringify(response.data));
})
.catch(function (error) {
  console.log(error);
});
  }

  return (
    <ScrollView style={{ backgroundColor: "#000", flex: 1 }}>
      <View style={styles.title1}>
        <TouchableOpacity onPress={() => navigation.navigate("Settings")}>
          <AntDesign style={styles.iconRight} name="left" />
        </TouchableOpacity>
        <Text style={styles.title2}>Meus saque</Text>
      </View>
      <View style={{ backgroundColor: "#000", marginTop: 30 }}>
        {items.map((item) => (
          <Card style={{ marginBottom: 10 }}>
            <CardBody>
              <CardDetails>
                <CardTitle>SAQUE {item.key} </CardTitle>
                <View
                  style={{
                    flexDirection: "row",
                    justifyContent: "space-between",
                  }}
                >
                  <CardInfo style={{ fontSize: 15 }}>{item.metodo} </CardInfo>
                  <CardInfo style={{ fontSize: 15 }}>{item.chave}</CardInfo>
                </View>
                <View
                  style={{
                    flexDirection: "row",
                    justifyContent: "space-between",
                  }}
                >
                  <CardInfo style={{ fontSize: 15 }}>{item.status}</CardInfo>
                  <CardInfo style={{ fontSize: 15 }}>{item.data}</CardInfo>
                </View>
              </CardDetails>
            </CardBody>

            <AddButton>
              <AntDesign name="creditcard" size={30} color="#0DB060" />
              <AddLabel> R$ {item.label}</AddLabel>
            </AddButton>
          </Card>
        ))}
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  card: {
    marginTop: 20,
    width: 300,
    height: 90,
    alignItems: "center",
    alignSelf: "center",
    alignContent: "center",
    backgroundColor: "#eeeeee",
    borderRadius: 20,
    shadow: 20,
    elevation: 15,
  },
  View: {},
  title: {
    fontSize: 20,
    fontWeight: "bold",
    marginTop: 30,
    marginBottom: 20,
    alignSelf: "center",
    elevation: 17,
    color: "#fff",
  },
  title2: {
    fontSize: 20,
    fontWeight: "bold",
    textTransform: "uppercase",
    marginTop: 20,
    textAlign: "center",
    color: "#fff",
  },
  iconRight: {
    fontSize: 20,

    marginTop: 20,

    color: "#fff",
  },
  title1: {
    marginTop: 20,
    flexDirection: "row",
    alignItems: "center",
    color: "#fff",
    justifyContent: "space-around",
    marginRight: "25%",
  },
});
