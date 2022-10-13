import {
  Center,
  FormControl,
  Select,
  CheckIcon,
  WarningOutlineIcon,
} from "native-base";
import React from "react";

const Quantity = () => {
  const[valor,setValor] = React.useState()
  global.valor = valor
  //console.log(global.valor)

  return (
    <Center>
      <FormControl w="3/4" maxW="300" isRequired isInvalid>
        <Select
          minWidth="100%"
          accessibilityLabel="Choose Service"
          placeholder="Escolha a duração"
          _selectedItem={{
            bg: "teal.600",
            endIcon: <CheckIcon size={5} />,
          }}
          mt="1"
          onValueChange={itemValue => setValor(itemValue)}
        >
          <Select.Item label="1 Semana" value="1" />
          <Select.Item label="2 Semanas" value="2" />
          <Select.Item label="3 Semanas" value="3" />
          <Select.Item label="4 Semanas" value="4" />
          <Select.Item label="5 Semanas" value="5" />
        </Select>
     
      </FormControl>
    </Center>
  );
};
export default Quantity;
