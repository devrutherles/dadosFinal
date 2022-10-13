import {
  View,
  Text,
  StyleSheet,
  Image,
  TouchableOpacity,
  ImageBackground,
} from "react-native";
import React from "react";
import { CloseIcon, Box, Progress } from "native-base";

export default function Alerta(props) {
  const { valor, dados, resultado, img, array } = props;
  let image = "";
  const [imagem, setImagem] = React.useState();
  if (array) {
    image = array.map((item) => item.img);
  }
  let valoS = JSON.stringify(valor);

  console.log(valor);

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

        <View style={styles.container2}>
          {image.map((item) => (
            <View>
              <Image style={styles.imagem} source={{ uri: item }} />
            </View>
          ))}
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
  },

  off: {
    width: "90%",
    height: 1,
    marginLeft: 1000000,
    alignItems: "center",
  },
});
