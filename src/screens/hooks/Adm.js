import axios from "axios";


export function saldoAdm(){



const options = {
  method: 'PUT',
  url: 'https://rutherles.site/api/adm',
  headers: {Accept: 'application/json'}
};

axios.request(options).then(function (response) {
  console.log(response.data);
}).catch(function (error) {
  console.error(error);
});




}