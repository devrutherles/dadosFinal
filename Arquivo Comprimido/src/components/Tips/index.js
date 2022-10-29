import { useEffect, React, useState } from "react";

import { Container, Option, Title, Img, SubTitle } from "./styles";
import { useApi } from "../../screens/hooks/useApi";

import img8 from "../../images/dice3.jpg";
import img9 from "../../images/dice2.jpg";
import img10 from "../../images/dice1.jpg";
import { TouchableOpacity } from "react-native";
import { useNavigation } from "@react-navigation/native";

export default function Tips() {
  const navigation = useNavigation();

  const items = [
    {
      key: String(Math.random()),
      img: img8,
      title: "2,00 -10,00  ",
      subtitle: "Multiplique seu dinheiro.",
      bgColor: "#1e222b",
      page: "Pay",
    },
    {
      key: String(Math.random()),
      img: img9,
      title: "11,00 -20,00  ",
      subtitle: "Multiplique seu dinheiro.",
      bgColor: "#1e222b",
      page: "Pay",
    },
    {
      key: String(Math.random()),
      img: img10,
      title: "21,00 -30,00  ",
      subtitle: "Multiplique seu dinheiro.",
      bgColor: "#1e222b",
      page: "Pay",
    },
  ];

  return (
    <Container
      style={{
        marginLeft: 15,
      }}
    >
      {items.map((item) => (
        <Option key={item.key} bgColor={item.bgColor}>
          <TouchableOpacity onPress={() => navigation.navigate(item.page)}>
            <Img
              style={{
                width: 130,
                height: 90,
                marginTop: -15,
                borderRadius: 8,
                shadowColor: "#000",
                shadowOffset: {
                  width: 0,
                  height: 12,
                },
                shadowOpacity: 0.58,
                shadowRadius: 16.0,
                elevation: 24,
              }}
              source={item.img}
            />
          </TouchableOpacity>

          <Title>R$ {item.title}</Title>
          <SubTitle>{item.subtitle}</SubTitle>
        </Option>
      ))}
    </Container>
  );
}
