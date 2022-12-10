import { useEffect, useState, useContext } from "react";
import axios from "axios";
import { AuthContext } from "./auth";
import { putJogada, postDeposito } from "./PostFunctions";
import { useNavigation } from "@react-navigation/native";

export function useAposta() {
  const [nome, setNome] = useState(false);
  const [resultado, setResultado] = useState([]);
  const [iniciada, setIniciada] = useState([]);
  const [criada, setCriada] = useState([]);
  const navigation = useNavigation();
  const {
    aposta_id,
    select,
    putSelect,
    putAlerta,
    getApostas,
    putTexto,
    getJogada_id,
    jogada_id,
    storeAposta,
    getaposta,
    url,
    getUrl,
    putaposta_id,
    storeDeposito,
    getDeposito,
    user,
    deposito,
    editCarteira,
    getUser,
  } = useContext(AuthContext);

  let valor = "";
  let carteira = user.carteira;
  let jogoID = getaposta[0] ? getaposta[0].jogo_id : null;

  putTexto("Aguardando nova rodada ...");

  useEffect(() => {
    getApostas();

    const timeout = setTimeout(() => {
      getUser(user.id);
      getJogada_id();

      // console.error(jogada_id)
      //  storeAposta([]);

      const options = {
        method: "GET",
        url: "https://morenacaipira.com/api/rodada",
        headers: { Accept: "application/json" },
      };

      axios.request(options).then(function (response) {
        setNome(response.data);

        let resultados = response.data.find(
          (item) => item.id == jogoID && item.status == "finalizada"
        );

        let inicio = response.data.find((item) => item.status == "iniciada");
        let cria = response.data.find((item) => item.status == "criada");

        if (inicio) {
          setIniciada(inicio);
        } else {
          setIniciada([]);
        }

        if (cria) {
          setCriada(cria);
        } else {
          setCriada([]);
        }

        //console.error(aposta_id)
        if (resultados && getaposta[0].jogo_id) {
          putTexto("Aguardando resultado");
          let numeros = [
            { id: resultados.resultd1 },
            { id: resultados.resultd2 },
            { id: resultados.resultd3 },
            { id: resultados.resultd4 },
          ];

          const obj2 = select;
          const obj1 = numeros;
          const result = obj2.map((obj) => ({
            ...obj,
            isPresent: obj1.some(({ id }) => id === obj.id),
          }));

  let selecionados = result.filter((car) => car.isPresent === true);

  let dadosVermelhos = selecionados.filter((item) => item.id.split("")[4] == "v");
  let valorVermelho = dadosVermelhos.map((item) => item.valor);
  let somaValorVermelho = valorVermelho[0]

    let dadosBrancos = selecionados.filter((item) => item.id.split("")[4] != "v");
    let valorBranco = dadosBrancos.map((item) => item.valor);
    let somaValorBranco = valorBranco.reduce(function (soma, i) {
      return soma + i;
    });
    let valorDb = dadosBrancos.length * parseInt(somaValorBranco) + parseInt(somaValorBranco)
    let valorDv = parseInt(somaValorVermelho) * 4 +  parseInt(somaValorVermelho)
    valor = valorDb + valorDv

   console.error(valorDb);
        
          

          if (getaposta[0].jogo_id) {
            putAlerta({ valor: valor, resultado: resultados });
            //editCarteira(parseInt(carteira) + parseInt(valor), user.id);
            //storeAposta([]);
            //putSelect([]);
            //getApostas();
            //setResultado(resultados);

            putTexto("Aguardando nova rodada");

            if (valor > 0) {
              putJogada("ganhou", jogada_id, valor);
            } else {
              putJogada("perdeu", jogada_id, valor);
            }
          }
        }

        if (deposito.valor) {
          const options4 = {
            method: "GET",
            url: "https://api.mercadopago.com/v1/payments/search",
            params: {
              sort: "date_created",
              criteria: "desc",
              external_reference: deposito.deposito_id,
            },
            headers: {
              "Content-Type": "application/json",
              Authorization:
                "Bearer APP_USR-6354125960495975-102119-985a677c3232949c7cff973002cec4fb-720572053",
            },
          };

          axios
            .request(options4)
            .then(function (response) {
              if (
                response.data.results[0].status == "approved" &&
                deposito.valor
              ) {
                getDeposito();
                postDeposito(deposito.valor, user.id, deposito.deposito_id);
                storeDeposito([]);
                getDeposito();
                editCarteira(
                  parseInt(user.carteira) + parseInt(deposito.valor),
                  user.id
                );
                getUser(user.id);

                navigation.navigate("Wallet", { pagamento: true });
              }
            })
            .catch(function (error) {
              //console.error(error);
            });
        }
      });

      const options5 = {
        method: "GET",
        url: "https://morenacaipira.com/api/url",
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
          let urls = response.data[0].url;
          if (urls != url) {
            getUrl(urls);
          } else {
            <></>;
          }

          response.data.forEach((element) => {
            setUrl(element.url);
          });
        })
        .catch(function (error) {});
    }, 3000);

    return () => {
      clearTimeout(timeout);
    };
  }, [nome]);

  return { iniciada, resultado, nome, criada };
}
