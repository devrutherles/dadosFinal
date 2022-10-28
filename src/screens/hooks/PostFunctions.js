import React from "react";
import axios from "axios";


export function PostJogada(usuario, user_id, jogada, email, valor,select) {
  var data = JSON.stringify({
    usuario: usuario,
    user_id: user_id,
    valor: valor,
    jogada: jogada,
    email: email,
    select:select
  });



  var config = {
    method: "post",
    url: "https://rutherles.site/api/jogada",
    headers: {
      "Content-Type": "application/json",
    },
    data: data,
  };

  axios(config)
    .then(function (response) {
      //console.warn(JSON.stringify(response.data));
    })
    .catch(function (error) {
      console.log(error);
    });
}




export function PutAdm(banca,ganhos,perdas,apostas){


    var data = JSON.stringify({
        "banca": banca,
        "ganhos": ganhos,
        "perdas": perdas,
        "apostas": apostas
      });
      
      var config = {
        method: 'put',
        url: 'https://rutherles.site/api/adm/1',
        headers: { 
          'Content-Type': 'application/json'
        },
        data : data
      };
      
      axios(config)
      .then(function (response) {
        console.log(JSON.stringify(response.data));
      })
      .catch(function (error) {
        console.log(error);
      });


}


export function putUser (user_id,deposito_id,carteira,valor_deposito,status){
   

    var data = JSON.stringify({
        "deposito_id": deposito_id,
        "deposito": status,
        "valor_deposito":valor_deposito,
        "carteira" :   carteira

      });
      
      var config = {
        method: 'put',
        url: 'https://rutherles.site/api/usuario/'+ user_id,
        headers: { 
          'Authorization': 'Bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpc3MiOiJodHRwOi8vMTM3LjE4NC40OC42Ny9hcGkvbG9naW4iLCJpYXQiOjE2NjIwMzY2NzksImV4cCI6MjI2NjUzMjMwOTg5OSwibmJmIjoxNjYyMDM2Njc5LCJqdGkiOiJObWxKdHczbmZUTWtLSFRSIiwic3ViIjoiODEiLCJwcnYiOiIyM2JkNWM4OTQ5ZjYwMGFkYjM5ZTcwMWM0MDA4NzJkYjdhNTk3NmY3In0.qDXH1Mqh_MRK-zS5wYysCYgKht9yZB1YUOWUYgWKOaM', 
          'Content-Type': 'application/json'
        },
        data : data
      };
      
      axios(config)
      .then(function (response) {
        console.log(JSON.stringify(response.data));
      })
      .catch(function (error) {
        console.log(error);
      });
      


}



  