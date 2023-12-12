import * as SQLite from 'expo-sqlite';

const db = SQLite.openDatabase('busnow.db');

// Initialize the database
export const init = () => {
  const promise = new Promise((resolve, reject) => {
    db.transaction((tx) => {
      tx.executeSql(
        'CREATE TABLE IF NOT EXISTS saved_stops (id INTEGER PRIMARY KEY NOT NULL, stopId TEXT NOT NULL, name TEXT NOT NULL);',
        [],
        () => { resolve(); },
        (_, err) => { reject(err); }
      );
    });
  });

  return promise;
};

// Save a stop to the database
export const saveStopToDB = (stop) => {
  const promise = new Promise((resolve, reject) => {
    db.transaction((tx) => {
      tx.executeSql(
        'INSERT INTO saved_stops (stopId, name) VALUES (?, ?);',
        [stop.id, stop.name],
        (_, result) => { resolve(result); },
        (_, err) => { reject(err); }
      );
    });
  });

  return promise;
};

// Load saved stops from the database
export const loadSavedStops = () => {
  const promise = new Promise((resolve, reject) => {
    db.transaction((tx) => {
      tx.executeSql(
        'SELECT * FROM saved_stops;',
        [],
        (_, result) => { resolve(result.rows._array); },
        (_, err) => { reject(err); }
      );
    });
  });

  return promise;
};

// Delete an existing stop from the database
export const deleteStopById = (id) => {
  return new Promise((resolve, reject) => {
    db.transaction(tx => {
      tx.executeSql(
        'DELETE FROM saved_stops WHERE id = ?;',
        [id],
        (_, result) => resolve(result),
        (_, error) => reject(error)
      );
    });
  });
};