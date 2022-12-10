import { Feather, AntDesign, Ionicons } from "@expo/vector-icons";
<<<<<<< HEAD
import { React, useState, useEffect, useRef, useContext } from "react";
import { StyleSheet, Image, ScrollView, TouchableOpacity } from "react-native";
import { View, ActionSheet } from "react-native-ui-lib"; //eslint-disable-line
import { FlatGrid } from "react-native-super-grid";
import YoutubePlayer from "react-native-youtube-iframe";
import { Center, Spinner, Text, AlertDialog, Button } from "native-base";
import Alerta from "./components/Alert";

import { PostJogada, PutAdm } from "../hooks/PostFunctions";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useUrl } from "../hooks/useUrl";
import { AuthContext } from "../hooks/auth";
import axios from "axios";

import { dados, optionsLab, jogadores } from "./components/variaveis";
import Cab from "./components/Header";
import Playes from "./components/Header1";

export default function Index({ navigation, route }) {
  const { user, handleUser } = useContext(AuthContext);
  let carteira = user.carteira;
  const carregamento = require("../../../assets/img/dice.gif");
  let valor = 0;
  const [visible, setVisible] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const onClose = () => setIsOpen(false);
  const cancelRef = useRef(null);
  const [nome, setNome] = useState([]);
  const [select, setSelect] = useState([]);
  const [atualizar, setAtualizar] = useState();

  const [getaposta, setGetaposta] = useState(null);

  const [verificaAposta, setVerificaAposta] = useState(true);
  const [ids, setIds] = useState();

  const [sala, setSala] = useState({
    sala: 1,
    valor1: 1,
    valor2: 2,
    valor3: 4,
=======
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
>>>>>>> parent of cecb1dc (update)
    cor: "#a2d5ab",
    avatar: 4,
    avatar: "jgf",
  });

  let numeros = [];
<<<<<<< HEAD
  const [array_valor_apostado, setArray_valor_apostado] = useState();

=======
  const [aposta, setAposta] = useState(null);
  const [array_valor_apostado, setArray_valor_apostado] = useState();
  const iconCancel = require("../../../assets/icons/no.png");
  const { loading, nome, status, numeroPartida } = useAposta();
  const { token, loading2 } = useProfile();
>>>>>>> parent of cecb1dc (update)
  let dadosEscolhidos = "";
  let valorApostado = "";
  let resultadoJogo = "";
  let imagemDaosEscolhidos = [];
  let iniciada = null;
<<<<<<< HEAD
  let resultado = "";
  let aposta_id = "";
  const salas = [
    { sala: 1, valor1: 1, valor2: 2, valor3: 4, avatar: "tg" },
    { sala: 2, valor1: 4, valor2: 10, valor3: 20, avatar: "iuj" },
    { sala: 3, valor1: 20, valor2: 50, valor3: 100, avatar: "oik" },
  ];
  const { url } = useUrl();

  useEffect(() => {
    const timeout = setTimeout(() => {
      const options = {
        method: "GET",
        url: "https://morenacaipira.com/api/rodada",
        headers: { Accept: "application/json" },
      };

      axios
        .request(options)
        .then(function (response) {
          //console.error(response.data);
          setNome(response.data);
        })
        .catch(function (error) {});
    }, 3500);

    return () => {
      clearTimeout(timeout);
    };
  }, [nome]);

  const getApostas = async () => {
    try {
      const jsonValue = await AsyncStorage.getItem("@apostas");
      return jsonValue != null ? setGetaposta(JSON.parse(jsonValue)) : null;
    } catch (e) {}
  };

  const storeAposta = async (value) => {
    try {
      const jsonValue = JSON.stringify(value);
      await AsyncStorage.setItem("@apostas", jsonValue);
    } catch (e) {}
  };

  useEffect(() => {
    getApostas();
    handleUser();
  }, []);

  function dado(data) {
    if (select.length > 0) {
      if (select.find((item) => item.id == data.id)) {
        let teste = select.find((item) => item.id == data.id);

        let teste2 = select.filter((item) => item != teste);
        setSelect(teste2);
      } else {
        setIds(data.id);
        setVisible(true);
      }
    } else {
      setIds(data.id);
      setVisible(true);
    }
  }

  iniciada = nome.find((item) => item.status == "iniciada");

  const postWallet = (valor, wallet, verifica) => {
    let id = user.id;

    const options = {
      method: "PUT",
      url: "https://morenacaipira.com/api/usuario/" + id,
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
      .catch(function (error) {});
  };

  if (getaposta) {
    dadosEscolhidos = getaposta.map((item) => item.nome);
    resultadoJogo = numeros.map((item) => item.nome);
    valorApostado = getaposta.map((item) => item.valor);
    imagemDaosEscolhidos = getaposta.find((item) => item.img);
    handleUser(user.id);

    getaposta.forEach((element) => {
      aposta_id = element.jogo_id;
    });

    resultado = nome.find(
      (car) => car.id == aposta_id && car.status == "finalizada"
    );
=======
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
>>>>>>> parent of cecb1dc (update)

    if (resultado) {
      numeros = [
        { id: resultado.resultd1 },
        { id: resultado.resultd2 },
        { id: resultado.resultd3 },
      ];
    }
<<<<<<< HEAD
  }

  function selecionar(data) {
    let dado = select.find((dado) => dado.id === aposta_id);
=======

    ////console.warn(resultado.id);
  }

  ////console.warn(aposta);

  if (aposta) {
    // ///console.log()(aposta);
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
    /////console.log()(dado);
>>>>>>> parent of cecb1dc (update)
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

<<<<<<< HEAD
=======
  function novaaposta() {
    setGanhos(0);
    setIds();
    setSelect([]);
    setValor(0);
    set;
  }

>>>>>>> parent of cecb1dc (update)
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
<<<<<<< HEAD
  }

  if (getaposta) {
    apostas();
  }

  function navigateA() {
    navigation.navigate("Wallet");
    setIsOpen(false);
  }

  async function jogarD() {
    let totais = array_valor_apostado.reduce((total, numero) => total + numero);

    if (carteira < 2) {
      setIsOpen(true);
    } else {
      if (select.length < 1) {
        alert("Você precisa selecionar pelo menos um dado");
      } else if (carteira < totais) {
        alert("Saldo insuficiente para essa aposta");
      } else {
        let dadosApostados = select.map((item) => item.id);

        let da = {
          jogada: dadosApostados,
        };

        let dadosE = JSON.stringify(da);

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

        storeAposta(dados);
        getApostas();

        let email = user.email;
        let valorapostadoT = totais;
        postWallet(-totais, carteira, true);
        PostJogada(user.nome, user.id, dadosE, email, valorapostadoT);
      }
    }
  }

  if (resultado && valor > 0 && aposta_id == resultado.id && verificaAposta) {
    postWallet(valor, carteira);

    setTimeout(() => {
      storeAposta(null);
      getApostas();
      setSelect([]);

      setVerificaAposta(true);
    }, 10000);
  }

  if (resultado && valor == 0 && aposta_id == resultado.id && verificaAposta) {
    let valorApostado = "";

    getaposta.forEach((element) => {
      valorApostado = element.valor;
    });

    setTimeout(() => {
      storeAposta(null);
      getApostas();

      setSelect([]);
      setVerificaAposta(true);
    }, 10000);
=======
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
    // ///console.log()(aposta);
>>>>>>> parent of cecb1dc (update)
  }

  return (
    <View backgroundColor="#0c0c0e" flex>
<<<<<<< HEAD
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

=======
>>>>>>> parent of cecb1dc (update)
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
<<<<<<< HEAD
            {user.nome ? user.nome.split(" ")[0] : "usuario"}
=======
            {token ? token.nome : <></>}
>>>>>>> parent of cecb1dc (update)
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
<<<<<<< HEAD
            {user ? "R$ " + parseInt(user.carteira).toFixed(2) : 0.0}
=======
            R$ {token ? parseInt(token.carteira).toFixed(2) : <></>}
>>>>>>> parent of cecb1dc (update)
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
<<<<<<< HEAD
          marginTop: 30,
=======
          marginTop: 50,
>>>>>>> parent of cecb1dc (update)
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
<<<<<<< HEAD
        <ScrollView horizontal style={{ paddingHorizontal: 5 }}>
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
        </ScrollView>
      </View>

      <ScrollView>
        <View style={{ marginTop: 5 }}>
          {iniciada ? (
            <View
              style={{
                height: 500,
                backgroundColor: "#000",
              }}
            >
              <YoutubePlayer
                height={getaposta ? 300 : 170}
                play={true}
                videoId={url}
              />
              {getaposta ? (
                <View
                  style={{ justifyContent: "center", alignItems: "center" }}
                >
                  <Spinner color="emerald.500" />
                  <Text style={styles.title}>Aguardado resultado ...</Text>
                </View>
              ) : (
                <></>
              )}

              <Center>
                {iniciada && !getaposta ? (
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
                          <TouchableOpacity
                            onPress={() => dado({ id: item.id })}
                          >
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
              {iniciada && !getaposta ? (
                <View style={styles.button}>
                  <Button
                    size="lg"
                    onPress={jogarD}
                    // onPress={apostas}

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
      </ScrollView>

      {!iniciada ? (
        <ScrollView>
=======
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
>>>>>>> parent of cecb1dc (update)
          <View
            style={{
              height: 500,
              backgroundColor: "#131313",
<<<<<<< HEAD
              alignItems: "center",
              marginTop: 10,
              marginBottom: 30,
            }}
          >
            {resultado &&
            aposta_id == resultado.id &&
            resultado.status == "finalizada" ? (
              <View
                style={{
                  flexDirection: "row",
                  marginTop: 10,
                  marginBottom: 10,
                }}
              >
                <Alerta
                  array={resultado}
                  dados={dadosEscolhidos}
                  resultado={resultadoJogo}
                  valor={valor}
                />
              </View>
            ) : (
              <Image
                style={{ width: "30%", height: 130, margin: 3 }}
                source={carregamento}
              />
            )}

            <Text style={styles.title}>Aguardando nova rodada...</Text>

            {resultado && aposta_id == resultado.id ? (
              <></>
            ) : (
              <Center>
=======
            }}
          >
            <Center>
              <Text style={styles.title}>Aguardado inicio de nova partida</Text>
              {iniciada ? (
>>>>>>> parent of cecb1dc (update)
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
<<<<<<< HEAD
                              : "#131313",
=======
                              : item.color,
>>>>>>> parent of cecb1dc (update)
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
<<<<<<< HEAD

                                onPress: () => setSelect([]),
                              },

                              {
                                label: "Cancelar Dado",
=======
                                iconSource: iconCancel,
>>>>>>> parent of cecb1dc (update)
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
<<<<<<< HEAD
              </Center>
            )}
          </View>
=======
              ) : (
                <></>
              )}
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
      </View>

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
>>>>>>> parent of cecb1dc (update)
        </ScrollView>
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
<<<<<<< HEAD
=======
    height: 900,
>>>>>>> parent of cecb1dc (update)

    display: "flex",
  },
  itemContainer: {
    justifyContent: "center",
    alignItems: "center",
    alignSelf: "center",
    borderRadius: 0,
<<<<<<< HEAD
    paddingRight: 10,
=======
    padding: 0,
>>>>>>> parent of cecb1dc (update)
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
<<<<<<< HEAD
    marginTop: 10,
    marginBottom: 10,
=======
    marginTop: 20,
    marginBottom: 20,
>>>>>>> parent of cecb1dc (update)
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
