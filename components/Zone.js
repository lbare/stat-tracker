import { View, Text, Pressable } from "react-native";
import React from "react";

const Zone = ({ zone, setZone }) => {
  const handlePress = (row, column) => {
    console.log(`Pressed at row ${row}, column ${column}`);
    // Handle the button press logic here
  };
  return (
    <View className="pt-5">
      {/* Top Out */}
      <View className="flex flex-row justify-center items-center w-full h-12 px-8 bottom-1">
        <Pressable
          className={`flex items-center justify-center w-full h-full bg-gray-200 border-2 border-gray-500 ${
            zone === 10 ? "bg-red-500 border-0" : ""
          }`}
          onPress={() => setZone(10)}
        />
      </View>
      {/* Left Out */}
      <View className="flex flex-row justify-center items-center">
        <View className="flex flex-row justify-center items-center w-12 h-full py-1 right-1">
          <Pressable
            className={`flex items-center justify-center w-full h-full bg-gray-200 border-2 border-gray-500 ${
              zone === 11 ? "bg-red-500 border-0" : ""
            }`}
            onPress={() => setZone(11)}
          />
        </View>
        {/* In Zone */}
        <View className="flex w-56 justify-evenly">
          {/* Top */}
          <View className="flex flex-row justify-evenly items-center w-full">
            <Pressable
              className={`flex items-center justify-center w-16 h-20 bg-gray-200 border-2 border-gray-500 m-1 ${
                zone === 1 ? "bg-green-500 border-0" : ""
              }`}
              onPress={() => setZone(1)}
            />
            <Pressable
              className={`flex items-center justify-center w-16 h-20 bg-gray-200 border-2 border-gray-500 m-1 ${
                zone === 2 ? "bg-green-500 border-0" : ""
              }`}
              onPress={() => setZone(2)}
            />
            <Pressable
              className={`flex items-center justify-center w-16 h-20 bg-gray-200 border-2 border-gray-500 m-1 ${
                zone === 3 ? "bg-green-500 border-0" : ""
              }`}
              onPress={() => setZone(3)}
            />
          </View>
          {/* Middle */}
          <View className="flex flex-row justify-evenly items-center w-full">
            <Pressable
              className={`flex items-center justify-center w-16 h-20 bg-gray-200 border-2 border-gray-500 m-1 ${
                zone === 4 ? "bg-green-500 border-0" : ""
              }`}
              onPress={() => setZone(4)}
            />
            <Pressable
              className={`flex items-center justify-center w-16 h-20 bg-gray-200 border-2 border-gray-500 m-1 ${
                zone === 5 ? "bg-green-500 border-0" : ""
              }`}
              onPress={() => setZone(5)}
            />
            <Pressable
              className={`flex items-center justify-center w-16 h-20 bg-gray-200 border-2 border-gray-500 m-1 ${
                zone === 6 ? "bg-green-500 border-0" : ""
              }`}
              onPress={() => setZone(6)}
            />
          </View>
          {/* Bottom */}
          <View className="flex flex-row justify-evenly items-center w-full">
            <Pressable
              className={`flex items-center justify-center w-16 h-20 bg-gray-200 border-2 border-gray-500 m-1 ${
                zone === 7 ? "bg-green-500 border-0" : ""
              }`}
              onPress={() => setZone(7)}
            />
            <Pressable
              className={`flex items-center justify-center w-16 h-20 bg-gray-200 border-2 border-gray-500 m-1 ${
                zone === 8 ? "bg-green-500 border-0" : ""
              }`}
              onPress={() => setZone(8)}
            />
            <Pressable
              className={`flex items-center justify-center w-16 h-20 bg-gray-200 border-2 border-gray-500 m-1 ${
                zone === 9 ? "bg-green-500 border-0" : ""
              }`}
              onPress={() => setZone(9)}
            />
          </View>
        </View>
        {/* Right Out */}
        <View className="flex flex-row justify-center items-center w-12 h-full py-1 left-1">
          <Pressable
            className={`flex items-center justify-center w-full h-full bg-gray-200 border-2 border-gray-500 ${
              zone === 12 ? "bg-red-500 border-0" : ""
            }`}
            onPress={() => setZone(12)}
          />
        </View>
      </View>
      {/* Bottom Out */}
      <View className="flex flex-row justify-center items-center w-full h-12 px-8 top-1">
        <Pressable
          className={`flex items-center justify-center w-full h-full bg-gray-200 border-2 border-gray-500 ${
            zone === 13 ? "bg-red-500 border-0" : ""
          }`}
          onPress={() => setZone(13)}
        />
      </View>
    </View>
  );
};

export default Zone;
