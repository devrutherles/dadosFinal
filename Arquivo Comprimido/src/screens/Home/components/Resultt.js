import React from "react";
import { View, Text, StyleSheet, Image } from "react-native";
import { TouchableOpacity } from "react-native";
import { Ionicons } from "@expo/vector-icons";

// lotofácil

export default function Resultt(props) {
  return (
    <TouchableOpacity onPress={props.onPress} style={styles.container}>
      <View style={styles.content}>
        <Text style={styles.title}>{props.name}</Text>
      </View>

      <View style={{ flexDirection: "row" }}>
        {props.resultado.map((jogo) => (
          <View
            style={{
              width: 32,
              margin: 2,
              height: 32,
              backgroundColor: props.cor,
              borderRadius: 50,
            }}
          >
            <Text
              style={{
                color: props.cortexto,
                textAlign: "center",
                marginTop: 5,
              }}
            >
              {jogo}
            </Text>
          </View>
        ))}
      </View>
      <View style={{ width: "80%", marginTop: 8 }}>
        <Text style={styles.price}>{props.data}</Text>
      </View>

      <View style={styles.footer}>
        <View style={{ width: "80%" }}>
          <Text style={styles.price}>Concurso: {props.concurso}</Text>
        </View>

        <View style={{ width: "20%" }}></View>
      </View>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  container: {
    marginTop: 20,
    backgroundColor: "#eaeaea",
    height: 150,
    width: 280,
    elevation: 2,
    borderRadius: 10,
    padding: 15,
    marginRight: 30,
    marginLeft: 2,
    marginBottom: 5,

    shadowColor: "#151515",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 2,
    elevation: 2,
  },
  cover: {
    width: 170,
    height: 110,
    borderRadius: 10,
  },
  content: {
    flexDirection: "row",
    alignItems: "center",
    marginVertical: 10,
  },
  title: {
    fontSize: 14,
    color: "#eaeaea",
  },
  dot: {
    width: 4,
    height: 4,
    borderRadius: 4,
    backgroundColor: "red",
    marginHorizontal: 4,
  },
  badge: {
    color: "red",
    fontSize: 9,
  },
  description: {
    fontSize: 9,
    color: "#eaeaea",
  },
  footer: {
    flexDirection: "row",
    marginTop: 5,
    alignItems: "center",
    width: "100%",
  },
  price: {
    fontSize: 15,
  },
});
