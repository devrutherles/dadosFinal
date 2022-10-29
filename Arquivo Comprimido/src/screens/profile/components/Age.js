import React from "react";
import { SafeAreaView, StyleSheet, TextInput } from "react-native";

const Age = ({ date }) => {
  const [data, onChangeText] = React.useState("21-01-1998");

  return (
    <SafeAreaView>
      <TextInput
        type={date}
        style={styles.input}
        onChangeText={onChangeText}
        value={date}
      />
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

export default Age;
