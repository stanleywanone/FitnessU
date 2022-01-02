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
import { Footer } from "./core/common/Footer"

export default function App() {
  const [selected, setSelected] = useState(1)
  return (
    <NativeBaseProvider>
      <ScrollView style={styles.container}>
        <Routine />
        {/* <Database /> */}
      </ScrollView>
      <Footer />
    </NativeBaseProvider>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
})
