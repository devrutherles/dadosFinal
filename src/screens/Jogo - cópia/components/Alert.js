import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ImageBackground,
} from "react-native";
import React from "react";
import { CloseIcon, Box, Progress, Image } from "native-base";

export default function Alerta(props) {
  const { valor, dados, resultado, img, array } = props;
  let image = "";
  let dadosV = "";
  const [imagem, setImagem] = React.useState();

  //console.warn(array.imgd1);

  let valoS = JSON.stringify(valor);

  let textoVitoria = "Parabéns você ganhou R$ " + { valoS } + ",00";
  let textoDerrota = "Você não ganhou nessa rodada ";

  const [tempo, setTempo] = React.useState(false);
  return (
    <ImageBackground
      imageStyle={{ borderRadius: 7 }}
      onLoad={() => setTempo(true)}
      style={tempo ? styles.container : styles.off}
      source={{
        uri:
          valor > 0
            ? "https://acegif.com/wp-content/uploads/gif/confetti-4.gif"
            : "https://media2.giphy.com/media/dZLWXI8VO0oSurblwN/giphy.gif?cid=ecf05e475mpbnmvsjuqfd8ewixgdkjyowdba4gcz5n9ioq8x&rid=giphy.gif&ct=g",
      }}
    >
      <View style={styles.container}>
        <Text style={styles.texto}>
          {" "}
          {valor > 0
            ? "Parabéns você ganhou R$ " + valor.toFixed(2)
            : textoDerrota}
        </Text>

        <View>
          {array ? (
            <View style={styles.container2}>
              <View>
                <Image
                  alt=""
                  style={styles.imagem}
                  source={{ uri: array.imgd1 }}
                />
              </View>
              <View>
                <Image
                  alt=""
                  style={styles.imagem}
                  source={{ uri: array.imgd2 }}
                />
              </View>
              <View>
                <Image
                  alt=""
                  style={styles.imagem}
                  source={{ uri: array.imgd3 }}
                />
              </View>
            </View>
          ) : (
            <></>
          )}
        </View>
      </View>
    </ImageBackground>
  );
}

const styles = StyleSheet.create({
  container: {
    height: 90,
    alignItems: "center",
    width: "100%",
    borderRadius: 30,
  },
  container2: {
    flexDirection: "row",
  },
  texto: {
    color: "#000",
    marginTop: 5,
    fontWeight: "bold",
  },
  imagem: {
    width: 30,
    height: 30,
    margin: 5,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 6,
    },
    shadowOpacity: 0.37,
    shadowRadius: 7.49,

    elevation: 12,
  },

  off: {
    width: "90%",
    height: 1,
    marginLeft: 1000000,
    alignItems: "center",
  },
});
