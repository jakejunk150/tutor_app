// app/tutor.tsx
import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

export default function TutorScreen() {
  return (
    <View style={styles.container}>
      <Text>Student Screen</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
