import { initializeApp } from "firebase/app"
import { getAuth } from 'firebase/auth'
import { getDatabase } from 'firebase/database'

// Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCEPsEjDdJe4qwxWcc4VqmrRRYcsn4CoFY",
  authDomain: "vuebase-ksn.firebaseapp.com",
  databaseUrl: "https://vuebase-ksn-default-rtdb.firebaseio.com/",
  projectId: "vuebase-ksn",
  storageBucket: "vuebase-ksn.appspot.com",
  messagingSenderId: "10262764159",
  appId: "1:10262764159:web:1b1c98bf532893d9f0bd4a"
}

// Initialize Firebase
const app = initializeApp(firebaseConfig)

const auth = getAuth(app)
const db = getDatabase(app)
export { auth, db }