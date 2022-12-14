import { useState, useEffect } from "react";
import axios from "axios";
import { useProfile } from "./useProfile";

export function useUrl() {
  const [url, setUrl] = useState();

  const { token, loading2 } = useProfile();

  let id = loading2 ? token.id : 1;

  useEffect(() => {
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
        setUrl(response.data);

        response.data.forEach((element) => {
          setUrl(element.url);
        });
      })
      .catch(function (error) {
      });
  }, []);

  return {
    url,
  };
}
