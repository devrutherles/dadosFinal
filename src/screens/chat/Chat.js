import React, { Component, useState } from "react";
import {
  SafeAreaView,
  StyleSheet,
  Text,
  View,
  ActivityIndicator,
  TouchableOpacity,
} from "react-native";
import { AntDesign, Ionicons } from "@expo/vector-icons";
import { WebView } from "react-native-webview";
import { getAbsoluteChildren, HStack, Spinner } from "native-base";

export default function Chat({ navigation }) {
  const [visible, setVisible] = useState(1);
  const [load, setLoad] = useState(false);

  function sleep() {
    setTimeout(
      () => setVisible(1),

      2000
    );
  }

  function sleep2() {
    setTimeout(
      () => setLoad(false),

      200
    );
  }

  sleep();
  sleep2();

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <WebView
        style={{ opacity: visible }}
        source={{
          uri: "https://tawk.to/chat/635ccccddaff0e1306d4967a/1ggh801m3",
        }}
      />

      <View style={{ alignItems: "center" }}>
        {load ? (
          <ActivityIndicator style={{ marginBottom: "100%" }} size="large" />
        ) : null}
      </View>
    </SafeAreaView>
  );
}
const styles = StyleSheet.create({
  title2: {
    fontSize: 20,
    fontWeight: "bold",
    textTransform: "uppercase",
    marginTop: 10,
    marginBottom: 20,
    textAlign: "center",
    color: "#000",
  },
  iconRight: {
    fontSize: 20,
    marginBottom: 20,
    marginTop: 10,

    color: "#000",
  },
  title1: {
    marginTop: 10,
    flexDirection: "row",
    alignItems: "center",
    color: "#000",
    justifyContent: "space-around",
    marginRight: "30%",
  },
  container: {
    flex: 1,
    justifyContent: "center",
    backgroundColor: "#ecf0f1",
  },
});
