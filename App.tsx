import { StatusBar } from "expo-status-bar"
import { StyleSheet, Text, View, Button } from "react-native"
import { db } from "./firebase"

export default function App() {
  db.collection("users")
    .get()
    .then((querySnapshot) => {
      console.log("Total users: ", querySnapshot.size)

      console.log("here we are,  ", querySnapshot.docs[0].data())
      // querySnapshot.forEach((documentSnapshot) => {
      //   console.log("User ID: ", documentSnapshot.id, documentSnapshot.data())
      // })
    })

  const addUser = () => {
    const database = db.collection("users")
    database
      .add({
        name: "Stanley Wan",
        age: 32,
      })
      .then((res) => {
        console.log("res, ", JSON.stringify(res))
      })
      .catch((err) => {
        console.log("err, ", err)
      })
  }

  const udpateUser = () => {
    const database = db.collection("users")
    database
      .doc("QW5sTSwuReMRCK0q3Ylz")
      .set({ age: 19 })
      .then((res) => {
        console.log("update")
      })
      .catch((err) => {
        console.log("err, ", err)
      })
  }

  const deleteUser = () => {
    const database = db
      .collection("users")
      .doc("QW5sTSwuReMRCK0q3Ylz")
      .delete()
      .then(() => {
        console.log("work")
      })
  }

  return (
    <View style={styles.container}>
      <Text>Open up App.js to start working on Stanley's app!</Text>
      <StatusBar style="auto" />
      <Button title="SUBMIT" onPress={addUser}></Button>
      <Button title="UPDATE" onPress={udpateUser}></Button>
      <Button title="DELETE" onPress={deleteUser}></Button>
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
