import { createMaterialBottomTabNavigator } from '@react-navigation/material-bottom-tabs';
import React from 'react';
import { View, Text, SectionList, SafeAreaView, StatusBar } from 'react-native';
import { styles } from './styles';
import { LinearGradient } from 'expo-linear-gradient';
import { LogGame } from './LogGame';
import { Stats } from './Stats';
import { Settings } from './Settings';
import { colors } from '../../styles';
import { FloatingButton } from '../../components/FAB';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import {
  UserCircle,
  House,
  Gear,
  ChartLine,
  ChartLineUp,
  PlusCircle,
} from 'phosphor-react-native';

const Tab = createMaterialBottomTabNavigator();

export const HomeScene = ({ navigation }) => {
  return (
    <Tab.Navigator
      initialRouteName='Stats'
      barStyle={styles.nav}
      labeled={false}
      activeColor={colors.blue[900]}
      inactiveColor='gray'
      sceneAnimationEnabled={true}
      sceneAnimationType='shifting'
    >
      <Tab.Screen
        name='Stats'
        component={Stats}
        options={{
          tabBarIcon: ({ color, focused }) =>
            focused ? (
              <ChartLineUp size={32} color={color} weight='fill' />
            ) : (
              <ChartLineUp size={32} color={color} />
            ),
        }}
      />
      <Tab.Screen
        name='LogGame'
        component={LogGame}
        options={{
          tabBarIcon: ({ color, focused }) =>
            focused ? (
              <PlusCircle size={32} color={color} weight='fill' />
            ) : (
              <PlusCircle size={32} color={color} />
            ),
        }}
      />
      <Tab.Screen
        name='Settings'
        component={Settings}
        options={{
          tabBarIcon: ({ color, focused }) =>
            focused ? (
              <House size={32} color={color} weight='fill' />
            ) : (
              <House size={32} color={color} />
            ),
        }}
      />
    </Tab.Navigator>
  );
};
