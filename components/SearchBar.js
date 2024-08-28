import React, { useState } from 'react';
import { View, TextInput, FlatList, TouchableOpacity, Text, StyleSheet } from 'react-native';
import { fetchSuggestions } from '../api/weather';

const SearchBar = ({ onSearch }) => {
  const [query, setQuery] = useState('');
  const [suggestions, setSuggestions] = useState([]);

  const handleChange = async (text) => {
    setQuery(text);
    if (text.length > 2) {
      const result = await fetchSuggestions(text);
      setSuggestions(result);
    } else {
      setSuggestions([]);
    }
  };

  const handleSelect = (city) => {
    setQuery(city.name);
    setSuggestions([]);
    onSearch(city.name);
  };

  return (
    <View style={styles.container}>
      <TextInput
        style={styles.input}
        placeholder="Search city..."
        placeholderTextColor="#aaa"
        value={query}
        onChangeText={handleChange}
      />
      {suggestions.length > 0 && (
        <FlatList
          data={suggestions}
          keyExtractor={(item) => `${item.lat}-${item.lon}`}
          renderItem={({ item }) => (
            <TouchableOpacity style={styles.suggestionItem} onPress={() => handleSelect(item)}>
              <Text style={styles.suggestionText}>{item.name}, {item.country}</Text>
            </TouchableOpacity>
          )}
          style={styles.suggestionList}
        />
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: '100%',
  },
  input: {
    height: 50,
    borderColor: '#ccc',
    borderWidth: 1,
    borderRadius: 25,
    paddingLeft: 15,
    fontSize: 16,
    backgroundColor: 'rgba(255, 255, 255, 0.9)',
    color: '#333',
  },
  suggestionList: {
    marginTop: 5,
    backgroundColor: 'rgba(255, 255, 255, 0.95)',
    borderRadius: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 5,
    elevation: 3,
  },
  suggestionItem: {
    padding: 15,
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
  },
  suggestionText: {
    fontSize: 16,
    color: '#333',
  },
});

export default SearchBar;
