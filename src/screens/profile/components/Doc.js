import React from "react";
import { SafeAreaView, StyleSheet, TextInput } from "react-native";

const Doc = ({ doc }) => {
  const [text, onChangeText] = React.useState("UselessTextInput");

  return (
    <SafeAreaView>
      <TextInput style={styles.input} onChangeText={onChangeText} value={doc} />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  input: {
    height: 40,
    margin: 12,
    backgroundColor: "#a9a9a9",
    borderRadius: 8,
    padding: 10,
  },
});

export default Doc;
