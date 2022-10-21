import React from "react";
import { View, StyleSheet, ScrollView, TouchableOpacity } from "react-native";
import {
  Stack,
  Box,
  Text,
  FormControl,
  Input,
  Divider,
  WarningOutlineIcon,
} from "native-base";
import { useAposta } from "../../hooks/useAposta";
export default function Retirada() {
  const [text, onChangeText] = React.useState("");
  const [valor, setValor] = React.useState();
  const { carteira } = useAposta();
  function saque(value) {
    setValor(value);
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
          <Box>
            <Text alignSelf={"center"} color={"#fff"} bold fontSize="xl" mb="4">
              Adicionar conta bancária
            </Text>
            <Text alignSelf={"flex-start"} color={"#fff"} marginBottom={2}>
              CPF
            </Text>
            <Input color={"#fff"} keyboardType="numeric" style={styles.Input} />
            <Text
              alignSelf={"flex-start"}
              color={"#fff"}
              marginTop={3}
              marginBottom={2}
            >
              Chave PIX
            </Text>
            <Input color={"#fff"} keyboardType="numeric" style={styles.Input} />

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
              <Text marginRight={"1"} color={"#fff"} marginTop={3}>
                Operação
              </Text>
            </View>
            <View
              style={{
                flexDirection: "row",
                marginTop: 10,
                justifyContent: "space-between",
              }}
            >
              <Input
                keyboardType="numeric"
                width={"70%"}
                style={styles.Input1}
                color={"#fff"}
              />
              <Input
                keyboardType="numeric"
                width={"20%"}
                style={styles.Input2}
                color={"#fff"}
              />
            </View>

            <View
              style={{
                flexDirection: "row",
                marginTop: 10,
                justifyContent: "space-between",
              }}
            >
              <Text alignSelf={"flex-start"} color={"#fff"} marginTop={3}>
                Conta
              </Text>
              <Text marginRight={"7"} color={"#fff"} marginTop={3}>
                Dígito
              </Text>
            </View>
            <View
              style={{
                flexDirection: "row",
                marginTop: 10,
                justifyContent: "space-between",
              }}
            >
              <Input
                keyboardType="numeric"
                width={"70%"}
                style={styles.Input1}
                color={"#fff"}
              />
              <Input
                keyboardType="numeric"
                width={"20%"}
                style={styles.Input2}
                color={"#fff"}
              />
            </View>

            <Divider style={{ marginTop: 20 }} />
          </Box>

          <Box marginTop={5}>
            <Text bold fontSize="lg" mb="2" color={"#fff"} alignSelf={"center"}>
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
                R$ {carteira ? parseInt(carteira).toFixed(2) : 0.0}
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
              <TouchableOpacity onPress={() => saque(10)} style={styles.add}>
                <Text style={styles.addvalue}>+ 10</Text>
              </TouchableOpacity>
              <TouchableOpacity onPress={() => saque(50)} style={styles.add}>
                <Text style={styles.addvalue}>+ 50</Text>
              </TouchableOpacity>
              <TouchableOpacity
                onPress={() => saque(carteira)}
                style={styles.add}
              >
                <Text style={styles.addvalue}>Total</Text>
              </TouchableOpacity>
            </View>
            <Text bold fontSize="sm" mb="4" color={"#fff"} alignSelf={"center"}>
              Outros valores
            </Text>
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
              onChangeText={onChangeText}
              value={text}
            />
            <TouchableOpacity style={styles.retirar}>
              <Text style={{ color: "#fff", fontSize: 20, fontWeight: "600" }}>
                Retirar
              </Text>
            </TouchableOpacity>
          </Box>
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
