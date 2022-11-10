import { Feather, AntDesign, Ionicons } from "@expo/vector-icons";
import { React, useState, useEffect, useRef } from "react";
import { StyleSheet, Image, ScrollView, TouchableOpacity } from "react-native";
import { View, ActionSheet } from "react-native-ui-lib"; //eslint-disable-line
import { FlatGrid } from "react-native-super-grid";
import YoutubePlayer from "react-native-youtube-iframe";
import { Center, Spinner, Text, AlertDialog, Button } from "native-base";
import Alerta from "./components/Alert";
import Alerta2 from "./components/Alert2";
import { MaterialIcons } from "@expo/vector-icons";
import axios from "axios";
import { useNavigation } from "@react-navigation/native";

import { Audio } from "expo-av";
import { dados, optionsLab, jogadores } from "./components/variaveis";
import { useAposta } from "../hooks/useAposta";
import Cab from "./components/Header";
import Playes from "./components/Header1";
import { useProfile } from "../hooks/useProfile";

export default function Index({ navigation }) {
  const carregamento = require("../../../assets/img/dice.gif");
  let valor = 0;
  const [visible, setVisible] = useState(false);
  const [sound, setSound] = useState();
  const [isOpen, setIsOpen] = useState(false);
  const onClose = () => setIsOpen(false);
  const cancelRef = useRef(null);

  const [select, setSelect] = useState([]);
  const [verificaAposta, setVerificaAposta] = useState(true);
  const [ids, setIds] = useState();
  const [alertaCreditos, setAlertaCreditos] = useState(null);

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
  const { loading, nome, status, numeroPartida, carteira } = useAposta();
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

    resultado = nome.find((item) => item.status == "finalizada" && item.id);

    if (resultado) {
      numeros = [
        { id: resultado.resultd1 },
        { id: resultado.resultd2 },
        { id: resultado.resultd3 },
      ];
    }

    // //console.warn(iniciada);
  }

  const postWallet = (valor, wallet, verifica) => {
    let id = token ? token.id : 1;

    const options = {
      method: "PUT",
      url: "https://rutherles.site/api/usuario/" + id,
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        Authorization:
          "Token eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpc3MiOiJodHRwOi8vMTM3LjE4NC40OC42Ny9hcGkvbG9naW4iLCJpYXQiOjE2NjIwMzY2NzksImV4cCI6MjI2NjUzMjMwOTg5OSwibmJmIjoxNjYyMDM2Njc5LCJqdGkiOiJObWxKdHczbmZUTWtLSFRSIiwic3ViIjoiODEiLCJwcnYiOiIyM2JkNWM4OTQ5ZjYwMGFkYjM5ZTcwMWM0MDA4NzJkYjdhNTk3NmY3In0.qDXH1Mqh_MRK-zS5wYysCYgKht9yZB1YUOWUYgWKOaM",
      },
      data: { carteira: parseInt(valor) + parseInt(wallet) },
    };

    axios
      .request(options)
      .then(function (response) {
        verifica ? setVerificaAposta(true) : setVerificaAposta(false);
      })
      .catch(function (error) {
        ////console.error(error);
      });
  };

  if (aposta) {
    //console.warn(aposta.id);
    dadosEscolhidos = aposta.map((item) => item.nome);
    resultadoJogo = numeros.map((item) => item.nome);
    valorApostado = aposta.map((item) => item.valor);
    imagemDaosEscolhidos = aposta.find((item) => item.img);

    aposta.forEach((element) => {
      aposta_id = element.jogo_id;
    });

    resultado = nome.find(
      (car) => car.id == aposta_id && car.status == "finalizada"
    );

    //console.warn(resultado);
  }

  function selecionar(data) {
    let dado = select.find((dado) => dado.id === aposta_id);
    /////console.log()(dado);
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

  async function playSound() {
    ////console.warn("Loading Sound");
    const { sound } = await Audio.Sound.createAsync(
      require("../../../assets/som.mp3")
    );

    setSound(sound);

    ////console.warn("Playing Sound");
    await sound.playAsync();
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

  function navigateA() {
    navigation.navigate("Wallet");
    setIsOpen(false);
  }

  function jogarD() {
    if (carteira < 2) {
      setIsOpen(true);
    } else {
      if (select.length < 1) {
        alert("Você precisa selecionar pelo menos um dado");
      } else {
        playSound();

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
            resultado: true,
          };

          return valores;
        });

        setAposta(dados);
        postWallet(-totais, carteira, true);
      }
    }
  }

  if (resultado && valor > 0 && aposta_id == resultado.id && verificaAposta) {
    playSound();

    postWallet(valor, carteira);
    setTimeout(() => {
      setAposta(null);
      setSelect([]);
      setVerificaAposta(true);
    }, 10000);
  }

  if (resultado && valor == 0 && aposta_id == resultado.id && verificaAposta) {
    let valorApostado = "";

    aposta.forEach((element) => {
      valorApostado = element.valor;
    });
    playSound();

    postWallet(-valorApostado, carteira);
    setTimeout(() => {
      setAposta(null);
      setSelect([]);
      setVerificaAposta(true);
    }, 10000);
  }

  return (
    <View backgroundColor="#0c0c0e" flex>
      <Center>
        <AlertDialog
          leastDestructiveRef={cancelRef}
          isOpen={isOpen}
          onClose={onClose}
        >
          <AlertDialog.Content>
            <AlertDialog.CloseButton />
            <AlertDialog.Header>Adicionar créditos</AlertDialog.Header>
            <AlertDialog.Body>
              Você precisa adicionar créditos a sua carteira para fazer uma
              aposta
            </AlertDialog.Body>
            <AlertDialog.Footer>
              <Button.Group space={2}>
                <Button
                  variant="unstyled"
                  colorScheme="coolGray"
                  onPress={onClose}
                  ref={cancelRef}
                >
                  Cancelar
                </Button>
                <Button colorScheme="danger" onPress={navigateA}>
                  Adicionar
                </Button>
              </Button.Group>
            </AlertDialog.Footer>
          </AlertDialog.Content>
        </AlertDialog>
      </Center>

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
            R$ {carteira ? parseInt(carteira).toFixed(2) : <></>}
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
          <Cab></Cab>
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

        {iniciada ? (
          <View
            style={{
              height: 500,
              backgroundColor: "#000",
            }}
          >
            <YoutubePlayer
              height={aposta ? 300 : 150}
              play={true}
              videoId={"AccCr6dU44s"}
            />
            {aposta ? (
              <View style={{ justifyContent: "center", alignItems: "center" }}>
                <Spinner color="emerald.500" />
                <Text style={styles.title}>Aguardado resultado ...</Text>
              </View>
            ) : (
              <></>
            )}

            <Center>
              {iniciada && !aposta ? (
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
                              : "#000",
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
                                onPress: () => setSelect([]),
                              },

                              {
                                label: "Cancelar Dado",

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
            </Center>
            {iniciada && !aposta ? (
              <View style={styles.button}>
                <Button
                  size="lg"
                  onPress={jogarD}
                  backgroundColor={"#a2d5ab"}
                  style={{ width: "90%", borderRadius: 7 }}
                  variant={"solid"}
                  _text={{
                    color: "#1F2937",
                  }}
                  px="3"
                >
                  Apostar
                </Button>
              </View>
            ) : (
              <></>
            )}
          </View>
        ) : (
          <></>
        )}
      </View>

      {!iniciada ? (
        <View
          style={{
            height: 500,
            backgroundColor: "#131313",
            alignItems: "center",
            marginTop: 10,
            marginBottom: 30,
          }}
        >
          <Image
            style={{ width: "30%", height: 130, margin: 3 }}
            source={carregamento}
          />
          <Text style={styles.title}>Aguardando nova rodada...</Text>

          {resultado && aposta_id == resultado.id ? (
            <></>
          ) : (
            <Center>
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
                            : "#131313",
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
                              onPress: () => setSelect([]),
                            },

                            {
                              label: "Cancelar Dado",
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
          )}
        </View>
      ) : (
        <></>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  button: {
    justifyContent: "center",
    alignItems: "center",
  },
  gridView: {
    width: 400,

    display: "flex",
  },
  itemContainer: {
    justifyContent: "center",
    alignItems: "center",
    alignSelf: "center",
    borderRadius: 0,
    paddingRight: 10,
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
    marginTop: 10,
    marginBottom: 10,
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
