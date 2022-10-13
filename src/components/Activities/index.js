import React from "react";

import { Feather, MaterialCommunityIcons, AntDesign } from "@expo/vector-icons";

import {
  Container,
  Header,
  Title,
  Card,
  CardHeader,
  Avatar,
  Description,
  Bold,
  CardBody,
  UserName,
  CardFooter,
  Details,
  Value,
  Divider,
  Date,
  Actions,
  Option,
  OptionLabel,
} from "./styles";
import { StyleSheet } from "react-native";
import avatar from "../../images/avatar.png";
import { View } from "native-base";

export default function Activities({ name, title, saldo }) {
  return (
    <Container>
      <Card>
        <CardHeader>
          <Avatar source={avatar} />
          <View style={styles.header}>
            <Description style={{ marginTop: 20 }}>
              <UserName>{name}</UserName>
            </Description>
            <CardBody style={{ marginLeft: 40 }}>
              <UserName>{title}</UserName>
              <AntDesign />
            </CardBody>
          </View>
          <Divider />
        </CardHeader>

        <CardFooter>
          <Details style={{ marginLeft: 200 }}>
            <Value>{saldo}</Value>
          </Details>
        </CardFooter>
      </Card>
    </Container>
  );
}
const styles = StyleSheet.create({
  header: {
    justifyContent: "space-between",
    flexDirection: "row",
  },
});
