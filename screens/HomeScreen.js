import React, { useEffect, useState } from 'react';
import { View, TextInput, Button, FlatList, Text, TouchableOpacity, Alert, StyleSheet } from 'react-native';
import { fetchStopIdByNameOrNumber } from '../api';
import { loadSavedStops, deleteStopById } from '../database';
import { useFocusEffect } from '@react-navigation/native';

function HomeScreen({ navigation }) {
  const [query, setQuery] = useState('');
  const [savedStops, setSavedStops] = useState([]);

  useFocusEffect(
    React.useCallback(() => {
      fetchSavedStops();
      return () => {};
    }, [])
  );

  // Fetching saved stops from db
  const fetchSavedStops = async () => {
    try {
      const stops = await loadSavedStops();
      setSavedStops(stops);
    } catch (error) {
      Alert.alert('Virhe', 'Tallennettujen pysäkkien lataus epäonnistui!');
    }
  };

  // Deleting saved stops from db
  const handleDeleteStop = async (id) => {
    try {
      await deleteStopById(id);
      fetchSavedStops();
      Alert.alert("Poistettu", "Pysäkin poistaminen onnistui!");
    } catch (error) {
      console.error("Error deleting stop:", error);
      Alert.alert("Virhe", "Pysäkin poisto epäonnistui!");
    }
  };

  // Initial stop-id fetch by using name or number of the stop
  const handleSearch = async () => {
    try {
      const stops = await fetchStopIdByNameOrNumber(query);
      if (stops.length > 0) {
        navigation.navigate('Bussit', { stopId: stops[0].gtfsId });
      } else {
        Alert.alert('Virhe', 'Pysäkkiä ei löydetty, yritä uudella numerolla!');
      }
    } catch (error) {
      console.error("Error fetching stops:", error);
      Alert.alert('Virhe', 'Pysäkkitietojen haku epäonnistui!');
    }
  };

  // Rendering
  const renderItem = ({ item }) => (
    <View style={styles.stopItem}>
      <Button
        title={item.name}
        onPress={() => navigation.navigate('Bussit', { stopId: item.stopId })}
        color="#0B3B24"
      />
      <Button
        title="Poista"
        onPress={() => handleDeleteStop(item.id)}
        color="#943b2b"
      />
    </View>
  );

  return (
    <View style={styles.container}>
      <TextInput
        style={styles.input}
        placeholder="Syötä pysäkin numero (esim. H1658)"
        value={query}
        onChangeText={setQuery}
      />
      <View style={styles.buttonContainer}>
        <Button title="Hae aikataulu" onPress={handleSearch} color="#0B3B24" />
      </View>
      <FlatList
        data={savedStops}
        renderItem={renderItem}
        keyExtractor={(item) => item.id.toString()}
      />
    </View>
  );
}

// Styling
const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 10,
    backgroundColor: '#F7F2E0',
  },
  input: {
    borderColor: '#6E6E6E',
    borderWidth: 1,
    borderRadius: 5,
    padding: 10,
    marginBottom: 10,
  },
  buttonContainer: {
    marginBottom: 10,
  },
  listItem: {
    backgroundColor: 'f0f0f0',
    padding: 15,
    borderRadius: 5,
    marginVertical: 8,
  },
  listItemText: {
    fontSize: 16,
  },
  stopItem: {
    marginVertical: 8,
  },
  stopItem: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginVertical: 8,
  },
});

export default HomeScreen;