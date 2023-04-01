import React from "react";
import { View, Text, TouchableOpacity } from "react-native";
import { Picker } from "@react-native-picker/picker";

const Runs = ({ RBI, runScored, setRBI, setRunScored }) => {
  return (
    <View className="flex-1 w-full justify-center">
      <Text className="text-4xl font-black text-center text-blue-500 pt-10">
        Run Scored
      </Text>
      <View className="flex-row justify-evenly p-6">
        <TouchableOpacity
          className={`bg-gray-100 border border-gray-500 rounded-xl w-1/5 h-14 justify-center ${
            runScored ? "bg-blue-500 border-blue-700" : ""
          }`}
          onPress={() => setRunScored(true)}
        >
          <Text
            className={`text-center text-xl ${runScored ? "text-white" : ""}`}
          >
            Yes
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          className={`bg-gray-100 border border-gray-500 rounded-xl w-1/5 h-14 justify-center ${
            runScored === false ? "bg-blue-500 border-blue-700" : ""
          }`}
          onPress={() => setRunScored(false)}
        >
          <Text
            className={`text-center text-xl ${
              runScored === false ? "text-white" : ""
            }`}
          >
            No
          </Text>
        </TouchableOpacity>
      </View>
      <View className="flex-row justify-evenly p-6 items-center">
        <Text className="text-4xl font-black text-center text-blue-500">
          RBI's:
        </Text>
        <View className="w-1/3">
          <Picker
            selectedValue={RBI}
            onValueChange={(n) => setRBI(n)}
            itemStyle={{ fontSize: 36, fontWeight: "bold" }}
          >
            <Picker.Item label="4" value={4} />
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

export default Runs;
