import { useState, useEffect, useContext } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
export function LoginApi() {
  const [token, setToken] = useState(false);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const getToken = async () => {
      try {
        const value = await AsyncStorage.getItem("@user");
        if (value !== null) {
          setToken(JSON.parse(value));
          setLoading(true);
        } else {
          setLoading(true);
        }
      } catch (e) {}
    };

    getToken();
  }, []);

  return { token, loading };
}
