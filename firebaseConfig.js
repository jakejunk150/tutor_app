import { initializeApp } from "firebase/app";
import { getAuth, initializeAuth, getReactNativePersistence } from "firebase/auth";
import AsyncStorage from "@react-native-async-storage/async-storage";

// 🔥 Paste your Firebase config here:
const firebaseConfig = {
    apiKey: "AIzaSyCotsTrpFGuCD-e9BUJ0BHZwm5EYkheAwc",
    authDomain: "tutor-app-6bac9.firebaseapp.com",
    projectId: "tutor-app-6bac9",
    storageBucket: "tutor-app-6bac9.firebasestorage.app",
    messagingSenderId: "901253797103",
    appId: "1:901253797103:web:a7dc2427950cfeb7d1f71a"
};

// Initialize Firebase App
const app = initializeApp(firebaseConfig);

// Enable persistent authentication storage
const auth = initializeAuth(app, {
  persistence: getReactNativePersistence(AsyncStorage),
});

// Export Firebase Services
export { app, auth };

