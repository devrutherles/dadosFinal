import { useState, useEffect } from "react";
import axios from "axios";
import { useProfile } from "./useProfile";

export function useAposta(cart) {
  const [numeros, setNumeros] = useState();
  const [nome, setNome] = useState([]);
  const [status, setStatus] = useState("");
  const [numeroPartida, setNumeroPartida] = useState("");
  const [loading, setLoading] = useState(true);
  const [carteira, setCarteira] = useState();

  const { token, loading2 } = useProfile();

  let id = loading2 ? token.id : 1;

  useEffect(() => {
    const timeout = setTimeout(() => {
      const options = {
        method: "GET",
        url: "https://rutherles.site/api/rodada",
        headers: { Accept: "application/json" },
      };

      axios
        .request(options)
        .then(function (response) {
          /////console.log()(response.data);
          setNome(response.data);
        })
        .catch(function (error) {
          ////console.error(error);
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
          let carteira = response.data;
          carteira.forEach((element) => {
            setCarteira(element.carteira);
          });
        })
        .catch(function (error) {
          //console.error(error);
        });

      const options3 = {
        method: "PUT",
        url: "https://rutherles.site/api/usuario/81",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
          Authorization:
            "Token eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpc3MiOiJodHRwOi8vMTM3LjE4NC40OC42Ny9hcGkvbG9naW4iLCJpYXQiOjE2NjIwMzY2NzksImV4cCI6MjI2NjUzMjMwOTg5OSwibmJmIjoxNjYyMDM2Njc5LCJqdGkiOiJObWxKdHczbmZUTWtLSFRSIiwic3ViIjoiODEiLCJwcnYiOiIyM2JkNWM4OTQ5ZjYwMGFkYjM5ZTcwMWM0MDA4NzJkYjdhNTk3NmY3In0.qDXH1Mqh_MRK-zS5wYysCYgKht9yZB1YUOWUYgWKOaM",
        },
        data: { carteira: parseInt(carteira) + parseInt(cart) },
      };

      axios
        .request(options)
        .then(function (response) {
          ///console.log()(response.data);
        })
        .catch(function (error) {
          //console.error(error);
        });
    }, 2000);

    return () => {
      // clears timeout before running the new effect
      clearTimeout(timeout);
    };
  }, [nome]);

  return {
    loading,
    numeros,
    status,
    nome,
    numeroPartida,
    carteira,
  };
}
