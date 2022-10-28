import { useState, useEffect } from "react";
import axios from "axios";
import { useProfile } from "./useProfile";

import { useNavigation } from "@react-navigation/native";
import { putUser } from "./PostFunctions";
import AsyncStorage from '@react-native-async-storage/async-storage';




export function useAposta(cart) {
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
  const [jogadaSelect,setJogadaSelect]= useState([]);
  const [getselect, setGetselect] = useState([]);
  const [getaposta, setGetaposta] = useState(null);
  const [url, setUrl] = useState();
  const [geturl, seGtUrl] = useState(null);





  


  const navigation = useNavigation;


  let numeroPartida = 9;
  const { token, loading2 } = useProfile();
  let status = 9;
  let id = loading2 ? token.id : 1;

  useEffect(() => {


    const getSelect = async () => {
      try {
        const jsonValue = await AsyncStorage.getItem('@select')
        return jsonValue != null ? setGetselect(JSON.parse(jsonValue))  : null;
      } catch(e) {
        // error reading value
      }
    }
    
    const getApostas = async () => {
      try {
        const jsonValue = await AsyncStorage.getItem('@apostas')
        return jsonValue != null ? setGetaposta(JSON.parse(jsonValue))  : null;
      } catch(e) {
       console.error(e)
      }
    }




    const timeout = setTimeout(() => {
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
        .catch(function (error) {
        });

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
          user.forEach((element) => {
            setCarteira(element.carteira);
            setDeposito_idget(element.deposito_id)
            setValor_deposito(element.valor_deposito)
            setDepositoStatus(element.deposito)
          });
        })
        .catch(function (error) {
        });


      

        const getData = async () => {
          try {
            const jsonValue = await AsyncStorage.getItem('@jogadaSelect')
            return setJogadaSelect(JSON.parse(jsonValue)) ;
            
          } catch(e) {
            // error reading value
          }
        }



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
            setSPerdas(element.perdas);
            setApostasadm(element.apostas);
          });
        })
        .catch(function (error) {
        });


/**

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
  
        axios.request(options4).then(function (response) {
          setAprovado(response.data.results[0].status) });


        */


     
      getApostas()

      getSelect()

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
            if(url =! element.url ){
              seGtUrl(element.url)

            }
          });
        })
        .catch(function (error) {
        });






        
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
    getselect,
    geturl,
    numeroPartida,
    carteira,
    depositoStatus,
    aprovado,
    getaposta
  };
}
