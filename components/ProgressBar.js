import { View, Text, StyleSheet } from "react-native";
import React from "react";
import { Baseball } from "phosphor-react-native";

const ProgressBar = ({ percent }) => {
  return (
    <View style={styles.container}>
      <View style={{ ...styles.progress, width: `${percent.toString()}%` }}>
        <View style={styles.baseball}>
          <View style={styles.iconBackground}>
            <Baseball size={26} color="#B1D0D4" weight="bold" />
          </View>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    height: 26,
    width: "100%",
    borderRadius: 30,
    borderWidth: 3,
    borderColor: "#354F60",
    flexDirection: "row",
  },
  progress: {
    height: "100%",
    backgroundColor: "#354F60",
    borderTopLeftRadius: 30,
    borderBottomLeftRadius: 30,
    flexDirection: "row",
    justifyContent: "flex-end",
  },
  baseball: {
    justifyContent: "center",
    left: 16,
    borderRadius: 15,
  },
  iconBackground: {
    backgroundColor: "#354F60",
    borderRadius: 50,
  },
});

export default ProgressBar;
