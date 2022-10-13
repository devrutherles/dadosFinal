import React from "react";
import { TouchableOpacity } from "react-native";
import { Container, Option, Img, Label } from "./styles";
import { useNavigation } from "@react-navigation/native";
import img1 from "../../images/01.png";
import img2 from "../../images/02.png";
import img3 from "../../images/03.png";
import img4 from "../../images/04.png";

const items = [
  {
    key: String(Math.random()),
    img: img1,
    label: "Depositar",
    page: "Deposit",
  },
  {
    key: String(Math.random()),
    img: img2,
    label: "FAQ",
    page: "Wallet",
  },
  {
    key: String(Math.random()),
    img: img3,
    label: "Ajuda",
    page: "Wallet",
  },
  {
    key: String(Math.random()),
    img: img4,
    label: "Compartilhar",
    page: "Wallet",
  },
];

export default function Suggestions() {
  const navigation = useNavigation();
  return (
    <Container style={{ margin: 15, borderRadius: 10 }}>
      {items.map((item) => (
        <Option key={item.key}>
          <TouchableOpacity onPress={() => navigation.navigate(item.page)}>
            <Img style={{ height: 60, width: 60 }} source={item.img} />
          </TouchableOpacity>
          <Label>{item.label}</Label>
        </Option>
      ))}
    </Container>
  );
}
