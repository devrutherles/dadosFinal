import React from "react";
import { View, TouchableOpacity, Text, StyleSheet } from "react-native";
import { Divider } from "native-base";
import {
  Entypo,
  AntDesign,
  Feather,
  FontAwesome5,
  Foundation,
  Ionicons,
  FontAwesome,
} from "@expo/vector-icons";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useNavigation } from "@react-navigation/native";

export default function Config() {
  const removeValue = async () => {
    try {
      await AsyncStorage.removeItem("@token");
    } catch (e) {
      // remove error
    }

    ///console.log()("Done.");
  };

  function sair() {
    removeValue();
    navigation.navigate("Login");
  }

  const navigation = useNavigation();
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Perfil</Text>
      <Divider style={styles.divider} />
      <View style={styles.rigth}>
        <TouchableOpacity
          onPress={() => navigation.navigate("Profile")}
          style={styles.content}
        >
          <FontAwesome5 style={styles.icon} name="user-circle" />
          <Text style={styles.textContent}>Informações pessoais</Text>
        </TouchableOpacity>
        <AntDesign style={styles.iconRight} name="right" />
      </View>
      <Divider style={styles.divider} />

      <View style={styles.rigth}>
        <TouchableOpacity
          onPress={() => navigation.navigate("Saques")}
          style={styles.content}
        >
          <FontAwesome style={styles.icon} name="money" />
          <Text style={styles.textContent}>Meus saques</Text>
        </TouchableOpacity>
        <AntDesign style={styles.iconRight} name="right" />
      </View>
      <Divider style={styles.divider} />

      <View style={styles.rigth}>
        <TouchableOpacity style={styles.content}>
          <Ionicons style={styles.icon} name="md-chatbubble-outline" />
          <Text style={styles.textContent}>Ajuda</Text>
        </TouchableOpacity>
        <AntDesign style={styles.iconRight} name="right" />
      </View>
      <Divider style={styles.divider} />

      <View style={styles.rigth}>
        <TouchableOpacity style={styles.content}>
          <Feather style={styles.icon} name="help-circle" />
          <Text style={styles.textContent}>FAQ</Text>
        </TouchableOpacity>
        <AntDesign style={styles.iconRight} name="right" />
      </View>
      <Divider style={styles.divider} />

      <TouchableOpacity onPress={() => sair()} style={styles.logout}>
        <Text style={styles.logoutText}>SAIR</Text>
      </TouchableOpacity>
    </View>
  );
}
const styles = StyleSheet.create({
  title: {
    fontSize: 20,
    fontWeight: "bold",
    textTransform: "uppercase",
    marginBottom: "20%",
    textAlign: "center",
    color: "#fff",
  },
  container: {
    backgroundColor: "#000",
    flex: 1,
    justifyContent: "center",
    textAlign: "left",
  },
  content: {
    marginLeft: 40,
    flexDirection: "row",
    justifyContent: "flex-start",
    alignItems: "center",
  },
  textContent: {
    fontWeight: "bold",
    color: "#fff",
  },
  divider: {
    marginTop: 30,
    marginBottom: 30,
    width: "80%",
    marginLeft: "10%",
    color: "#666",
    opacity: 0.7,
  },
  icon: {
    fontSize: 25,
    marginRight: 20,
    color: "#fff",
  },
  iconRight: {
    fontSize: 20,
    marginRight: 30,
    color: "#fff",
  },
  rigth: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  logout: {
    justifyContent: "center",
    alignItems: "center",
  },
  logoutText: {
    color: "red",
    fontSize: 15,
    fontWeight: "500",
    marginTop: "10%",
  },
});
