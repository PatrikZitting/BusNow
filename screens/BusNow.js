import React, { useState } from 'react';
import { View, TextInput, Button, FlatList, Alert, StyleSheet, ActivityIndicator, KeyboardAvoidingView, Platform } from 'react-native';
import { fetchStopIdByNameOrNumber } from '../api';
import { fetchStopsByRadius } from '../api';
import { loadSavedStops, deleteStopById } from '../database';
import { useFocusEffect } from '@react-navigation/native';
import MapView, { PROVIDER_GOOGLE } from 'react-native-maps';
import * as Location from 'expo-location';
import { StatusBar } from 'react-native';


function BusNow({ navigation }) {
  const [query, setQuery] = useState('');
  const [savedStops, setSavedStops] = useState([]);
  const [region, setRegion] = useState(null);

  // Checking for saved stops
  useFocusEffect(
    React.useCallback(() => {
      fetchSavedStops();
      return () => { };
    }, [])
  );

  // User location and permissions
  useFocusEffect(
    React.useCallback(() => {
      (async () => {
        let { status } = await Location.requestForegroundPermissionsAsync();
        if (status !== 'granted') {
          Alert.alert('Lupa hylätty', 'Sovellus tarvitsee luvan sijainnin käyttöön!');
          return;
        }

        let location = await Location.getCurrentPositionAsync({});
        setRegion({
          latitude: location.coords.latitude,
          longitude: location.coords.longitude,
          latitudeDelta: 0.0922,
          longitudeDelta: 0.0421,
        });
      })();
      return () => { };
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

  const handleMapPress = async (event) => {
    const { latitude, longitude } = event.nativeEvent.coordinate;
    try {
      // Query nearby bus stops using Digitransit API
      const stops = await fetchStopsByRadius(latitude, longitude, 30);
      if (stops.length > 0) {
        // Assuming you want to navigate to the first stop in the list
        navigation.navigate('Bussit', { stopId: stops[0].gtfsId });
      } else {
        Alert.alert('Pysäkkiä ei löydetty', 'Ei pysäkkejä tällä alueella, tai tarkkuus ei ollut riittävä!');
      }
    } catch (error) {
      console.error('Error fetching stops:', error);
      Alert.alert('Virhe', 'Kohteen pysäkkien haku epäonnistui!');
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
    <>
      <StatusBar backgroundColor="#0B3B24" barStyle="light-content" />
      <KeyboardAvoidingView
        style={styles.container}
        behavior={Platform.OS === "ios" ? "padding" : "height"}
      >
        <View style={styles.content}>
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
        {region ? (
          <View style={styles.mapContainer}>
            <MapView
              provider={PROVIDER_GOOGLE}
              style={styles.map}
              region={region}
              showsUserLocation={true}
              onPress={handleMapPress}
            />
          </View>
        ) : (
          <ActivityIndicator size="large" color="#0000ff" />
        )}
      </KeyboardAvoidingView>
    </>
  );
}

// Styling
const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 10,
    backgroundColor: '#F7F2E0',
  },
  content: {
    flex: 1,
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
  mapContainer: {
    height: 300,
    width: '100%',
    borderRadius: 15,
    overflow: 'hidden',
  },
  map: {
    height: '100%',
    width: '100%',
  },
});

export default BusNow;