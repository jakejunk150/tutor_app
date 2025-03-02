import { auth } from "./firebaseConfig";
import { 
  createUserWithEmailAndPassword, 
  signInWithEmailAndPassword, 
  signOut 
} from "firebase/auth";

// 🔥 Sign Up a New User
export const signUp = async (email, password) => {
  try {
    const userCredential = await createUserWithEmailAndPassword(auth, email, password);
    return userCredential.user;
  } catch (error) {
    console.error("Sign Up Error:", error.message);
    throw error;
  }
};

// 🔥 Sign In an Existing User
export const signIn = async (email, password) => {
  try {
    const userCredential = await signInWithEmailAndPassword(auth, email, password);
    return userCredential.user;
  } catch (error) {
    console.error("Sign In Error:", error.message);
    throw error;
  }
};

// 🔥 Sign Out User
export const logOut = async () => {
  try {
    await signOut(auth);
  } catch (error) {
    console.error("Sign Out Error:", error.message);
  }
};
