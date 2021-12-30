import { StatusBar } from "expo-status-bar"
import { StyleSheet, Text, View, Button } from "react-native"
import { db } from "./firebase"
import { NativeBaseProvider, Box, Center, ScrollView } from "native-base"
import { Login } from "./core/components/Login/Login"
import { Database } from "./core/components/Database/Database"
import { Routine } from "./core/components/Routine/Routine"

export default function App() {
  return (
    <NativeBaseProvider>
      <ScrollView style={styles.container}>
        <Routine />
        {/* <Database /> */}
      </ScrollView>
    </NativeBaseProvider>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
})
