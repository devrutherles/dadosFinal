import { View, Text } from "react-native";
import React from "react";
import { Avatar, HStack } from "native-base";

export default function Playes() {
  return (
    <View>
      <Avatar
        bg="lightBlue.400"
        source={{
          uri: "https://api.multiavatar.com/Binx%20Boadjss.png",
        }}
        size="md"
      >
        NB
        <Avatar.Badge bg="green.500" />
      </Avatar>
    </View>
  );
}
