import React from "react";
import { View, Text, TouchableOpacity } from "react-native";

const Trajectory = ({ trajectory, hardHit, setTrajectory, setHardHit }) => {
  return (
    <View className="flex-1 w-full justify-center">
      <Text className="text-4xl font-black text-center text-blue-500 pt-10">
        Trajectory
      </Text>
      <View className="flex-row justify-evenly p-6">
        <TouchableOpacity
          className={`bg-gray-100 border border-gray-500 rounded-xl w-1/5 h-14 justify-center ${
            trajectory === "high" ? "bg-blue-500 border-blue-700" : ""
          }`}
          onPress={() => setTrajectory("high")}
        >
          <Text
            className={`text-center text-xl ${
              trajectory === "high" ? "text-white" : ""
            }`}
          >
            High Fly Ball
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          className={`bg-gray-100 border border-gray-500 rounded-xl w-1/5 h-14 justify-center ${
            trajectory === "medium" ? "bg-blue-500 border-blue-700" : ""
          }`}
          onPress={() => setTrajectory("medium")}
        >
          <Text
            className={`text-center text-xl ${
              trajectory === "medium" ? "text-white" : ""
            }`}
          >
            Low Fly Ball
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          className={`bg-gray-100 border border-gray-500 rounded-xl w-1/5 h-14 justify-center ${
            trajectory === "line" ? "bg-blue-500 border-blue-700" : ""
          }`}
          onPress={() => setTrajectory("line")}
        >
          <Text
            className={`text-center text-xl ${
              trajectory === "line" ? "text-white" : ""
            }`}
          >
            Line Drive
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          className={`bg-gray-100 border border-gray-500 rounded-xl w-1/5 h-14 justify-center ${
            trajectory === "ground" ? "bg-blue-500 border-blue-700" : ""
          }`}
          onPress={() => setTrajectory("ground")}
        >
          <Text
            className={`text-center text-xl ${
              trajectory === "ground" ? "text-white" : ""
            }`}
          >
            Groundball
          </Text>
        </TouchableOpacity>
      </View>
      <Text className="text-4xl font-black text-center text-blue-500 pt-10">
        Hit Hard
      </Text>
      <View className="flex-row justify-evenly p-6">
        <TouchableOpacity
          className={`bg-gray-100 border border-gray-500 rounded-xl w-1/5 h-14 justify-center ${
            hardHit ? "bg-blue-500 border-blue-700" : ""
          }`}
          onPress={() => setHardHit(true)}
        >
          <Text
            className={`text-center text-xl ${hardHit ? "text-white" : ""}`}
          >
            Yes
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          className={`bg-gray-100 border border-gray-500 rounded-xl w-1/5 h-14 justify-center ${
            hardHit === false ? "bg-blue-500 border-blue-700" : ""
          }`}
          onPress={() => setHardHit(false)}
        >
          <Text
            className={`text-center text-xl ${
              hardHit === false ? "text-white" : ""
            }`}
          >
            No
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default Trajectory;
