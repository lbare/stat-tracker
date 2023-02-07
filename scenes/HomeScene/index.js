import { createMaterialBottomTabNavigator } from '@react-navigation/material-bottom-tabs';
import React from 'react';
import { View, Text, SectionList, SafeAreaView, StatusBar } from 'react-native';
import { styles } from './styles';
import { LogGame } from './LogGame';
import { Stats } from './Stats';
import { colors } from '../../styles';
import {
  UserCircle,
  House,
  Gear,
  ChartLine,
  ChartLineUp,
  PlusCircle,
} from 'phosphor-react-native';

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

export const HomeScene = ({ navigation }) => {
  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle='dark-content' />
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
    </SafeAreaView>
  );
};
