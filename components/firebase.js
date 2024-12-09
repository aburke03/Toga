import { initializeApp } from "firebase/app";
import { getStorage } from "firebase/storage";

const firebaseConfig = {
    apiKey: process.env.FIREBASE_KEY,
    authDomain: "toga-efe41.firebaseapp.com",
    projectId: "toga-efe41",
    storageBucket: "toga-efe41.firebasestorage.app",
    messagingSenderId: "846851067735",
    appId: "1:846851067735:web:51ddb5a2c656516219f812",
    measurementId: "G-WB2BTK20QY"
};

// export Firebase so it can be used elsewhere
const app = initializeApp(firebaseConfig);
export const imageDb = getStorage(app);