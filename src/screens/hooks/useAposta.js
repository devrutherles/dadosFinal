import { useState, useEffect } from "react";
import axios from "axios";
import { useProfile } from "./useProfile";

import { useNavigation } from "@react-navigation/native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { putUser } from "./PostFunctions";

export function useAposta() {
  const [numeros, setNumeros] = useState();
  const [nome, setNome] = useState([]);
  const [perdas, setSPerdas] = useState("");
  const [ganhos, setSGanhos] = useState("");
  const [apostasadm, setApostasadm] = useState("");
  const [loading, setLoading] = useState(true);
  const [carteira, setCarteira] = useState();
  const [saldoadm, setSaldoAdm] = useState();
  const [deposito_idget, setDeposito_idget] = useState();
  const [depositoStatus, setDepositoStatus] = useState();
  const [valor_deposito, setValor_deposito] = useState();
  const [aprovado, setAprovado] = useState();
  const [jogadaSelect, setJogadaSelect] = useState([]);
  const [pedido, setPedido] = useState([]);

  const [url, setUrl] = useState();
  const [geturl, seGtUrl] = useState(null);
  const [jogada, setJogada] = useState([]);
  const [token, setToken] = useState();
  const [loading2, setLoading2] = useState();






  let numeroPartida = 9;
  let status = 9;
  let id = loading2 ? token.id : 1;

  global.ids = id


  function load(){
    const options = {
      method: "GET",
      url: "https://rutherles.site/api/rodada",
      headers: { Accept: "application/json" },
    };

    axios
      .request(options)
      .then(function (response) {
        setNome(response.data);
      })
      .catch(function (error) {});

    const options2 = {
      method: "GET",
      url: "https://rutherles.site/api/usuario/" + id,
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        Authorization:
          "Token eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpc3MiOiJodHRwOi8vMTM3LjE4NC40OC42Ny9hcGkvbG9naW4iLCJpYXQiOjE2NjIwMzY2NzksImV4cCI6MjI2NjUzMjMwOTg5OSwibmJmIjoxNjYyMDM2Njc5LCJqdGkiOiJObWxKdHczbmZUTWtLSFRSIiwic3ViIjoiODEiLCJwcnYiOiIyM2JkNWM4OTQ5ZjYwMGFkYjM5ZTcwMWM0MDA4NzJkYjdhNTk3NmY3In0.qDXH1Mqh_MRK-zS5wYysCYgKht9yZB1YUOWUYgWKOaM",
      },
    };

    axios
      .request(options2)
      .then(function (response) {
        let user = response.data;
        //console.error(user)
        user.forEach((element) => {

          
            setCarteira(element.carteira);
         
            global.cart = element.carteira

          setDeposito_idget(element.deposito_id);
          setValor_deposito(element.valor_deposito);
          setDepositoStatus(element.deposito);
        });
      })
      .catch(function (error) {});

    const getData = async () => {
      try {
        const jsonValue = await AsyncStorage.getItem("@jogadaSelect");
        return setJogadaSelect(JSON.parse(jsonValue));
      } catch (e) {
        // error reading value
      }
    };

    getData();

    const options3 = {
      method: "GET",
      url: "https://rutherles.site/api/adm",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        Authorization:
          "Token eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpc3MiOiJodHRwOi8vMTM3LjE4NC40OC42Ny9hcGkvbG9naW4iLCJpYXQiOjE2NjIwMzY2NzksImV4cCI6MjI2NjUzMjMwOTg5OSwibmJmIjoxNjYyMDM2Njc5LCJqdGkiOiJObWxKdHczbmZUTWtLSFRSIiwic3ViIjoiODEiLCJwcnYiOiIyM2JkNWM4OTQ5ZjYwMGFkYjM5ZTcwMWM0MDA4NzJkYjdhNTk3NmY3In0.qDXH1Mqh_MRK-zS5wYysCYgKht9yZB1YUOWUYgWKOaM",
      },
    };

    axios
      .request(options3)
      .then(function (response) {
        let carteira = response.data;
        carteira.forEach((element) => {
          setSaldoAdm(element.banca);
          setSGanhos(element.ganhos);
          setSPerdas(element.pedas);
          setApostasadm(element.apostas);
        });
      })
      .catch(function (error) {});

    const options4 = {
      method: "GET",
      url: "https://api.mercadopago.com/v1/payments/search",
      params: {
        sort: "date_created",
        criteria: "desc",
        external_reference: deposito_idget,
      },
      headers: {
        "Content-Type": "application/json",
        Authorization:
          "Bearer APP_USR-6354125960495975-102119-985a677c3232949c7cff973002cec4fb-720572053",
      },
    };

    const options6 = {
      method: "GET",
      url: "https://rutherles.site/api/pedido",
      headers: { Accept: "application/json" },
    };

    axios
      .request(options6)
      .then(function (response) {
        setPedido(response.data);
        global.pedidos = response.data;
      })
      .catch(function (error) {
        console.error(error);
      });

    axios.request(options4).then(function (response) {
      setAprovado(response.data.results[0].status);
    });

    const options5 = {
      method: "GET",
      url: "https://rutherles.site/api/url",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        Authorization:
          "Token eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpc3MiOiJodHRwOi8vMTM3LjE4NC40OC42Ny9hcGkvbG9naW4iLCJpYXQiOjE2NjIwMzY2NzksImV4cCI6MjI2NjUzMjMwOTg5OSwibmJmIjoxNjYyMDM2Njc5LCJqdGkiOiJObWxKdHczbmZUTWtLSFRSIiwic3ViIjoiODEiLCJwcnYiOiIyM2JkNWM4OTQ5ZjYwMGFkYjM5ZTcwMWM0MDA4NzJkYjdhNTk3NmY3In0.qDXH1Mqh_MRK-zS5wYysCYgKht9yZB1YUOWUYgWKOaM",
      },
    };

    axios
      .request(options5)
      .then(function (response) {
        setUrl(response.data);

        response.data.forEach((element) => {
          setUrl(element.url);
          if ((url = !element.url)) {
            seGtUrl(element.url);
          }
        });
      })
      .catch(function (error) {});

    var config = {
      method: "get",
      url: "https://rutherles.site/api/jogada",
      headers: {},
    };

    axios(config)
      .then(function (response) {
        ///console.log()(JSON.stringify(response.data));
        setJogada(response.data);
        global.jogadas = response.data
      })
      .catch(function (error) {
        ///console.log()(error);
      });




      const getToken = async () => {
        try {
          const value = await AsyncStorage.getItem("@user");
          if (value !== null) {
            setToken(JSON.parse(value));
            setLoading2(true);
          }
        } catch (e) {
          // error reading value
        }
      };
  
      getToken();





  } 

  useEffect(() => {
    load();
  }, []);

  


  useEffect(() => {
    const timeout = setTimeout(() => {

      load();
     
    }, 2000);

    return () => {
      clearTimeout(timeout);
    };
  }, [nome]);

  return {
    loading,
    numeros,
    saldoadm,
    perdas,
    ganhos,
    apostasadm,
    jogadaSelect,
    status,
    url,
    nome,
    geturl,
    jogada,
    numeroPartida,
    carteira,
    depositoStatus,
    aprovado,
    token,
    pedido,
    loading2
  };
}
