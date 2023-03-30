import { View, Text, Image, TouchableOpacity } from "react-native";
import Field from "../assets/SVG/Field";
import { useState } from "react";
import { CrosshairSimple } from "phosphor-react-native";

const HitLocation = ({ hitLocation, setHitLocation }) => {
  const handlePress = (event) => {
    const { nativeEvent } = event;
    const { locationX, locationY } = nativeEvent;
    console.log(
      Math.round(nativeEvent.locationX),
      Math.round(nativeEvent.locationY)
    );
    setHitLocation({
      x: locationX,
      y: locationY,
    });
  };

  return (
    <View className="flex-1 justify-center align-center items-center radius-2">
      <TouchableOpacity
        onPress={handlePress}
        className="flex-1"
        activeOpacity={1}
      >
        <Field
          options={{
            outfield: {
              fillColor: "none",
              strokeColor: "black",
              strokeWidth: 10,
            },
            infieldDirt: {
              fillColor: "none",
              strokeColor: "black",
              strokeWidth: 10,
            },
            infieldGrass: {
              fillColor: "none",
              strokeColor: "black",
              strokeWidth: 10,
            },
            bases: {
              fillColor: "black",
              strokeColor: "black",
              strokeWidth: 4,
            },
            home: {
              fillColor: "black",
              strokeColor: "black",
              strokeWidth: 4,
            },
            mound: {
              fillColor: "none",
              strokeColor: "black",
              strokeWidth: 10,
            },
            rubber: {
              fillColor: "black",
              strokeColor: "black",
              strokeWidth: 3,
            },
          }}
        />
        <View
          style={[
            {
              position: "absolute",
              top: hitLocation.y - 20,
              left: hitLocation.x - 16,
            },
          ]}
        >
          <CrosshairSimple size={32} color="red" weight="duotone" />
        </View>
      </TouchableOpacity>
    </View>
  );
};

export default HitLocation;
