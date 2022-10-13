import { Feather, AntDesign, Ionicons } from "@expo/vector-icons";
import { React, useState, useEffect } from "react";
import { StyleSheet, Image, ScrollView, TouchableOpacity } from "react-native";
import { View, Button, ActionSheet } from "react-native-ui-lib"; //eslint-disable-line
const carteira = require("../../../assets/img/carteira.jpeg");
const dadosR = require("../../../assets/img/dadosR.gif");
import { FlatGrid } from "react-native-super-grid";
import YoutubePlayer from "react-native-youtube-iframe";
import { Center, Spinner, Text } from "native-base";
import Alerta from "./components/Alert";
import Alerta2 from "./components/Alert2";
import { MaterialIcons } from "@expo/vector-icons";

import { dados, optionsLab, jogadores } from "./components/variaveis";
import { useAposta } from "../hooks/useAposta";
import Cab from "./components/Header";
import Playes from "./components/Header1";
import { useProfile } from "../hooks/useProfile";

export default function Index({ navigation }) {
  const carregamento = require("../../../assets/img/dice.gif");
  let valor = 0;
  const [visible, setVisible] = useState(false);
  const [select, setSelect] = useState([]);
  const [ids, setIds] = useState();
  const [sala, setSala] = useState({
    sala: 1,
    valor1: 2,
    valor2: 5,
    valor3: 10,
    cor: "#a2d5ab",
    avatar: 4,
    avatar: "jgf",
  });

  let numeros = [];
  const [aposta, setAposta] = useState(null);
  const [array_valor_apostado, setArray_valor_apostado] = useState();
  const iconCancel = require("../../../assets/icons/no.png");
  const { loading, nome, status, numeroPartida } = useAposta();
  const { token, loading2 } = useProfile();
  let dadosEscolhidos = "";
  let valorApostado = "";
  let resultadoJogo = "";
  let imagemDaosEscolhidos = [];
  let iniciada = null;
  let finalizada = null;
  let resultado = "";
  let aposta_id = "";

  const salas = [
    { sala: 1, valor1: 2, valor2: 5, valor3: 10, avatar: "tg" },
    { sala: 2, valor1: 15, valor2: 20, valor3: 25, avatar: "iuj" },
    { sala: 3, valor1: 30, valor2: 40, valor3: 60, avatar: "oik" },
  ];

  function dado(data) {
    setIds(data.id);
    setVisible(true);
  }

  if (nome.length > 0) {
    iniciada = nome.find((item) => item.status == "iniciada");
    resultado = nome.find((item) => item.status == "finalizada");

    if (resultado) {
      numeros = [
        { id: resultado.resultd1 },
        { id: resultado.resultd2 },
        { id: resultado.resultd3 },
      ];
    }

    //console.warn(resultado.id);
  }

  //console.warn(aposta);

  if (aposta) {
    // console.log(aposta);
    dadosEscolhidos = aposta.map((item) => item.nome);
    resultadoJogo = numeros.map((item) => item.nome);
    valorApostado = aposta.map((item) => item.valor);
    imagemDaosEscolhidos = aposta.find((item) => item.img);

    aposta.forEach((element) => {
      aposta_id = element.jogo_id;
    });
  }

  function selecionar(data) {
    let dado = select.find((dado) => dado.id === data.id);
    //console.log(dado);
    if (!dado) {
      select.push(data);
    }
    let dadosValor = select.map((item) => item.valor);
    setArray_valor_apostado(dadosValor);
  }

  function cancel(data) {
    for (let index = 0; index < select.length; index++) {
      const element = select[index].id;

      if (element == data.id) {
        select.splice(index, 1);
      }
    }
  }

  function novaaposta() {
    setGanhos(0);
    setIds();
    setSelect([]);
    setValor(0);
    set;
  }

  function apostas() {
    const obj2 = select;
    const obj1 = numeros;
    const result = obj2.map((obj) => ({
      ...obj,
      isPresent: obj1.some(({ id }) => id === obj.id),
    }));

    let selecionados = result.filter((car) => car.isPresent === true);

    let countObject = numeros.reduce(function (count, currentValue) {
      return (
        count[currentValue.id]
          ? ++count[currentValue.id]
          : (count[currentValue.id] = 1),
        count
      );
    }, {});

    var total = selecionados.reduce(getTotal, 0);
    function getTotal(total, item) {
      return item.valor * item.mult * countObject[item.id] + total;
    }

    valor = total;
    //console.info(valor);
  }

  if (aposta) {
    apostas();
  }

  function jogarD() {
    var totais = array_valor_apostado.reduce(
      (total, numero) => total + numero,
      0
    );

    let dados = select.map((item) => {
      let valores = {
        jogo_id: iniciada.id,
        nome: item.nome,
        img: item.img,
        dados: item.id,
        valor: totais,
      };

      return valores;
    });

    setAposta(dados);
    // console.log(aposta);
  }

  return (
    <View backgroundColor="#0c0c0e" flex>
      <View
        style={{
          flexDirection: "row",
          justifyContent: "space-between",
          alignItems: "center",
          marginHorizontal: 10,
          marginTop: "15%",
        }}
      >
        <View>
          <Playes style={{ alignSelf: "center" }} />
        </View>
        <View>
          <Text
            style={{
              color: "gray",
            }}
          >
            {token ? token.nome : <></>}
          </Text>
        </View>

        <View>
          <Text
            style={{
              fontSize: 22,
              fontWeight: "bold",
              color: "#a2d5ab",
            }}
          >
            R$ {token ? parseInt(token.carteira).toFixed(2) : <></>}
          </Text>
        </View>

        <View
          style={{
            fontSize: 28,
            fontWeight: "bold",
            marginLeft: 10,
            color: "#a2d5ab",
          }}
        >
          <Ionicons name="wallet-outline" size={25} color="gray" />
        </View>
      </View>
      <View
        style={{
          flexDirection: "row",
          justifyContent: "space-between",
          margin: 10,
          marginTop: 50,
        }}
      >
        <Text style={{ color: "gray" }}>Jogadores Online</Text>

        <Text style={{ color: "gray" }}>
          #Sala {sala.sala} Maximo R$ {sala.valor3.toFixed(2)}{" "}
        </Text>
      </View>
      <View style={{ flexDirection: "row", marginTop: 13 }}>
        <ScrollView horizontal>
          <Cab avatar={sala.avatar}></Cab>
        </ScrollView>
      </View>

      <View
        style={{
          flexDirection: "row",
          justifyContent: "space-between",
          alignItems: "center",
          margin: 10,
          marginBottom: 10,
        }}
      >
        {salas.map((element) => (
          <TouchableOpacity
            style={{
              backgroundColor: element.sala == sala.sala ? sala.cor : "gray",
              width: 110,
              margin: 10,
              height: 30,
              borderRadius: 7,

              alignItems: "center",
              justifyContent: "center",
            }}
            onPress={() => {
              setSala({
                sala: element.sala,
                cor: "#a2d5ab",
                valor1: element.valor1,
                valor2: element.valor2,
                valor3: element.valor3,
                avatar: geraStringAleatoria(2),
              });
            }}
          >
            <Text style={{ fontSize: 16 }}>Sala{element.sala}</Text>
          </TouchableOpacity>
        ))}
      </View>

      <View style={{ marginTop: 5 }}>
        {resultado &&
        aposta_id == resultado.id &&
        resultado.status == "finalizada" ? (
          <View
            style={{ flexDirection: "row", marginTop: 10, marginBottom: 10 }}
          >
            <Alerta
              array={resultado}
              dados={dadosEscolhidos}
              resultado={resultadoJogo}
              valor={valor}
            />
          </View>
        ) : (
          <></>
        )}

        {resultado ? (
          <View
            style={{
              height: 500,
              backgroundColor: "#131313",
            }}
          >
            <Center>
              <Text style={styles.title}>Aguardado inicio de nova partida</Text>

              <ScrollView key={dados.key} horizontal>
                <FlatGrid
                  verti
                  itemDimension={50}
                  data={dados}
                  style={styles.gridView}
                  spacing={10}
                  renderItem={({ item }) => (
                    <View
                      key={item.id}
                      style={[
                        styles.itemContainer,
                        {
                          backgroundColor: select.find(
                            (car) => car.id === item.id
                          )
                            ? "#fee672"
                            : item.color,
                        },
                      ]}
                    >
                      <TouchableOpacity onPress={() => dado({ id: item.id })}>
                        <Image
                          key={item.key}
                          style={{ width: 55, height: 55, marginLeft: 5 }}
                          source={item.imagem}
                        />

                        {select.map((jogo) =>
                          jogo.id == item.id ? (
                            <View
                              style={{
                                position: "absolute",
                                backgroundColor: "#fee672",
                                width: 28,
                                height: 25,
                                borderRadius: 7,
                                marginTop: 2,
                                top: -15,
                                alignContent: "space-between",
                                alignItems: "center",
                                alignSelf: "center",
                              }}
                            >
                              <Text>${jogo.valor}</Text>
                            </View>
                          ) : (
                            <></>
                          )
                        )}
                      </TouchableOpacity>
                      {item.id == ids ? (
                        <ActionSheet
                          title={"Escolha o valor"}
                          message={"teste"}
                          useNativeIOS={false}
                          options={[
                            {
                              label: "Cancelar Aposta",
                              iconSource: iconCancel,
                              onPress: () => cancel({ id: item.id }),
                            },
                            {
                              label: "R$ " + sala.valor1.toFixed(2),
                              onPress: () =>
                                selecionar({
                                  id: item.id,
                                  valor: sala.valor1,
                                  mult: item.mult,
                                  key: item.key,
                                  nome: item.nome,
                                  img: item.imagem2,
                                }),
                            },
                            {
                              label: "R$ " + sala.valor2.toFixed(2),
                              onPress: () =>
                                selecionar({
                                  id: item.id,
                                  valor: sala.valor2,
                                  mult: item.mult,
                                  key: item.key,
                                  nome: item.nome,
                                  img: item.imagem2,
                                }),
                            },
                            {
                              label: "R$ " + sala.valor3.toFixed(2),
                              onPress: () =>
                                selecionar({
                                  id: item.id,
                                  valor: sala.valor3,
                                  mult: item.mult,
                                  key: item.key,
                                  nome: item.nome,
                                  img: item.imagem2,
                                }),
                            },
                          ]}
                          visible={visible}
                          onDismiss={() => setVisible(false)}
                        />
                      ) : (
                        <></>
                      )}
                    </View>
                  )}
                />
              </ScrollView>
            </Center>

            <View style={styles.button}>
              <Button
                onPress={jogarD}
                color="#000"
                backgroundColor="#40e796"
                style={{ marginBottom: 10, width: "90%", borderRadius: 7 }}
                label="Apostar"
              ></Button>
            </View>
          </View>
        ) : (
          <></>
        )}

        {iniciada ? (
          <YoutubePlayer height={150} play={true} videoId={"AccCr6dU44s"} />
        ) : (
          <></>
        )}
      </View>
<<<<<<< Updated upstream

      {!iniciada ? (
        <ScrollView key={dados.key} horizontal>
          <FlatGrid
            verti
            listKey="4"
            itemDimension={50}
            data={dados}
            style={styles.gridView}
            spacing={10}
            renderItem={({ item }) => (
              <View
                key={item.id}
                style={[
                  styles.itemContainer,
                  {
                    backgroundColor: select.find((car) => car.id === item.id)
                      ? "#fee672"
                      : item.color,
                  },
                ]}
              >
                <TouchableOpacity onPress={() => dado({ id: item.id })}>
                  <Image
                    key={item.key}
                    style={{ width: 55, height: 55, marginLeft: 5 }}
                    source={item.imagem}
                  />

                  {select.map((jogo) =>
                    jogo.id == item.id ? (
                      <View
                        style={{
                          position: "absolute",
                          backgroundColor: "#fee672",
                          width: 28,
                          height: 25,
                          borderRadius: 7,
                          marginTop: 2,
                          top: -15,
                          alignContent: "space-between",
                          alignItems: "center",
                          alignSelf: "center",
                        }}
                      >
                        <Text>${jogo.valor}</Text>
                      </View>
                    ) : (
                      <></>
                    )
                  )}
                </TouchableOpacity>
                {item.id == ids ? (
                  <ActionSheet
                    title={"Escolha o valor"}
                    message={"teste"}
                    useNativeIOS={false}
                    options={[
                      {
                        label: "Cancelar Aposta",
                        iconSource: iconCancel,
                        onPress: () => cancel({ id: item.id }),
                      },
                      {
                        label: "R$ " + sala.valor1.toFixed(2),
                        onPress: () =>
                          selecionar({
                            id: item.id,
                            valor: sala.valor1,
                            mult: item.mult,
                            key: item.key,
                            nome: item.nome,
                            img: item.imagem2,
                          }),
                      },
                      {
                        label: "R$ " + sala.valor2.toFixed(2),
                        onPress: () =>
                          selecionar({
                            id: item.id,
                            valor: sala.valor2,
                            mult: item.mult,
                            key: item.key,
                            nome: item.nome,
                            img: item.imagem2,
                          }),
                      },
                      {
                        label: "R$ " + sala.valor3.toFixed(2),
                        onPress: () =>
                          selecionar({
                            id: item.id,
                            valor: sala.valor3,
                            mult: item.mult,
                            key: item.key,
                            nome: item.nome,
                            img: item.imagem2,
                          }),
                      },
                    ]}
                    visible={visible}
                    onDismiss={() => setVisible(false)}
                  />
                ) : (
                  <></>
                )}
              </View>
            )}
          />
        </ScrollView>
      ) : (
        <></>
      )}
=======
>>>>>>> Stashed changes
    </View>
  );
}

const styles = StyleSheet.create({
  button: {
    justifyContent: "center",
    alignItems: "center",
  },
  gridView: {
<<<<<<< Updated upstream
    width: 400,
    height: 900,
=======
>>>>>>> Stashed changes
    display: "flex",
  },
  itemContainer: {
    justifyContent: "center",
    alignItems: "center",
    alignSelf: "center",
    borderRadius: 0,
    padding: 0,
    height: 70,
    width: 70,
  },
  itemName: {
    fontSize: 16,
    color: "#fff",
    fontWeight: "600",
  },
  itemCode: {
    fontWeight: "600",
    fontSize: 12,
    color: "#fff",
  },
  title: {
    color: "gray",
    fontSize: 20,
    fontWeight: "bold",
    marginTop: 20,
    marginBottom: 20,
  },
  title1: {
    marginTop: 35,
    flexDirection: "row",
    alignItems: "center",
  },
  iconRight: {
    fontSize: 20,
    marginRight: 30,
    marginTop: 20,
    marginLeft: "23%",
    marginRight: 12,
    color: "#fff",
  },
});
