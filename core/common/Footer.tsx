import { useState } from "react"
import { StatusBar } from "expo-status-bar"
import { StyleSheet, View, Button } from "react-native"
import {
  NativeBaseProvider,
  Box,
  Center,
  ScrollView,
  HStack,
  Pressable,
  Text,
} from "native-base"

export const Footer = () => {
  const [selected, setSelected] = useState(1)
  return (
    <Box bg="red.700" safeAreaBottom>
      <HStack alignItems="center" shadow={6}>
        <Pressable
          opacity={selected === 0 ? 1 : 0.5}
          py="3"
          flex={1}
          onPress={() => setSelected(0)}
        >
          <Center>
            {/* <Icon
                mb="1"
                as={
                  <MaterialCommunityIcons
                    name={selected === 0 ? "home" : "home-outline"}
                  />
                }
                color="white"
                size="sm"
              /> */}
            <Text color="white" fontSize="12">
              Schedule
            </Text>
          </Center>
        </Pressable>
        <Pressable
          opacity={selected === 1 ? 1 : 0.5}
          py="3"
          flex={1}
          onPress={() => setSelected(1)}
        >
          <Center>
            {/* <Icon
                mb="1"
                as={
                  <MaterialCommunityIcons
                    name={selected === 0 ? "home" : "home-outline"}
                  />
                }
                color="white"
                size="sm"
              /> */}
            <Text color="white" fontSize="12">
              Routine
            </Text>
          </Center>
        </Pressable>
        <Pressable
          opacity={selected === 2 ? 1 : 0.5}
          py="3"
          flex={1}
          onPress={() => setSelected(2)}
        >
          <Center>
            {/* <Icon
                mb="1"
                as={
                  <MaterialCommunityIcons
                    name={selected === 0 ? "home" : "home-outline"}
                  />
                }
                color="white"
                size="sm"
              /> */}
            <Text color="white" fontSize="12">
              Record
            </Text>
          </Center>
        </Pressable>
      </HStack>
    </Box>
  )
}

export default Footer
