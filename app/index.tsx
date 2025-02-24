import { StyleSheet, Button } from 'react-native';
import { Text, View } from '@/components/Themed';
import { useRouter } from 'expo-router';

export default function WelcomeScreen() {
  const router = useRouter();

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Welcome to Tutor App</Text>
      <View style={styles.buttonContainer}>
        <Button title="Tutor" onPress={() => router.push('/tutor')} />
        <Button title="Student" onPress={() => router.push('/student')} />
        <Button title="Skip" onPress={() => router.push('/(tabs)/home')} />
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

