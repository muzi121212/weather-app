import axios from 'axios';

const API_KEY = 'YOUR_API_KEY';
const BASE_URL = 'https://api.openweathermap.org/data/2.5';

export const fetchWeather = async (city) => {
  try {
    const response = await axios.get(`${BASE_URL}/weather`, {
      params: {
        q: city,
        units: 'metric',
        appid: '9d3f5b8df516ac63fb0708e9ddf3f246',
      },
    });
    return response.data;
  } catch (error) {
    console.error(error);
  }
};

export const fetchSuggestions = async (query) => {
  try {
    const response = await axios.get('http://api.openweathermap.org/geo/1.0/direct', {
      params: {
        q: query,
        limit: 5,
        appid: '9d3f5b8df516ac63fb0708e9ddf3f246',
      },
    });
    return response.data;
  } catch (error) {
    console.error(error);
  }
};
