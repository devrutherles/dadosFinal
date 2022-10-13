import React, { useState } from "react";
import { Text, StyleSheet } from "react-native";

const Price = ({ price }) => {
  const [titleText, setTitleText] = useState({});
  const bodyText = "This is not really a bird nest.";

  return (
    <Text style={styles.baseText}>
      <Text style={styles.titleText}>
        R$ {price}
        {"\n"}
        {"\n"}
      </Text>
    </Text>
  );
};

const styles = StyleSheet.create({
  baseText: {},
  titleText: {
    fontSize: 20,
    fontWeight: "bold",
  },
});

export default Price;
