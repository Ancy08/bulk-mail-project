import { initializeApp } from "firebase/app";
import {getAuth} from "firebase/auth"
const firebaseConfig = {
  apiKey: "AIzaSyA2MVqF0cc_4YlGnT7TxtLoVqXQ39CDU8M",
  authDomain: "bulk-mail-ec595.firebaseapp.com",
  projectId: "bulk-mail-ec595",
  storageBucket: "bulk-mail-ec595.firebasestorage.app",
  messagingSenderId: "1011710356908",
  appId: "1:1011710356908:web:728b57d64bfa71112d9e09",
  measurementId: "G-64KLXH3ZMF"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app)
export default auth
