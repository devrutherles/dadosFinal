import { useEffect, useState,useContext } from "react";
import axios from "axios";
import { AuthContext } from "./auth";
import { putJogada } from "./PostFunctions";

export function useAposta() {
  const [nome, setNome] = useState(false);
  const [resultado, setResultado] = useState([]);
  const [iniciada, setIniciada] = useState([]);
  const [criada, setCriada] = useState([]);

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
    putaposta_id,
    user,
    editCarteira,
  } = useContext(AuthContext);

let valor = ""
let carteira = user.carteira
let jogoID = getaposta[0] ? getaposta[0].jogo_id : null

    putTexto("Aguardando nova rodada ...")

  useEffect(() => {

  getApostas()

    const timeout = setTimeout(() => {
    getJogada_id();

      const options = {
        method: "GET",
        url: "https://rutherles.site/api/rodada",
        headers: { Accept: "application/json" },
      };


      axios.request(options).then(function (response) {
        
      setNome(response.data);


     let resultados = response.data.find(
     (item) => item.id == jogoID && item.status == "finalizada"
     );

     let inicio = response.data.find((item) => item.status == "iniciada");
     let cria = response.data.find((item) => item.status == "criada");


     if(inicio){

      setIniciada(inicio)
      
     }else {

       setIniciada([])

     }

      if (cria) {
        setCriada(cria);
      } else {
        setCriada([]);
      }


//console.error(jogada_id);
//console.error(resultados);

       //console.error(inicio)


     if (resultados &&  getaposta[0].jogo_id) {
       putTexto("Aguardando resultado");
       let numeros = [
         { id: resultados.resultd1 },
         { id: resultados.resultd2 },
         { id: resultados.resultd3 },
       ];


       const obj2 = select;
       const obj1 = numeros;
       const result = obj2.map((obj) => ({
         ...obj,
         isPresent: obj1.some(({ id }) => id === obj.id),
       }));

       let selecionados = result.filter((car) => car.isPresent === true);

       let countObject = numeros.reduce(function (count, currentValue) {
         return (
           count[currentValue.id]
             ? ++count[currentValue.id]
             : (count[currentValue.id] = 1),
           count
         );
       }, {});

       var total = selecionados.reduce(getTotal, 0);
       function getTotal(total, item) {
         return item.valor * item.mult * countObject[item.id] + total;
       }

       valor = total;

       if (getaposta[0].jogo_id) {
         putAlerta({ valor: valor, resultado: resultados });
         editCarteira(parseInt(carteira) + parseInt(valor), user.id);
         storeAposta([]);
         putSelect([]);
         getApostas();
         setResultado(resultados);
         //putaposta_id(null)
         //console.error("aqui");
         putTexto("Aguardando nova rodada");

         if(valor > 0){
           putJogada("ganhou",jogada_id, valor)
         }else{
           putJogada("perdeu",jogada_id, valor)
         }

       }
     } else{
       putAlerta([])
     }

});


    }, 3000);

    return () => {
      clearTimeout(timeout);
    };
  }, [nome]);

  return { iniciada, resultado ,nome,criada};
}
