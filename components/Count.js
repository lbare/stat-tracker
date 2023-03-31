import React from "react";
import { useState } from "react";
import { View, Text, TextInput, TouchableOpacity } from "react-native";
import { Picker } from "@react-native-picker/picker";

const Count = ({ count, setCount }) => {
  return (
    <View className="flex-1 w-full justify-center">
      <Text className="text-4xl font-black text-center text-blue-500 pt-10">
        Count
      </Text>
      <View className="flex-1 flex-row justify-evenly items-center">
        <View className="w-1/3">
          <Picker
            selectedValue={count.strikes}
            onValueChange={(n) => setCount({ ...count, strikes: n })}
            itemStyle={{ fontSize: 48, fontWeight: "bold" }}
          >
            <Picker.Item label="4" value={4} />
            <Picker.Item label="3" value={3} />
            <Picker.Item label="2" value={2} />
            <Picker.Item label="1" value={1} />
            <Picker.Item label="0" value={0} />
          </Picker>
        </View>
        <Text className="text-7xl">-</Text>
        <View className="w-1/3">
          <Picker
            selectedValue={count.balls}
            onValueChange={(n) => setCount({ ...count, balls: n })}
            itemStyle={{ fontSize: 48, fontWeight: "bold" }}
          >
            <Picker.Item label="3" value={3} />
            <Picker.Item label="2" value={2} />
            <Picker.Item label="1" value={1} />
            <Picker.Item label="0" value={0} />
          </Picker>
        </View>
      </View>
    </View>
  );
};

export default Count;
