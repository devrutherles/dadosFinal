import { useState, useEffect } from "react";
import axios from "axios";

export function useAposta() {
  const [numeros, setNumeros] = useState();
  const [nome, setNome] = useState([]);
  const [status, setStatus] = useState("");
  const [numeroPartida, setNumeroPartida] = useState("");
  const [loading, setLoading] = useState(true);

  let resultados = [
    {
      id: 1,
      jogos: [
        {
          id: "dadop1",
          nome: "Dado Branco 1, ",
          img: "https://orvalhosj.com/dadoP1.png",
        },
        {
          id: "dadop2",
          nome: "Dado Branco 2, ",
          img: "https://orvalhosj.com/dadoP2.png",
        },
        {
          id: "dadop3",
          nome: "Dado Branco 3, ",
          img: "https://orvalhosj.com/dadoP3.png",
        },
      ],
      status: "finalizado",
    },
  ];

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
          //console.log(response.data);
          setNome(response.data);
        })
        .catch(function (error) {
          //console.error(error);
        });
    }, 5000);

    return () => {
      // clears timeout before running the new effect
      clearTimeout(timeout);
    };
  }, [nome]);

  return { loading, numeros, resultados, status, nome, numeroPartida };
}
