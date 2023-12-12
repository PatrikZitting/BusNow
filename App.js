import React, { useEffect } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import HomeScreen from './screens/HomeScreen';
import BusStopDetailsScreen from './screens/BusStopDetailsScreen';
import { init } from './database';

const Stack = createStackNavigator();

function App() {
  useEffect(() => {
    // Initialize the SQLite database
    init()
      .then(() => {
        console.log('Database initialized successfully');
      })
      .catch((err) => {
        console.log('Database initialization failed:', err);
      });
  }, []);

  return (
    <NavigationContainer>
      <Stack.Navigator
        initialRouteName="BusNow"
        screenOptions={{
          headerStyle: {
            backgroundColor: '#0B3B24',
          },
          headerTintColor: '#fff',
          headerTitleStyle: {
            fontWeight: 'bold',
          },
        }}
      >
        <Stack.Screen 
          name="BusNow" 
          component={HomeScreen} 
          options={{ title: 'BusNow' }}
        />
        <Stack.Screen 
          name="Bussit" 
          component={BusStopDetailsScreen} 
          options={{ title: 'Bussit' }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default App;

