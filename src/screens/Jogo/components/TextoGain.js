import { View, Text, StyleSheet, Image } from "react-native";
import React from "react";

export default function Alerta(props) {
  const { valor, dados, resultado, img, array } = props;

  /////console.log()(imagem);

  return (
    <View>
      <Text>Você ganhou R$ {valor},00</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
  },
  imagem: {
    width: 20,
    height: 20,
    margin: 5,
  },
});
