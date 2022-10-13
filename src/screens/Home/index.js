import React from "react";
import { View, Text, StyleSheet, Image, TouchableOpacity } from "react-native";
import { ScrollView, TextInput } from "react-native";
import { Feather } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import axios from "axios";
import New from "./components/New";
import Cota from "./components/Cota";
import { JogosApi } from "../hooks/JogoApi";
import { HStack, Spinner } from "native-base";
export default function Home() {
  const navigation = useNavigation();

  const { jogos, loading } = JogosApi("https://rutherles.site/api/jogos");
  const [filter, setFilter] = React.useState();
  const [filtros, setFiltros] = React.useState();
  const [loop, setLoop] = React.useState(true);
  const gif = require("../hooks/load.gif");

  const itens = [
    { key: 1, sorteio: "TODOS" },
    { key: 2, sorteio: "MEGA-SENA" },
    { key: 3, sorteio: "LOTOFÁCIL" },
    { key: 4, sorteio: "QUINA" },
    { key: 5, sorteio: "LOTOMANIA" },
    { key: 6, sorteio: "TIMEMANIA" },
    { key: 7, sorteio: "DUPLA SENA" },
    { key: 8, sorteio: "FEDERAL" },
    { key: 9, sorteio: "LOTECA" },
    { key: 10, sorteio: "DIA DE SORTE" },
    { key: 11, sorteio: "SUPER SETE" },
    { key: 12, sorteio: "+MILIONÁRIA" },
  ];

  if (filter && filter && loop) {
    const options = {
      method: "POST",
      url: "https://rutherles.site/api/banner",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        Authorization:
          "Token eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpc3MiOiJodHRwOi8vMTM3LjE4NC40OC42Ny9hcGkvbG9naW4iLCJpYXQiOjE2NjIwMzY2NzksImV4cCI6MjI2NjUzMjMwOTg5OSwibmJmIjoxNjYyMDM2Njc5LCJqdGkiOiJObWxKdHczbmZUTWtLSFRSIiwic3ViIjoiODEiLCJwcnYiOiIyM2JkNWM4OTQ5ZjYwMGFkYjM5ZTcwMWM0MDA4NzJkYjdhNTk3NmY3In0.qDXH1Mqh_MRK-zS5wYysCYgKht9yZB1YUOWUYgWKOaM",
      },
      data: { nome: filter },
    };

    axios
      .request(options)
      .then(function (response) {
        console.log(response.data.sorteio[0]);
        setFiltros(response.data.sorteio);
        setLoop(false);
        if (!response.data.sorteio[0]) {
          setFiltros(jogos);
        }
      })
      .catch(function (error) {
        console.error(error);
      });
  }

  if (loading) {
    return (
      <HStack space={8} marginTop={"100%"} alignSelf={"center"}>
        <Spinner size="lg" />
      </HStack>
    );
  } else {
    return (
      <View>
        {loading ? (
          <View style={{ alignItems: "center", alignSelf: "center" }}>
            <Text>{loading}</Text>
          </View>
        ) : (
          <ScrollView
            showsVerticalScrollIndicator={false}
            style={{ backgroundColor: "#FFF" }}
          >
            <View style={{ flexDirection: "row" }}>
              <Text style={styles.title2}>FILTRO</Text>
              <Feather
                style={{ color: "#0000", fontSize: 25, marginLeft: 20 }}
                name="filter"
              />
            </View>
            <View style={styles.header}>
              <View>
                <ScrollView
                  horizontal={true}
                  showsHorizontalScrollIndicator={false}
                >
                  {itens.map((jogo) => (
                    <View key={jogo.key}>
                      <TouchableOpacity
                        key={jogo.key}
                        onPress={() => setFilter(jogo.sorteio) + setLoop(true)}
                        style={{
                          borderRadius: 7,
                          backgroundColor: "gray",
                          height: 30,
                          alignItems: "center",
                          justifyContent: "center",
                          padding: 5,
                          margin: 10,
                          backgroundColor: "#eaeaea",
                          elevation: 2,
                          paddingHorizontal: 10,
                        }}
                      >
                        <Text style={{ fontSize: 16 }}>{jogo.sorteio}</Text>
                      </TouchableOpacity>
                    </View>
                  ))}
                </ScrollView>
              </View>
            </View>

            <View style={styles.contentNew}>
              <Text style={styles.title}>Novidades</Text>
            </View>

            <ScrollView
              horizontal
              showsHorizontalScrollIndicator={false}
              style={{ paddingHorizontal: 15 }}
            >
              {!filtros
                ? jogos.map((jogo) => (
                    <View key={jogo.id}>
                      <New
                        cover={jogo.imagem}
                        name={jogo.nome}
                        status={jogo.status}
                        valor={jogo.valor}
                        description={jogo.descricao}
                        onPress={() =>
                          navigation.navigate("Detalhes", {
                            imagem: jogo.imagem,
                            imagem_small: JSON.stringify(
                              jogo.imagem_small
                            ).replace(/"/g, ""),
                            nome: jogo.nome,
                            status: jogo.status,
                            jogo_id: jogo.id,
                            descricao: jogo.descricao,
                            cota_total: JSON.stringify(jogo.cota_total).replace(
                              /"/g,
                              ""
                            ),
                            valor: jogo.valor,
                            premiacao: jogo.premiacao,
                            arquivos: jogo.uploads ? jogo.uploads : null,
                            dezenas: jogo.dezenas,
                            premiacao: jogo.premiacao,
                            concurso: jogo.concurso,
                            data: jogo.data,
                            cotas: jogo.cotas,
                          })
                        }
                      />
                    </View>
                  ))
                : filtros.map((jogo) => (
                    <View key={jogo.id}>
                      <New
                        cover={jogo.imagem}
                        name={jogo.nome}
                        status={jogo.status}
                        valor={jogo.valor}
                        description={jogo.descricao}
                        onPress={() =>
                          navigation.navigate("Detalhes", {
                            imagem: jogo.imagem,
                            imagem_small: JSON.stringify(
                              jogo.imagem_small
                            ).replace(/"/g, ""),
                            nome: jogo.nome,
                            status: jogo.status,
                            descricao: jogo.descricao,
                            jogo_id: jogo.id,
                            cota_total: JSON.stringify(jogo.cota_total).replace(
                              /"/g,
                              ""
                            ),
                            valor: jogo.valor,
                            premiacao: jogo.premiacao,
                            arquivos: jogo.uploads ? jogo.uploads : null,
                            dezenas: jogo.dezenas,
                            premiacao: jogo.premiacao,
                            concurso: jogo.concurso,
                            data: jogo.data,
                            cotas: jogo.cotas,
                          })
                        }
                      />
                    </View>
                  ))}
            </ScrollView>

            <View
              style={{
                flexDirection: "row",
                marginBottom: 10,
                alignItems: "center",
              }}
            >
              <Text style={[styles.title, { marginTop: 20 }]}>
                Maiores Chances
              </Text>
            </View>

            <ScrollView
              horizontal
              showsHorizontalScrollIndicator={false}
              style={{ paddingHorizontal: 15 }}
            >
              {jogos.map((jogo) => (
                <View key={jogo.id}>
                  <Cota
                    cover={jogo.imagem_small}
                    name={jogo.nome}
                    status={jogo.status}
                    valor={jogo.valor}
                    description={jogo.descricao}
                    onPress={() =>
                      navigation.navigate("Detalhes", {
                        imagem: jogo.imagem,
                        jogo_id: jogo.id,
                        nome: jogo.nome,
                        cota_total: JSON.stringify(jogo.cota_total).replace(
                          /"/g,
                          ""
                        ),
                        status: jogo.status,
                        descricao: jogo.descricao,
                        valor: jogo.valor,
                        premiacao: jogo.premiacao,
                        imagem_small: JSON.stringify(jogo.imagem_small).replace(
                          /"/g,
                          ""
                        ),
                        dezenas: jogo.dezenas,
                        premiacao: jogo.premiacao,
                        concurso: jogo.concurso,
                        data: jogo.data,
                        cotas: jogo.cotas,
                      })
                    }
                  />
                </View>
              ))}
            </ScrollView>
            <TouchableOpacity onPress={() => navigation.navigate("Home")}>
              <Image
                style={{
                  width: 340,
                  height: 178,
                  alignSelf: "center",
                  marginTop: 30,
                  marginBottom: 20,
                  borderRadius: 10,
                }}
                source={require("../../images/resultados.png")}
              />
            </TouchableOpacity>
          </ScrollView>
        )}
      </View>
    );
  }
}

const styles = StyleSheet.create({
  header: {
    paddingHorizontal: 15,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    width: "100%",
    marginVertical: 20,
    marginTop: 10,
  },
  inputArea: {
    paddingHorizontal: 15,
    flexDirection: "row",
    alignItems: "center",
    width: "98%",
    backgroundColor: "#eaeaea",
    elevation: 2,
    paddingHorizontal: 10,
    height: 37,
    borderRadius: 10,
  },
  input: {
    paddingHorizontal: 10,
    fontSize: 13,
    width: "90%",
  },
  contentNew: {
    flexDirection: "row",
    width: "100%",
    alignItems: "center",
  },
  title: {
    paddingHorizontal: 15,

    fontSize: 18,
    color: "#4f4a4a",
  },
  title2: {
    paddingHorizontal: 15,
    marginTop: 40,

    fontSize: 15,
    color: "#4f4a4a",
  },
  Recommended: {
    borderRadius: 10,
  },
});
