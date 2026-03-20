import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

// Laitetaan avaimet suoraan tähän, koska ne on suojattu domain-rajoituksella
const firebaseConfig = {
  apiKey: "AIzaSyChmntvkcVhs-zHfBr3PKI0-1unHQDR1VY",
  authDomain: "tekoalypeli.firebaseapp.com",
  projectId: "tekoalypeli",
  storageBucket: "tekoalypeli.firebasestorage.app",
  messagingSenderId: "705084787214",
  appId: "1:705084787214:web:8b597633d614d5c5178a5f"
};

const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);