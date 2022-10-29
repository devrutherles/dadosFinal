import { React, useEffect, useState } from "react";
import { Text, View, StyleSheet, Button, TouchableOpacity } from "react-native";
import { Audio } from "expo-av";

export default function Som() {
  const [sound, setSound] = useState();

  async function playSound() {
    ///console.log()("Loading Sound");
    const { sound } = await Audio.Sound.createAsync(
      require("../../../../assets/som.mp3")
    );
    setSound(sound);

    ///console.log()("Playing Sound");
    await sound.playAsync();
  }

  useEffect(() => {
    return sound
      ? () => {
          ///console.log()("Unloading Sound");
          sound.unloadAsync();
        }
      : undefined;
  }, [sound]);

  return <View></View>;
}
