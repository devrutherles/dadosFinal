import { Ionicons } from "@expo/vector-icons";
import { React, useState, useEffect, useRef, useContext } from "react";
import {
  StyleSheet,
  Image,
  ScrollView,
  TouchableOpacity,
  FlatList,
  ImageBackground,
} from "react-native";
import { View, ActionSheet } from "react-native-ui-lib"; //eslint-disable-line
import YoutubePlayer from "react-native-youtube-iframe";
import {
  Center,
  Spinner,
  Text,
  AlertDialog,
  Button,
  HStack,
} from "native-base";
import { useAposta } from "../hooks/useAposta";
import { AuthContext } from "../hooks/auth";
import { dados, optionsLab, jogadores } from "./components/variaveis";
import Cab from "./components/Header";
import Playes from "./components/Header1";
import Alerta from "./components/Alert";
import { PostJogada } from "../hooks/PostFunctions";
import axios from "axios";
export default function Index({ navigation, route }) {
  const carregamento = require("../../../assets/img/dice.gif");
  const [valorMorena, setValorMorena] = useState(0);
  const [apostado, setApostado] = useState(false);

  const [valorCaipira, setValorCaipira] = useState(0);
  const chip = require("../../../assets/img/chip.png");
  const chip1 = require("../../../assets/img/chip1.png");
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
    valorc1: 1,
    valorc2: 2,
    valorc3: 4,
    cor: "#a2d5ab",
    avatar: 4,
    avatar: "jgf",
  });

  const [array_valor_apostado, setArray_valor_apostado] = useState();
  const { iniciada, numeros, resultado, nome, criada } = useAposta();
  const { salavalue } = useAposta();
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
    url,
  } = useContext(AuthContext);
  console.error(salavalue[3]);
  useEffect(() => {
    if (sala.sala == 1) {
      setSala({
        sala: 1,
        valor1: salavalue[0]?.sala1v1,
        valor2: salavalue[0]?.sala1v2,
        valor3: salavalue[0]?.sala1v3,
        valorc1: salavalue[3]?.sala1cv1,
        valorc2: salavalue[3]?.sala1cv2,
        valorc3: salavalue[3]?.sala1cv3,
        cor: "#a2d5ab",
        avatar: 4,
        avatar: "jgf",
      });
    }
  }, [salavalue && salavalue[0]]);

  const salas = [
    {
      sala: 1,
      valor1: salavalue[0]?.sala1v1,
      valor2: salavalue[0]?.sala1v2,
      valor3: salavalue[0]?.sala1v3,
      valorc1: salavalue[3]?.sala1cv1,
      valorc2: salavalue[3]?.sala1cv2,
      valorc3: salavalue[3]?.sala1cv3,
      avatar: "tg",
    },
    {
      sala: 2,
      valor1: salavalue[1]?.sala2v1,
      valor2: salavalue[1]?.sala2v2,
      valor3: salavalue[1]?.sala2v3,
      valorc1: salavalue[4]?.sala2cv1,
      valorc2: salavalue[4]?.sala2cv2,
      valorc3: salavalue[4]?.sala2cv3,
      avatar: "iuj",
    },
    {
      sala: 3,
      valor1: salavalue[2]?.sala3v1,
      valor2: salavalue[2]?.sala3v2,
      valor3: salavalue[2]?.sala3v3,
      valorc1: salavalue[5]?.sala3cv1,
      valorc2: salavalue[5]?.sala3cv2,
      valorc3: salavalue[5]?.sala3cv3,
      avatar: "oik",
    },
  ];

  const carteira = user.carteira;

  let selectMorena = select.filter(
    (item) => item.id.split("")[4] == "p"
  ).length;
  let selectCaipira = select.filter(
    (item) => item.id.split("")[4] == "v"
  ).length;
  function selecionar(data) {
    if (data.id.split("")[4] == "p" && valorMorena == 0) {
      alert("Por favor escolha o valor da aposta Morena");
    } else if (data.id.split("")[4] == "v" && valorCaipira == 0) {
      alert("Por favor escolha o valor da aposta Caipira");
    } else {
      if (select.length == 0) {
        select.push(data);
      } else {
        let dados = select.find((dado) => dado.id == data.id);

        if (!dados) {
          if (selectMorena > 3) {
            alert("Você não pode apostar mais que 3 números no morena");
            var nesSelect = select.filter((item) => item.id !== data.id);
            setSelect(nesSelect);
          } else {
            if (selectCaipira > 0 && selectMorena == 3) {
              alert("Você não pode apostar mais que 1 número no caipira");
            } else {
              select.push(data);
            }
          }
        } else {
          var nesSelect = select.filter((item) => item.id !== data.id);
          setSelect(nesSelect);
        }
      }
    }

    let dadosValor = select.map((item) => item.valor);
    setArray_valor_apostado(dadosValor);
  }

  function navigateA() {
    navigation.navigate("Wallet");
    setIsOpen(false);
  }
  function jogarD() {
    setApostado(true);

    let valorB = selectMorena > 0 ? valorMorena * selectMorena : 0;
    let valorV = selectCaipira > 0 ? valorCaipira : 0;
    ////console.warn(valorB);
    let totais = valorB + valorV;

    if (selectMorena > 3 || selectCaipira > 1) {
      alert(
        "Você não pode apostar mais que 3 números no morena e 1 no caipira"
      );
    } else {
      if (carteira < 1) {
        setIsOpen(true);
      } else {
        if (select.length < 1) {
          alert("Você precisa selecionar pelo menos um dado");
          setApostado(false);
        } else if (carteira < totais) {
          alert("Saldo insuficiente para essa aposta");
          setApostado(false);
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
              valorCaipira: valorCaipira,
              valorMorena: valorMorena,
            };

            return valores;
          });

          storeAposta(dados);
          putSelect(select);
          putaposta_id(iniciada.id);
          editCarteira(parseInt(carteira) - parseInt(totais), user.id);
          PostJogada(
            user.nome,
            user.id,
            dadosE,
            user.email,
            totais,
            iniciada.id
          );
          getApostas();
          getJogada();
          setValorCaipira(0);
          setValorMorena(0);
          setApostado(false);

          setTimeout(() => {
            setSelect([]);
          }, 2000);
        }
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
          justifyContent: "space-around",
          alignItems: "center",
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
            justifyContent: "space-around",
            color: "#a2d5ab",
          }}
        >
          <Ionicons name="wallet-outline" size={25} color="gray" />
        </View>
      </View>

      <View
        style={{
          flexDirection: "row",
          justifyContent: "space-around",
          marginTop: 30,
        }}
      >
        <Text style={{ color: "gray" }}>Jogadores Online</Text>

        <Text style={{ color: "gray" }}>
          #Sala {sala.sala} Maximo R$ {sala.valor3}
        </Text>
      </View>

      <View
        style={{
          flexDirection: "row",
          marginTop: 13,
        }}
      >
        <ScrollView horizontal>
          <Cab></Cab>
        </ScrollView>
      </View>

      <View
        style={{
          flexDirection: "row",
          justifyContent: "space-around",
          alignItems: "center",
          marginTop: 10,
        }}
      >
        {salas.map((element) => (
          <TouchableOpacity
            key={element.id}
            style={{
              backgroundColor: element.sala == sala.sala ? sala.cor : "gray",
              width: "30%",

              height: 30,
              borderRadius: 7,

              alignItems: "center",
              justifyContent: "center",
            }}
            onPress={() => {
              if (select.length > 0) {
                alert(
                  "Você precisa finalizar a aposta atual, ou cancelar os dados selecionados"
                );
              } else {
                setSala({
                  sala: element.sala,
                  cor: "#a2d5ab",
                  valor1: element.valor1,
                  valor2: element.valor2,
                  valor3: element.valor3,
                  valorc1: element.valorc1,
                  valorc2: element.valorc2,
                  valorc3: element.valorc3,
                });
              }
            }}
          >
            <Text style={{ fontSize: 16 }}>Sala{element.sala}</Text>
          </TouchableOpacity>
        ))}
      </View>

      {alertaR.length != 0 && iniciada.length == 0 ? (
        <View style={{ marginTop: 20, marginBottom: 10 }}>
          <Alerta valor={alertaR.valor} array={alertaR.resultado}></Alerta>
        </View>
      ) : (
        <></>
      )}

      {nome && iniciada.length != 0 ? (
        <View style={{ marginTop: 30 }}>
          <YoutubePlayer
            height={iniciada.length != 0 && getaposta[0] ? "55%" : "1%"}
            play={true}
            videoId={url}
            resumePlayAndroid={true}
          />
          <View
            style={{
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <Text style={styles.title}>Partida em andamento...</Text>
          </View>
        </View>
      ) : (
        <View
          style={{
            justifyContent: "center",
            alignItems: "center",
            marginTop: 30,
          }}
        >
          <Text style={styles.title}>{texto}</Text>
          <Spinner size="sm" />
        </View>
      )}

      <View>
        {iniciada.length != 0 && getaposta.length < 1 ? (
          <View>
            <HStack mt={3} mb={5} justifyContent={"space-around"}>
              <View>
                <Text style={{ color: "#fff" }}>Valor morena</Text>
              </View>
              <View style={{ alignItems: "center" }}>
                <Text style={{ color: "#fff" }}>Valor caipira</Text>
              </View>
            </HStack>
            <HStack justifyContent={"space-around"}>
              <View
                style={{
                  flexDirection: "row",
                  width: "33%",
                  justifyContent: "space-between",
                  marginBottom: 20,
                }}
              >
                <TouchableOpacity
                  onPress={() => {
                    if (valorMorena == 0) {
                      setValorMorena(sala.valor1);
                    } else {
                      setValorMorena(0);
                    }
                  }}
                  style={{
                    width: 35,
                    height: 35,
                    justifyContent: "center",
                    borderRadius: 50,
                    borderEndWidth: 1,
                    backfaceVisibility: "visible",
                    overflow: "visible",
                    borderRadius: 5,

                    backgroundColor:
                      valorMorena == sala.valor1 ? "#daa520" : "#000",
                  }}
                >
                  <Image style={{ width: 35, height: 35 }} source={chip} />
                  <Text
                    style={{
                      color: "#000",
                      position: "absolute",
                      alignSelf: "center",
                      fontWeight: "bold",

                      fontSize: 10,
                    }}
                  >
                    {sala.valor1}
                  </Text>
                </TouchableOpacity>
                <TouchableOpacity
                  onPress={() => {
                    if (valorMorena == 0) {
                      setValorMorena(sala.valor2);
                    } else {
                      setValorMorena(0);
                    }
                  }}
                  style={{
                    width: 35,
                    height: 35,
                    justifyContent: "center",
                    backfaceVisibility: "visible",
                    overflow: "visible",
                    backgroundColor:
                      valorMorena == sala.valor2 ? "#daa520" : "#000",
                    borderRadius: 5,
                  }}
                >
                  <Image style={{ width: 35, height: 35 }} source={chip} />
                  <Text
                    style={{
                      color: "#000",
                      position: "absolute",
                      alignSelf: "center",
                      fontWeight: "bold",
                      fontSize: 10,
                    }}
                  >
                    {sala.valor2}
                  </Text>
                </TouchableOpacity>
                <TouchableOpacity
                  onPress={() => {
                    if (valorMorena == 0) {
                      setValorMorena(sala.valor3);
                    } else {
                      setValorMorena(0);
                    }
                  }}
                  style={{
                    width: 35,
                    height: 35,
                    justifyContent: "center",
                    borderRadius: 5,

                    backfaceVisibility: "visible",
                    overflow: "visible",
                    backgroundColor:
                      valorMorena == sala.valor3 ? "#daa520" : "#000",
                  }}
                >
                  <Image style={{ width: 35, height: 35 }} source={chip} />
                  <Text
                    style={{
                      color: "#000",
                      position: "absolute",
                      alignSelf: "center",
                      fontWeight: "bold",
                      fontSize: 10,
                    }}
                  >
                    {sala.valor3}
                  </Text>
                </TouchableOpacity>
              </View>

              <View
                style={{
                  flexDirection: "row",
                  width: "33%",
                  justifyContent: "space-between",
                }}
              >
                <TouchableOpacity
                  onPress={() => {
                    if (valorCaipira == 0) {
                      setValorCaipira(sala.valorc1);
                    } else {
                      setValorCaipira(0);
                    }
                  }}
                  style={{
                    width: 35,
                    height: 35,
                    borderRadius: 5,

                    justifyContent: "center",
                    backfaceVisibility: "visible",
                    overflow: "visible",
                    backgroundColor:
                      valorCaipira == sala.valorc1 ? "#daa520" : "#000",
                  }}
                >
                  <Image style={{ width: 35, height: 35 }} source={chip1} />
                  <Text
                    style={{
                      color: "#fff",
                      position: "absolute",
                      alignSelf: "center",
                      fontWeight: "bold",
                      fontSize: 10,
                    }}
                  >
                    {sala.valorc1}
                  </Text>
                </TouchableOpacity>
                <TouchableOpacity
                  onPress={() => {
                    if (valorCaipira == 0) {
                      setValorCaipira(sala.valorc2);
                    } else {
                      setValorCaipira(0);
                    }
                  }}
                  style={{
                    width: 35,
                    borderRadius: 5,

                    height: 35,
                    justifyContent: "center",
                    backfaceVisibility: "visible",
                    overflow: "visible",
                    backgroundColor:
                      valorCaipira == sala.valorc2 ? "#daa520" : "#000",
                  }}
                >
                  <Image style={{ width: 35, height: 35 }} source={chip1} />
                  <Text
                    style={{
                      color: "#fff",
                      position: "absolute",
                      alignSelf: "center",
                      fontWeight: "bold",
                      fontSize: 10,
                    }}
                  >
                    {sala.valorc2}
                  </Text>
                </TouchableOpacity>
                <TouchableOpacity
                  onPress={() => {
                    if (valorCaipira == 0) {
                      setValorCaipira(sala.valorc3);
                    } else {
                      setValorCaipira(0);
                    }
                  }}
                  style={{
                    width: 35,
                    height: 35,
                    borderRadius: 5,

                    justifyContent: "center",
                    backfaceVisibility: "visible",
                    overflow: "visible",
                    backgroundColor:
                      valorCaipira == sala.valorc3 ? "#daa520" : "#000",
                  }}
                >
                  <Image style={{ width: 35, height: 35 }} source={chip1} />
                  <Text
                    style={{
                      color: "#fff",
                      position: "absolute",
                      alignSelf: "center",
                      fontWeight: "bold",
                      fontSize: 10,
                    }}
                  >
                    {sala.valorc3}
                  </Text>
                </TouchableOpacity>
              </View>
            </HStack>
          </View>
        ) : (
          <></>
        )}

        {iniciada.length != 0 && getaposta.length < 1 ? (
          <FlatList
            numColumns={6}
            data={dados}
            scrollEnabled={false}
            renderItem={({ item }) => (
              <TouchableOpacity
                style={{
                  width: "15%",

                  justifyContent: "space-around",
                  height: 55,
                  margin: 3,
                  display: "flex",
                  overflow: "visible",

                  borderRadius: 1,
                }}
                onPress={() =>
                  selecionar({
                    id: item.id,
                    valor: sala.valor1,
                    mult: item.mult,
                    key: item.key,
                    nome: item.nome,
                    img: item.imagem2,
                  })
                }
              >
                <Center>
                  <ImageBackground
                    style={{
                      width: "100%",
                      height: "100%",
                      borderRadius: 5,
                      borderWidth: 3,

                      borderColor: select.find((car) => car.id === item.id)
                        ? "#a2d5ab"
                        : "#000",
                    }}
                    source={item.imagem}
                  />
                </Center>
              </TouchableOpacity>
            )}
          />
        ) : (
          <></>
        )}
      </View>
      <View style={styles.button}>
        {apostado ? (
          <Button
            disabled
            size="lg"
            onPress={jogarD}
            backgroundColor={"#a2d5ab"}
            style={{ width: "90%", borderRadius: 7 }}
            variant={"solid"}
            _text={{
              color: "#1F2937",
            }}
            px="3"
            isLoading
            isLoadingText="Apostando"
          >
            Apostando
          </Button>
        ) : iniciada.length != 0 && getaposta.length < 1 ? (
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
  );
}

const styles = StyleSheet.create({
  button: {
    justifyContent: "center",
    alignItems: "center",
    marginTop: 10,
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
    marginTop: 1,
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
