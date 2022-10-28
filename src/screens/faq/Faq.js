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
  return (
    <SafeAreaView style={{ flex: 1 }}>
      <View style={styles.title1}>
        <TouchableOpacity onPress={() => navigation.navigate("Settings")}>
          <AntDesign style={styles.iconRight} name="left" />
        </TouchableOpacity>
        <Text style={styles.title2}>Faq</Text>
      </View>
      <WebView
        javaScriptEnabled="true"
        source={{
          uri: "https://orvalhosj.com/caipira/pages/faq.html",
        }}
      />
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
    marginRight: "28%",
  },
});
