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

  function getUser(data) {
    const options = {
      method: "GET",
      url: "https://rutherles.site/api/usuario/" + data,
      headers: { Accept: "application/json" },
    };

    axios

      .request(options)
      .then(function (response) {
        setUser(response.data[0]);
        //console.error(response.data);
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
        //console.error(response.data);

        setUser(response.data[0]);
      })
      .catch(function (error) {});
  }

  function getPedido(id) {
    const options = {
      method: "GET",
      url: "https://rutherles.site/api/pedido",
      headers: { Accept: "application/json" },
    };

    axios
      .request(options)
      .then(function (response) {
        //console.error(response.data);

        let pedidos = response.data.filter((item) => item.user_id == id);
        //console.error(pedidos);
        setPedido(response.data);
      })
      .catch(function (error) {});
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
        setJogada(response.data);
      })
      .catch(function (error) {});
  }

  return (
    <AuthContext.Provider
      value={{
        user,
        handleUser,
        handlePutuser,
        getPedido,
        getUser,
        pedido,
        getJogada,
        jogada,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}
