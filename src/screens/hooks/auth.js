import React, { createContext, useState } from "react";
import axios from "axios";
export const AuthContext = createContext({});
import AsyncStorage from "@react-native-async-storage/async-storage";

export default function AuthProvider({ children }) {
  const [user, setUser] = useState(false);
  const [pedido, setPedido] = useState([]);

  const [jogada, setJogada] = useState([]);
  const [email, setEmail] = useState([]);
  const [select, setSelect] = useState([]);
  const [texto, setTexto] = useState("Atualizando");
  const [onPedido, setonePedido] = useState();
  const [getaposta, setGetaposta] = useState([]);
  const [jogada_id, setJogada_id] = useState("");



 const getJogada_id = async () => {
  try {
    const value = await AsyncStorage.getItem("@jogada");
    if (value !== null) {
      setJogada_id(value);
      //console.error(value)

    }
  } catch (e) {
    // error reading value
  }
};


const storeAposta = async (value) => {
  try {
    const jsonValue = JSON.stringify(value);
    await AsyncStorage.setItem("@apostas", jsonValue);
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


  function putaposta_id(data){
    setAposta_id(data)
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

  function editCarteira ( carteira , id) {
  //console.error(id);

    const options = {
      method: "PUT",
      url: "https://rutherles.site/api/usuario/" + id,
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
      url: "https://rutherles.site/api/jogada",
      headers: { Accept: "application/json" },
    };
    

    axios
      .request(options)

      .then(function (response) {
        setJogada(response.data);
        //console.error(response.data)
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
        pedido,
        getJogada,
        putaposta_id,
        jogada,
        alertaR,
        getJogada_id,
        jogada_id,
        putTexto,
        texto,
        setAlertR,
        email,
        putAlerta,
        setEmail,
        putSelect,
        select,
        storeAposta,
        getApostas,
        getaposta
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}
