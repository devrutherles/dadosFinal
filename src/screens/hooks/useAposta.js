import { useEffect, useState, useContext } from "react";
import axios from "axios";
import { AuthContext } from "./auth";
import { putJogada, postDeposito } from "./PostFunctions";
import {
  getFocusedRouteNameFromRoute,
  useNavigation,
} from "@react-navigation/native";

export function useAposta() {
  const [nome, setNome] = useState(false);
  const [resultado, setResultado] = useState([]);
  const [iniciada, setIniciada] = useState([]);
  const [salavalue, setSalavalue] = useState([
    { sala1v1: 1, sala1v2: 2, sala1v3: 4 },
    { sala2v1: 4, sala2v2: 10, sala2v3: 20 },
    { sala3v1: 20, sala3v2: 50, sala3v3: 100 },
    { sala1cv1: 1, sala1cv2: 2, sala1cv3: 4 },
    { sala2cv1: 4, sala2cv2: 10, sala2cv3: 20 },
    { sala3cv1: 20, sala3cv2: 50, sala3cv3: 100 },
  ]);
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
    getSalaValue,
  } = useContext(AuthContext);

  let valor = "";
  let carteira = user.carteira;
  let jogoID = getaposta[0] ? getaposta[0].jogo_id : null;

  putTexto("Aguardando nova rodada ...");

  useEffect(() => {
    // storeAposta([]);

    getApostas();

    const timeout = setTimeout(() => {
      getUser(global.id ? global.id : user.id);
      getJogada_id();

      // //console.error(jogada_id)

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

        ////console.error(aposta_id)
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

          let selecionadosMorena = result.filter(
            (item) => item.isPresent === true && item.id.split("")[4] == "p"
          );
          ////console.error(selecionadosMorena);
          let selecionadosCaipira = result.filter(
            (item) => item.isPresent === true && item.id.split("")[4] != "p"
          );

          let countObject = numeros.reduce(function (count, currentValue) {
            return (
              count[currentValue.id]
                ? ++count[currentValue.id]
                : (count[currentValue.id] = 1),
              count
            );
          }, {});

          var totalMorena = selecionadosMorena.reduce(getTotal, 0);
          function getTotal(total, item) {
            return (
              parseInt(getaposta[0].valorMorena) * countObject[item.id] +
              parseInt(getaposta[0].valorMorena)
            );
          }
          var vmorena = totalMorena * selecionadosMorena.length;
          let vcaipira =
            selecionadosCaipira.length * getaposta[0].valorCaipira * 4;
          valor = vmorena + vcaipira;

          if (getaposta[0].jogo_id) {
            putAlerta({ valor: valor, resultado: resultados });
            ////console.error(valor);
            editCarteira(parseInt(carteira) + parseInt(valor), user.id);
            storeAposta([]);
            putSelect([]);
            getApostas();
            setResultado(resultados);
            //putAlerta("");

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
              ////console.error(error);
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
          let sala = response.data[0].valor_sala;
          //console.error(JSON.parse(sala));
          if (urls != url) {
            getUrl(urls);
          }
          if (sala != salavalue) {
            setSalavalue(JSON.parse(sala));
          }
        })

        .catch(function (error) {});
    }, 5000);

    return () => {
      clearTimeout(timeout);
    };
  }, [nome]);

  return { iniciada, resultado, nome, criada, salavalue };
}
