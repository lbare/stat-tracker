import React from 'react';
import { StatusBar } from 'expo-status-bar';
import {
  View,
  Text,
  StyleSheet,
  Dimensions,
  ActivityIndicator,
} from 'react-native';
import Auth from './scenes/Auth';
import { useFonts } from 'expo-font';

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
    <View>
      <Auth styles={styles} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    display: 'flex',
    alignItems: 'center',
    alignContent: 'center',
    height: Dimensions.get('window').height,
    width: Dimensions.get('window').width,
    backgroundColor: '#2D424F',
  },
  topBar: {
    width: Dimensions.get('window').width,
    justifyContent: 'center',
    paddingTop: 100,
    paddingBottom: 10,
    backgroundColor: '#FFF8DE',
  },
  middle: {
    padding: 20,
  },
  bottom: {
    padding: 20,
  },
  h1: {
    fontFamily: 'SecularOne-Regular',
    textAlign: 'center',
    fontSize: 48,
    color: '#2D424F',
  },
  p: {
    fontFamily: 'SecularOne-Regular',
    textAlign: 'center',
    fontSize: 24,
    color: '#FFF8DE',
  },
});
