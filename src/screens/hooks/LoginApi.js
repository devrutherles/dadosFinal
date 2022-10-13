import { useState, useEffect } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";

export function LoginApi() {
  const [token, setToken] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const getToken = async () => {
      try {
        const value = await AsyncStorage.getItem("@token");
        if (value !== null) {
          setToken(value);
          setLoading(false);
        }
      } catch (e) {}
    };

    getToken();
  }, []);

  return { token, loading };
}
