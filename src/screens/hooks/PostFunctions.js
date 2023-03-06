import React from "react";
import axios from "axios";
import AsyncStorage from "@react-native-async-storage/async-storage";

export const storeJogada_id = async (value) => {
  try {
    await AsyncStorage.setItem("@jogada", value);
  } catch (e) {}
};

export function putJogada(data, id, premio) {
  const options = {
    method: "PUT",
    url: "https://morenacaipira.com/api/jogada/" + id,
    headers: { Accept: "application/json", "Content-Type": "application/json" },
    data: { status: data, premio: premio },
  };

  axios
    .request(options)
    .then(function (response) {
      // //console.log(response.data);
    })
    .catch(function (error) {
      ////console.error(error);
    });
}

export function PostJogada(usuario, user_id, jogada, email, valor, rodada) {
  var data = JSON.stringify({
    usuario: usuario,
    user_id: user_id,
    valor: valor,
    jogada: jogada,
    email: email,
    status: "apostado",
    rodada,
    rodada,
  });

  var config = {
    method: "post",
    url: "https://morenacaipira.com/api/jogada",
    headers: {
      "Content-Type": "application/json",
    },
    data: data,
  };

  axios(config)
    .then(function (response) {
      let jogada_id = response.data.id.toString();
      storeJogada_id(jogada_id);

      ////console.error(jogada_id);

      ////console.warn(JSON.stringify(response.data));
    })
    .catch(function (error) {
      /////console.log()(error);
    });
}

export function postDeposito(valor, user_id, deposito_id) {
  const options = {
    method: "POST",
    url: "https://morenacaipira.com/api/depositos",
    headers: { Accept: "application/json", "Content-Type": "application/json" },
    data: {
      valor: valor,
      user_id: user_id,
      deposito_id: deposito_id,
      status: "pago",
    },
  };

  axios
    .request(options)
    .then(function (response) {
      //console.log(response.data);
    })
    .catch(function (error) {
      //console.error(error);
    });
}

export function putUser(
  user_id,
  deposito_id,
  carteira,
  valor_deposito,
  status
) {
  var data = JSON.stringify({
    deposito_id: deposito_id,
    deposito: status,
    valor_deposito: valor_deposito,
    carteira: carteira,
  });

  var config = {
    method: "put",
    url: "https://morenacaipira.com/api/usuario/" + user_id,
    headers: {
      Authorization:
        "Bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpc3MiOiJodHRwOi8vMTM3LjE4NC40OC42Ny9hcGkvbG9naW4iLCJpYXQiOjE2NjIwMzY2NzksImV4cCI6MjI2NjUzMjMwOTg5OSwibmJmIjoxNjYyMDM2Njc5LCJqdGkiOiJObWxKdHczbmZUTWtLSFRSIiwic3ViIjoiODEiLCJwcnYiOiIyM2JkNWM4OTQ5ZjYwMGFkYjM5ZTcwMWM0MDA4NzJkYjdhNTk3NmY3In0.qDXH1Mqh_MRK-zS5wYysCYgKht9yZB1YUOWUYgWKOaM",
      "Content-Type": "application/json",
    },
    data: data,
  };

  axios(config)
    .then(function (response) {
      /////console.log()(JSON.stringify(response.data));
    })
    .catch(function (error) {
      /////console.log()(error);
    });
}
