import React from "react";
import {
  StyleSheet,
  View,
  Text,
  TouchableOpacity,
  ScrollView,
  TextInput,
} from "react-native";
import { useForm, Controller } from "react-hook-form";
import { useNavigation } from "@react-navigation/native";
import { AntDesign } from "@expo/vector-icons";
import { useEffect, useState } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import axios from "axios";

export default function Profile() {
  const [user, setUser] = React.useState();
  const [loader, setloader] = React.useState(false);
  let users = "";

  if (loader) {
    users = JSON.parse(user);
  }

  useEffect(() => {
    const getData = async () => {
      try {
        const value = await AsyncStorage.getItem("@user");
        if (value !== null) {
          ///console.log()(value);
          setUser(value);
          setloader(true);
        }
      } catch (e) {
        // error reading value
      }
    };

    getData();
  }, []);

  const {
    control,
    handleSubmit,
    formState: { erros },
  } = useForm({});

  function handleSignin(data) {
    ///console.log()(data);
  }
  const navigation = useNavigation();
  return (
    <ScrollView showsVerticalScrollIndicator={false} style={styles.container}>



      
      <View style={{ marginTop: 30 }}>


      
      
      <View style={styles.title1}>
        <TouchableOpacity onPress={() => navigation.navigate("Settings")}>
          <AntDesign style={styles.iconRight} name="left" color={"#ffff"} />
        </TouchableOpacity>
        <Text style={styles.subTitles}>Perfil</Text>
      </View>



        <View>
          <Text style={styles.subTitles}>Nome</Text>

          <Controller
            control={control}
            name="name"
            render={({ field: { onChange, onBlur, value } }) => (
              <TextInput
                onBlur={onBlur} //chamado quando text input é tocado
                style={styles.input}
                onChangeText={onChange}
                value={users.nome}
                placeholder="Seu nome"
                placeholderTextColor={"#fff"}
              />
            )}
          />
        </View>
        <View>
          <Text style={styles.subTitles}>Cpf</Text>
          <Controller
            control={control}
            name="cpf"
            render={({ field: { onChange, onBlur, value } }) => (
              <TextInput
                onBlur={onBlur} //chamado quando text input é tocado
                style={styles.input}
                onChangeText={onChange}
                value={users.cpf}
                placeholder="000.000.000-00"
                placeholderTextColor={"#fff"}
              />
            )}
          />
        </View>
        <View>
          <Text style={styles.subTitles}>E-mail</Text>
          <Controller
            control={control}
            name="email"
            render={({ field: { onChange, onBlur, value } }) => (
              <TextInput
                onBlur={onBlur} //chamado quando text input é tocado
                style={styles.input}
                onChangeText={onChange}
                value={users.email}
                placeholder="exemplo@email.com"
                placeholderTextColor={"#fff"}
              />
            )}
          />
        </View>
        <View>
          <Text style={styles.subTitles}>Telefone</Text>
          <Controller
            control={control}
            name="telefone"
            render={({ field: { onChange, onBlur, value } }) => (
              <TextInput
                onBlur={onBlur} //chamado quando text input é tocado
                style={styles.input}
                onChangeText={onChange}
                value={users.telefone}
                placeholder="(00) 90000-0000"
                placeholderTextColor={"#fff"}
              />
            )}
          />
        </View>
        <View>
          <Text style={styles.subTitles}>Data de nascimento</Text>
          <Controller
            control={control}
            name="nascimento"
            render={({ field: { onChange, onBlur, value } }) => (
              <TextInput
                onBlur={onBlur} //chamado quando text input é tocado
                style={styles.input}
                onChangeText={onChange}
                value={users.nascimento}
                placeholder="00/00/0000"
                placeholderTextColor={"#fff"}
              />
            )}
          />
        </View>
        <View>
          <Text style={styles.subTitles}>Endereço</Text>
          <Controller
            control={control}
            name="endereco"
            render={({ field: { onChange, onBlur, value } }) => (
              <TextInput
                onBlur={onBlur} //chamado quando text input é tocado
                style={styles.input}
                onChangeText={onChange}
                value={users.endereco}
                placeholder="Rua Exemplo, número 00"
                placeholderTextColor={"#fff"}
              />
            )}
          />
        </View>
        <View>
          <Text style={styles.subTitles}>Cidade</Text>
          <Controller
            control={control}
            name="cidade"
            render={({ field: { onChange, onBlur, value } }) => (
              <TextInput
                onBlur={onBlur} //chamado quando text input é tocado
                style={styles.input}
                onChangeText={onChange}
                value={users.cidade}
                placeholder="Cidade Exemplo"
                placeholderTextColor={"#fff"}
              />
            )}
          />
        </View>
        <View>
          <Text style={styles.subTitles}>Estado</Text>
          <Controller
            control={control}
            name="estado"
            render={({ field: { onChange, onBlur, value } }) => (
              <TextInput
                onBlur={onBlur} //chamado quando text input é tocado
                style={styles.input}
                onChangeText={onChange}
                value={users.estado}
                placeholder="Estado Exemplo"
                placeholderTextColor={"#fff"}
              />
            )}
          />
        </View>
        <View>
          <Text style={styles.subTitles}>CEP</Text>
          <Controller
            control={control}
            name="cep"
            render={({ field: { onChange, onBlur, value } }) => (
              <TextInput
                onBlur={onBlur} //chamado quando text input é tocado
                style={styles.input}
                onChangeText={onChange}
                value={users.cep}
                placeholder="00000-000"
                placeholderTextColor={"#fff"}
              />
            )}
          />
        </View>

        <View>
          <Text style={styles.subTitles}>Senha</Text>
          <Controller
            control={control}
            name="senha"
            render={({ field: { onChange, onBlur, value } }) => (
              <TextInput
                onBlur={onBlur} //chamado quando text input é tocado
                style={styles.input}
                onChangeText={onChange}
                value={users.senha}
                secureTextEntry={true}
                placeholder="********"
                placeholderTextColor={"#fff"}
              />
            )}
          />
        </View>
        <View>
          <Text style={styles.subTitles}> Repetir a Senha</Text>
          <Controller
            control={control}
            name="repeat"
            render={({ field: { onChange, onBlur, value } }) => (
              <TextInput
                onBlur={onBlur} //chamado quando text input é tocado
                style={styles.input}
                onChangeText={onChange}
                value={value}
                secureTextEntry={true}
                placeholder="********"
                placeholderTextColor={"#fff"}
              />
            )}
          />
        </View>
        <View style={styles.btn}>
          <TouchableOpacity
            style={styles.btnSubmit}
            onPress={handleSubmit(handleSignin)}
          >
            <Text style={styles.btnSubmitText}> Salvar </Text>
          </TouchableOpacity>
        </View>
      </View>
    </ScrollView>
  );
}
const styles = StyleSheet.create({
  input: {
    height: 40,
    margin: 12,
    backgroundColor: "#404040",
    borderRadius: 8,
    padding: 10,
    color: "#fff",
  },
  container: {
    flex: 1,
    backgroundColor: "#000",
  },
  title: {
    fontSize: 20,
    fontWeight: "bold",
    textTransform: "uppercase",
    marginTop: 20,
    textAlign: "center",
  },
  iconRight: {
    fontSize: 20,
    marginRight: 30,
    marginTop: 20,
    marginLeft: "17%",
    marginRight: -17,
  },
  title1: {
    marginTop: 20,
    flexDirection: "row",
    alignItems: "center",
  },
  subTitles: {
    marginLeft: 20,
    marginTop: 20,
    fontWeight: "bold",
    color: "#fff",
  },
  button: {
    backgroundColor: "#ff0000",
    width: "50%",
    alignContent: "center",
    alignSelf: "center",
    marginVertical: "10%",
    color: "#fff",
    borderRadius: 5,
  },
  btnSubmit: {
    backgroundColor: "#ff0000",
    marginBottom: 40,
    marginTop: 10,
    height: 45,
    width: "90%",
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 7,
  },
  btnSubmitText: {
    color: "#fff",
  },
  btn: {
    alignItems: "center",
    justifyContent: "center",
  },
});
