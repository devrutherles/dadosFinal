import { Switch, ActivityIndicator, TouchableOpacity } from "react-native";
import {
  Feather,
  MaterialCommunityIcons,
  FontAwesome,
  AntDesign,
} from "@expo/vector-icons";
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
import { useEffect, useState, useContext } from "react";
import { AuthContext } from "../hooks/auth";

export default function Wallet({ route, navigation }) {
  const [isVisible, setIsVisible] = useState(true);
  const [useBalance, setUseBalance] = useState(true);
  const { user } = useContext(AuthContext);
  function handleToggleVisibility() {
    setIsVisible((prevState) => !prevState);
  }
  const [load, setLoad] = useState(true);

  function handleToggleUseBalance() {
    setUseBalance((prevState) => !prevState);
  }

  const { pagamento } = route.params ? route.params : false;

  if (pagamento && load) {
    alert("Depositado com sucesso!");
    setLoad(false);
  }

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
                {" " + user ? parseInt(user.carteira).toFixed(2) : 0.0}
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
