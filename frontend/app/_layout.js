import FontAwesome from '@expo/vector-icons/FontAwesome';
import { useFonts } from 'expo-font';
import { SplashScreen, Stack } from 'expo-router';
import { useEffect } from 'react';
import { useColorScheme } from 'react-native';
import React, {useState} from "react";
import ThemeContext from '../contexts/ThemeContext';
import ExerciseContext from '../contexts/ExerciseContext';

export {
  // Catch any errors thrown by the Layout component.
  ErrorBoundary,
} from 'expo-router';


// Prevent the splash screen from auto-hiding before asset loading is complete.
SplashScreen.preventAutoHideAsync();

export default function RootLayout() {
  const [loaded, error] = useFonts({
    SpaceMono: require('../assets/fonts/SpaceMono-Regular.ttf'),
    BebasNeue: require('../assets/fonts/BebasNeue-Regular.ttf'),
    ShadowsIL: require('../assets/fonts/ShadowsIntoLight-Regular.ttf'),
    Poppins: require('../assets/fonts/Poppins-Regular.ttf'),
    ...FontAwesome.font,

  });

  // Expo Router uses Error Boundaries to catch errors in the navigation tree.
  useEffect(() => {
    if (error) throw error;
  }, [error]);

  useEffect(() => {
    if (loaded) {
      SplashScreen.hideAsync();
    }
  }, [loaded]);

  if (!loaded) {
    return null;
  }

  return <RootLayoutNav />;
}

// Context for Themes


function RootLayoutNav() {

  const [theme, setTheme] = useState("default");
  const value = { theme, setTheme };
  const [workout, setWorkout] = useState({intro:true});
  const value1 = { workout, setWorkout };

  return (
    
    <ThemeContext.Provider value={value}>
      <ExerciseContext.Provider value={value1}>
        <Stack screenOptions={{
                headerShown: true,
                headerTitle: "",
                headerTransparent: true}}>
                </Stack>
      </ExerciseContext.Provider>
    </ThemeContext.Provider>
  );
}
