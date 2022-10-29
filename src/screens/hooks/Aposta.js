import { View, Text } from 'react-native'
import React from 'react'
import axios from 'axios'

export  function ApostarApi(valor,nome,email,jogada,id) {

    var data = JSON.stringify({
        "usuario": nome,
        "user_id":id,
        "dado1": jogada,
        "valor":valor,
        "jogada" : jogada,
        "email" : email


                             
      
      });
      
      var config = {
        method: 'post',
        url: 'https://rutherles.site/api/jogada',
        headers: { 
          'Content-Type': 'application/json'
        },
        data : data
      };
      
      axios(config)
      .then(function (response) {
        //console.warn(JSON.stringify(response.data));
      })
      .catch(function (error) {
        ///console.log()(error);
      });
      
  
}