import React from 'react';
import { StatusBar } from 'react-native';
import AppLoading from 'expo-app-loading';

import { useFonts } from 'expo-font';
import { Inter_400Regular, Inter_500Medium } from '@expo-google-fonts/inter'
import { Rajdhani_500Medium, Rajdhani_700Bold } from '@expo-google-fonts/rajdhani'

import { Background } from './src/components/Background';

import { Routes } from './src/routes';
import { AuthProvider } from './src/hooks/authContext';

export default function App() {
  const [fonts] = useFonts({
    Inter_400Regular,
    Inter_500Medium,
    Rajdhani_500Medium,
    Rajdhani_700Bold
  });

  if (!fonts) {
    return (
      <>
        <StatusBar 
          barStyle="light-content"
          backgroundColor="transparent"
          translucent
        />
        <AppLoading />
      </>
    );
  }

  return (
    <Background>
      <StatusBar 
        barStyle="light-content"
        backgroundColor="transparent"
        translucent
      />
      <AuthProvider>
        <Routes />
      </AuthProvider>
    </Background>
  )
}