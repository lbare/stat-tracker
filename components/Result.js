import { useState } from "react";
import { View, Text, TextInput, TouchableOpacity } from "react-native";

const Result = ({ result, setResult }) => {
  return (
    <View className="flex-1 w-full justify-center">
      <Text className="text-4xl font-black text-center text-blue-500 pt-10">
        Outcome
      </Text>
      <View className="flex-row justify-evenly p-6">
        <TouchableOpacity
          className={`bg-gray-100 border border-gray-500 rounded-xl w-1/5 h-14 justify-center ${
            result === "1B" ? "bg-blue-500 border-blue-700" : ""
          }`}
          onPress={() => setResult("1B")}
        >
          <Text
            className={`text-center text-xl ${
              result === "1B" ? "text-white" : ""
            }`}
          >
            1B
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          className={`bg-gray-100 border border-gray-500 rounded-xl w-1/5 h-14 justify-center ${
            result === "2B" ? "bg-blue-500 border-blue-700" : ""
          }`}
          onPress={() => setResult("2B")}
        >
          <Text
            className={`text-center text-xl ${
              result === "2B" ? "text-white" : ""
            }`}
          >
            2B
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          className={`bg-gray-100 border border-gray-500 rounded-xl w-1/5 h-14 justify-center ${
            result === "3B" ? "bg-blue-500 border-blue-700" : ""
          }`}
          onPress={() => setResult("3B")}
        >
          <Text
            className={`text-center text-xl ${
              result === "3B" ? "text-white" : ""
            }`}
          >
            3B
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          className={`bg-gray-100 border border-gray-500 rounded-xl w-1/5 h-14 justify-center ${
            result === "HR" ? "bg-blue-500 border-blue-700" : ""
          }`}
          onPress={() => setResult("HR")}
        >
          <Text
            className={`text-center text-xl ${
              result === "HR" ? "text-white" : ""
            }`}
          >
            HR
          </Text>
        </TouchableOpacity>
      </View>
      <View className="flex-row justify-evenly px-6">
        <TouchableOpacity
          className={`bg-gray-100 border border-gray-500 rounded-xl w-1/5 h-14 justify-center ${
            result === "HBP" ? "bg-blue-500 border-blue-700" : ""
          }`}
          onPress={() => setResult("HBP")}
        >
          <Text
            className={`text-center text-xl ${
              result === "HBP" ? "text-white" : ""
            }`}
          >
            HBP
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          className={`bg-gray-100 border border-gray-500 rounded-xl w-1/5 h-14 justify-center ${
            result === "SF" ? "bg-blue-500 border-blue-700" : ""
          }`}
          onPress={() => setResult("SF")}
        >
          <Text
            className={`text-center text-xl ${
              result === "SF" ? "text-white" : ""
            }`}
          >
            SF
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          className={`bg-gray-100 border border-gray-500 rounded-xl w-1/5 h-14 justify-center ${
            result === "Sac" ? "bg-blue-500 border-blue-700" : ""
          }`}
          onPress={() => setResult("Sac")}
        >
          <Text
            className={`text-center text-xl ${
              result === "Sac" ? "text-white" : ""
            }`}
          >
            SAC
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          className={`bg-gray-100 border border-gray-500 rounded-xl w-1/5 h-14 justify-center ${
            result === "E" ? "bg-blue-500 border-blue-700" : ""
          }`}
          onPress={() => setResult("E")}
        >
          <Text
            className={`text-center text-xl ${
              result === "E" ? "text-white" : ""
            }`}
          >
            E
          </Text>
        </TouchableOpacity>
      </View>
      <View className="flex-row justify-evenly px-10 pt-6">
        <TouchableOpacity
          className={`bg-gray-100 border border-gray-500 rounded-xl w-1/5 h-14 justify-center ${
            result === "BB" ? "bg-blue-500 border-blue-700" : ""
          }`}
          onPress={() => setResult("BB")}
        >
          <Text
            className={`text-center text-xl ${
              result === "BB" ? "text-white" : ""
            }`}
          >
            BB
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          className={`bg-gray-100 border border-gray-500 rounded-xl w-1/5 h-14 justify-center ${
            result === "K" ? "bg-blue-500 border-blue-700" : ""
          }`}
          onPress={() => setResult("K")}
        >
          <Text
            className={`text-center text-xl ${
              result === "K" ? "text-white" : ""
            }`}
          >
            K
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          className={`bg-gray-100 border border-gray-500 rounded-xl w-1/5 h-14 justify-center ${
            result === "Out" ? "bg-blue-500 border-blue-700" : ""
          }`}
          onPress={() => setResult("Out")}
        >
          <Text
            className={`text-center text-xl ${
              result === "Out" ? "text-white" : ""
            }`}
          >
            OUT
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default Result;
