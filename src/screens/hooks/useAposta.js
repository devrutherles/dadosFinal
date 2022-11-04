import { useState, useEffect } from "react";
import axios from "axios";


export function useAposta() {
  const [numeros, setNumeros] = useState();
  const [nome, setNome] = useState([]);
  const [perdas, setSPerdas] = useState("");
  const [ganhos, setSGanhos] = useState("");
  const [apostasadm, setApostasadm] = useState("");
  const [loading, setLoading] = useState(true);
  const [carteira, setCarteira] = useState();
  const [saldoadm, setSaldoAdm] = useState();
  const [depositoStatus, setDepositoStatus] = useState();
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


  } 

  useEffect(() => {
    load();
  }, []);

  


  useEffect(() => {
    const timeout = setTimeout(() => {

      load();
     
    }, 3500);

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
