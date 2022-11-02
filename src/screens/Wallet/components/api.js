import React from "react";
import axios from "axios";

const Cep = axios.create({
  baseURL: "viacep.com.br/ws/01001000/json/",
});
export default Cep;
