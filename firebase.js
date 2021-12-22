import firebase from "firebase/compat/app"
import "firebase/compat/auth"
import "firebase/compat/firestore"

const firebaseConfig = {
  apiKey: "AIzaSyBrWBnsX19cuYLwTNsiS9dVkYdFda3i59c",
  authDomain: "fitnessu-530be.firebaseapp.com",
  databaseURL: "https://fitnessu-530be-default-rtdb.firebaseio.com",
  projectId: "fitnessu-530be",
  storageBucket: "fitnessu-530be.appspot.com",
  messagingSenderId: "7823169423",
  appId: "1:7823169423:web:cddbb8dad45be3af6c1dfa",
  measurementId: "G-R9CWLVYM19",
}
let app

if (firebase.apps.length === 0) {
  app = firebase.initializeApp(firebaseConfig)
} else {
  app = firebase.app()
}

const db = app.firestore()
const auth = firebase.auth()

export { db, auth }
