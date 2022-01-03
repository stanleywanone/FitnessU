import { useState } from "react"
import { StatusBar } from "expo-status-bar"
import { StyleSheet, View, Button } from "react-native"
import { db } from "./firebase"
import {
  NativeBaseProvider,
  Box,
  Center,
  ScrollView,
  HStack,
  Pressable,
  Text,
} from "native-base"
import { Login } from "./core/components/Login/Login"
import { Database } from "./core/components/Database/Database"
import { Routine } from "./core/components/Routine/Routine"
import { Routes } from "./core/routes/routes"
import { NavigationContainer } from "@react-navigation/native"
import { createNativeStackNavigator } from "@react-navigation/native-stack"

const Stack = createNativeStackNavigator()
export default function App() {
  const [selected, setSelected] = useState(1)
  return (
    <NativeBaseProvider>
      {/* <ScrollView> */}
      {/* <Routine /> */}
      {/* <Database /> */}
      <Routes />
      {/* </ScrollView> */}
    </NativeBaseProvider>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
})
