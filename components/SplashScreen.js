import { View, Text, StyleSheet, ActivityIndicator } from "react-native";
import React from "react";

const SplashScreen = () => {
  return (
    <View style={styles.container}>
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
});

export default SplashScreen;
