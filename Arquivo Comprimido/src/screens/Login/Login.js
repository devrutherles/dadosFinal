import React from "react";
import {
  Text,
  View,
  KeyboardAvoidingView,
  Image,
  TouchableOpacity,
  StyleSheet,
  Animated,
  Keyboard,
  Platform,
  SnapshotViewIOS,
  TextInput,
} from "react-native";

import { useEffect, useState } from "react";
import { useNavigation } from "@react-navigation/native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import axios from "axios";
import { useForm, Controller } from "react-hook-form";

export default function Login({ route }) {
  const { cadastro } = route.params ? route.params : "";
  const navigation = useNavigation();
  const [offsetX] = useState(new Animated.Value(0));
  const [offsetY] = useState(new Animated.Value(95));
  const [opacity] = useState(new Animated.Value(0));
  const [logoX] = useState(new Animated.Value(350));
  const [logoY] = useState(new Animated.Value(100));
  const [token, setToken] = useState();
  const [erro, setErro] = useState();

  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm({
    defaultValues: {
      email: "",
      password: "",
    },
  });

  function handleSignin(data) {
    const storeUser = async (value) => {
      try {
        const jsonValue = JSON.stringify(value);
        await AsyncStorage.setItem("@user", jsonValue);
      } catch (e) {}
    };

    const setToken = async (value) => {
      try {
        await AsyncStorage.setItem("@token", value);
      } catch (e) {}
    };

    const options = {
      method: "POST",
      url: "https://rutherles.site/api/login",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        Authorization: "token" + token,
      },
      data: { email: data.email, password: data.password },
    };

    axios
      .request(options)
      .then(function (response) {
        storeUser(response.data.user);
        global.id = response.data.user.id;
        setToken(response.data.authorisation.token);
        navigation.navigate("tab");
      })
      .catch(function (error) {
        //console.error(error);
        setErro("Email ou senha incorretos");
      });
  }

  useEffect(() => {
    const getData = async () => {
      try {
        const value = await AsyncStorage.getItem("@token");
        if (value !== null) {
          setToken(value);
          storeUser();
        }
      } catch (e) {
        // error reading value
      }
    };

    const storeStart = async (value) => {
      try {
        await AsyncStorage.setItem("@start", "true");
      } catch (e) {}
    };

    getData();
    storeStart();

    keyboardDidShowListener = Keyboard.addListener(
      "keyboardDidShow",
      keyboardDidShow
    );
    keyboardDidHideListener = Keyboard.addListener(
      "keyboardDidHide",
      keyboardDidHide
    );

    Animated.parallel([
      Animated.spring(offsetY, {
        toValue: 0,
        speed: 4,
        useNativeDriver: true,
        bounciness: 20,
      }),
      Animated.timing(opacity, {
        toValue: 1,
        duration: 200,
        useNativeDriver: true,
      }),
    ]).start();
  }, []);

  function keyboardDidShow() {
    Animated.parallel([
      Animated.timing(logoX, {
        toValue: 350,
        duration: 100,
        useNativeDriver: false,
      }),
      Animated.timing(logoY, {
        toValue: 100,
        duration: 100,
        useNativeDriver: false,
      }),
    ]).start();
  }
  function keyboardDidHide() {
    Animated.parallel([
      Animated.timing(logoX, {
        toValue: 350,
        duration: 100,
        useNativeDriver: false,
      }),
      Animated.timing(logoY, {
        toValue: 100,
        duration: 100,
        useNativeDriver: false,
      }),
    ]).start();
  }

  return (
    <KeyboardAvoidingView
      style={styles.background}
      behavior={Platform.OS === "ios" ? "padding" : "height"}
    >
      <View style={styles.containerLogo}>
        <Animated.Image
          style={{
            width: logoX,
            height: logoY,
          }}
          source={require("../../images/logo.png")}
        />

        <Text style={{ color: "#0ed830", fontWeight: "bold" }}>
          {cadastro ? cadastro : null}
        </Text>
      </View>

      <Animated.View
        style={[
          styles.container,
          {
            opacity: opacity,
            transform: [{ translateY: offsetY }],
          },
        ]}
      >
        <View
          style={{
            width: "100%",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <Controller
            control={control}
            rules={{
              required: true,
            }}
            name="email"
            render={({ field: { onChange, onBlur, value } }) => (
              <TextInput
                onBlur={onBlur}
                onChangeText={onChange}
                value={value}
                style={styles.input}
                placeholder="Email"
                autoCorrect={false}
                keyboardType="email-address"
                placeholderTextColor="#fff"
              />
            )}
          />
          {errors.email && (
            <Text style={{ color: "red", marginBottom: 10 }}>
              Digite seu email.
            </Text>
          )}
        </View>

        <View
          style={{
            width: "100%",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <Controller
            control={control}
            rules={{
              required: true,
            }}
            name="password"
            render={({ field: { onChange, onBlur, value } }) => (
              <TextInput
                onBlur={onBlur}
                onChangeText={onChange}
                value={value}
                secureTextEntry={true}
                style={styles.input}
                placeholder="********"
                autoCorrect={false}
                placeholderTextColor="#fff"
              />
            )}
          />
          {errors.password && (
            <Text style={{ color: "red", marginBottom: 10 }}>
              Digite sua senha.
            </Text>
          )}
          <Text style={{ color: "red", marginBottom: 10 }}>{erro} </Text>
        </View>

        <TouchableOpacity
          style={styles.btnSubmit}
          onPress={handleSubmit(handleSignin)}
        >
          <Text style={styles.btnSubmitText}> Acessar </Text>
        </TouchableOpacity>

        <TouchableOpacity
          onPress={() => navigation.navigate("Register")}
          style={styles.btnRegister}
        >
          <Text style={styles.RegisterText}> Criar conta grátis </Text>
        </TouchableOpacity>

        <TouchableOpacity
          onPress={() => navigation.navigate("Recuperar")}
          style={styles.btnRegister}
        >
          <Text style={{ color: "#fff", marginTop: 30 }}>
            Esqueceu sua senha?
          </Text>
        </TouchableOpacity>
      </Animated.View>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  background: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#000",
  },
  containerLogo: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  container: {
    marginTop: -40,
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    width: "100%",
    paddingBottom: 55,
  },
  input: {
    backgroundColor: "#404040",
    width: "90%",
    marginBottom: 15,
    color: "#fff",
    fontSize: 17,
    borderRadius: 7,
    paddingLeft: 15,
    height: 45,
  },
  btnSubmit: {
    backgroundColor: "#ff0000",
    width: "90%",
    height: 45,
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 7,
  },
  btnSubmitText: {
    color: "#fff",
  },
  btnRegister: {
    marginTop: 10,
  },
  RegisterText: {
    color: "#fff",
  },
  LogoText: {
    fontWeight: "bold",
    fontSize: 16,
  },
});
