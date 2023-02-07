import { createMaterialBottomTabNavigator } from "@react-navigation/material-bottom-tabs";
import React from "react";
import { View, Text } from "react-native";
import { Home } from "./Home";
import { styles } from "./styles";
import { LogGame } from "./LogGame";
import { Stats } from "./Stats";
import { colors } from "../../styles";
import {
  UserCircle,
  House,
  Gear,
  ChartLine,
  ChartLineUp,
  PlusCircle,
} from "phosphor-react-native";

const Tab = createMaterialBottomTabNavigator();

export const HomeScene = ({ navigation }) => {
  return (
    <Tab.Navigator
      initialRouteName='Home'
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
        name='Home'
        component={Home}
        options={{
          tabBarIcon: ({ color, focused }) =>
            focused ? (
              <House size={32} color={color} weight='fill' />
            ) : (
              <House size={32} color={color} />
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
    </Tab.Navigator>
  );
};
