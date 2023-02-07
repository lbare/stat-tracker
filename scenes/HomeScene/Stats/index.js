import { View, SafeAreaView, StatusBar } from "react-native";
import { styles } from "./styles";
import { colors } from "../../../styles";
import {
  UserCircle,
  House,
  Gear,
  ChartLine,
  PlusCircle,
} from "phosphor-react-native";
import { createMaterialBottomTabNavigator } from "@react-navigation/material-bottom-tabs";
import { Text } from "react-native-paper";
import React, { useState } from "react";

export const Home = (props) => {
  return (
    <SafeAreaView style={styles.container}>
      {/* Top Bar */}
      <StatusBar barStyle='dark-content' />
      <View style={styles.top}>
        <Text style={styles.h1}>StatTracker</Text>
        <UserCircle size={40} color={colors.blue[900]} />
      </View>
      {/* Main */}
      <View style={styles.middle}></View>
    </SafeAreaView>
  );
};
