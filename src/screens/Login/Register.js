import React, { useState } from "react";
import {
  StyleSheet,
  View,
  Text,
  TouchableOpacity,
  ScrollView,
  Keyboard,
  Platform,
  SafeAreaView,
  TextInput,
} from "react-native";
import { Button } from "native-base";
import { useForm, Controller } from "react-hook-form";
import { useNavigation } from "@react-navigation/native";
import { AntDesign } from "@expo/vector-icons";
import axios from "axios";
import br from "date-fns/locale/pt-BR";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { DateTimePicker } from "react-native-ui-lib/src/components/dateTimePicker";
export default function Register() {
  const navigation = useNavigation();

  const [date, setDate] = React.useState(new Date());
  const [cep, setCep] = React.useState("");
  const [lop, setLop] = React.useState(true);
  const [erro, setErro] = React.useState();
  const [load, setLoad] = useState(false);
  const [endereco, setEndereco] = React.useState("");

  if (cep.length == 8 && lop) {
    const options = {
      method: "GET",
      url: "http://viacep.com.br/ws/" + cep.replace(/[^0-9]/g, "") + "/json/",
    };

    axios
      .request(options)
      .then(function (response) {
        ///console.log()(response.data);
        setEndereco(response.data);
        setLop(false);
      })
      .catch(function (error) {
        ////console.error(error);
      });
  }

  ///salvar ueser

  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm({
    defaultValues: {
      nome: "",
      email: "",
      telefone: "",
      senha: "",
      cpf: "",
    },
  });

  function handleSignin(data) {
    setLoad(true);
    const options = {
      method: "POST",
      url: "https://rutherles.site/api/cadastro",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      data: {
        name: data.nome,
        email: data.email.toLowerCase().trim(),
        password: data.senha,
        telefone: data.telefone,
        cpf: data.cpf,
        endereco: endereco.logradouro,
        cidade: endereco.localidade,
        nascimento: date,
        estado: endereco.uf,
        cep: endereco.cep,
      },
    };

    axios
      .request(options)
      .then(function (response) {
        if (cep.length > 7) {
          alert("Usuário cadastrado com sucesso.");
          navigation.navigate("Login", {
            cadastro: "Usuário cadastrado com sucesso.",
          });
        } else {
          alert("Por favor digite um CEP Válido");
        }
      })
      .catch(function (error) {
        setErro("Dados já cadastrados");
      });
  }
  return (
    <ScrollView showsVerticalScrollIndicator={false} style={styles.container}>
      <View style={styles.title1}>
        <TouchableOpacity onPress={() => navigation.navigate("Login")}>
          <AntDesign style={styles.iconRight} name="left" />
        </TouchableOpacity>
        <Text style={styles.title}>Cadastre-se</Text>
      </View>

      <View>
        <Text style={styles.subTitles}>Nome</Text>

        <Controller
          control={control}
          rules={{
            required: true,
          }}
          name="nome"
          render={({ field: { onChange, onBlur, value } }) => (
            <TextInput
              onBlur={onBlur} //chamado quando text input é tocado
              style={styles.input}
              onChangeText={onChange}
              value={value}
              placeholder="Seu nome"
              placeholderTextColor={"#fff"}
            />
          )}
        />
        {errors.nome && (
          <Text style={{ marginLeft: 20, color: "red" }}>Digite seu nome.</Text>
        )}
      </View>
      <View>
        <Text style={styles.subTitles}>Cpf</Text>
        <Controller
          control={control}
          rules={{
            required: true,
          }}
          name="cpf"
          render={({ field: { onChange, onBlur, value } }) => (
            <TextInput
              onBlur={onBlur} //chamado quando text input é tocado
              style={styles.input}
              onChangeText={onChange}
              value={value}
              placeholder="000.000.000-00"
              placeholderTextColor={"#fff"}
            />
          )}
        />
        {errors.nome && (
          <Text style={{ marginLeft: 20, color: "red" }}>Digite seu CPF.</Text>
        )}
      </View>
      <View>
        <Text style={styles.subTitles}>E-mail</Text>
        <Controller
          control={control}
          rules={{
            required: true,
          }}
          name="email"
          render={({ field: { onChange, onBlur, value } }) => (
            <TextInput
              onBlur={onBlur} //chamado quando text input é tocado
              style={styles.input}
              onChangeText={onChange}
              value={value}
              placeholder="exemplo@email.com"
              placeholderTextColor={"#fff"}
            />
          )}
        />
        {errors.email && (
          <Text style={{ marginLeft: 20, color: "red" }}>
            Digite seu email.
          </Text>
        )}
      </View>
      <View>
        <Text style={styles.subTitles}>Telefone</Text>
        <Controller
          control={control}
          rules={{
            required: true,
          }}
          name="telefone"
          render={({ field: { onChange, onBlur, value } }) => (
            <TextInput
              onBlur={onBlur} //chamado quando text input é tocado
              style={styles.input}
              onChangeText={onChange}
              value={value}
              placeholder="(00) 90000-0000"
              placeholderTextColor={"#fff"}
            />
          )}
        />

        {errors.telefone && (
          <Text style={{ marginLeft: 20, color: "red" }}>
            Digite seu telefone.
          </Text>
        )}
      </View>

      <View>
        <Text style={styles.subTitles}>Data de nascimento</Text>

        <DateTimePicker
          locale="pt"
          style={styles.input}
          date={date} //initial date from state
          mode="date" //The enum of date, datetime and time
          placeholder="Selecionar data"
          placeholderTextColor={"#fff"}
          format="DD-MM-YYYY"
          minDate="01-01-1900"
          maxDate="31-12-2004"
          confirmBtnText="Confirm"
          cancelBtnText="Cancel"
          customStyles={{
            dateIcon: {
              //display: 'none',
              position: "absolute",
              left: 0,
              top: 4,
              marginLeft: 0,
            },
            dateInput: {
              marginLeft: 36,
            },
          }}
          onDateChange={(date) => {
            setDate(date);
          }}
        />
      </View>

      <View style={{ marginTop: -30 }}>
        <Text style={styles.subTitles}>CEP</Text>

        <TextInput
          style={styles.input}
          onChangeText={setCep}
          value={cep}
          maxLength={8}
          placeholder="00000000"
          placeholderTextColor={"#fff"}
        />
      </View>

      <View>
        <Text style={styles.subTitles}>Endereço</Text>

        <TextInput
          style={styles.input}
          value={endereco.logradouro}
          placeholder="Rua Exemplo, número 00"
          placeholderTextColor={"#fff"}
        />
      </View>
      <View>
        <TextInput
          style={styles.input}
          value={endereco.localidade}
          placeholder="Cidade Exemplo"
          placeholderTextColor={"#fff"}
        />
      </View>
      <View>
        <Text style={styles.subTitles}>Estado</Text>

        <TextInput
          style={styles.input}
          value={endereco.uf}
          placeholder="Estado Exemplo"
          placeholderTextColor={"#fff"}
        />
      </View>

      <View>
        <Text style={styles.subTitles}>Senha</Text>
        <Controller
          control={control}
          rules={{
            required: true,
          }}
          name="senha"
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

        {errors.senha && (
          <Text style={{ marginLeft: 20, color: "red" }}>
            Digite sua senha.
          </Text>
        )}
        <Text style={{ marginLeft: 20, color: "red" }}>{erro}</Text>
      </View>

      <View style={styles.btn}>
        {load ? (
          <Button
            style={styles.btnSubmit}
            isLoading
            isLoadingText="Registrando"
          ></Button>
        ) : (
          <TouchableOpacity
            style={styles.btnSubmit}
            onPress={handleSubmit(handleSignin)}
          >
            <Text style={styles.btnSubmitText}> Cadastre-se </Text>
          </TouchableOpacity>
        )}
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
    color: "#fff",
  },
  iconRight: {
    color: "#fff",
    fontSize: 20,
    marginRight: 30,
    marginTop: 20,
    marginLeft: "17%",
  },
  title1: {
    marginTop: 20,
    flexDirection: "row",
    alignItems: "center",
    color: "#fff",
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
