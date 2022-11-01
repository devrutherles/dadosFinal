import { useState, useEffect } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";

export function useProfile() {
  const [token, setToken] = useState(null);
  const [loading2, setLoading2] = useState(false);

  useEffect(() => {
    const getToken = async () => {
      try {
        const value = await AsyncStorage.getItem("@user");
        if (value !== null) {
          setToken(JSON.parse(value));
          setLoading2(true);
        }
      } catch (e) {
        // error reading value
      }
    };

    getToken();
  }, []);

  return { token, loading2 };
}
