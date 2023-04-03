import React from "react";
import { View, Text, SectionList } from "react-native";

const DATA = [
  {
    title: "January",
    data: [
      {
        date: "1/7",
        opponent: "Reds",
        homeScore: 2,
        awayScore: 4,
      },
    ],
  },
  {
    title: "February",
    data: [
      {
        date: "2/14",
        opponent: "White Sox",
        homeScore: 6,
        awayScore: 5,
      },
      {
        date: "2/21",
        opponent: "Pirates",
        homeScore: 3,
        awayScore: 1,
      },
      {
        date: "2/28",
        opponent: "Rockies",
        homeScore: 8,
        awayScore: 2,
      },
    ],
  },
  {
    title: "March",
    data: [
      {
        date: "3/7",
        opponent: "Red Sox",
        homeScore: 1,
        awayScore: 4,
      },
      {
        date: "3/14",
        opponent: "Brewers",
        homeScore: 2,
        awayScore: 3,
      },
      {
        date: "3/21",
        opponent: "Giants",
        homeScore: 4,
        awayScore: 7,
      },
      {
        date: "3/28",
        opponent: "Royals",
        homeScore: 5,
        awayScore: 4,
      },
    ],
  },
  {
    title: "April",
    data: [
      {
        date: "4/4",
        opponent: "Reds",
        homeScore: 6,
        awayScore: 4,
      },
      {
        date: "4/11",
        opponent: "Pirates",
        homeScore: 4,
        awayScore: 3,
      },
      {
        date: "4/18",
        opponent: "Rockies",
        homeScore: 2,
        awayScore: 1,
      },
      {
        date: "4/25",
        opponent: "White Sox",
        homeScore: 3,
        awayScore: 2,
      },
    ],
  },
  {
    title: "May",
    data: [
      {
        date: "5/2",
        opponent: "Brewers",
      },
      {
        date: "5/9",
        opponent: "Red Sox",
      },
      {
        date: "5/16",
        opponent: "Giants",
      },
      {
        date: "5/23",
        opponent: "Royals",
      },
      {
        date: "5/30",
        opponent: "Reds",
      },
    ],
  },
  {
    title: "June",
    data: [
      { date: "6/1", opponent: "Reds" },
      { date: "6/8", opponent: "Pirates" },
      { date: "6/15", opponent: "Rockies" },
      { date: "6/22", opponent: "Brewers" },
      { date: "6/29", opponent: "Royals" },
    ],
  },
  {
    title: "July",
    data: [
      {
        date: "7/6",
        opponent: "White Sox",
      },
      {
        date: "7/13",
        opponent: "Giants",
      },
      {
        date: "7/20",
        opponent: "Red Sox",
      },
      {
        date: "7/27",
        opponent: "Pirates",
      },
    ],
  },
  {
    title: "August",
    data: [
      {
        date: "8/3",
        opponent: "Rockies",
      },
      {
        date: "8/10",
        opponent: "White Sox",
      },
      {
        date: "8/17",
        opponent: "Reds",
      },
      {
        date: "8/24",
        opponent: "Royals",
      },
      {
        date: "8/31",
        opponent: "Brewers",
      },
    ],
  },
];

const Settings = () => {
  return (
    <View className="flex-1 w-full justify-center items-center pb-20">
      <SectionList
        className="w-full"
        sections={DATA}
        keyExtractor={(item, index) => item + index}
        renderItem={({ item }) => (
          <View className="border-b border-gray-500 p-4 flex-row justify-between">
            <Text className="text-xl">{item.date}</Text>
            <Text className="text-xl text-left">{item.opponent}</Text>
            <Text className="text-xl">
              {item.homeScore}-{item.awayScore}
            </Text>
          </View>
        )}
        renderSectionHeader={({ section: { title } }) => (
          <View className="border-b border-gray-500 pl-4 pt-8 bg-gray-100">
            <Text className="text-4xl font-bold">{title}</Text>
          </View>
        )}
      />
    </View>
  );
};

export default Settings;
