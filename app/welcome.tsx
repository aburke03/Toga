import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Image } from 'react-native';
import { useRouter } from 'expo-router';

const Welcome = () => {
  const router = useRouter();

  const onNextPress = () => {
    router.push('/CampusEvents');
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Welcome to Toga</Text>
      <Image
        source={require('../assets/images/toga.png')}
        style={styles.image}
      />
      <Text style={styles.subtitle}>Your campus closet for every occasion</Text>
      <View style={styles.paginationContainer}>
        <View style={[styles.paginationDot, styles.activeDot]} />
        <View style={styles.paginationDot} />
        <View style={styles.paginationDot} />
        <View style={styles.paginationDot} />
      </View>
      <TouchableOpacity style={styles.button} onPress={onNextPress}>
        <Text style={styles.buttonText}>Next</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#ffffff',
    padding: 24,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#1e293b',
    marginBottom: 16,
  },
  image: {
    width: 120,
    height: 120,
    marginBottom: 16,
  },
  subtitle: {
    fontSize: 16,
    color: '#64748b',
    textAlign: 'center',
    marginBottom: 32,
  },
  paginationContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 24,
  },
  paginationDot: {
    width: 10,
    height: 10,
    borderRadius: 5,
    backgroundColor: '#cbd5e1',
    marginHorizontal: 6,
  },
  activeDot: {
    backgroundColor: '#1e293b',
  },
  button: {
    backgroundColor: '#1e293b',
    paddingVertical: 14,
    paddingHorizontal: 32,
    borderRadius: 12,
    alignItems: 'center',
    shadowColor: '#1e293b',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 4,
    elevation: 8,
  },
  buttonText: {
    color: '#ffffff',
    fontSize: 16,
    fontWeight: '600',
  },
});

export default Welcome;