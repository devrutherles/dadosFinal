import { Input } from "native-base";
import React from "react";
import { SafeAreaView, StyleSheet, TextInput } from "react-native";

const Address = ({ placeholder, value }) => {
  return (
    <SafeAreaView>
      <Input
        variant="underlined"
        placeholder={placeholder}
        placeholderTextColor={"#a9a9a9"}
        style={styles.input}
        value={value}
      />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  input: {
    height: 40,
    margin: 12,
    width: "90%",
    borderRadius: 8,
    padding: 10,
  },
});

export default Address;
