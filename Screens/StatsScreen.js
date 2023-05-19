import React from "react";
import { View, Text } from "react-native";
import BackgroundImage from "../components/BackgroundImage";

const Stats = () => {
  return (
    <View
      style={{
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
      }}
      resizeMode="cover"
    >
      <Text>Stats</Text>
    </View>
  );
};

export default Stats;
