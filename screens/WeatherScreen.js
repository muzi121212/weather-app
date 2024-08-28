import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, ImageBackground } from 'react-native';
import { fetchWeather } from '../api/weather';
import { Ionicons } from '@expo/vector-icons';

const WeatherScreen = ({ route }) => {
  const { city } = route.params;
  const [weather, setWeather] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    const getWeather = async () => {
      try {
        const data = await fetchWeather(city);
        setWeather(data);
      } catch (err) {
        setError('Could not fetch weather data');
      }
    };
    getWeather();
  }, [city]);

  if (error) {
    return (
      <View style={styles.container}>
        <Text style={styles.errorText}>{error}</Text>
      </View>
    );
  }

  if (!weather) {
    return (
      <View style={styles.container}>
        <Text style={styles.loadingText}>Loading...</Text>
      </View>
    );
  }

  const backgroundImage = weather.weather[0].main === 'Clear'
    ? require('../assets/image2.jpg')
    : weather.weather[0].main === 'Rain'
    ? require('../assets/rain.jpg')
    : require('../assets/image1.jpg');

  const getIconName = (condition) => {
    switch (condition) {
      case 'Clear':
        return 'sunny';
      case 'Rain':
        return 'rainy';
      case 'Clouds':
        return 'cloudy';
      default:
        return 'partly-sunny';
    }
  };

  return (
    <ImageBackground
      source={backgroundImage}
      style={styles.container}
    >
      <View style={styles.weatherCard}>
        <Text style={styles.city}>{weather.name}</Text>
        <Text style={styles.temperature}>{Math.round(weather.main.temp)}°C</Text>
        <Ionicons
          name={getIconName(weather.weather[0].main)}
          size={100}
          color="white"
          style={styles.weatherIcon}
        />
        <Text style={styles.description}>{weather.weather[0].description}</Text>
        <Text style={styles.details}>Feels Like: {Math.round(weather.main.feels_like)}°C</Text>
        <Text style={styles.details}>Humidity: {weather.main.humidity}%</Text>
        <Text style={styles.details}>Wind Speed: {weather.wind.speed} m/s</Text>
      </View>
    </ImageBackground>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  weatherCard: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    borderRadius: 20,
    margin: 20,
    padding: 20,
  },
  city: {
    fontSize: 32,
    fontWeight: 'bold',
    color: 'white',
  },
  temperature: {
    fontSize: 60,
    fontWeight: 'bold',
    color: 'white',
  },
  weatherIcon: {
    marginVertical: 10,
  },
  description: {
    fontSize: 24,
    fontStyle: 'italic',
    color: 'white',
  },
  details: {
    fontSize: 18,
    color: 'white',
  },
  loadingText: {
    fontSize: 24,
    fontWeight: 'bold',
    color: 'white',
  },
  errorText: {
    fontSize: 24,
    fontWeight: 'bold',
    color: 'red',
  },
});

export default WeatherScreen;
