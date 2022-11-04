import React, { useContext } from "react";
import {
  StyleSheet,
  View,
  ActivityIndicator,
  SafeAreaView,
} from "react-native";
import { WebView } from "react-native-webview";
import { useEffect, useState } from "react";
import axios from "axios";
import { AuthContext } from "../hooks/auth";

import { putUser } from "../hooks/PostFunctions";

export default function Deposito({ route, navigation }) {
  const [visible, setVisible] = useState(false);
  const [deposito, setDeposito] = useState();
  const { user, handleUser, handlePutuser } = useContext(AuthContext);

  const {
    valor,
    user_id,
    nome,
    deposito_id_tabela,
    cep,
    endereco,
    cidade,
    estado,
    cpf,
    email,
    deposito_id,
  } = route.params;

  useEffect(() => {
    const timeout = setTimeout(() => {
      const options = {
        method: "GET",
        url: "https://api.mercadopago.com/v1/payments/search",
        params: {
          sort: "date_created",
          criteria: "desc",
          external_reference: deposito_id,
        },
        headers: {
          "Content-Type": "application/json",
          Authorization:
            "Bearer APP_USR-6354125960495975-102119-985a677c3232949c7cff973002cec4fb-720572053",
        },
      };

      axios
        .request(options)
        .then(function (response) {
          setDeposito(response.data);
          if (response.data.results[0].status == "pending") {
            putUser(
              user_id,
              deposito_id,
              parseInt(user.carteira) + parseInt(valor),
              valor,
              "pago"
            );

            navigation.navigate("Wallet", { pagamento: true });
            clearTimeout(timeout);
          }
        })
        .catch(function (error) {
          //console.error(error);
        });
    }, 3000);

    return () => {
      clearTimeout(timeout);
    };
  }, [deposito]);

  return (
    <SafeAreaView style={styles.container}>
      <WebView
        source={{
          uri:
            "https://rutherles.site/pix?deposito_id=" +
            deposito_id +
            "&valor=" +
            valor +
            "&endereco=" +
            endereco +
            "&user_id=" +
            user_id +
            "&status=" +
            "pendente" +
            "&nome=" +
            nome +
            "&cpf=" +
            cpf +
            "&cep=" +
            cep +
            "&cidade=" +
            cidade +
            "&estado=" +
            estado +
            "&deposito_id_tabela=" +
            deposito_id_tabela +
            "&email=" +
            email,
        }}
        onLoadStart={() => setVisible(true)}
        onLoad={() => setVisible(false)}
      />

      <View
        style={{ position: "absolute", left: "50%", backgroundColor: "#fff" }}
      >
        {visible ? <ActivityIndicator size="large" /> : null}
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    backgroundColor: "#ecf0f1",
  },
  fab: {
    position: "absolute",
    marginTop: 60,
    margin: 16,
    right: 0,
    top: 0,
    backgroundColor: "#0ed830",
  },
});
