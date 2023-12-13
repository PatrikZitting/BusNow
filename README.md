# README.md for BusNow Mobile App

## Overview
BusNow is a mobile application designed to enhance the experience of using public bus transportation. It provides users with quick access to bus timetables, the ability to save bus stop locations for later use, and the functionality to select bus stops directly from a map interface. The app displays the timetable for the next five buses at the selected station, including their scheduled and real-time estimated arrival times. The catch is that this application is very useful to those who already know which bus they are going to catch and from where, but just need to quickly check the timetables. So in essence, it's made for the everyday-routine public transportation, like going to work, school or say, a hobby. The application was designed with quick access and speed in mind.

## Screenshots
![1BusNow](https://github.com/PatrikZitting/BusNow/assets/118559347/98b376d7-3003-4990-886d-00de9479820a)![2BusNow](https://github.com/PatrikZitting/BusNow/assets/118559347/f5e2d01f-28d3-45c2-b3ff-545763723536)
![3BusNow](https://github.com/PatrikZitting/BusNow/assets/118559347/efd6734d-eb97-4fb1-90f2-e05a970ef5b7)![4BusNow](https://github.com/PatrikZitting/BusNow/assets/118559347/8150aba9-9610-4205-9a0c-aecc5fc2c3d0)
![5BusNow](https://github.com/PatrikZitting/BusNow/assets/118559347/54d020d6-e4f9-4ab6-9ec2-31114bf7d261)

## Features
- **Quick Timetables:** Get instant access to bus timetables for any selected stop.
- **Save Stops:** Conveniently save your frequently used bus stops for quick future access.
- **Map Integration:** Use the map feature to select bus stops and view their timetables.
- **Real-time Updates:** See both scheduled and real-time arrival estimates for the next five buses.

## Technology Stack
- **React Native:** The app is built using React Native, providing a smooth and native-like user experience.
- **SQLite:** Local database storage for saving bus stop information.
- **Expo:** The project is developed using Expo for efficient cross-platform development and testing.

## APIs Used
- **Digitransit API:** This API provides all the necessary details about bus stops and their timetables.
- **Google Maps API:** Integrated for map functionalities within the app.

## Prerequisites
To run the app, you need to have:
- Node.js and npm (or yarn) installed on your system.
- Expo CLI installed globally (`npm install -g expo-cli` or `yarn global add expo-cli`).
- An Android or iOS simulator or device for running the application.

## Installation and Setup
1. Clone the repository to your local machine.
2. Navigate to the project directory and install the dependencies:
   ```
   npm install
   ```
   or
   ```
   yarn install
   ```
3. You need to have your own **Digitransit API Key** and **Google Maps API Key**. These keys should be placed in a `.env` file in the root of your project:
   ```
   DIGITRANSIT_API_KEY=your_digitransit_api_key_here
   GOOGLE_MAPS_API_KEY=your_google_maps_api_key_here
   ```

## Running the App
After setting up the API keys:
1. Start the Expo development server:
   ```
   expo start
   ```
2. Open the project in an Android or iOS simulator, or scan the QR code using the Expo Go app on your physical device.

## Note
The API keys for Digitransit and Google Maps are not provided in this GitHub repository. You will need to obtain these keys from their respective services.
