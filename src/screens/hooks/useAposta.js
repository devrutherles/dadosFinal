import { useEffect, useState } from "react";
import axios from "axios";

export function useAposta() {
  const [nome, setNome] = useState([]);

  useEffect(() => {
    const timeout = setTimeout(() => {
      const options = {
        method: "GET",
        url: "https://rutherles.site/api/rodada",
        headers: { Accept: "application/json" },
      };

      axios.request(options).then(function (response) {
        setNome(response.data);
      });
    }, 3000);

    return () => {
      clearTimeout(timeout);
    };
  }, [nome]);

  return { nome };
}
