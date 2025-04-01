import { auth } from "./firebaseConfig";
import { 
  createUserWithEmailAndPassword, 
  signInWithEmailAndPassword, 
  signOut,
  GoogleAuthProvider,
  signInWithCredential
} from "firebase/auth";
import { GoogleSignin } from '@react-native-google-signin/google-signin';

// Configure Google Sign In
GoogleSignin.configure({
  webClientId: '901253797103-junvsn505fphigf2i9pssh7tnisrnnse.apps.googleusercontent.com',
  offlineAccess: true,
  scopes: ['profile', 'email'],
});

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

// 🔥 Sign In with Google
export const signInWithGoogle = async () => {
  try {
    // Check if your device supports Google Play
    await GoogleSignin.hasPlayServices();
    
    // Get the users ID token
    const { idToken } = await GoogleSignin.signIn();
    
    // Create a Google credential with the token
    const googleCredential = GoogleAuthProvider.credential(idToken);
    
    // Sign-in the user with the credential
    const userCredential = await signInWithCredential(auth, googleCredential);
    return userCredential.user;
  } catch (error) {
    console.error("Google Sign In Error:", error.message);
    throw error;
  }
};

// 🔥 Sign Out User
export const logOut = async () => {
  try {
    // Sign out from Google
    await GoogleSignin.signOut();
    // Sign out from Firebase
    await signOut(auth);
  } catch (error) {
    console.error("Sign Out Error:", error.message);
  }
};
