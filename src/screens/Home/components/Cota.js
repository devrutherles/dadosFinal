import React from "react";
import { View, Text, StyleSheet, Image } from "react-native";
import { TouchableOpacity } from "react-native";
import { useNavigation } from "@react-navigation/native";

export default function Cota( props ) {
  const navigation = useNavigation();
  return (
    <TouchableOpacity onPress={props.onPress}>
      <View style={styles.container}>
        <View>
          <Image source={{uri:props.cover}} style={styles.cover} />
        </View>

        <View style={styles.content}>
          <Text style={styles.description}>
            Todos os dias, uma nova chance de se tornar milionário(a)!
          </Text>
          <Text style={styles.price}>R$ {props.valor}</Text>
        </View>
      </View>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    width: 260,
    height: 70,
    backgroundColor: "#FFF",
    elevation: 2,
    padding: 6,
    marginVertical: 5,
    marginRight: 20,
    marginLeft: 2,
    borderRadius: 10,
    shadowColor: "#151515",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 2,
    elevation: 2,
  },
  cover: {
    borderRadius: 50,
    width: 60,
    height: 60,
    padding:30
  },
  content: {
    width: "65%",
    justifyContent: "flex-end",
    paddingHorizontal: 10,
    height: "100%",
  },
  description: {
    fontSize: 9,
  },
  price: {
    fontSize: 12,
  },
});
