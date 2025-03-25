import React, { useState } from "react";
import { View, Text, TextInput, Button, StyleSheet, Alert, TouchableOpacity } from "react-native";
import { useRouter } from "expo-router";
import { signIn, signInWithGoogle } from "@/authService"; // Firebase auth functions
import { FontAwesome } from '@expo/vector-icons';

export default function LoginScreen() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleSignIn = async () => {
    setError("");
    try {
      await signIn(email, password);
      Alert.alert("Welcome Back!", "You are now logged in.");
      router.push("/(tabs)/home"); // Redirect to home after login
    } catch (err: any) {
      setError(err.message || "An error occurred during sign in");
    }
  };

  const handleGoogleSignIn = async () => {
    setError("");
    try {
      await signInWithGoogle();
      Alert.alert("Welcome!", "You are now logged in with Google.");
      router.push("/(tabs)/home");
    } catch (err: any) {
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

      <TouchableOpacity style={styles.googleButton} onPress={handleGoogleSignIn}>
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

