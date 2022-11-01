import { Switch, ActivityIndicator, TouchableOpacity } from "react-native";
import {
  Feather,
  MaterialCommunityIcons,
  FontAwesome,
  AntDesign,
} from "@expo/vector-icons";
import { Alertadeposito } from "./components/Alertadeposito";
import {
  Wrapper,
  Header,
  HeaderContainer,
  Title,
  BalanceContainer,
  Value,
  Bold,
  EyeButton,
  Info,
  Actions,
  Action,
  ActionLabel,
  UseBalance,
  UseBalanceTitle,
  PaymentMethods,
  PaymentMethodsTitle,
  Card,
  CardBody,
  CardDetails,
  CardTitle,
  CardInfo,
  Img,
  AddButton,
  AddLabel,
  UseTicketContainer,
  UseTicketButton,
  UseTicketLabel,
} from "./styles";

import creditCard from "../../images/credit-card.png";
import React from "react";
import { StyleSheet, View, Text, FlatList, ScrollView } from "react-native";
import { useNavigation } from "@react-navigation/native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import axios from "axios";
import { useEffect, useState } from "react";
import { useAposta } from "../hooks/useAposta";
import { putUser } from "../hooks/PostFunctions";
import { Spinner,HStack,Heading } from "native-base";
export default function Wallet({ route, navigation }) {
  const [isVisible, setIsVisible] = useState(true);
  const [useBalance, setUseBalance] = useState(true);
  const { token } = useAposta();

  function handleToggleVisibility() {
    setIsVisible((prevState) => !prevState);
  }

  function handleToggleUseBalance() {
    setUseBalance((prevState) => !prevState);
  }

  const [user, setUser] = React.useState(false);
  const [loader, setloader] = React.useState(false);
  const [jogos, setJogos] = React.useState();
  const [lop, setLop] = React.useState(true);
  const { carteira } = useAposta();
  const [deposito, setDeposito] = React.useState([]);

  const { puser_id, pcarteira, pvalor, pdeposito_id } = route.params
    ? route.params
    : false;
  let users = "";
  let alerta = "";

  useEffect(() => {
    if (pdeposito_id) {
      putUser(puser_id, pcarteira, pvalor, pdeposito_id, "aprovado");
      alert(aprovado);
    }

    const getData = async () => {
      try {
        const value = await AsyncStorage.getItem("@user");
        if (value !== null) {
          let users = JSON.parse(value);
          setUser(users);
          setloader(true);
        }
      } catch (e) {
        // error reading value
      }
    };

    getData();
  }, []);

  if (user && lop) {
    var id = user.id;

    const options = {
      method: "GET",
      url: "https://rutherles.site/api/usuario/" + id,
      headers: {
        Accept: "application/json",
        Authorization:
          "Token eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpc3MiOiJodHRwOi8vMTM3LjE4NC40OC42Ny9hcGkvbG9naW4iLCJpYXQiOjE2NjIwMzY2NzksImV4cCI6MjI2NjUzMjMwOTg5OSwibmJmIjoxNjYyMDM2Njc5LCJqdGkiOiJObWxKdHczbmZUTWtLSFRSIiwic3ViIjoiODEiLCJwcnYiOiIyM2JkNWM4OTQ5ZjYwMGFkYjM5ZTcwMWM0MDA4NzJkYjdhNTk3NmY3In0.qDXH1Mqh_MRK-zS5wYysCYgKht9yZB1YUOWUYgWKOaM",
      },
    };

    axios
      .request(options)
      .then(function (response) {
        // setCarteira(response.data[0].carteira);
        ///console.log()(response);
      })
      .catch(function (error) {
        //console.error(error);
      });

    const options2 = {
      method: "POST",
      url: "https://rutherles.site/api/deposito",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        Authorization:
          "Token eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpc3MiOiJodHRwOi8vMTM3LjE4NC40OC42Ny9hcGkvbG9naW4iLCJpYXQiOjE2NjIwMzY2NzksImV4cCI6MjI2NjUzMjMwOTg5OSwibmJmIjoxNjYyMDM2Njc5LCJqdGkiOiJObWxKdHczbmZUTWtLSFRSIiwic3ViIjoiODEiLCJwcnYiOiIyM2JkNWM4OTQ5ZjYwMGFkYjM5ZTcwMWM0MDA4NzJkYjdhNTk3NmY3In0.qDXH1Mqh_MRK-zS5wYysCYgKht9yZB1YUOWUYgWKOaM",
      },
      data: { user_id: id },
    };

    axios
      .request(options2)
      .then(function (response) {
        setDeposito(response.data.deposito);
        ///console.log()(response.data.deposito);
      })
      .catch(function (error) {
        //console.error(error);
      });

    setLop(false);

    ///console.log()(users.nome);
  }

  if (deposito) {
    return (
      <Wrapper>
        <Header
          colors={useBalance ? ["#52E78C", "#1AB563"] : ["#D3D3D3", "#868686"]}
        >
          <HeaderContainer>
            <Title>Saldo</Title>

            <BalanceContainer>
              <Value>
                R$  
                <Bold>
                  
                    { " " + parseInt(global.cart).toFixed(2)}
                 
                </Bold>
              </Value>

              <EyeButton onPress={handleToggleVisibility}>
                <Feather
                  name={isVisible ? "eye" : "eye-off"}
                  size={28}
                  color="#fff"
                />
              </EyeButton>
            </BalanceContainer>

            <Actions>
              <TouchableOpacity>
                <Action onPress={() => navigation.navigate("Pix")}>
                  <MaterialCommunityIcons name="cash" size={28} color="#fff" />
                  <ActionLabel>Adicionar</ActionLabel>
                </Action>
              </TouchableOpacity>
              <Action onPress={() => navigation.navigate("Home")}>
                <FontAwesome name="bank" size={20} color="#fff" />
                <ActionLabel>Retirar</ActionLabel>
              </Action>
            </Actions>
          </HeaderContainer>
        </Header>

        <UseBalance>
          <UseBalanceTitle>Permitir apostas</UseBalanceTitle>

          <Switch value={useBalance} onValueChange={handleToggleUseBalance} />
        </UseBalance>

        <PaymentMethods>
          <PaymentMethodsTitle>Forma de Pagamento</PaymentMethodsTitle>

          <Card>
            <CardBody>
              <CardDetails>
                <CardTitle>Adicione saldo</CardTitle>
                <CardInfo>
                  Aqui você pode adicionar saldo e fazer suas apostas.
                </CardInfo>
              </CardDetails>

              <Img source={creditCard} resizeMode="contain" />

              {alerta ? <Alertadeposito /> : <></>}
            </CardBody>

            <AddButton onPress={() => navigation.navigate("Pix")}>
              <AntDesign name="pluscircleo" size={30} color="#0DB060" />
              <AddLabel>Adicionar saldo</AddLabel>
            </AddButton>
          </Card>

          <UseTicketContainer>
            <UseTicketButton>
              <MaterialCommunityIcons
                name="ticket-outline"
                size={20}
                color="#0DB060"
              />
              <UseTicketLabel>Usar código promocional</UseTicketLabel>
            </UseTicketButton>
          </UseTicketContainer>
        </PaymentMethods>
      </Wrapper>
    );
  }
}
