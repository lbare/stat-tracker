import React, { useContext, useEffect } from "react";
import { TouchableOpacity, ScrollView } from "react-native";
import { View, Text } from "react-native";
import { auth } from "../services/firebase";
import { UserContext } from "../services/UserContext";
import { getAllTeamsBySeason } from "../services/firebase";

const Stats = () => {
  const teams2021 = [
    "Athletics",
    "Brewers",
    "Braves",
    "Giants",
    "Pirates",
    "Red Sox",
    "Reds",
    "Rockies",
    "Royals",
  ];

  const teams2022 = [
    "Astros",
    "Brewers",
    "Giants",
    "Monarchs",
    "Pirates",
    "Red Sox",
    "Reds",
    "Rockies",
    "Royals",
    "White Sox",
  ];

  const teams2023 = [
    "Brewers",
    "Giants",
    "Monarchs",
    "Pirates",
    "Red Sox",
    "Reds",
    "Rockies",
    "Royals",
    "White Sox",
  ];

  useEffect(() => {}, []);

  return (
    <View className="flex-1 justify-start items-center py-8 px-2">
      <View className="justify-start w-full border-b-2">
        <Text className="text-6xl font-bold">2023</Text>
      </View>
      <ScrollView
        contentContainerStyle={{
          flexGrow: 1,
          flexDirection: "column",
        }}
        horizontal={true}
      >
        <View className="flex-row justify-between border-2">
          <View className="w-20 h-8 justify-center items-center border-r-2">
            <Text className="font-bold">Team</Text>
          </View>
          <View className="w-12 h-8 justify-center items-center border-r-2">
            <Text className="font-bold">G</Text>
          </View>
          <View className="w-12 h-8 justify-center items-center border-r-2">
            <Text className="font-bold">AB</Text>
          </View>
          <View className="w-12 h-8 justify-center items-center border-r-2">
            <Text className="font-bold">R</Text>
          </View>
          <View className="w-12 h-8 justify-center items-center border-r-2">
            <Text className="font-bold">H</Text>
          </View>
          <View className="w-12 h-8 justify-center items-center border-r-2">
            <Text className="font-bold">RBI</Text>
          </View>
          <View className="w-12 h-8 justify-center items-center border-r-2">
            <Text className="font-bold">BB</Text>
          </View>
          <View className="w-12 h-8 justify-center items-center border-r-2">
            <Text className="font-bold">SO</Text>
          </View>
          <View className="w-12 h-8 justify-center items-center border-r-2">
            <Text className="font-bold">AVG</Text>
          </View>
          <View className="w-12 h-8 justify-center items-center border-r-2">
            <Text className="font-bold">OBP</Text>
          </View>
          <View className="w-12 h-8 justify-center items-center border-r-2">
            <Text className="font-bold">SLG</Text>
          </View>
          <View className="w-12 h-8 justify-center items-center border-r-2">
            <Text className="font-bold">OPS</Text>
          </View>
        </View>
        <View className="flex-row justify-between border-2">
          <View className="w-20 h-8 justify-center items-center border-r-2">
            <Text className="">Team</Text>
          </View>
          <View className="w-12 h-8 justify-center items-center border-r-2">
            <Text className="">G</Text>
          </View>
          <View className="w-12 h-8 justify-center items-center border-r-2">
            <Text className="">AB</Text>
          </View>
          <View className="w-12 h-8 justify-center items-center border-r-2">
            <Text className="">R</Text>
          </View>
          <View className="w-12 h-8 justify-center items-center border-r-2">
            <Text className="">H</Text>
          </View>
          <View className="w-12 h-8 justify-center items-center border-r-2">
            <Text className="">RBI</Text>
          </View>
          <View className="w-12 h-8 justify-center items-center border-r-2">
            <Text className="">BB</Text>
          </View>
          <View className="w-12 h-8 justify-center items-center border-r-2">
            <Text className="">SO</Text>
          </View>
          <View className="w-12 h-8 justify-center items-center border-r-2">
            <Text className="">AVG</Text>
          </View>
          <View className="w-12 h-8 justify-center items-center border-r-2">
            <Text className="">OBP</Text>
          </View>
          <View className="w-12 h-8 justify-center items-center border-r-2">
            <Text className="">SLG</Text>
          </View>
          <View className="w-12 h-8 justify-center items-center border-r-2">
            <Text className="">OPS</Text>
          </View>
        </View>
      </ScrollView>
      <View className="justify-start w-full border-b-2">
        <Text className="text-6xl font-bold">2022</Text>
      </View>
      <ScrollView
        contentContainerStyle={{
          flexGrow: 1,
          flexDirection: "column",
        }}
        horizontal={true}
      >
        <View className="flex-row justify-between border-2">
          <View className="w-20 h-8 justify-center items-center border-r-2">
            <Text className="font-bold">Team</Text>
          </View>
          <View className="w-12 h-8 justify-center items-center border-r-2">
            <Text className="font-bold">G</Text>
          </View>
          <View className="w-12 h-8 justify-center items-center border-r-2">
            <Text className="font-bold">AB</Text>
          </View>
          <View className="w-12 h-8 justify-center items-center border-r-2">
            <Text className="font-bold">R</Text>
          </View>
          <View className="w-12 h-8 justify-center items-center border-r-2">
            <Text className="font-bold">H</Text>
          </View>
          <View className="w-12 h-8 justify-center items-center border-r-2">
            <Text className="font-bold">RBI</Text>
          </View>
          <View className="w-12 h-8 justify-center items-center border-r-2">
            <Text className="font-bold">BB</Text>
          </View>
          <View className="w-12 h-8 justify-center items-center border-r-2">
            <Text className="font-bold">SO</Text>
          </View>
          <View className="w-12 h-8 justify-center items-center border-r-2">
            <Text className="font-bold">AVG</Text>
          </View>
          <View className="w-12 h-8 justify-center items-center border-r-2">
            <Text className="font-bold">OBP</Text>
          </View>
          <View className="w-12 h-8 justify-center items-center border-r-2">
            <Text className="font-bold">SLG</Text>
          </View>
          <View className="w-12 h-8 justify-center items-center border-r-2">
            <Text className="font-bold">OPS</Text>
          </View>
        </View>
        <View className="flex-row justify-between border-2">
          <View className="w-20 h-8 justify-center items-center border-r-2">
            {}
          </View>
          <View className="w-12 h-8 justify-center items-center border-r-2">
            <Text className="">G</Text>
          </View>
          <View className="w-12 h-8 justify-center items-center border-r-2">
            <Text className="">AB</Text>
          </View>
          <View className="w-12 h-8 justify-center items-center border-r-2">
            <Text className="">R</Text>
          </View>
          <View className="w-12 h-8 justify-center items-center border-r-2">
            <Text className="">H</Text>
          </View>
          <View className="w-12 h-8 justify-center items-center border-r-2">
            <Text className="">RBI</Text>
          </View>
          <View className="w-12 h-8 justify-center items-center border-r-2">
            <Text className="">BB</Text>
          </View>
          <View className="w-12 h-8 justify-center items-center border-r-2">
            <Text className="">SO</Text>
          </View>
          <View className="w-12 h-8 justify-center items-center border-r-2">
            <Text className="">AVG</Text>
          </View>
          <View className="w-12 h-8 justify-center items-center border-r-2">
            <Text className="">OBP</Text>
          </View>
          <View className="w-12 h-8 justify-center items-center border-r-2">
            <Text className="">SLG</Text>
          </View>
          <View className="w-12 h-8 justify-center items-center border-r-2">
            <Text className="">OPS</Text>
          </View>
        </View>
      </ScrollView>
    </View>
  );
};

export default Stats;
