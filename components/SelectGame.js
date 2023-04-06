import React from "react";
import { useState } from "react";
import { View, Text, TextInput, TouchableOpacity } from "react-native";
import { Picker } from "@react-native-picker/picker";

const SelectGame = ({ game, setGame, gameList }) => {
  return (
    <View className="flex-1 w-full justify-center">
      <Text className="text-4xl font-black text-center text-blue-500 pt-10">
        Game
      </Text>
      <View className="flex-1 flex-row justify-evenly items-center">
        <View className="w-2/3">
          <Picker
            selectedValue={game}
            onValueChange={(value) => setGame(value)}
            itemStyle={{ fontSize: 24, fontWeight: "bold" }}
          >
            {gameList.map((item) => (
              <Picker.Item
                label={`${item.date.toLocaleString("en-US", {
                  month: "numeric",
                  day: "2-digit",
                })} ${item.home ? "vs." : "@"} ${item.opponent}`}
                value={item.id}
              />
            ))}
          </Picker>
        </View>
      </View>
    </View>
  );
};

export default SelectGame;
