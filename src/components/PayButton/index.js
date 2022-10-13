import React from "react";
import { MaterialIcons, FontAwesome5 } from "@expo/vector-icons";
import { TouchableWithoutFeedback } from "react-native";

import { Button, Label } from "./styles";

export default function PayButton({ onPress, focused }) {
  return (
    <TouchableWithoutFeedback onPress={onPress}>
      <Button
        colors={focused ? ["#ff0000", "#ff0000"] : ["#ff0000", "#ff0000"]}
        start={[1, 0.2]}
      >
        <FontAwesome5
          name="dice"
          size={35}
          color={focused ? "#fff" : "#fafafa"}
        />
      </Button>
    </TouchableWithoutFeedback>
  );
}
