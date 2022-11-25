import { Ionicons } from "@expo/vector-icons";
import { React, useState, useEffect, useRef, useContext } from "react";
import {
  StyleSheet,
  ScrollView,Image,
  TouchableOpacity,
  BackgroundImage,
  ImageBackground,
  PixelRatio
} from "react-native";
import { View, ActionSheet } from "react-native-ui-lib"; //eslint-disable-line
import { FlatGrid } from "react-native-super-grid";
import YoutubePlayer from "react-native-youtube-iframe";
import {
  Center,
  Spinner,
  Text,
  AlertDialog,
  Button,
  Modal,
  
  FormControl,
  Input,
  HStack,
  FlatList,
} from "native-base";
import { useAposta } from "../hooks/useAposta";
import { AuthContext } from "../hooks/auth";
import { dados, optionsLab, jogadores } from "./components/variaveis";
import Cab from "./components/Header";
import Playes from "./components/Header1";
import Alerta from "./components/Alert";
import { PostJogada } from "../hooks/PostFunctions";


export default function Index({ navigation, route }) {
const chip = require("../../../assets/img/chip.png");
const chip1 = require("../../../assets/img/chip1.png");

  const [visible, setVisible] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
 const [showModal, setShowModal] = useState(false);
  const [valorMorena, setValorMorena] = useState(0);
  const [valorCaipira, setValorCaipira] = useState(0);



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
    url
  } = useContext(AuthContext);

  const salas = [
    { sala: 1, key: 1, valor1: 1, valor2: 2, valor3: 4, avatar: "tg" },
    { sala: 2, key: 2, valor1: 4, valor2: 10, valor3: 20, avatar: "iuj" },
    { sala: 3, key: 3, valor1: 20, valor2: 50, valor3: 100, avatar: "oik" },
  ];

  const carteira = user.carteira;


  const objectMap = select.reduce((map, object) => {
    map.set(object.id, object);
    return map;
  }, new Map());

  const uniqList = Array.from(objectMap, ([_, value]) => value);
 

//storeAposta([])
  
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
//console.warn(select)

  function selecionar(data) {

if(data.id.split('')[4]== "p" && valorMorena == 0)
{
  alert("Por favor escolha o valor da aposta Morena")
} else if (data.id.split("")[4] == "v" && valorCaipira == 0){

alert("Por favor escolha o valor da aposta Caipira");

} else {

  if (select.length == 0) {
    select.push(data);
  } else {
    let dados = select.find((dado) => dado.id == data.id);

    if (!dados) {
      select.push(data);
      //console.warn("aqui");
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
    
    let totais = valorCaipira + valorMorena;

    if (carteira < 2) {
      setIsOpen(true);
    } else {
      if (select.length < 1) {
        alert("Você precisa selecionar pelo menos um dado");
      } else if (carteira < totais) {
        alert("Saldo insuficiente para essa aposta");
      } else {
        let dadosApostados = uniqList.map((item) => item.id);
        let da = {
          jogada: dadosApostados,
        };

        let dadosE = JSON.stringify(da);

        let dados = uniqList.map((item) => {
          let valores = {
            jogo_id: iniciada.id,
            nome: item.nome,
            img: item.img,
            dados: item.id,
            valor: totais,
            resultado: true,
            valorCaipira:valorCaipira,
            valorMorena:valorMorena
          };

          return valores;
        });
        setShowModal(false)
        storeAposta(dados);
        putSelect(uniqList);
        putaposta_id(iniciada.id);
        editCarteira(parseInt(carteira) - parseInt(totais), user.id);
        PostJogada(user.nome, user.id, dadosE, user.email, totais, iniciada.id);
        getApostas();
        getJogada();
        setValorCaipira(0)
        setValorMorena(0);


        setTimeout(() => {
          setSelect([]);
        }, 2000);
      }
    }
  }


  useEffect(() => {
    

      if (iniciada.length != 0 && getaposta.length < 1) {
        setShowModal(true);
      }
    
  }, [iniciada])
  


  return (
    <View backgroundColor="#0c0c0e">
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

      <View style={{ flexDirection: "row", marginTop: 13 }}>
        <ScrollView showsHorizontalScrollIndicator={false} horizontal>
          <Cab></Cab>
        </ScrollView>
      </View>

      <View
        style={{
          flexDirection: "row",
          justifyContent: "space-around",
          alignItems: "center",
          margin: 10,
          marginBottom: 10,
        }}
      >
        {salas.map((element) => (
          <TouchableOpacity
            key={element.key}
            style={{
              backgroundColor: element.sala == sala.sala ? sala.cor : "gray",
              width: "30%",
              margin: 10,
              height: 30,
              borderRadius: 7,

              alignItems: "center",
              justifyContent: "center",
            }}
            onPress={() => {
              if (select.length > 0) {
                alert(
                  "Exite um jogo aberto na sala , você deve finalizar ou cancelar "
                );
              } else {
                setSala({
                  sala: element.sala,
                  cor: "#a2d5ab",
                  valor1: element.valor1,
                  valor2: element.valor2,
                  valor3: element.valor3,
                });
              }
            }}
          >
            <Text style={{ fontSize: 16 }}>Sala{element.sala}</Text>
          </TouchableOpacity>
        ))}
      </View>

      <View style={{ marginTop: 5 }}>
        <View
          style={{
            height: 500,
            marginTop: 10,
          }}
        >
          {alertaR.length != 0 && iniciada.length == 0 ? (
            <View>
              <Alerta valor={alertaR.valor} array={alertaR.resultado}></Alerta>
            </View>
          ) : (
            <></>
          )}

          <YoutubePlayer height={"48%"} play={true} videoId={url} />

          <View
            style={{
              justifyContent: "center",
              alignItems: "center",
              flaxDirection: "row",
              marginTop: 5,
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

            <View>
              <HStack mt={10} mb={5} justifyContent={"space-around"}>
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
                    onPress={() => setValorMorena(sala.valor1)}
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
                    onPress={() => setValorMorena(sala.valor2)}
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
                    onPress={() => setValorMorena(sala.valor3)}
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
                    onPress={() => setValorCaipira(sala.valor1)}
                    style={{
                      width: 35,
                      height: 35,
                      borderRadius: 5,

                      justifyContent: "center",
                      backfaceVisibility: "visible",
                      overflow: "visible",
                      backgroundColor:
                        valorCaipira == sala.valor1 ? "#daa520" : "#000",
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
                      {sala.valor1}
                    </Text>
                  </TouchableOpacity>
                  <TouchableOpacity
                    onPress={() => setValorCaipira(sala.valor2)}
                    style={{
                      width: 35,
                      borderRadius: 5,

                      height: 35,
                      justifyContent: "center",
                      backfaceVisibility: "visible",
                      overflow: "visible",
                      backgroundColor:
                        valorCaipira == sala.valor2 ? "#daa520" : "#000",
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
                      {sala.valor2}
                    </Text>
                  </TouchableOpacity>
                  <TouchableOpacity
                    onPress={() => setValorCaipira(sala.valor3)}
                    style={{
                      width: 35,
                      height: 35,
                      borderRadius: 5,

                      justifyContent: "center",
                      backfaceVisibility: "visible",
                      overflow: "visible",
                      backgroundColor:
                        valorCaipira == sala.valor3 ? "#daa520" : "#000",
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
                      {sala.valor3}
                    </Text>
                  </TouchableOpacity>
                </View>
              </HStack>

              <Center>
                <FlatList
                  numColumns={6}
                  data={dados}
                  scrollEnabled={false}
                  renderItem={({ item }) => (
                    <>
                      <TouchableOpacity
                        key={item.key}
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
                        style={{
                          width: "15%",

                          justifyContent: "center",
                          height: 55,
                          margin: 3,
                          display: "flex",
                          backfaceVisibility: "visible",
                          overflow: "visible",
                          backgroundColor: select.find(
                            (car) => car.id === item.id
                          )
                            ? "#a2d5ab"
                            : "#000",
                          borderRadius: 1,
                        }}
                      >
                        <Center>
                          <ImageBackground
                            style={{
                              width: "96%",
                              height: "96%",
                              marginLeft: 2,
                              marginTop: 2,
                            }}
                            source={item.imagem}
                          />
                        </Center>
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
                    </>
                  )}
                />
              </Center>

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
            </View>
          </View>

          <View style={styles.button}></View>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  button: {
    justifyContent: "center",
    alignItems: "center",
    marginTop:50
  },
  gridView: {
    width: 350,

    display: "flex",
  },
  itemContainer: {
    justifyContent: "center",
    alignItems: "center",
    alignSelf: "center",
    borderRadius: 0,
    paddingRight: 5,
    height: 60,
    width: 60,
  },
  itemName: {
    fontSize: 16,
    color: "#fff",
    fontWeight: "600",
  },
  itemCode: {
    fontWeight: "600",
    fontSize: 10,
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
