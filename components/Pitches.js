import React from "react";
import { useState } from "react";
import { View, Text, TextInput, TouchableOpacity } from "react-native";
import { Picker } from "@react-native-picker/picker";

const Pitches = ({ pitches, setPitches }) => {
  const numbers = Array.from({ length: 20 }, (_, i) => i);

  return (
    <View className="flex-1 w-full justify-center">
      <Text className="text-4xl font-black text-center text-blue-500 pt-10">
        Pitches
      </Text>
      <View className="flex-1 flex-row justify-evenly items-center">
        <View className="w-1/3">
          <Picker
            selectedValue={pitches.strikes}
            onValueChange={(n) => setPitches({ ...pitches, strikes: n })}
            itemStyle={{ fontSize: 48, fontWeight: "bold" }}
          >
            {numbers.map((num) => (
              <Picker.Item label={num.toString()} value={num} key={num} />
            ))}
          </Picker>
        </View>
      </View>
    </View>
  );
};

export default Pitches;
