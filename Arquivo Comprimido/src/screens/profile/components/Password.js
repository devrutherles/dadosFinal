import React from "react";
import { SafeAreaView, StyleSheet, TextInput } from "react-native";

const Password = ({ password }) => {
  const [data, onChangeText] = React.useState();

  return (
    <SafeAreaView>
      <TextInput
        secureTextEntry={true}
        type={password}
        style={styles.input}
        onChangeText={onChangeText}
        value={password}
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

export default Password;
