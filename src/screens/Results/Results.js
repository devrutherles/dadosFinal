import React from "react";
import {
  ScrollView,
  ActivityIndicator,
  View,
  Text,
  StyleSheet,
  Image,
  TouchableOpacity,
} from "react-native";
import { useEffect, useState, useContext } from "react";
//import ImagedCardView from "react-native-imaged-card-view";
import { AuthContext } from "../hooks/auth";
import { AntDesign, Ionicons } from "@expo/vector-icons";
import { useAposta } from "../hooks/useAposta";
import moment from "moment";

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

export default function Results({ navigation, route }) {
  const { jogada } = useContext(AuthContext);

  if (jogada < 0) {
    return (
      <View
        style={{
          flex: 1,
          backgroundColor: "#000",
          justifyContent: "center",
        }}
      >
        <View
          style={{
            flex: 1,
            backgroundColor: "#000",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <View>
            <Text style={styles.title2}>Você ainda não tem apostas</Text>
          </View>
          <View>
            <TouchableOpacity onPress={() => navigation.navigate("Pay")}>
              <Text style={styles.title3}>Faça sua primeira aposta</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    );
  } else {
    return (
      <ScrollView style={{ backgroundColor: "#000", flex: 1 }}>
        <View
          style={{
            position: "absolute",
            marginTop: "50%",
            alignContent: "center",
            alignSelf: "center",
            justifyContent: "center",
          }}
        ></View>

        {jogada.map((jogo) => (
          <View style={{ backgroundColor: "#000", marginTop: 30 }}>
            <Card style={{ marginBottom: 10 }}>
              <CardBody>
                <CardDetails>
                  <CardTitle>{jogo.nome}</CardTitle>
                  <CardInfo>{"Apostas"}</CardInfo>
                  <CardInfo>
                    {"Data " + moment(jogo.created_at).format("DD/MM/Y")}
                  </CardInfo>

                  <CardInfo>
                    {"Valor R$  " + parseInt(jogo.valor).toFixed(2)}
                  </CardInfo>
                </CardDetails>

                <Img source={require("../../images/dador.png")} />
              </CardBody>

              <AddButton>
                <AntDesign name="creditcard" size={30} color="#0DB060" />
                <AddLabel>{"Rodada " + jogo.id}</AddLabel>
              </AddButton>
            </Card>

            <View></View>
          </View>
        ))}
      </ScrollView>
    );
  }
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
  title3: {
    fontSize: 15,

    marginTop: 20,
    textAlign: "center",
    color: "#fff",
  },
});
