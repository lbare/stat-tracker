import React from "react";
import { View, Text, SectionList, SafeAreaView, StatusBar } from "react-native";
import { styles } from "./styles";
import { LinearGradient } from "expo-linear-gradient";
import { LogGame } from "./LogGame/LogGame";
import { Stats } from "./Stats/Stats";
import { Settings } from "./Settings";
import { colors } from "../../styles";
import { NavigationContainer } from "@react-navigation/native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import {
  UserCircle,
  House,
  Gear,
  ChartLine,
  ChartLineUp,
  PlusCircle,
  Baseball,
} from "phosphor-react-native";

const BottomBar = createBottomTabNavigator();

export const HomeScene = ({ navigation }) => {
  return (
    <BottomBar.Navigator
      detachInactiveScreens={false}
      initialRouteName='Stats'
      screenOptions={{
        tabBarShowLabel: false,
        tabBarActiveTintColor: "black",
        tabBarInactiveTintColor: "gray",
        tabBarStyle: styles.nav,
      }}
    >
      <BottomBar.Screen
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
      <BottomBar.Screen
        name='LogGame'
        component={LogGame}
        options={{
          tabBarIcon: ({ focused }) =>
            focused ? (
              <View
                style={{ ...styles.baseballIcon, ...styles.baseballIconActive }}
              >
                <Baseball size={80} color='white' />
              </View>
            ) : (
              <View
                style={{
                  ...styles.baseballIcon,
                  ...styles.baseballIconInactive,
                }}
              >
                <Baseball size={80} color='#E84444' />
              </View>
            ),
        }}
      />
      <BottomBar.Screen
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
    </BottomBar.Navigator>
  );
};
