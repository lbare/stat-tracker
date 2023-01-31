import React from 'react';
import { View, ActivityIndicator } from 'react-native';
import { Login } from './scenes/Login';
import { useFonts } from 'expo-font';
import { Register } from './scenes/Register';

export default () => {
  const [fontsLoaded] = useFonts({
    'SecularOne-Regular': require('./assets/fonts/SecularOne-Regular.ttf'),
  });

  if (!fontsLoaded) {
    return (
      <View style={{ flex: 1, justifyContent: 'center' }}>
        <ActivityIndicator />
      </View>
    );
  }
  return (
    <>
      <Register />
    </>
  );
};
