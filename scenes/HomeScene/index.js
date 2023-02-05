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
  PlusCircle,
} from "phosphor-react-native";

const Tab = createMaterialBottomTabNavigator();

export const HomeScene = ({ navigation }) => {
  return (
    <Tab.Navigator
      initialRouteName='Home'
      barStyle={styles.nav}
      labeled={false}
      screenOptions={({ route }) => ({
        tabBarIcon: ({ focused, color, size }) => {
          if (route.name === "Home") {
            return <House size={40} color={colors.blue[900]} />;
          } else if (route.name === "Stats") {
            return <ChartLine size={40} color={colors.blue[900]} />;
          } else {
            return <PlusCircle size={40} color={colors.blue[900]} />;
          }
        },
        tabBarActiveTintColor: "tomato",
        tabBarInactiveTintColor: "gray",
      })}
    >
      <Tab.Screen name='Stats' component={Stats} />
      <Tab.Screen name='Home' component={Home} />
      <Tab.Screen name='LogGame' component={LogGame} />
    </Tab.Navigator>
  );
};
