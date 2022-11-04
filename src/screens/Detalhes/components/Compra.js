import React from "react";
import { View, StyleSheet, TouchableOpacity, Text } from "react-native";
import { Center, Button, AlertDialog } from "native-base";
import { useNavigation } from "@react-navigation/native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import axios from "axios";
import { useEffect, useState } from "react";

const Compra = (props) => {
  const [jogos, setJogos] = React.useState();

  const [user, setUser] = React.useState();
  const [loader, setloader] = React.useState(false);

  let users = "";

  useEffect(() => {
    const getData = async () => {
      try {
        const value = await AsyncStorage.getItem("@user");
        if (value !== null) {
          setUser(value);
          setloader(true);
        }
      } catch (e) {
        // error reading value
      }
    };

    getData();
  }, []);

  function comprar() {
    ///console.log()(Date.now());

    users = JSON.parse(user);
    var id = users.id;

    const options = {
      method: "GET",
      url: "https://rutherles.site/api/usuario/" + id,
      headers: {
        Accept: "application/json",
        Authorization:
          "Token eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpc3MiOiJodHRwOi8vMTM3LjE4NC40OC42Ny9hcGkvbG9naW4iLCJpYXQiOjE2NjIwMzY2NzksImV4cCI6MjI2NjUzMjMwOTg5OSwibmJmIjoxNjYyMDM2Njc5LCJqdGkiOiJObWxKdHczbmZUTWtLSFRSIiwic3ViIjoiODEiLCJwcnYiOiIyM2JkNWM4OTQ5ZjYwMGFkYjM5ZTcwMWM0MDA4NzJkYjdhNTk3NmY3In0.qDXH1Mqh_MRK-zS5wYysCYgKht9yZB1YUOWUYgWKOaM",
      },
    };
    axios
      .request(options)
      .then(function (response) {
        /////console.log()(response)
      })
      .catch(function (error) {
        ////console.error(error);
      });

    users = JSON.parse(user);
    var id = users.id;

    ///console.log()(parseInt(props.carteira) - parseInt(props.valor));
    ///console.log()(props.carteira);
    ///console.log()(props.valor);

    const options2 = {
      method: "PUT",
      url: "https://rutherles.site/api/usuario/" + id,
      headers: {
        Accept: "application/json",
        Authorization:
          "Token eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpc3MiOiJodHRwOi8vMTM3LjE4NC40OC42Ny9hcGkvbG9naW4iLCJpYXQiOjE2NjIwMzY2NzksImV4cCI6MjI2NjUzMjMwOTg5OSwibmJmIjoxNjYyMDM2Njc5LCJqdGkiOiJObWxKdHczbmZUTWtLSFRSIiwic3ViIjoiODEiLCJwcnYiOiIyM2JkNWM4OTQ5ZjYwMGFkYjM5ZTcwMWM0MDA4NzJkYjdhNTk3NmY3In0.qDXH1Mqh_MRK-zS5wYysCYgKht9yZB1YUOWUYgWKOaM",
      },
      data: { carteira: parseInt(props.carteira) - parseInt(props.valor) },
    };
    axios
      .request(options2)
      .then(function (response) {
        setCarteira(response.data[0].carteira);
        ///console.log()(response);
      })
      .catch(function (error) {
        //////console.error(error);
      });

    const options3 = {
      method: "POST",
      url: "https://rutherles.site/api/compra",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        Authorization:
          "Token eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpc3MiOiJodHRwOi8vMTM3LjE4NC40OC42Ny9hcGkvbG9naW4iLCJpYXQiOjE2NjIwMzY2NzksImV4cCI6MjI2NjUzMjMwOTg5OSwibmJmIjoxNjYyMDM2Njc5LCJqdGkiOiJObWxKdHczbmZUTWtLSFRSIiwic3ViIjoiODEiLCJwcnYiOiIyM2JkNWM4OTQ5ZjYwMGFkYjM5ZTcwMWM0MDA4NzJkYjdhNTk3NmY3In0.qDXH1Mqh_MRK-zS5wYysCYgKht9yZB1YUOWUYgWKOaM",
      },
      data: {
        user_id: id,
        valor: parseInt(props.valor),
        imagem_small: props.imagem_small,
        nome: props.nome,
        dezenas: props.dezenas,
        data: props.data,
        concurso: props.concurso,
        premiacao: props.premiacao,
      },
    };

    axios
      .request(options3)
      .then(function (response) {
        ///console.log()(response.data);
      })
      .catch(function (error) {
        ////console.error(error);
      });

    const storeData = async (value) => {
      try {
        const jsonValue = JSON.stringify(value);
        await AsyncStorage.setItem("@comprasT", jsonValue);
      } catch (e) {
        // saving error
      }
    };

    const options4 = {
      method: "POST",
      url: "https://rutherles.site/api/compras",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        Authorization:
          "Token eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpc3MiOiJodHRwOi8vMTM3LjE4NC40OC42Ny9hcGkvbG9naW4iLCJpYXQiOjE2NjIwMzY2NzksImV4cCI6MjI2NjUzMjMwOTg5OSwibmJmIjoxNjYyMDM2Njc5LCJqdGkiOiJObWxKdHczbmZUTWtLSFRSIiwic3ViIjoiODEiLCJwcnYiOiIyM2JkNWM4OTQ5ZjYwMGFkYjM5ZTcwMWM0MDA4NzJkYjdhNTk3NmY3In0.qDXH1Mqh_MRK-zS5wYysCYgKht9yZB1YUOWUYgWKOaM",
      },
      data: { user_id: id },
    };

    axios
      .request(options4)
      .then(function (response) {
        storeData(response.data);
      })
      .catch(function (error) {
        ////console.error(error);
      });

    const options6 = {
      method: "PUT",
      url: "https://rutherles.site/api/jogo/" + props.jogo_id,
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        Authorization:
          "Token eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpc3MiOiJodHRwOi8vMTM3LjE4NC40OC42Ny9hcGkvbG9naW4iLCJpYXQiOjE2NjIwMzY2NzksImV4cCI6MjI2NjUzMjMwOTg5OSwibmJmIjoxNjYyMDM2Njc5LCJqdGkiOiJObWxKdHczbmZUTWtLSFRSIiwic3ViIjoiODEiLCJwcnYiOiIyM2JkNWM4OTQ5ZjYwMGFkYjM5ZTcwMWM0MDA4NzJkYjdhNTk3NmY3In0.qDXH1Mqh_MRK-zS5wYysCYgKht9yZB1YUOWUYgWKOaM",
      },
      data: { cota_total: props.cota_total - 1 },
    };

    axios
      .request(options6)
      .then(function (response) {
        ///console.log()(response.data);
      })
      .catch(function (error) {
        ////console.error(error);
      });

    const options5 = {
      method: "POST",
      url: "https://rutherles.site/api/compras",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        Authorization:
          "Token eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpc3MiOiJodHRwOi8vMTM3LjE4NC40OC42Ny9hcGkvbG9naW4iLCJpYXQiOjE2NjIwMzY2NzksImV4cCI6MjI2NjUzMjMwOTg5OSwibmJmIjoxNjYyMDM2Njc5LCJqdGkiOiJObWxKdHczbmZUTWtLSFRSIiwic3ViIjoiODEiLCJwcnYiOiIyM2JkNWM4OTQ5ZjYwMGFkYjM5ZTcwMWM0MDA4NzJkYjdhNTk3NmY3In0.qDXH1Mqh_MRK-zS5wYysCYgKht9yZB1YUOWUYgWKOaM",
      },
      data: { user_id: id },
    };

    axios
      .request(options5)
      .then(function (response) {
        ///console.log()(response.data);

        navigation.navigate("Bilhetes", {
          bilhetes: response.data,
        });
      })
      .catch(function (error) {
        ////console.error(error);
      });
  }

  const navigation = useNavigation();
  const [isOpen, setIsOpen] = React.useState(false);

  const onClose = () => setIsOpen(false);

  const cancelRef = React.useRef(null);
  return (
    <View style={styles.container}>
      <TouchableOpacity
        style={styles.TouchableOpacity}
        onPress={() => setIsOpen(!isOpen)}
      >
        <Text style={styles.content}>Comprar</Text>
      </TouchableOpacity>
      <AlertDialog
        leastDestructiveRef={cancelRef}
        isOpen={isOpen}
        onClose={onClose}
      >
        <AlertDialog.Content>
          <AlertDialog.CloseButton />
          <AlertDialog.Header>
            &nbsp; Deseja confirmar a compra ?
          </AlertDialog.Header>
          <AlertDialog.Body>
            O valor será depositado de sua carteira.
          </AlertDialog.Body>
          <AlertDialog.Footer style={styles.footer}>
            <Button.Group space={2}>
              <TouchableOpacity
                onPress={onClose}
                style={styles.Touchablecancel}
              >
                <Text style={styles.content}>Cancelar</Text>
              </TouchableOpacity>
              <TouchableOpacity
                onPress={() => comprar()}
                style={styles.Touchablewallet}
              >
                <Text style={styles.content}>Comprar</Text>
              </TouchableOpacity>
            </Button.Group>
          </AlertDialog.Footer>
        </AlertDialog.Content>
      </AlertDialog>
    </View>
  );
};
const styles = StyleSheet.create({
  TouchableOpacity: {
    backgroundColor: "#0ed830",
    width: 200,
    height: 45,
    justifyContent: "center",
    borderRadius: 7,
    marginBottom: 20,
  },
  Touchablewallet: {
    backgroundColor: "#0ed830",
    width: 100,
    height: 45,
    justifyContent: "center",
    borderRadius: 7,
    marginBottom: 20,
  },
  Touchablecancel: {
    backgroundColor: "red",
    width: 100,
    height: 45,
    justifyContent: "center",
    borderRadius: 7,
    marginBottom: 20,
  },
  content: {
    color: "#fff",
    width: "100%",
    textAlign: "center",
    fontSize: 15,
    fontWeight: "bold",
  },
  container: {},
  footer: {
    justifyContent: "center",
    alignItems: "center",
  },
});

export default Compra;
