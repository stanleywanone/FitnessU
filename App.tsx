import { StatusBar } from "expo-status-bar"
import { StyleSheet, Text, View, Button } from "react-native"
import { db } from "./firebase"
import { NativeBaseProvider, Box, Center } from "native-base"
import { Login } from "./core/components/Login/Login"
import { useGetDatabase } from "./core/components/Database/api/get"
import { Database } from "./core/components/Database/Database"

export default function App() {
  // db.collection("users")
  //   .get()
  //   .then((querySnapshot) => {
  //     console.log("Total users: ", querySnapshot.size)

  //     console.log("here we are,  ", querySnapshot.docs[0].data())
  //     // querySnapshot.forEach((documentSnapshot) => {
  //     //   console.log("User ID: ", documentSnapshot.id, documentSnapshot.data())
  //     // })
  //   })

  // const addUser = () => {
  //   const database = db.collection("users")
  //   database
  //     .add({
  //       name: "Stanley Wan",
  //       age: 32,
  //     })
  //     .then((res) => {
  //       console.log("res, ", JSON.stringify(res))
  //     })
  //     .catch((err) => {
  //       console.log("err, ", err)
  //     })
  // }

  // const udpateUser = () => {
  //   const database = db.collection("users")
  //   database
  //     .doc("QW5sTSwuReMRCK0q3Ylz")
  //     .set({ age: 19 })
  //     .then((res) => {
  //       console.log("update")
  //     })
  //     .catch((err) => {
  //       console.log("err, ", err)
  //     })
  // }

  // const deleteUser = () => {
  //   const database = db
  //     .collection("users")
  //     .doc("QW5sTSwuReMRCK0q3Ylz")
  //     .delete()
  //     .then(() => {
  //       console.log("work")
  //     })
  // }

  const { database } = useGetDatabase()
  console.log("db, ", database)

  return (
    <NativeBaseProvider>
      <View style={styles.container}>
        <Database />
      </View>
    </NativeBaseProvider>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
})
