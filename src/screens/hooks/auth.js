import React, { createContext, useState } from "react";
import axios from "axios";
export const AuthContext = createContext({});
import AsyncStorage from "@react-native-async-storage/async-storage";
import Deposito from "../Pix/Deposito";

export default function AuthProvider({ children }) {
  const [user, setUser] = useState(false);
  const [pedido, setPedido] = useState([]);

  const [jogada, setJogada] = useState([]);
  const [user_email, setUser_email] = useState([]);
  const [select, setSelect] = useState([]);
  const [texto, setTexto] = useState("Atualizando");
  const [onPedido, setonePedido] = useState();
  const [getaposta, setGetaposta] = useState([]);
  const [jogada_id, setJogada_id] = useState("");
  const [deposito, setDeposito] = useState([]);
  const [user_id, setUser_id] = useState("");
  const [codigo, setCodigo] = useState("");
  const [url, setUrl] = useState([]);
  const [email, setEmail] = useState([]);
  function GetUserByemail(data) {
    const options = {
      method: "GET",
      url: "https://morenacaipira.com/api/usuarios",
      headers: { Accept: "application/json" },
    };

    axios
      .request(options)
      .then(function (response) {
        let alluser = response.data;
        let userId = alluser.find(
          (item) =>
            item.email == data || item.email == data.toLowerCase().trim()
        );

        setUser_id(userId.id);
      })
      .catch(function (error) {
        //console.error(error);
      });
  }

  const getJogada_id = async () => {
    try {
      const value = await AsyncStorage.getItem("@jogada");
      if (value !== null) {
        setJogada_id(value);
      }
    } catch (e) {}
  };

  const storeAposta = async (value) => {
    try {
      const jsonValue = JSON.stringify(value);
      await AsyncStorage.setItem("@apostas", jsonValue);
    } catch (e) {}
  };

  const storeDeposito = async (value) => {
    try {
      const jsonValue = JSON.stringify(value);
      await AsyncStorage.setItem("@deposito", jsonValue);
    } catch (e) {}
  };

  const getDeposito = async () => {
    try {
      const jsonValue = await AsyncStorage.getItem("@deposito");
      return jsonValue != null
        ? setDeposito(JSON.parse(jsonValue))
        : setDeposito([]);
    } catch (e) {}
  };

  const getApostas = async () => {
    try {
      const jsonValue = await AsyncStorage.getItem("@apostas");
      return jsonValue != null
        ? setGetaposta(JSON.parse(jsonValue))
        : setGetaposta([]);
    } catch (e) {}
  };

  const [alertaR, setAlertR] = useState([]);

  const [aposta_id, setAposta_id] = useState();

  function putaposta_id(data) {
    setAposta_id(data);
  }

  function getUrl(data) {
    setUrl(data);
  }

  function postUser(data) {
    setUser(data);
  }

  function postDeposito(data) {
    setDeposito(data);
  }

  function putTexto(data) {
    setTexto(data);
  }

  function putSelect(data) {
    setSelect(data);
  }

  function putAlerta(data) {
    setAlertR(data);
  }

  function postUser_id(data) {
    setUser_id(data);
  }
  function postCodigo(data) {
    setCodigo(data);
  }
  function postEmail(data) {
    setEmail(data);
  }

  function getUser(data) {
    const options = {
      method: "GET",
      url: "https://morenacaipira.com/api/usuario/" + data,
      headers: { Accept: "application/json" },
    };

    axios

      .request(options)
      .then(function (response) {
        setUser(response.data[0]);
      })
      .catch(function (error) {});
  }

  function editCarteira(carteira, id) {
    const options = {
      method: "PUT",
      url: "https://morenacaipira.com/api/usuario/" + id,
      headers: { Accept: "application/json" },
      data: { carteira: carteira },
    };

    axios
      .request(options)
      .then(function (response) {
        setUser(response.data);
      })
      .catch(function (error) {});
  }

  function getPedido(id) {
    const options = {
      method: "GET",
      url: "https://morenacaipira.com/api/pedido",
      headers: { Accept: "application/json" },
    };

    axios
      .request(options)
      .then(function (response) {
        let pedidos = response.data.filter((item) => item.user_id == id);
        setPedido(response.data);
      })
      .catch(function (error) {});
  }

  function getJogada() {
    const options = {
      method: "GET",
      url: "https://morenacaipira.com/api/jogada",
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
        editCarteira,
        getPedido,
        aposta_id,
        getUser,
        getUrl,
        postUser,
        url,
        pedido,
        getJogada,
        putaposta_id,
        jogada,
        alertaR,
        postUser_id,
        user_id,
        getJogada_id,
        jogada_id,
        storeDeposito,
        GetUserByemail,
        getDeposito,
        putTexto,
        texto,
        setAlertR,
        user_email,
        putAlerta,
        deposito,
        setUser_email,
        putSelect,
        select,
        storeAposta,
        getApostas,
        getaposta,
        postCodigo,
        codigo,
        email,
        postEmail,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}
