import { useState, useEffect } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";

export function LoginApi() {
  const [token, setToken] = useState("");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const getToken = async () => {
      try {
        const value = await AsyncStorage.getItem("@token");
        if (value !== null) {
          
          setToken(value);
          setLoading(true)
          
        } else{
          setLoading(true)
        }



        
      } catch (e) {}

      
      
    };

    getToken();
  }, []);

  return { token, loading };
}
