import React from "react";
import { ScrollView, View, Text, StyleSheet, Image } from "react-native";
import { useEffect, useState } from "react";
//import ImagedCardView from "react-native-imaged-card-view";
import AsyncStorage from "@react-native-async-storage/async-storage";
import axios from "axios";
import { AntDesign, Ionicons } from "@expo/vector-icons";

import moment from "moment";

import {
  Wrapper,
  Header,
  HeaderContainer,
  Title,
  BalanceContainer,
  Value,
  Bold,
  EyeButton,
  Info,
  Actions,
  Action,
  ActionLabel,
  UseBalance,
  UseBalanceTitle,
  PaymentMethods,
  PaymentMethodsTitle,
  Card,
  CardBody,
  CardDetails,
  CardTitle,
  CardInfo,
  Img,
  AddButton,
  AddLabel,
  UseTicketContainer,
  UseTicketButton,
  UseTicketLabel,
} from "./styles";

export default function Results({ navigation, route }) {
  const [jogos, setJogos] = React.useState([]);
  const [loader, setloader] = React.useState();
  const [api, setApi] = React.useState(true);
  const [isStatus, setStatus] = useState(0);
  const [user, setUser] = React.useState();
  const { bilhetes } = route.params ? route.params : [];

  useEffect(() => {
    const getData = async () => {
      try {
        const value = await AsyncStorage.getItem("@user");
        if (value !== null) {
          let users = JSON.parse(value);
          setUser(users);
          setloader(true);
        }
      } catch (e) {
        // error reading value
      }
    };

    getData();

    console.log(user);
  }, []);

  if (loader) {
    const options = {
      method: "POST",
      url: "https://rutherles.site/api/compras",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        Authorization:
          "Token eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpc3MiOiJodHRwOi8vMTM3LjE4NC40OC42Ny9hcGkvbG9naW4iLCJpYXQiOjE2NjIwMzY2NzksImV4cCI6MjI2NjUzMjMwOTg5OSwibmJmIjoxNjYyMDM2Njc5LCJqdGkiOiJObWxKdHczbmZUTWtLSFRSIiwic3ViIjoiODEiLCJwcnYiOiIyM2JkNWM4OTQ5ZjYwMGFkYjM5ZTcwMWM0MDA4NzJkYjdhNTk3NmY3In0.qDXH1Mqh_MRK-zS5wYysCYgKht9yZB1YUOWUYgWKOaM",
      },
      data: { user_id: user.id },
    };

    axios
      .request(options)
      .then(function (response) {
        console.log(response.data.compra);
        setJogos(response.data.compra);
      })
      .catch(function (error) {
        console.error(error);
      });
  }

  return (
    <ScrollView style={{ backgroundColor: "#000", flex: 1 }}>
      {jogos.map((jogo) => (
        <View style={{ backgroundColor: "#000", marginTop: 30 }}>
          <Card style={{ marginBottom: 10 }}>
            <CardBody>
              <CardDetails>
                <CardTitle>{jogo.nome}</CardTitle>
                <CardInfo>{"Resultados " + jogo.dezenas}</CardInfo>
                <CardInfo>
                  {"Data " + moment(jogo.data).format("DD/MM/Y")}
                </CardInfo>

                <CardInfo>{"Premiação  " + jogo.premiacao}</CardInfo>
              </CardDetails>

              <Img source={require("../../images/dador.png")} />
            </CardBody>

            <AddButton>
              <AntDesign name="creditcard" size={30} color="#0DB060" />
              <AddLabel>{"Rodada " + jogo.concurso}</AddLabel>
            </AddButton>
          </Card>

          <View></View>
        </View>
      ))}
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
});
