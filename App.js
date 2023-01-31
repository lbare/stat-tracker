import React from "react";
import { View, StyleSheet, ActivityIndicator } from "react-native";
import { Auth } from "./scenes/Auth";
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
      <Auth />
    </>
  );
};
