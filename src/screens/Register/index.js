import React, { useState, useContext, useEffect } from "react";
import {
  View,
  TouchableOpacity,
  Platform,
  Keyboard,
  KeyboardAvoidingView,
  TouchableWithoutFeedback,
} from "react-native";
import { Text, Box, Button, ScrollView, Input, Divider } from "native-base";
import styles from "./styles";

import { AuthContext } from "../hooks/auth";
import axios from "axios";
import DateTimePicker from "@react-native-community/datetimepicker";
import { Primary, BackgroundSecondary } from "../../components/Colors";

export default function Register({ navigation }) {
  const { email } = useContext(AuthContext);
  const [cep, setCep] = useState("");
  const [address, setAddress] = useState("");
  const [erro, setErro] = React.useState();
  const [load, setLoad] = useState(false);
  const [telefone, setTelefone] = useState("");
  const [nome, setNome] = useState("");
  const [cpf, setCpf] = useState("");
  const [password, setPassword] = useState("");
  const [rpassword, setRPassword] = useState("");

  const [logradouro, setLogradouro] = useState("");
  const [bairro, setBairro] = useState("");
  const [cidade, setCidade] = useState("");
  const [estado, setEstado] = useState("");
  const [numero, setNumero] = useState("");

  const onChange = (event, selectedDate) => {
    // Verifica se a data selecionada é diferente da data atual
    // para evitar a recursão
    if (selectedDate !== date) {
      setDate(selectedDate || date);
    }
  };

  useEffect(() => {
    if (cep.length === 8) {
      const options = {
        method: "GET",
        url: `http://viacep.com.br/ws/${cep.replace(/[^0-9]/g, "")}/json/`,
      };

      axios
        .request(options)
        .then(function (response) {
          setAddress(response.data);
          if (response.data.erro) {
          } else {
          }
        })
        .catch(function (error) {
          //console.error(error);
        });
    }
  }, [cep]);

  async function Register(data) {
    setLoad(true);

    if (password !== rpassword || password === "" || password === undefined) {
      setErro("As senhas não coincidem.");
      setLoad(false);
    } else {
      const options = {
        method: "POST",
        url: "https://morenacaipira.com/api/cadastro",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        data: {
          name: nome,
          email: email.toLowerCase().trim(),
          telefone: telefone.trim(),
          cpf: cpf.trim(),
          endereco: address.logradouro + " ," + address.bairro + " ," + numero,
          cidade: address.localidade,
          estado: address.uf,
          cep: cep,
          password: password.trim(),
          role: "user",
        },
      };

      await axios
        .request(options)
        .then(function (response) {
          //console.error(response.data);
          if (response.data) {
            alert("Usuário cadastrado com sucesso.");

            navigation.navigate("Login", {
              cadastro: "Usuário cadastrado com sucesso.",
            });
            //console.error(response.data.nome);
            setLoad(false);
          } else {
            alert("Por favor digite um CEP Válido");
            setLoad(false);
          }
        })
        .catch(function (error) {
          setErro("Dados já cadastrados");
          setLoad(false);
        });
    }
  }

  return (
    <KeyboardAvoidingView
      style={styles.container}
      behavior={Platform.select({
        ios: "padding",
        android: null,
      })}
    >
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <ScrollView showsVerticalScrollIndicator={false} width="100%">
          <View style={styles.containerInfo}>
            <View style={styles.textInfoView}>
              <Text style={styles.infoTitle}>Agora vamos te conhecer</Text>
              <Text style={styles.infoSubTitle}>
                Precisamos de algumas informações.
              </Text>
            </View>

            <Box py={2} alignSelf={"center"}>
              <Text style={styles.infoLabel}>Email</Text>

              <Input
                color={"#fff"}
                variant="underlined"
                isDisabled={true}
                value={email}
                onChangeText={email}
                width="77.7%"
                autoCapitalize="nome"
                autoComplete="off"
                placeholder="Digite seu email"
                keyboardType="email-address"
              />
            </Box>
            <Box py={2} alignSelf={"center"}>
              <Text style={styles.infoLabel}>Telefone</Text>

              <Input
                color={"#fff"}
                value={telefone}
                onChangeText={setTelefone}
                width="77.7%"
                autoCapitalize="nome"
                autoComplete="off"
                placeholder="Digite seu telefone"
                keyboardType="phone-pad"
                variant="underlined"
              />
            </Box>
            <Box py={2} alignSelf={"center"}>
              <Text style={styles.infoLabel}>Nome</Text>

              <Input
                color={"#fff"}
                variant="underlined"
                value={nome}
                onChangeText={setNome}
                width="77.7%"
                autoCapitalize="nome"
                autoComplete="off"
                placeholder="Digite seu nome"
              />
            </Box>
            <Box py={2} alignSelf={"center"}>
              <Text style={styles.infoLabel}>Cpf</Text>

              <Input
                color={"#fff"}
                variant="underlined"
                value={cpf}
                onChangeText={setCpf}
                width="77.7%"
                autoCapitalize="nome"
                autoComplete="off"
                placeholder="Digite seu cpf"
                keyboardType="numeric"
              />
            </Box>

            <Box py={2} alignSelf={"center"}>
              <Text style={styles.infoLabel}>Cep</Text>

              <Input
                color={"#fff"}
                variant="underlined"
                value={cep}
                onChangeText={setCep}
                width="77.7%"
                autoCapitalize="nome"
                autoComplete="off"
                placeholder="Digite seu cep"
                keyboardType="numeric"
              />
            </Box>
            <Box py={2} alignSelf={"center"}>
              <Text style={styles.infoLabel}>Endereço</Text>

              <Input
                color={"#fff"}
                variant="underlined"
                value={
                  cep.length >= 8
                    ? address.logradouro + " ," + address.bairro
                    : ""
                }
                onChangeText={setLogradouro}
                width="77.7%"
                autoCapitalize="nome"
                autoComplete="off"
                placeholder="Digite seu endereço"
              />
            </Box>
            <Box py={2} alignSelf={"center"}>
              <Text style={styles.infoLabel}>Cidade</Text>

              <Input
                color={"#fff"}
                variant="underlined"
                value={address.localidade}
                onChangeText={setCidade}
                width="77.7%"
                autoCapitalize="nome"
                autoComplete="off"
                placeholder="Digite sua cidade"
              />
            </Box>
            <Box py={2} alignSelf={"center"}>
              <Text style={styles.infoLabel}>Estado</Text>

              <Input
                color={"#fff"}
                variant="underlined"
                value={address.uf}
                onChangeText={setEstado}
                width="77.7%"
                autoCapitalize="nome"
                autoComplete="off"
                placeholder="Digite seu estado"
              />
            </Box>
            <Box py={2} alignSelf={"center"}>
              <Text style={styles.infoLabel}>Número</Text>

              <Input
                color={"#fff"}
                variant="underlined"
                value={numero}
                onChangeText={setNumero}
                width="77.7%"
                autoCapitalize="nome"
                autoComplete="off"
                placeholder="Digite seu número"
              />
            </Box>

            <Box py={2} alignSelf={"center"}>
              <Text style={styles.infoLabel}>Senha</Text>

              <Input
                color={"#fff"}
                variant="underlined"
                value={password}
                onChangeText={setPassword}
                width="77.7%"
                autoCapitalize="nome"
                autoComplete="off"
                secureTextEntry={true}
                placeholder="Digite sua senha"
              />
            </Box>
            <Box py={2} alignSelf={"center"}>
              <Text style={styles.infoLabel}>Repita sua senha</Text>

              <Input
                color={"#fff"}
                variant="underlined"
                value={rpassword}
                onChangeText={setRPassword}
                width="77.7%"
                autoCapitalize="nome"
                autoComplete="off"
                secureTextEntry={true}
                placeholder="Digite sua senha"
              />
            </Box>
            {load ? (
              <Button
                style={styles.infoButton}
                isLoading
                isLoadingText="Registrando"
              ></Button>
            ) : (
              <TouchableOpacity
                style={styles.infoButton}
                onPress={() => {
                  Register();
                }}
              >
                <Text style={styles.infoText}> Cadastre-se </Text>
              </TouchableOpacity>
            )}
          </View>
        </ScrollView>
      </TouchableWithoutFeedback>
    </KeyboardAvoidingView>
  );
}
