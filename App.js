import React from "react";
import { StatusBar } from "expo-status-bar";
import {
  View,
  Text,
  StyleSheet,
  Dimensions,
  ActivityIndicator,
} from "react-native";
import Auth from "./scenes/Auth";
import { useFonts } from "expo-font";

export default () => {
  const [fontsLoaded] = useFonts({
    "SecularOne-Regular": require("./assets/fonts/SecularOne-Regular.ttf"),
  });

  if (!fontsLoaded) {
    return (
      <View style={{ flex: 1, justifyContent: "center" }}>
        <ActivityIndicator />
      </View>
    );
  }
  return (
    <>
      <Auth styles={styles} />
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "space-between",
    backgroundColor: "#2D424F",
  },
  top: {
    flex: 0.1,
    justifyContent: "center",
    paddingTop: 50,
    paddingBottom: 10,
  },
  middle: {
    flex: 1,
    backgroundColor: "#FFF8DE",
  },
  bottom: {
    flex: 0.18,
  },
  // Text
  h1: {
    fontFamily: "SecularOne-Regular",
    textAlign: "center",
    fontSize: 48,
    color: "#FFF8DE",
  },
  p: {
    fontFamily: "SecularOne-Regular",
    textAlign: "center",
    fontSize: 24,
    color: "#2D424F",
  },
  // Components
  input: {
    height: 40,
    margin: 12,
    borderWidth: 1,
    padding: 10,
  },
  // Icons
  Eye: {
    position: "absolute",
    top: 80,
    left: 340,
  },
});
