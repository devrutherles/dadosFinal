import React, { useEffect } from "react";
import {
  View,
  Image,
  StyleSheet,
  ScrollView,
  Text,
  TouchableOpacity,
} from "react-native";
import { Divider } from "native-base";
import Price from "./components/Price";
import Duration from "./components/Duration";
import Notfund from "./components/Notfund";
import Notfund2 from "./components/Notfund2";
import { AntDesign } from "@expo/vector-icons";
import Compra from "./components/Compra";
import { useNavigation } from "@react-navigation/native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import axios from "axios";

import {
  Center,
  FormControl,
  Select,
  CheckIcon,
  WarningOutlineIcon,
} from "native-base";

export default function Detalhes({ route }) {
  const {
    imagem,
    nome,
    valor,
    cota_total,
    cotas,
    descricao,
    premiacao,
    arquivos,
    imagem_small,
    dezenas,
    concurso,
    data,
    jogo_id,
  } = route.params;

  let arquivo = arquivos ? arquivos.replace(/'/g, '"') : null;
  let comprovante = JSON.parse("[" + arquivo + "]");
  const [duration, setDuration] = React.useState();
  let preco = duration ? parseInt(duration) * parseInt(valor) : valor;
  let pregoOriginal = parseInt(JSON.stringify(valor).replace(/"/g, ""));

  const [loader, setloader] = React.useState(false);
  const [carteira, setCarteira] = React.useState();
  const [user, setUser] = React.useState();

  let users = "";

  useEffect(() => {
    /////console.log()(cotas);

    const getData = async () => {
      try {
        const value = await AsyncStorage.getItem("@user");
        if (value !== null) {
          /////console.log()(value);
          setUser(value);
          setloader(true);
        }
      } catch (e) {
        // error reading value
      }
    };

    getData();
    /////console.log()(preco);
  }, []);

  if (loader) {
    users = JSON.parse(user);
    /////console.log()(users);
    var id = users.id;

    const options = {
      method: "GET",
      url: "https://morenacaipira.com/api/usuario/" + id,
      headers: {
        Accept: "application/json",
        Authorization:
          "Token eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpc3MiOiJodHRwOi8vMTM3LjE4NC40OC42Ny9hcGkvbG9naW4iLCJpYXQiOjE2NjIwMzY2NzksImV4cCI6MjI2NjUzMjMwOTg5OSwibmJmIjoxNjYyMDM2Njc5LCJqdGkiOiJObWxKdHczbmZUTWtLSFRSIiwic3ViIjoiODEiLCJwcnYiOiIyM2JkNWM4OTQ5ZjYwMGFkYjM5ZTcwMWM0MDA4NzJkYjdhNTk3NmY3In0.qDXH1Mqh_MRK-zS5wYysCYgKht9yZB1YUOWUYgWKOaM",
      },
    };

    axios
      .request(options)
      .then(function (response) {
        setCarteira(response.data[0].carteira);
        /////console.log()(carteira);
      })
      .catch(function (error) {
        //////console.error(error);
      });
  }
  const navigation = useNavigation();
  return (
    <View
      style={{ backgroundColor: "#fff" }}
      scrollable={false}
      hasSafeArea={false}
    >
      <ScrollView
        contentContainerStyle={StyleSheet.flatten([
          styles.scrollViewEF,
          {
            backgroundColor: "#fff",
            borderRadius: 10,
          },
        ])}
        horizontal={false}
        showsHorizontalScrollIndicator={true}
        showsVerticalScrollIndicator={true}
        bounces={true}
      >
        <View style={styles.title1}>
          <TouchableOpacity onPress={() => navigation.navigate("Pay")}>
            <AntDesign style={styles.iconRight} name="left" />
          </TouchableOpacity>
          <Text style={styles.title}> Detalhes</Text>

          <Text>.</Text>
        </View>

        <Image
          style={styles.image}
          source={{ uri: JSON.stringify(imagem).replace(/"/g, "") }}
        />

        <View style={styles.view1R}>
          <Text style={StyleSheet.flatten([styles.text7A, { color: "#000" }])}>
            {JSON.stringify(nome)}
          </Text>
          <Divider style={styles.divider7Z} color={"#999"} />
          <Text style={StyleSheet.flatten([styles.textK6, { color: "#999" }])}>
            {JSON.stringify(descricao).replace(/"/g, "")}
          </Text>
        </View>
        <View
          style={StyleSheet.flatten([
            styles.view4P,
            { backgroundColor: "#fafafa" },
          ])}
        >
          <Text style={StyleSheet.flatten([{ color: "#000" }])}>
            Duração (Semanas)
          </Text>
        </View>
        <View style={styles.viewUd}>
          <View style={styles.viewP5}>
            <View>
              <Center>
                <FormControl w="3/4" maxW="300" isRequired>
                  <Select
                    minWidth="100%"
                    accessibilityLabel="Choose Service"
                    placeholder="Escolha a duração"
                    _selectedItem={{
                      bg: "teal.600",
                      endIcon: <CheckIcon size={5} />,
                    }}
                    mt="1"
                    onValueChange={(itemValue) => setDuration(itemValue)}
                  >
                    <Select.Item label="1 Semana" value="1" />
                    <Select.Item label="2 Semanas" value="2" />
                    <Select.Item label="3 Semanas" value="3" />
                    <Select.Item label="4 Semanas" value="4" />
                    <Select.Item label="5 Semanas" value="5" />
                  </Select>
                  <FormControl.ErrorMessage
                    leftIcon={<WarningOutlineIcon size="xs" />}
                  >
                    Porfavor selecione a duração
                  </FormControl.ErrorMessage>
                </FormControl>
              </Center>
            </View>
          </View>
        </View>

        <View
          style={StyleSheet.flatten([
            styles.view4P,
            { backgroundColor: "#fafafa" },
          ])}
        >
          <Text style={StyleSheet.flatten([{ color: "#000" }])}>Premiação</Text>
        </View>
        <View style={styles.viewUd}>
          <View style={styles.viewP5}>
            <Text
              style={StyleSheet.flatten([styles.textFb, { color: "#999" }])}
            >
              {JSON.stringify(premiacao).replace(/"/g, "")}
            </Text>
          </View>
        </View>

        <View
          style={StyleSheet.flatten([
            styles.view4P,
            { backgroundColor: "#fafafa" },
          ])}
        >
          <Text style={StyleSheet.flatten([{ color: "#000" }])}>Descrição</Text>
        </View>

        <View style={styles.viewUd}>
          <View style={styles.viewP5}>
            <Text
              style={StyleSheet.flatten([styles.textFb1, { color: "#999" }])}
            >
              {JSON.stringify(descricao).replace(/"/g, "")}
            </Text>
          </View>
        </View>

        <View
          style={StyleSheet.flatten([
            styles.view4P,
            { backgroundColor: "#fafafa" },
          ])}
        >
          <Text style={StyleSheet.flatten([{ color: "#000" }])}>Dezenas</Text>
        </View>

        <View style={styles.viewUd}>
          <View style={styles.viewP5}>
            <Text
              style={StyleSheet.flatten([styles.textFb1, { color: "#999" }])}
            >
              {JSON.stringify(dezenas).replace(/"/g, "")}
            </Text>
          </View>
        </View>

        <View
          style={StyleSheet.flatten([
            styles.view4P,
            { backgroundColor: "#fafafa" },
          ])}
        >
          <Text style={StyleSheet.flatten([{ color: "#000" }])}>
            Cotas disponíveis
          </Text>
        </View>

        <View style={styles.viewUd}>
          <View style={styles.viewP5}>
            <Text
              style={StyleSheet.flatten([styles.textFb1, { color: "#999" }])}
            >
              {JSON.stringify(cota_total).replace(/"/g, "")}
            </Text>
          </View>
        </View>

        <View
          style={StyleSheet.flatten([
            styles.view4P,
            { backgroundColor: "#fafafa" },
          ])}
        >
          <Text style={StyleSheet.flatten([{ color: "#000" }])}>
            Cotas totais
          </Text>
        </View>

        <View style={styles.viewUd}>
          <View style={styles.viewP5}>
            <Text
              style={StyleSheet.flatten([styles.textFb1, { color: "#999" }])}
            >
              {cotas}
            </Text>
          </View>
        </View>

        <View
          style={StyleSheet.flatten([
            styles.view4P,
            { backgroundColor: "#fafafa" },
          ])}
        >
          <Text style={StyleSheet.flatten([{ color: "#000" }])}>
            Data limite
          </Text>
        </View>

        <View style={styles.viewUd}>
          <View style={styles.viewP5}>
            <Text
              style={StyleSheet.flatten([styles.textFb1, { color: "#999" }])}
            >
              {data}
            </Text>
          </View>
        </View>

        <View
          style={StyleSheet.flatten([
            styles.view4P,
            { backgroundColor: "#fafafa" },
          ])}
        >
          <Text style={StyleSheet.flatten([{ color: "#000" }])}>Arquivos</Text>
        </View>
        <View style={styles.viewUd}>
          <View style={styles.viewP5}>
            <Text
              style={StyleSheet.flatten([styles.textFb1, { color: "#999" }])}
            ></Text>
          </View>
        </View>
        <View
          style={StyleSheet.flatten([styles.view3H, { borderColor: "#999" }])}
        ></View>
        <View style={styles.cotas}>
          <View
            style={StyleSheet.flatten([
              styles.viewBR1,
              {
                height: 60,
              },
            ])}
          >
            <Price price={duration ? preco : pregoOriginal} />
          </View>

          <View
            style={StyleSheet.flatten([
              styles.viewBR,
              {
                borderColor: "#fff",
                borderRadius: 10,
              },
            ])}
          ></View>
        </View>
        <View style={styles.comprar}>
          {cota_total < 1 ? <Notfund2 /> : <View></View>}

          {cota_total > 1 ? (
            carteira < preco ? (
              <Notfund />
            ) : (
              <Compra
                nome={JSON.stringify(nome)}
                dezenas={JSON.stringify(dezenas)}
                premiacao={premiacao}
                concurso={concurso}
                jogo_id={jogo_id}
                carteira={carteira}
                data={data}
                imagem_small={JSON.stringify(imagem_small).replace(/"/g, "")}
                cota_total={cota_total}
                valor={pregoOriginal}
              />
            )
          ) : (
            <View></View>
          )}
        </View>
      </ScrollView>
    </View>
  );
}
const styles = StyleSheet.create({
  text7A: {
    textAlign: "center",
  },
  view1R: {
    paddingLeft: 24,
    paddingRight: 24,
    paddingBottom: 24,
    paddingTop: 24,
  },
  viewP5: {
    flexDirection: "row",
    alignItems: "center",
  },
  textGD: {
    textAlign: "center",
  },
  viewQu: {
    paddingLeft: 16,
    paddingRight: 16,
    alignItems: "center",
    paddingTop: 16,
    paddingBottom: 16,
    justifyContent: "center",
    flexDirection: "row",
  },
  imageLi: {
    position: "absolute",
    height: 350,
    width: "100%",
  },
  iconJi: {
    width: 24,
    height: 24,
  },
  textInputV4: {
    marginLeft: 16,
  },
  scrollViewEF: {
    marginTop: 30,
    paddingBottom: 10,
  },
  view4P: {
    paddingTop: 8,
    paddingLeft: 16,
    paddingBottom: 8,
    paddingRight: 16,
  },
  textFb1: {
    marginLeft: 16,
    marginBottom: 20,
  },
  textFb: {
    marginLeft: 16,
  },
  divider7Z: {
    height: 1,
    alignSelf: "center",
    width: 32,
    marginTop: 16,
    marginBottom: 16,
  },
  textK6: {
    textAlign: "center",
  },
  viewUd: {
    paddingBottom: 16,
    paddingTop: 16,
    justifyContent: "space-between",
    alignItems: "center",
    flexDirection: "row",
    paddingRight: 16,
    paddingLeft: 16,
  },
  touchableYM: {
    paddingLeft: 16,
    paddingBottom: 16,
    marginBottom: 48,
    paddingTop: 16,
    paddingRight: 16,
  },
  viewQF: {
    marginTop: 12,
    flexDirection: "row",
    alignSelf: "center",
  },
  view95: {
    paddingRight: 16,
    paddingLeft: 16,
    paddingBottom: 8,
    paddingTop: 8,
  },
  view3H: {
    borderBottomWidth: 1,
    paddingRight: 16,
    paddingBottom: 16,
    marginTop: 16,
  },
  viewBR: {
    borderRightWidth: 1,
    borderTopWidth: 1,
    marginTop: 30,
    alignSelf: "center",
    paddingRight: 8,
    paddingLeft: 8,
    paddingBottom: 16,
    paddingTop: 16,
    borderLeftWidth: 1,
    borderBottomWidth: 1,
    marginBottom: 5,
  },
  viewBR1: {
    alignSelf: "center",
    paddingRight: 8,
    paddingLeft: 8,
    paddingBottom: 16,
    paddingTop: 16,

    marginBottom: 5,
  },
  btnSubmit: {
    backgroundColor: "#0ed830",
    width: "90%",
    height: 45,
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 7,
    marginBottom: 20,
  },
  btnSubmitText: {
    color: "#fff",
  },
  comprar: {
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 20,
  },
  cotas: {
    flexDirection: "row",

    alignItems: "center",
    marginLeft: 20,
    marginRight: 20,
  },
  image: {
    height: 230,
    width: "100%",
    alignItems: "center",
    justifyContent: "center",
    top: 1,
  },
  title1: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginTop: 10,
    marginBottom: 20,
  },
  title: {
    fontSize: 20,
    fontWeight: "bold",
    textTransform: "uppercase",

    textAlign: "center",
    color: "#000",
  },
  iconRight: {
    fontSize: 20,
    marginLeft: 20,
    marginRight: -35,

    color: "#000",
  },
});
