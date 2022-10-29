import { View, Text } from "react-native";
import React from "react";
import { Alert, VStack, HStack, IconButton, CloseIcon } from "native-base";

export default function Index(props) {
  return function Example() {
    return (
      <Center>
        <VStack space={5} maxW="400">
          <Alert w="100%" status="success">
            <VStack space={2} flexShrink={1} w="100%">
              <HStack
                flexShrink={1}
                space={1}
                alignItems="center"
                justifyContent="space-between"
              >
                <HStack space={2} flexShrink={1} alignItems="center">
                  <Alert.Icon />
                  <Text
                    fontSize="md"
                    fontWeight="medium"
                    _dark={{
                      color: "coolGray.800",
                    }}
                  >
                    Parabens Você Ganhou!
                  </Text>
                </HStack>
                <IconButton
                  variant="unstyled"
                  _focus={{
                    borderWidth: 0,
                  }}
                  icon={<CloseIcon size="3" />}
                  _icon={{
                    color: "coolGray.600",
                  }}
                />
              </HStack>
              <Box
                pl="6"
                _dark={{
                  _text: {
                    color: "coolGray.600",
                  },
                }}
              >
                {props.valor}
              </Box>
            </VStack>
          </Alert>
        </VStack>
      </Center>
    );
  };
}
