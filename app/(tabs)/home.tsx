import { StyleSheet, Button } from 'react-native';
import { Text, View } from '@/components/Themed';
import { useRouter } from 'expo-router';
import { logOut } from '@/authService'; // Import logout function

export default function HomeScreen() {
  const router = useRouter();

  // 🔹 Handle logout function
  const handleLogout = async () => {
    try {
      await logOut();
      router.replace('/login'); // Redirect to login screen after logout
    } catch (error) {
      console.error('Logout Error:', error.message);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Home</Text>
      <View style={styles.separator} lightColor="#eee" darkColor="rgba(255,255,255,0.1)" />
      <Button title="Log Out" onPress={handleLogout} color="red" /> {/* 🔹 Add Logout Button */}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  separator: {
    marginVertical: 30,
    height: 1,
    width: '80%',
  },
});
