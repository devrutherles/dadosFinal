import React from "react";
import { View, StyleSheet, TouchableOpacity, Text } from "react-native";
import { Center, Button, AlertDialog } from "native-base";
import { useNavigation } from "@react-navigation/native";

const Notfund = () => {
  const navigation = useNavigation();
  const [isOpen, setIsOpen] = React.useState(false);

  const onClose = () => setIsOpen(false);

  const cancelRef = React.useRef(null);
  return (
    <View style={styles.container}>
      <TouchableOpacity
        style={styles.TouchableOpacity}
        onPress={() => setIsOpen(!isOpen)}
      >
        <Text style={styles.content}>Comprar</Text>
      </TouchableOpacity>
      <AlertDialog
        leastDestructiveRef={cancelRef}
        isOpen={isOpen}
        onClose={onClose}
      >
        <AlertDialog.Content>
          <AlertDialog.CloseButton />
          <AlertDialog.Header>
            OPS! &nbsp; O grupo ja foi preenchido
          </AlertDialog.Header>
          <AlertDialog.Body>
            Esse grupo ja foi completado , por favor escolha outro.
          </AlertDialog.Body>
          <AlertDialog.Footer style={styles.footer}>
            <Button.Group space={2}>
              <TouchableOpacity
                onPress={onClose}
                style={styles.Touchablecancel}
              >
                {function fechado (){
                  navigation.navigate("Inicio")
                  close()

                }}
                <Text style={styles.content}>Cancelar</Text>
              </TouchableOpacity>
              <TouchableOpacity
                onPress={() => setIsOpen("close") + navigation.navigate("Inicio")    }
                style={styles.Touchablewallet}
              >
                <Text style={styles.content}>Grupos</Text>
              </TouchableOpacity>
            </Button.Group>
          </AlertDialog.Footer>
        </AlertDialog.Content>
        ,
      </AlertDialog>
    </View>
  );
};
const styles = StyleSheet.create({
  TouchableOpacity: {
    backgroundColor: "#0ed830",
    width: 200,
    height: 45,
    justifyContent: "center",
    borderRadius: 7,
    marginBottom: 20,
  },
  Touchablewallet: {
    backgroundColor: "#0ed830",
    width: 100,
    height: 45,
    justifyContent: "center",
    borderRadius: 7,
    marginBottom: 20,
  },
  Touchablecancel: {
    backgroundColor: "red",
    width: 100,
    height: 45,
    justifyContent: "center",
    borderRadius: 7,
    marginBottom: 20,
  },
  content: {
    color: "#fff",
    width: "100%",
    textAlign: "center",
    fontSize: 15,
    fontWeight: "bold",
  },
  container: {},
  footer: {
    justifyContent: "center",
    alignItems: "center",
  },
});

export default Notfund;
