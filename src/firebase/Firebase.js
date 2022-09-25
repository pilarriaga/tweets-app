// Import the functions you need from the SDKs you need
import  firebase  from "firebase/app";
import "firebase/firestore";
import "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyAy-kXSqE91esIVtnRfZGW8B2LCcU90KGs",
  authDomain: "tweets-proyect-4.firebaseapp.com",
  projectId: "tweets-proyect-4",
  storageBucket: "tweets-proyect-4.appspot.com",
  messagingSenderId: "1094361259456",
  appId: "1:1094361259456:web:e1e1a356e0b90307ed3c25",
  measurementId: "G-XJR39SZYHJ"
};

// Initialize Firebase
if (firebase.apps.length === 0) {
  firebase.initializeApp(firebaseConfig);
}
//exporta la funcionalidad e la base de datos
export const firestore = firebase.firestore();

//authentication module
export const auth = firebase.auth();
//authentication provider
export const provider = new firebase.auth.GoogleAuthProvider();
//utility to log-in with pop up
export const googleLogin = () => auth.signInWithPopup(provider);
//utility to log-out
export const logout = () => auth.signOut();

export const isLogged = () => {
  return auth.currentUser !== null && auth.currentUser.uid !== null;
};

export const getCurrentUser = () => {
  return auth.currentUser;
};

//exporta el paquete firebase para otros usos
export default firebase;
