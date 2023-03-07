import React from 'react';
import { View, SafeAreaView, Text, StatusBar } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { List } from 'phosphor-react-native';
import { styles } from '../Stats/styles';

export const Settings = () => {
  return (
    <SafeAreaView style={styles.container}>
      <LinearGradient
        colors={['#4B79A1', '#283E51']}
        style={styles.main}
        start={{ x: 1, y: 0 }}
        end={{ x: 1, y: 1 }}
      >
        <StatusBar barStyle='dark-content' />
        <View style={styles.top}>
          <Text style={styles.h1}>TEST</Text>
        </View>
        <View style={styles.middle}></View>
      </LinearGradient>
    </SafeAreaView>
  );
};
