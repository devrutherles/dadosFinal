import React, { createContext, useState } from "react";
import axios from "axios";

export const AuthContext = createContext({});

export default function AuthProvider({ children }) {
  const [user, setUser] = useState(false);
  const [pedido, setPedido] = useState([]);
  const [jogada, setJogada] = useState([]);

  function handleUser(data) {
    const options = {
      method: "GET",
      url: "https://rutherles.site/api/usuario/" + data,
      headers: { Accept: "application/json" },
    };

    axios
      .request(options)
      .then(function (response) {
        setUser(response.data[0]);
        getPedido();
        getJogada();
      })
      .catch(function (error) {});
  }

  function handlePutuser(carteira, status, id) {
    const options = {
      method: "PUT",
      url: "https://rutherles.site/api/usuario/" + id,
      headers: { Accept: "application/json" },
      data: { carteira: carteira, deposito: status },
    };

    axios
      .request(options)
      .then(function (response) {
        setUser(response.data[0]);
        //console.error(response.data);
      })
      .catch(function (error) {
        //console.error(error);
      });
  }

  function getPedido() {
    const options = {
      method: "GET",
      url: "https://rutherles.site/api/pedido",
      headers: { Accept: "application/json" },
    };

    axios
      .request(options)
      .then(function (response) {
        let pedidos = response.data.filter((item) => item.user_id == user.id);
        setPedido(pedidos);
      })
      .catch(function (error) {
        //console.error(error);
      });
  }

  function getJogada() {
    const options = {
      method: "GET",
      url: "https://rutherles.site/api/pedido",
      headers: { Accept: "application/json" },
    };

    axios
      .request(options)
      .then(function (response) {
        let jogadas = response.data.filter((item) => item.user_id == user.id);
        //console.error(jogadas);

        setJogada(jogadas);
      })
      .catch(function (error) {
        //console.error(error);
      });
  }

  return (
    <AuthContext.Provider
      value={{
        user,
        handleUser,
        handlePutuser,
        getPedido,
        pedido,
        getJogada,
        jogada,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}
