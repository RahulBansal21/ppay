import firebase from "firebase/compat/app";
import "firebase/compat/auth";
import "firebase/compat/firestore";

const config = {
  apiKey: "AIzaSyAky-VeVYyt11ttpyv-69nzz9q606c63NY",
  authDomain: "e-wallet-df815.firebaseapp.com",
  projectId: "e-wallet-df815",
  storageBucket: "e-wallet-df815.appspot.com",
  messagingSenderId: "155641223520",
  appId: "1:155641223520:web:97a11534de265029112605",
  measurementId: "G-SMH01NP60G",
};

const firebaseApp = firebase.initializeApp(config);
export default firebase;
const db = firebaseApp.firestore();
const auth = firebase.auth();

export { db, auth };
