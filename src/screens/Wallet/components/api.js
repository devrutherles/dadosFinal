import React from "react";
import axios from "axios";

const Cep = axios.create({
  baseURL:
    "https ://olinda.bcb.gov.br/olinda/servico/CCR/versao/v1/odata/InstituicoesFinanceirasAutorizadas?$format=json/",
});
export default Cep;
