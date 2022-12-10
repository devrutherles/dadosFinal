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

export default function Faq({ navigation }) {
  const [visible, setVisible] = useState();
  const [load, setLoad] = useState();

  function sleep() {
    setTimeout(
      () => setVisible(1),

      2000
    );
  }

  function sleep2() {
    setTimeout(
      () => setLoad(false),

      2000
    );
  }

  sleep();
  sleep2();

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: "#f0f2f5" }}>
      <WebView
        onScroll={false}
        style={{ opacity: visible, height: "100%", backgroundColor: "#f0f2f5" }}
        source={{
          uri: "https://morenacaipira.com/caipira/pages/faq.html",
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
});
