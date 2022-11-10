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
  const { jogada, user ,getJogada } = useContext(AuthContext);




  let jogadas = jogada.filter((item) => item.user_id == user.id);


  useEffect(() => {
  getJogada()
  }, []);


    return (
      <ScrollView style={{ backgroundColor: "#000", flex: 1 }}>
        <View style={{ marginTop: 25 }}>
          <Text style={styles.title2}>Minhas Apostas</Text>
        </View>
        <View
          style={{
            position: "absolute",
            marginTop: "50%",
            alignContent: "center",
            alignSelf: "center",
            justifyContent: "center",
          }}
        >
          {jogada.length == 0 ? (
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
                  <Text style={styles.title2}>Você ainda não tem jogadas</Text>
                </View>
               
              </View>
            </View>
          ) : (
            <></>
          )}
        </View>

        {jogadas
          .slice(0)
          .reverse()
          .map((jogo) => (
            <View style={{ backgroundColor: "#000", marginTop: 20 }}>
              <Card>
                <CardBody>
                  <CardDetails>
                    <CardInfo>
                      {"Data " + moment(jogo.created_at).format("DD/MM/Y")}
                    </CardInfo>

                    <CardInfo>
                      {"Valor apostado R$  " + parseInt(jogo.valor).toFixed(2)}
                    </CardInfo>
                  </CardDetails>

                  <Img source={require("../../images/dador.png")} />
                </CardBody>

                <AddButton>
                  <AntDesign name="creditcard" size={30} color="#0DB060" />
                  <AddLabel>
                    {"ID# " +
                      jogo.id +
                      " " +
                      jogo.status +
                      " " +
                      "R$ " +
                      jogo.premio +
                      " R$"}
                  </AddLabel>
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
