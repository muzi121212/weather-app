import React from 'react';
import { View, Text, StyleSheet, ImageBackground } from 'react-native';
import SearchBar from '../components/SearchBar';
import { BlurView } from 'expo-blur'; // Import BlurView from expo-blur

const HomeScreen = ({ navigation }) => {
  const handleSearch = (city) => {
    navigation.navigate('Weather', { city });
  };

  return (
    <ImageBackground
      source={require('../assets/image1.jpg')}
      style={styles.background}
      accessible={true}
      accessibilityLabel="Home screen with search functionality to check weather"
    >
      {/* Overlay with dark background and blur */}
      <BlurView intensity={50} style={styles.overlay}>
        <View style={styles.welcomeContainer}>
          <Text style={styles.title}>Welcome to WeatherApp</Text>
          <Text style={styles.subtitle}>Your personalized weather forecast</Text>
        </View>
        <SearchBar onSearch={handleSearch} />
      </BlurView>
    </ImageBackground>
  );
};

const styles = StyleSheet.create({
  background: {
    flex: 1,
  },
  overlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.5)', // Semi-transparent black overlay
    paddingTop:'40%',
    padding: 20,
  },
  welcomeContainer: {
    alignItems: 'center',
    marginBottom: 50,
  },
  title: {
    fontSize: 36,
    fontWeight: 'bold',
    color: 'white',
    textShadowColor: 'rgba(0, 0, 0, 0.75)',
    textShadowOffset: { width: -1, height: 1 },
    textShadowRadius: 10,
  },
  subtitle: {
    fontSize: 18,
    color: 'white',
    fontStyle: 'italic',
    marginTop: 10,
    textShadowColor: 'rgba(0, 0, 0, 0.75)',
    textShadowOffset: { width: -1, height: 1 },
    textShadowRadius: 10,
  },
});

export default HomeScreen;
