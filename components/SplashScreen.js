import { View, Text, StyleSheet, ActivityIndicator } from "react-native";
import React from "react";

const SplashScreen = () => {
  return (
    <View style={styles.container}>
      <Text style={styles.text}>Baseball Stats</Text>
      <ActivityIndicator size="large" color="white" />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#354F60",
    justifyContent: "center",
    alignItems: "center",
  },
  text: {
    fontFamily: "WS-B",
    color: "white",
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 20,
  },
});

export default SplashScreen;
