import FontAwesome from "@expo/vector-icons/FontAwesome";
import { DarkTheme, DefaultTheme, ThemeProvider } from "@react-navigation/native";
import { useFonts } from "expo-font";
import { Stack, useRouter, useSegments } from "expo-router";
import * as SplashScreen from "expo-splash-screen";
import { useEffect, useState } from "react";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "@/firebaseConfig";
import { useColorScheme } from "@/components/useColorScheme";

export {
  ErrorBoundary, // Catch any navigation errors
} from "expo-router";

export const unstable_settings = {
  initialRouteName: "(tabs)", // Starts on the home screen if authenticated
};

SplashScreen.preventAutoHideAsync();

export default function RootLayout() {
  const [loaded, error] = useFonts({
    SpaceMono: require("../assets/fonts/SpaceMono-Regular.ttf"),
    ...FontAwesome.font,
  });

  useEffect(() => {
    if (error) throw error;
  }, [error]);

  useEffect(() => {
    if (loaded) {
      SplashScreen.hideAsync();
    }
  }, [loaded]);

  if (!loaded) return null;

  return <RootLayoutNav />;
}

function RootLayoutNav() {
  const colorScheme = useColorScheme();
  const router = useRouter();
  const segments = useSegments();
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [loading, setLoading] = useState(true);

  // 🔹 Listen for authentication state changes
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setIsAuthenticated(!!user);
      setLoading(false);
    });

    return () => unsubscribe();
  }, []);

  // 🔹 Redirect users to login if not authenticated
  useEffect(() => {
    if (!loading) {
      const inAuthFlow = segments[0] === "login" || segments[0] === "create-account";
      if (!isAuthenticated && !inAuthFlow) {
        router.replace("/login");
      }
    }
  }, [isAuthenticated, loading, segments]);

  if (loading) return null; // Prevent flickering

  return (
    <ThemeProvider value={colorScheme === "dark" ? DarkTheme : DefaultTheme}>
      <Stack>
        <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
        <Stack.Screen name="modal" options={{ presentation: "modal" }} />
        <Stack.Screen name="login" options={{ headerShown: false }} />
        <Stack.Screen name="create-account" options={{ headerShown: false }} />
      </Stack>
    </ThemeProvider>
  );
}

