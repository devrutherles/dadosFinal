import { Ionicons } from "@expo/vector-icons";
import { React, useState, useEffect, useRef, useContext } from "react";
import { StyleSheet, Image, ScrollView, TouchableOpacity } from "react-native";
import { View, ActionSheet } from "react-native-ui-lib"; //eslint-disable-line
import { FlatGrid } from "react-native-super-grid";
import YoutubePlayer from "react-native-youtube-iframe";
import { Center, Spinner, Text, AlertDialog, Button } from "native-base";
import { useAposta } from "../hooks/useAposta";
import { useUrl } from "../hooks/useUrl";
import { AuthContext } from "../hooks/auth";
import { dados, optionsLab, jogadores } from "./components/variaveis";
import Cab from "./components/Header";
import Playes from "./components/Header1";
import Alerta from "./components/Alert";
import { PostJogada } from "../hooks/PostFunctions";

export default function Index({ navigation, route }) {
  const carregamento = require("../../../assets/img/dice.gif");

  const [visible, setVisible] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const onClose = () => setIsOpen(false);
  const cancelRef = useRef(null);
  const [select, setSelect] = useState([]);
  const [ids, setIds] = useState();
  let valor = null;
  const [sala, setSala] = useState({
    sala: 1,
    valor1: 1,
    valor2: 2,
    valor3: 4,
    cor: "#a2d5ab",
    avatar: 4,
    avatar: "jgf",
  });

  const [array_valor_apostado, setArray_valor_apostado] = useState();
  const { iniciada, numeros, resultado, nome, criada } = useAposta();

  const {
    user,
    putaposta_id,
    alertaR,
    aposta_id,
    editCarteira,
    getJogada,
    getApostas,
    storeAposta,
    getaposta,
    putSelect,
    texto,
  } = useContext(AuthContext);

  const salas = [
    { sala: 1, valor1: 1, valor2: 2, valor3: 4, avatar: "tg" },
    { sala: 2, valor1: 4, valor2: 10, valor3: 20, avatar: "iuj" },
    { sala: 3, valor1: 20, valor2: 50, valor3: 100, avatar: "oik" },
  ];

  const carteira = user.carteira;
  const { url } = useUrl();

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

  function selecionar(data) {
    let dado = select.find((dado) => dado.id === aposta_id);
    if (!dado) {
      select.push(data);
    }
    let dadosValor = select.map((item) => item.valor);
    setArray_valor_apostado(dadosValor);
  }

  function navigateA() {
    navigation.navigate("Wallet");
    setIsOpen(false);
  }
  function jogarD() {
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
        putSelect(select);
        putaposta_id(iniciada.id);
        editCarteira(parseInt(carteira) - parseInt(totais), user.id);
        PostJogada(user.nome, user.id, dadosE, user.email, totais, iniciada.id);
        getApostas();
        getJogada();

        setTimeout(() => {
          setSelect([]);
        }, 2000);
      }
    }
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
          marginTop: "10%",
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
            {user.nome ? user.nome.split(" ")[0] : "--"}
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
            {user ? (
              "R$ " + parseInt(user.carteira).toFixed(2)
            ) : (
              <Spinner size="sm" />
            )}
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
          marginTop: 30,
        }}
      >
        <Text style={{ color: "gray" }}>Jogadores Online</Text>

        <Text style={{ color: "gray" }}>
          #Sala {sala.sala} Maximo R$ {sala.valor3.toFixed(2)}{" "}
        </Text>
      </View>

      {iniciada.length == 0 &&
      getaposta.length == 0 &&
      resultado.length != 0 ? (
        <View style={{ flexDirection: "row", marginTop: 13 }}>
          <ScrollView horizontal>
            <Cab></Cab>
          </ScrollView>
        </View>
      ) : (
        <></>
      )}

      <View
        style={{
          flexDirection: "row",
          justifyContent: "space-between",
          alignItems: "center",
          margin: 10,
          marginBottom: 10,
        }}
      >
        <ScrollView horizontal style={{ paddingHorizontal: 5 }}>
          {salas.map((element) => (
            <TouchableOpacity
              key={element.id}
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
          <View
            style={{
              height: 500,
              marginTop: 10,
            }}
          >
            {nome && iniciada.length != 0 ? (
              <YoutubePlayer
                height={getaposta[0] ? 230 : 170}
                play={true}
                videoId={url}
              />
            ) : (
              <></>
            )}

            {alertaR.length != 0 && iniciada.length == 0 ? (
              <View>
                <Alerta
                  valor={alertaR.valor}
                  array={alertaR.resultado}
                ></Alerta>
              </View>
            ) : (
              <></>
            )}

            <View
              style={{
                justifyContent: "center",
                alignItems: "center",
                flaxDirection: "row",
                marginTop: 0,
              }}
            >
              <Text style={styles.title}>
                {!iniciada.id && !getaposta.jogo_id ? texto : <></>}

                {iniciada.length != 0 && getaposta[0] ? (
                  "Partida em andamento..."
                ) : (
                  <></>
                )}
              </Text>
              {iniciada.length == 0 ? <Spinner size="sm" /> : <></>}
            </View>

            <Center>
              <ScrollView key={dados.key} horizontal>
                {iniciada.length != 0 && getaposta.length == 0 ? (
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
                                key={jogo.nome}
                                style={{
                                  position: "absolute",
                                  backgroundColor: "#fee672",
                                  width: 33,
                                  height: 22,
                                  borderRadius: 100,
                                  marginTop: 2,
                                  top: -15,
                                  alignContent: "space-between",
                                  alignItems: "center",
                                  alignSelf: "center",
                                }}
                              >
                                <Text style={{ marginTop: 2 }}>
                                  ${jogo.valor}
                                </Text>
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
                ) : (
                  <></>
                )}
              </ScrollView>
            </Center>

            <View style={styles.button}>
              {iniciada.length != 0 && getaposta.length < 1 ? (
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
              ) : (
                <></>
              )}
            </View>
          </View>
        </View>
      </ScrollView>
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
