import React from "react";

import { Container, Details, Img, Title, Description } from "./styles";

import img4 from "../../images/share.png";

export default function Banner() {
  return (
    <Container>
      <Details>
        <Title>Convide um amigo</Title>

        <Description>
          Traga todos os seus amigos e entrem para a diversão
        </Description>
      </Details>

      <Img style={{ width: 80, height: 80 }} source={img4} />
    </Container>
  );
}
