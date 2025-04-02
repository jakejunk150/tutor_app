import React, { useState } from "react";
import { View, Text, TextInput, Button, StyleSheet, Alert, TouchableOpacity } from "react-native";
import { useRouter } from "expo-router";
import { signIn, signInWithGoogle } from "@/authService"; // Firebase auth functions
import { FontAwesome } from '@expo/vector-icons';

import * as WebBrowser from 'expo-web-browser';
import * as Google from 'expo-auth-session/providers/google';
import { makeRedirectUri } from 'expo-auth-session';
import { GoogleAuthProvider, signInWithCredential } from 'firebase/auth';
import { auth } from '@/firebaseConfig';

WebBrowser.maybeCompleteAuthSession();


export default function LoginScreen() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const [request, response, promptAsync] = Google.useAuthRequest({
    clientId: '901253797103-junvsn505fphigf2i9pssh7tnisrnnse.apps.googleusercontent.com',
    iosClientId: '901253797103-junvsn505fphigf2i9pssh7tnisrnnse.apps.googleusercontent.com',
    androidClientId: '901253797103-junvsn505fphigf2i9pssh7tnisrnnse.apps.googleusercontent.com',
    redirectUri: makeRedirectUri({
      scheme: 'myapp',
    }),
    useProxy: true,
  });
  

  const handleSignIn = async () => {
    setError("");
    try {
      await signIn(email, password);
      Alert.alert("Welcome Back!", "You are now logged in.");
      router.replace("/"); // Navigate to root
    } catch (err: any) {
      setError(err.message || "An error occurred during sign in");
    }
  };

  const handleGoogleSignIn = async () => {
    setError("");
    try {
      const result = await promptAsync();
  
      if (result?.type === "success") {
        const idToken = result.authentication?.idToken;
  
        if (!idToken) throw new Error("No ID token returned from Google");
  
        await signInWithGoogle(idToken); // still uses your authService helper
        Alert.alert("Welcome!", "You are now logged in with Google.");
        router.replace("/");
      } else {
        throw new Error("Google sign-in was cancelled or failed.");
      }
    } catch (err: any) {
      console.error("Google Sign In Error:", err.message);
      setError(err.message || "An error occurred during Google sign in");
    }
  };
  

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Login</Text>
      <TextInput 
        placeholder="Email" 
        value={email} 
        onChangeText={setEmail} 
        style={styles.input}
        autoCapitalize="none"
        keyboardType="email-address"
      />
      <TextInput 
        placeholder="Password" 
        value={password} 
        onChangeText={setPassword} 
        secureTextEntry 
        style={styles.input}
      />
      <Button title="Sign In" onPress={handleSignIn} />
      <Button title="Create Account" onPress={() => router.push('/create-account')} />
      
      <View style={styles.dividerContainer}>
        <View style={styles.divider} />
        <Text style={styles.dividerText}>OR</Text>
        <View style={styles.divider} />
      </View>

      <TouchableOpacity 
        style={[styles.googleButton, !request && { opacity: 0.5 }]} 
        onPress={handleGoogleSignIn}
        disabled={!request}
      >
        <FontAwesome name="google" size={20} color="white" style={styles.googleIcon} />
        <Text style={styles.googleButtonText}>Sign in with Google</Text>
      </TouchableOpacity>


      {error ? <Text style={styles.error}>{error}</Text> : null}
    </View>
  );
}

const styles = StyleSheet.create({
  container: { 
    flex: 1, 
    justifyContent: "center", 
    padding: 20,
    backgroundColor: '#fff'
  },
  title: { 
    fontSize: 24, 
    fontWeight: "bold", 
    marginBottom: 20,
    textAlign: 'center'
  },
  input: { 
    borderWidth: 1, 
    padding: 10, 
    marginBottom: 10,
    borderRadius: 5,
    borderColor: '#ddd'
  },
  error: { 
    color: "red", 
    marginTop: 10,
    textAlign: 'center'
  },
  dividerContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: 20
  },
  divider: {
    flex: 1,
    height: 1,
    backgroundColor: '#ddd'
  },
  dividerText: {
    marginHorizontal: 10,
    color: '#666'
  },
  googleButton: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#4285F4',
    padding: 12,
    borderRadius: 5,
    justifyContent: 'center'
  },
  googleIcon: {
    marginRight: 10
  },
  googleButtonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: '500'
  }
});

