import React from 'react';
import {
  View,
  SafeAreaView,
  Text,
  StatusBar,
  Button,
  Alert,
  SectionList,
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { styles } from './styles';
import { Input } from '../../../components/Input';
import { HitLocation } from '../../../components/GameData/HitLocation';

export const LogGame = () => {
  return (
    <View style={styles.container}>
      <StatusBar barStyle='dark-content' />
      <LinearGradient
        colors={['#4B79A1', '#283E51']}
        style={styles.bg}
        start={{ x: 1, y: 0 }}
        end={{ x: 1, y: 1 }}
      >
        <View style={styles.middle}>
          <HitLocation />
        </View>
      </LinearGradient>
    </View>
  );
};
