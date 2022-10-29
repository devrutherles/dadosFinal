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

import avatar from "../../images/avatar.png";

export default function Activities({ name, email, telefone }) {
  return (
    <Container>
      <Card>
        <CardHeader>
          <Avatar source={avatar} />
          <Description>
            <Bold>{name}</Bold>
          </Description>
        </CardHeader>

        <CardFooter>
          <Details>
            <Value>{telefone}</Value>

            <Divider />

            <CardBody>
              <UserName>{email}</UserName>
            </CardBody>
          </Details>
        </CardFooter>
      </Card>
    </Container>
  );
}
