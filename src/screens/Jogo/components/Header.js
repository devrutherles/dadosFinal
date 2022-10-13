import { View, Text, ScrollView } from "react-native";
import React from "react";
import { Avatar, HStack, VStack } from "native-base";
import { jogadores } from "./variaveis";

export default function Cab(props) {
  const { avatar } = props;
  function geraStringAleatoria(tamanho) {
    var caracteres = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwx";
    for (var i = 0; i < tamanho; i++) {
      stringAleatoria += caracteres.charAt(
        Math.floor(Math.random() * caracteres.length)
      );
    }
    return stringAleatoria;
  }

  return jogadores.map((jogo) => (
    <View
      style={{
        margin: 5,
        alignContent: "center",
        alignItems: "center",
        alignSelf: "center",
      }}
    >
      <Avatar
        bg="lightBlue.400"
        source={{
          uri: "https://api.multiavatar.com/" + jogo.nome + ".png",
        }}
        size="md"
      >
        {jogo.nome.substr(0, 1)}
        <Avatar.Badge bg="green.500" />
      </Avatar>
      <Text style={{ color: "gray", marginTop: 5 }}> {jogo.nome}</Text>
    </View>
  ));
}
