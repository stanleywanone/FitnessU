import { StatusBar } from "expo-status-bar"
import { StyleSheet, Text, View } from "react-native"
import { db } from "./firebase"

export default function App() {
  db.collection("users")
    .get()
    .then((querySnapshot) => {
      console.log("Total users: ", querySnapshot.size)

      querySnapshot.forEach((documentSnapshot) => {
        console.log("User ID: ", documentSnapshot.id, documentSnapshot.data())
      })
    })

  return (
    <View style={styles.container}>
      <Text>Open up App.js to start working on Stanley's app!</Text>
      <StatusBar style="auto" />
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
})
