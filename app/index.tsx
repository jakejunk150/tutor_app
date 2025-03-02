import { StyleSheet, Button } from 'react-native';
import { Text, View } from '@/components/Themed';
import { useRouter } from 'expo-router';

export default function WelcomeScreen() {
  const router = useRouter();

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Welcome to Tutor App</Text>
      <View style={styles.buttonContainer}>
        <Button title="Login" onPress={() => router.push('/login')} />
        <Button title="Create Account" onPress={() => router.push('/create-account')} />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 30,
  },
  buttonContainer: {
    width: '100%',
    justifyContent: 'space-around',
    height: 150,
  },
});
