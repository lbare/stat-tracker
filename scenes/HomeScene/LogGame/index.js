import React from 'react';
import { View, SafeAreaView, Text, StatusBar } from 'react-native';
import { List } from 'phosphor-react-native';
import { styles } from '../Stats/styles';

export const LogGame = () => {
  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle='dark-content' />
      <View style={styles.top}>
        <Text style={styles.h1}>TEST</Text>
      </View>
      <View style={styles.middle}></View>
    </SafeAreaView>
  );
};
