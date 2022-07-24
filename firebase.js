// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyAbAnIJUtFNfyKXbIf-qlCA7P3HLJzyQRo",
  authDomain: "tiempo-en-garitas-c3d2e.firebaseapp.com",
  projectId: "tiempo-en-garitas-c3d2e",
  storageBucket: "tiempo-en-garitas-c3d2e.appspot.com",
  messagingSenderId: "1018910724529",
  appId: "1:1018910724529:web:9115f0073022acf174ed90",
  measurementId: "G-TQ68Q4S0L7"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);