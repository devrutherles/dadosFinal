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

let altura = 0;
let largura = "0%";

export default function Alerta(props) {
  const { valor, dados, resultado, img, array } = props;
  let image = "";
  const [imagem, setImagem] = React.useState();
  if (array) {
    image = array.map((item) => item.img);
  }

  const [tempo, setTempo] = React.useState(false);
  ///console.log()(tempo);
  return (
    <ImageBackground
      imageStyle={{ borderRadius: 7 }}
      onLoad={() => setTempo(true)}
      style={tempo ? styles.container : styles.off}
      source={{
        uri: "https://www.google.com/url?sa=i&url=https%3A%2F%2Fgiphy.com%2Fexplore%2Fred-background&psig=AOvVaw0OGqSWKGZbZLiohdffvmvV&ust=1665642907973000&source=images&cd=vfe&ved=0CAwQjRxqFwoTCNiDp6GJ2voCFQAAAAAdAAAAABAf",
      }}
    >
      <View style={styles.container}>
        <Text style={styles.texto}>Você não ganhou nessa rodada </Text>

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
    marginTop: 5,
  },
  container2: {
    flexDirection: "row",
  },
  texto: {
    color: "#000",
    marginTop: 5,
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
