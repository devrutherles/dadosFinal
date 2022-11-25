import React, { useState, useContext, useEffect } from "react";
import {
  View,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Alert,
} from "react-native";
import { Stack, Box, Text, Input, Divider, Button } from "native-base";
import { useNavigation } from "@react-navigation/native";
import { useForm, Controller } from "react-hook-form";
import axios from "axios";
import { AuthContext } from "../../hooks/auth";

export default function Withdrow() {
  const [bank, setBank] = useState({});
  const [text, onChangeText] = React.useState("");
  const [valor, setValor] = React.useState();
  const [pix, setPix] = React.useState(true);
  const [conta, setConta] = React.useState(false);
  let metodo = "pix";

  const { user, getPedido, editCarteira , getUser } = useContext(AuthContext);



  function saque(value) {
    setValor(value);
  }

  const carteira = user.carteira
  const [load, setLoad] = useState(false);
  const navigation = useNavigation();
  const {
    control,
    handleSubmit,

    formState: { errors },
  } = useForm({
    defaultValues: {
      pix: "",
      op: "",
      conta: "",
      digito: "",
      banco: "",
      valor: "",
      ag: "",
    },
  });

  function Fpix() {
    setPix(true);
    setConta(false);
    metodo = "pix";
  }

  function Fconta() {
    setPix(false);
    setConta(true);
    metodo = "conta";
  }

  function handlesolicitar(data) {
          

    
    var datas = JSON.stringify({
      usuario: user.nome,
      user_id: user.id,
      cpf: data.cpf,
      pix: data.pix,
      banco: data.banco,
      op: data.op,
      ag: data.ag,
      status: "pendente",
      conta: data.conta,
      email: user.email,
      digito: data.digito,
      metodo: metodo,
      valor: data.valor ? data.valor : valor,
    });

    var config = {
      method: "post",
      url: "https://rutherles.site/api/pedido",
      headers: {
        "Content-Type": "application/json",
      },
      data: datas,
    };

    console.warn(typeof data.valor)
   // console.error(typeof user.carteira);


  if (parseInt(data.valor) > parseInt(user.carteira)) {
    alert(" o valor máximo do saque deve ser o seu saldo")
  } else {
    setLoad(true);
    axios(config)
      .then(function (response) {
        setLoad(false);
        editCarteira(
          data.valor
            ? parseInt(user.carteira) - parseInt(data.valor)
            : parseInt(user.carteira) - parseInt(valor) , user.id
        );

        Alert.alert(
          "Pedido enviado",
          "Ja estamos com seu pedido de saque, voce tem 48h para receber",
          [
            {
              text: "Acompanhar",
              onPress: () => navigation.navigate("Saques"),
            },
            {
              text: "Sair",
              onPress: () => console.log("Sair"),
              style: "cancel",
            },
          ],
          {
            cancelable: true,
          }
        );
      })
      .catch((error) => {
        console.log("Api call error");
        alert(error.message);
      });
  }

      getPedido();
      getUser(user.id);
  }
  
  return (
    <View style={styles.container}>
      <ScrollView w="100%">
        <Stack
          space={2.5}
          alignSelf="center"
          px="4"
          safeArea
          mt="4"
          w={{
            base: "100%",
            md: "25%",
          }}
        >
          {user.carteira < 1 ? (
            <View style={{alignItems:"center",marginTop:50}}>
              <Text style={{color:"#fff",fontSize:20}}>Você não tem saldo disponível</Text>
            </View>
          ) : (
            <View>
              <Box>
                <Text
                  alignSelf={"center"}
                  color={"#fff"}
                  bold
                  fontSize="xl"
                  mb="4"
                >
                  Escolha a forma de transferência
                </Text>

                <View
                  style={{
                    flexDirection: "row",
                    alignContent: "space-between",
                    alignItems: "center",
                    justifyContent: "center",
                    marginTop: 20,
                    marginBottom: 10,
                  }}
                >
                  <TouchableOpacity
                    onPress={Fpix}
                    style={{
                      width: "50%",
                      height: 40,
                      alignSelf: "center",
                      alignItems: "center",
                      alignContent: "center",
                      borderBottomColor: pix ? "#1AB563" : "#404040",
                      borderWidth: 1,
                    }}
                  >
                    <Text style={{ color: "#fff", textAlign: "center" }}>
                      Pix
                    </Text>
                  </TouchableOpacity>
                  <TouchableOpacity
                    onPress={Fconta}
                    style={{
                      width: "50%",
                      height: 40,
                      alignSelf: "center",
                      alignItems: "center",
                      alignContent: "center",
                      borderBottomColor: conta ? "#1AB563" : "#404040",
                      borderWidth: 1,
                    }}
                  >
                    <Text style={{ color: "#fff", textAlign: "center" }}>
                      Conta
                    </Text>
                  </TouchableOpacity>
                </View>

                <Text
                  alignSelf={"flex-start"}
                  color={"#fff"}
                  marginTop={10}
                  marginBottom={2}
                >
                  CPF
                </Text>
                <View>
                  {errors.cpf && (
                    <Text style={{ color: "red" }}>Digite seu CPF.</Text>
                  )}
                  <Controller
                    control={control}
                    rules={{
                      required: true,
                    }}
                    name="cpf"
                    render={({ field: { onChange, onBlur, value } }) => (
                      <Input
                        color={"#fff"}
                        keyboardType="numeric"
                        style={styles.Input}
                        onBlur={onBlur}
                        onChangeText={onChange}
                        value={value}
                        placeholder="Cpf"
                        placeholderTextColor={"#fff"}
                      />
                    )}
                  />
                </View>

                {pix ? (
                  <View>
                    <Text
                      alignSelf={"flex-start"}
                      color={"#fff"}
                      marginTop={3}
                      marginBottom={2}
                    >
                      Chave PIX
                    </Text>
                    {errors.pix && (
                      <Text style={{ color: "red" }}>
                        Digite sua chave pix.
                      </Text>
                    )}
                    <Controller
                      control={control}
                      rules={{}}
                      name="pix"
                      render={({ field: { onChange, onBlur, value } }) => (
                        <Input
                          color={"#fff"}
                          keyboardType="text"
                          style={styles.Input}
                          onBlur={onBlur}
                          onChangeText={onChange}
                          value={value}
                          placeholder="Chave PIX"
                          placeholderTextColor={"#fff"}
                        />
                      )}
                    />
                  </View>
                ) : (
                  <></>
                )}

                {conta ? (
                  <View
                    style={{
                      flexDirection: "row",
                      marginTop: 10,
                      justifyContent: "space-between",
                    }}
                  >
                    <Text alignSelf={"flex-start"} color={"#fff"} marginTop={3}>
                      Banco
                    </Text>
                    <Text color={"#fff"} marginTop={3}>
                      Agência
                    </Text>
                    <Text marginRight={"1"} color={"#fff"} marginTop={3}>
                      Operação
                    </Text>
                  </View>
                ) : (
                  <></>
                )}

                {conta ? (
                  <View>
                    <View
                      style={{
                        flexDirection: "row",
                        justifyContent: "space-between",
                      }}
                    >
                      {errors.banco && (
                        <Text style={{ color: "red" }}>Digite seu banco.</Text>
                      )}
                      {errors.ag && (
                        <Text style={{ color: "red" }}>
                          Digite sua agência.
                        </Text>
                      )}
                      {errors.operacao && (
                        <Text style={{ color: "red" }}>
                          Digite sua operacao.
                        </Text>
                      )}
                    </View>
                    <View
                      style={{
                        flexDirection: "row",
                        marginTop: 10,
                        justifyContent: "space-between",
                      }}
                    >
                      <Controller
                        control={control}
                        rules={{}}
                        name="banco"
                        render={({ field: { onChange, onBlur, value } }) => (
                          <Input
                            keyboardType="text"
                            width={"30%"}
                            style={styles.Input1}
                            color={"#fff"}
                            onBlur={onBlur}
                            onChangeText={onChange}
                            value={value}
                            placeholder="Banco"
                            placeholderTextColor={"#fff"}
                          />
                        )}
                      />
                      <Controller
                        control={control}
                        rules={{}}
                        name="ag"
                        render={({ field: { onChange, onBlur, value } }) => (
                          <Input
                            keyboardType="text"
                            width={"30%"}
                            style={styles.Input1}
                            color={"#fff"}
                            onBlur={onBlur}
                            onChangeText={onChange}
                            value={value}
                            placeholder="Agência"
                            placeholderTextColor={"#fff"}
                          />
                        )}
                      />

                      <Controller
                        control={control}
                        rules={{}}
                        name="op"
                        render={({ field: { onChange, onBlur, value } }) => (
                          <Input
                            keyboardType="numeric"
                            width={"30%"}
                            style={styles.Input2}
                            color={"#fff"}
                            onBlur={onBlur}
                            onChangeText={onChange}
                            value={value}
                            placeholder="Operação"
                            placeholderTextColor={"#fff"}
                          />
                        )}
                      />
                    </View>
                  </View>
                ) : (
                  <></>
                )}

                {conta ? (
                  <View>
                    <View
                      style={{
                        flexDirection: "row",
                        marginTop: 10,
                        justifyContent: "space-between",
                      }}
                    >
                      <Text
                        alignSelf={"flex-start"}
                        color={"#fff"}
                        marginTop={3}
                      >
                        Conta
                      </Text>
                      <Text marginRight={"7"} color={"#fff"} marginTop={3}>
                        Dígito
                      </Text>
                    </View>
                    <View
                      style={{
                        flexDirection: "row",
                        justifyContent: "space-between",
                      }}
                    >
                      {errors.digito && (
                        <Text style={{ color: "red" }}>Digite seu digito.</Text>
                      )}
                      {errors.conta && (
                        <Text style={{ color: "red" }}>Digite sua conta.</Text>
                      )}
                    </View>
                    <View
                      style={{
                        flexDirection: "row",
                        marginTop: 10,
                        justifyContent: "space-between",
                      }}
                    >
                      <Controller
                        control={control}
                        rules={{}}
                        name="conta"
                        render={({ field: { onChange, onBlur, value } }) => (
                          <Input
                            keyboardType="numeric"
                            width={"70%"}
                            style={styles.Input1}
                            color={"#fff"}
                            onBlur={onBlur}
                            onChangeText={onChange}
                            value={value}
                            placeholder="Conta"
                            placeholderTextColor={"#fff"}
                          />
                        )}
                      />

                      <Controller
                        control={control}
                        rules={{}}
                        name="digito"
                        render={({ field: { onChange, onBlur, value } }) => (
                          <Input
                            keyboardType="numeric"
                            width={"20%"}
                            style={styles.Input2}
                            color={"#fff"}
                            onBlur={onBlur}
                            onChangeText={onChange}
                            value={value}
                            placeholder="Dígito"
                            placeholderTextColor={"#fff"}
                          />
                        )}
                      />
                    </View>
                  </View>
                ) : (
                  <></>
                )}

                <Divider style={{ marginTop: 20 }} />
              </Box>

              <Box marginTop={5}>
                <Text
                  bold
                  fontSize="lg"
                  mb="2"
                  color={"#fff"}
                  alignSelf={"center"}
                >
                  Insira o valor que deseja retirar
                </Text>

                <View style={{ flexDirection: "row", alignSelf: "center" }}>
                  <Text
                    bold
                    fontSize="sm"
                    mb="4"
                    color={"#fff"}
                    alignSelf={"flex-start"}
                  >
                    Valor Disponível :&nbsp;
                  </Text>
                  <Text
                    bold
                    fontSize="sm"
                    mb="4"
                    color={"#1ab563"}
                    alignSelf={"flex-start"}
                  >
                    R$ {user ? parseInt(user.carteira).toFixed(2) : 0.0}
                  </Text>
                </View>
                <View style={{}}>
                  <Text
                    style={{
                      marginTop: 20,
                      fontSize: 22,
                      alignSelf: "center",
                      color: "#fff",
                      justifyContent: "center",
                    }}
                  >
                    R$ {valor ? valor : text}
                  </Text>
                </View>

                <View
                  style={{
                    flexDirection: "row",
                    justifyContent: "space-between",
                    margin: 20,
                  }}
                >
                  <TouchableOpacity
                    onPress={() => saque(10)}
                    style={styles.add}
                  >
                    <Text style={styles.addvalue}>+ 10</Text>
                  </TouchableOpacity>
                  <TouchableOpacity
                    onPress={() => saque(50)}
                    style={styles.add}
                  >
                    <Text style={styles.addvalue}>+ 50</Text>
                  </TouchableOpacity>
                  <TouchableOpacity
                    onPress={() => saque(carteira)}
                    style={styles.add}
                  >
                    <Text style={styles.addvalue}>Total</Text>
                  </TouchableOpacity>
                </View>
                <Text
                  bold
                  fontSize="sm"
                  mb="4"
                  color={"#fff"}
                  alignSelf={"center"}
                >
                  Outros valores
                </Text>

                <Controller
                  control={control}
                  rules={{
                    required: false,
                  }}
                  name="valor"
                  render={({ field: { onChange, onBlur, value } }) => (
                    <Input
                      alignSelf={"center"}
                      borderRadius={10}
                      height={50}
                      width={"40%"}
                      backgroundColor={"#404040"}
                      borderWidth={1}
                      borderColor={"#1AB563"}
                      color={"#1AB563"}
                      fontSize={20}
                      bold={true}
                      keyboardType="numeric"
                      InputLeftElement={
                        <Text paddingLeft={3} fontSize="xl" color={"#1AB563"}>
                          R$
                        </Text>
                      }
                      onBlur={onBlur}
                      onChangeText={onChange}
                      value={value}
                      placeholderTextColor={"#fff"}
                    />
                  )}
                />

                {errors.valor && (
                  <Text style={{ color: "red" }}>Digite o valor.</Text>
                )}

                {load ? (
                  <Button
                    style={styles.retirar}
                    isLoading
                    isLoadingText="Solicitando"
                  >
                    Retirar
                  </Button>
                ) : (
                  <TouchableOpacity
                    onPress={handleSubmit(handlesolicitar)}
                    style={styles.retirar}
                  >
                    <Text
                      style={{ color: "#fff", fontSize: 20, fontWeight: "600" }}
                    >
                      Retirar
                    </Text>
                  </TouchableOpacity>
                )}
              </Box>
            </View>
          )}
        </Stack>
      </ScrollView>
    </View>
  );
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#000",
  },
  Input: {
    backgroundColor: "#404040",
  },
  Input1: {
    backgroundColor: "#404040",
  },
  Input2: {
    backgroundColor: "#404040",
  },
  add: {
    backgroundColor: "#1AB563",
    width: 80,
    height: 40,
    borderRadius: 10,
    justifyContent: "center",
    alignItems: "center",
    marginTop: 30,
  },
  addvalue: { color: "#fff", fontSize: 22, fontWeight: "600" },
  retirar: {
    backgroundColor: "#1AB563",
    width: "70%",
    height: 40,
    borderRadius: 10,
    alignItems: "center",
    justifyContent: "center",
    marginTop: 30,
    alignSelf: "center",
  },
});
