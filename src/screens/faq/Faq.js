import React, { useState } from "react";
import {
  SafeAreaView,
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
} from "react-native";
import { AntDesign, Ionicons } from "@expo/vector-icons";
import { Divider } from "native-base";
import { useAposta } from "../hooks/useAposta";
export default function Faq({ navigation }) {
  const { salavalue } = useAposta();
  const [isSection1Open, setIsSection1Open] = useState(false);
  const [isSection2Open, setIsSection2Open] = useState(false);
  const [isSection3Open, setIsSection3Open] = useState(false);
  const [isSection4Open, setIsSection4Open] = useState(false);
  const [isSection5Open, setIsSection5Open] = useState(false);
  const [isSection6Open, setIsSection6Open] = useState(false);

  const salas = [
    {
      sala: 1,
      valor1: parseInt(salavalue[0].sala1v1),
      valor2: parseInt(salavalue[0].sala1v2),
      valor3: parseInt(salavalue[0].sala1v3),
      avatar: "tg",
    },
    {
      sala: 2,
      valor1: parseInt(salavalue[1].sala2v1),
      valor2: parseInt(salavalue[1].sala2v2),
      valor3: parseInt(salavalue[1].sala2v3),
      avatar: "iuj",
    },
    {
      sala: 3,
      valor1: parseInt(salavalue[2].sala3v1),
      valor2: parseInt(salavalue[2].sala3v2),
      valor3: parseInt(salavalue[2].sala3v3),
      avatar: "oik",
    },
  ];
  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: "#000" }}>
      <TouchableOpacity onPress={() => setIsSection1Open(!isSection1Open)}>
        <View style={styles.container}>
          <Text style={styles.text}>Como funciona?</Text>
          {isSection1Open ? (
            <AntDesign name="up" size={24} color="white" />
          ) : (
            <AntDesign name="down" size={24} color="white" />
          )}
        </View>
      </TouchableOpacity>
      {isSection1Open && (
        <View>
          <Text style={styles.content}>
            O nosso aplicativo consiste num jogo caipira, com quatro dados, três
            brancos e um vermelho, você faz a aposta e de acordo com o resultado
            é premiado ou não
          </Text>
        </View>
      )}

      <Divider opacity={0.2} />
      <TouchableOpacity onPress={() => setIsSection2Open(!isSection2Open)}>
        <View style={styles.container}>
          <Text style={styles.text}>Ganho dinheiro real?</Text>
          {isSection2Open ? (
            <AntDesign name="up" size={24} color="white" />
          ) : (
            <AntDesign name="down" size={24} color="white" />
          )}
        </View>
      </TouchableOpacity>
      {isSection2Open && (
        <View>
          <Text style={styles.content}>
            SIM! Você recarrega créditos para realizar os jogos, e se acertar um
            dado branco multiplica o valor por 2, caso acerte o dado vermelho
            multiplica por 4, os valores podem ser sacados via pix ou conta
            bancaária de mesma titularidade.
          </Text>
        </View>
      )}

      <Divider opacity={0.2} />
      <TouchableOpacity onPress={() => setIsSection3Open(!isSection3Open)}>
        <View style={styles.container}>
          <Text style={styles.text}>Suporte técnico</Text>
          {isSection3Open ? (
            <AntDesign name="up" size={24} color="white" />
          ) : (
            <AntDesign name="down" size={24} color="white" />
          )}
        </View>
      </TouchableOpacity>
      {isSection3Open && (
        <View>
          <Text style={styles.content}>
            Problemas de visualização e funcionamento Problemas ao
            depositar/sacar fundos Problemas de acesso a contas Mensagens de
            erro inesperadas/incomuns Links sem resposta Caso você se depare com
            algum dos problemas acima, possuimos uma equipe de Apoio Técnico ao
            Cliente que terá prazer em lhe ajudar com quaisquer problemas que
            você possa experienciar. Por favor Contate-nos se necessitar de
            assistência.
          </Text>
        </View>
      )}

      <Divider opacity={0.2} />
      <TouchableOpacity onPress={() => setIsSection4Open(!isSection4Open)}>
        <View style={styles.container}>
          <Text style={styles.text}>Métodos de depósito e saque</Text>
          {isSection4Open ? (
            <AntDesign name="up" size={24} color="white" />
          ) : (
            <AntDesign name="down" size={24} color="white" />
          )}
        </View>
      </TouchableOpacity>
      {isSection4Open && (
        <View>
          <Text style={styles.content}>
            Métodos de Depósito PIX Transferência Bancária Local Boleto Bancário
            Métodos de Saque Transferência Bancária Local PIX
          </Text>
        </View>
      )}

      <Divider opacity={0.2} />
      <TouchableOpacity onPress={() => setIsSection5Open(!isSection5Open)}>
        <View style={styles.container}>
          <Text style={styles.text}>Quais os nossos preços?</Text>
          {isSection5Open ? (
            <AntDesign name="up" size={24} color="white" />
          ) : (
            <AntDesign name="down" size={24} color="white" />
          )}
        </View>
      </TouchableOpacity>
      {isSection5Open && (
        <View>
          <Text style={styles.content}>
            O valor do nosso jogo é dividido por salas sendo:
          </Text>
          {salas.map((element) => (
            <Text style={styles.content}>
              Sala #{element.sala} - R${element.valor1.toFixed(2)}, R$
              {element.valor2.toFixed(2)}, R$
              {element.valor3.toFixed(2)}
            </Text>
          ))}
        </View>
      )}

      <Divider opacity={0.2} />
      <TouchableOpacity onPress={() => setIsSection6Open(!isSection6Open)}>
        <View style={styles.container}>
          <Text style={styles.text}>Sou menor, posso jogar?</Text>
          {isSection6Open ? (
            <AntDesign name="up" size={24} color="white" />
          ) : (
            <AntDesign name="down" size={24} color="white" />
          )}
        </View>
      </TouchableOpacity>
      {isSection6Open && (
        <View>
          <Text style={styles.content}>
            NÃO, nossos jogos destinan-se exclusivamente á maiores de 18 anos.
          </Text>
        </View>
      )}

      <Divider mb={6} opacity={0.2} />

      <Text style={styles.content}>
        Caso não tenha sanado sua dúvida entre em contato conosco pela aba
        ajuda.
      </Text>
    </SafeAreaView>
  );
}
const styles = StyleSheet.create({
  container: {
    padding: 10,
    flexDirection: "row",
    justifyContent: "space-between",
    marginVertical: 20,
  },
  text: {
    color: "white",
    fontSize: 20,
    fontWeight: "bold",
    textAlign: "start",
  },
  content: {
    color: "white",
    fontSize: 16,
    textAlign: "start",
    paddingBottom: 20,
    paddingLeft: 20,
  },
});
