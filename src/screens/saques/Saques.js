import React from "react";
import {
  ScrollView,
  View,
  Text,
  StyleSheet,
  Image,
  TouchableOpacity,
  ActivityIndicator,
} from "react-native";
import { useEffect, useState, useContext } from "react";
import moment from "moment";
import { AuthContext } from "../hooks/auth";
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
  const { pedido, getPedido } = useContext(AuthContext);
  ////console.error(pedido);

  const navigation = useNavigation();

  useEffect(() => {
    getPedido();
  }, [pedido]);

  if (pedido < 0) {
    return (
      <View
        style={{
          flex: 1,
          backgroundColor: "#000",
          justifyContent: "center",
        }}
      >
        <View style={styles.title1}>
          <TouchableOpacity onPress={() => navigation.navigate("Settings")}>
            <AntDesign style={styles.iconRight} name="left" />
          </TouchableOpacity>
          <Text style={styles.title2}>Meus saque</Text>
        </View>
        <View
          style={{
            flex: 1,
            backgroundColor: "#000",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <View>
            <Text style={styles.title2}>Você ainda não tem saques</Text>
          </View>
          <View>
            <TouchableOpacity onPress={() => navigation.navigate("Home")}>
              <Text style={styles.title3}>Solicite um saque</Text>
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

        <View style={styles.title1}>
          <TouchableOpacity onPress={() => navigation.navigate("Settings")}>
            <AntDesign style={styles.iconRight} name="left" />
          </TouchableOpacity>
          <Text style={styles.title2}>Meus saque</Text>
        </View>

        <View style={{ backgroundColor: "#000", marginTop: 30 }}>
          {pedido.map((item) => (
            <Card style={{ marginBottom: 10 }}>
              <CardBody>
                <CardDetails>
                  <CardTitle>SAQUE# {item.id} </CardTitle>
                  <View
                    style={{
                      flexDirection: "row",
                      justifyContent: "space-between",
                    }}
                  >
                    <CardInfo style={{ fontSize: 15 }}>
                      Status {item.status}{" "}
                    </CardInfo>
                    <CardInfo style={{ fontSize: 15 }}>
                      Data {moment(item.created_at).format("DD/MM/Y")}
                    </CardInfo>
                  </View>
                  <View
                    style={{
                      flexDirection: "row",
                      justifyContent: "space-between",
                    }}
                  >
                    <CardInfo style={{ fontSize: 15 }}>
                      Valor {item.valor}
                    </CardInfo>
                    <CardInfo style={{ fontSize: 15 }}>
                      Método {item.metodo}
                    </CardInfo>
                  </View>
                </CardDetails>
              </CardBody>
            </Card>
          ))}
        </View>
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
