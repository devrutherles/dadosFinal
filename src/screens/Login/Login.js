import React from "react";
import {
  Text,
  View,
  KeyboardAvoidingView,
  Image,
  TouchableOpacity,
  StyleSheet,
  Platform,
  TextInput,
} from "react-native";
import { Button } from "native-base";
import { useEffect, useState, useContext } from "react";
import { useNavigation } from "@react-navigation/native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import axios from "axios";
import { useForm, Controller } from "react-hook-form";
import { AuthContext } from "../hooks/auth";

export default function Login({ route }) {
  const navigation = useNavigation();
  const [erro, setErro] = useState();
  const [load, setLoad] = useState(false);
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

  const {getUser } = useContext(AuthContext);

  function handleSignin(data) {
    setLoad(true);

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
      },
      data: { email: data.email, password: data.password },
    };

    axios
      .request(options)
      .then(function (response) {
        storeUser(response.data.user[0]);
        setToken(response.data.authorisation.token);
        setLoad(false);
        getUser(response.data.user[0].id);
        global.id = response.data.user[0].id;
        global.user = response.data.user[0];
        navigation.navigate("tab");
      })
      .catch(function (error) {
        setLoad(false);
        setErro("Email ou senha incorretos");
      });
  }

  return (
    <KeyboardAvoidingView
      style={styles.background}
      behavior={Platform.OS === "ios" ? "padding" : "height"}
    >
      <View
        style={{
          marginBottom: 70,
          alignContent: "center",
          alignItems: "center",
        }}
      >
        <Image
          style={{
            width: 120,
            height: 120,
            borderRadius: 7,
          }}
          source={require("../../images/caipira.png")}
        />
        <Text style={{ color: "#fff", marginTop: 25, fontSize: 20 }}>
          Morena Caipira
        </Text>
      </View>

      <View style={styles.key}>
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
              autoCapitalize="none"
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
              autoCapitalize="none"
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

      {load ? (
        <Button
          style={styles.btnSubmit}
          isLoading
          isLoadingText="Acessando"
        ></Button>
      ) : (
        <TouchableOpacity
          style={styles.btnSubmit}
          onPress={handleSubmit(handleSignin)}
        >
          <Text style={styles.btnSubmitText}> Acessar </Text>
        </TouchableOpacity>
      )}
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
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  marginp: Platform.OS === "ios" ? 90 : 90,
  key: {
    width: "100%",
    alignItems: "center",
    justifyContent: "center",

    ...Platform.select({
      ios: {},
      android: {
        marginTop: 20,
      },
    }),
  },
  background: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#000",
  },
  containerLogo: {
    justifyContent: "center",
    alignItems: "center",
  },
  container: {
    marginTop: 10,

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
