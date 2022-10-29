import { StyleSheet, Text, View, TouchableOpacity } from "react-native";
import React from "react";

export default function Save() {
  return (
    <TouchableOpacity>
      <Text style={styles.button}>Salvar</Text>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({});
