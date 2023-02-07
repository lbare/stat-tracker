import { View, SafeAreaView, StatusBar } from 'react-native';
import { styles } from './styles';
import { colors } from '../../../styles';
import { LinearGradient } from 'expo-linear-gradient';
import { SectionList } from 'react-native';
import {
  UserCircle,
  House,
  Gear,
  ChartLine,
  PlusCircle,
} from 'phosphor-react-native';
import { createMaterialBottomTabNavigator } from '@react-navigation/material-bottom-tabs';
import { Text } from 'react-native-paper';
import React, { useState } from 'react';
import { FloatingButton } from '../../../components/FAB';

const DATA = [
  {
    title: 'Section 1',
    data: ['1', '2'],
  },
  {
    title: 'Section 2',
    data: ['1', '2', '3'],
  },
  {
    title: 'Section 3',
    data: ['1'],
  },
  {
    title: 'Section 4',
    data: ['1', '2', '3', '4'],
  },
];

export const Stats = (props) => {
  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle='dark-content' />
      <LinearGradient
        colors={['#4B79A1', '#283E51']}
        style={styles.bg}
        start={{ x: 1, y: 0 }}
        end={{ x: 1, y: 1 }}
      >
        <SectionList
          sections={DATA}
          keyExtractor={(item, index) => item + index}
          renderItem={({ item }) => (
            <View style={styles.item}>
              <Text style={styles.title}>{item}</Text>
            </View>
          )}
          renderSectionHeader={({ section: { title } }) => (
            <Text style={styles.header}>{title}</Text>
          )}
        />
      </LinearGradient>
    </SafeAreaView>
  );
};
