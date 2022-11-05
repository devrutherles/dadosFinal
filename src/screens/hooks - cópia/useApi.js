import  {useEffect,useState} from "react";
import axios from "axios";

export function useApi (url){
const [data,setData] = useState(null);

useEffect(() => {
    axios.get(url)
    .then((res) => {
    setData(res.data)
    });

}, []);

return {data}

}


