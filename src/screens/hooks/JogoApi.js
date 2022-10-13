import { useState, useEffect } from "react";
import axios from "axios";

export function JogosApi(url) {
  const [jogos, setJogos] = useState({});
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const options = {
      method: "GET",
      url: url,
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
    };

    axios
      .request(options)
      .then(function (response) {
        setJogos(response.data);
      })

      .finally(() => {
        setLoading(false);
      })

      .catch(function (error) {
        console.log(error);
      });
  }, []);

  return { jogos, loading };
}
