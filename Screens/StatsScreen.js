import React, { useContext, useEffect, useState } from "react";
import { TouchableOpacity, ScrollView } from "react-native";
import { View, Text } from "react-native";
import { UserContext } from "../services/UserContext";
import { StatsCalculator } from "../services/StatsCalculator";

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

  const { userGames } = useContext(UserContext);
  const [stats2022, setStats2022] = useState({});

  // const teamGames = [
  //   {
  //     atBats: [["Object"], ["Object"]],
  //     awayScore: 0,
  //     awayTeam: "Monarchs",
  //     date: "2022-05-14T01:30:00.000Z",
  //     homeScore: 10,
  //     homeTeam: "White Sox",
  //     id: "9cmYRwAhoaT5eYUFVsXa",
  //     location: "Lambrick",
  //     myTeam: true,
  //     pitching: {
  //       earnedRuns: 5,
  //       hits: 10,
  //       inningsPitched: 4,
  //       runs: 10,
  //       strikeouts: 4,
  //       walks: 1,
  //     },
  //     type: "regular",
  //     winner: "White Sox",
  //   },
  //   {
  //     awayScore: 9,
  //     awayTeam: "White Sox",
  //     date: "2022-05-17T01:00:00.000Z",
  //     homeScore: 7,
  //     homeTeam: "Monarchs",
  //     id: "f8tQCWjjSFN5mvuu5SQn",
  //     location: "Layritz",
  //     myTeam: true,
  //     type: "regular",
  //     winner: "White Sox",
  //   },
  //   {
  //     awayScore: null,
  //     awayTeam: "Monarchs",
  //     date: "2022-05-02T01:30:00.000Z",
  //     homeScore: null,
  //     homeTeam: "White Sox",
  //     id: "qlGH6eHGSkadmwrUvWRz",
  //     location: "Lambrick",
  //     myTeam: true,
  //     type: "exhibition",
  //     winner: null,
  //   },
  // ];

  // useEffect(() => {
  //   if (userGames) {
  //     const allAtBats = userGames.reduce((cumulatedAtBats, game) => {
  //       const atBats = game.atBats || []; // handle empty atBats array if necessary
  //       return cumulatedAtBats.concat(atBats);
  //     }, []);

  //     const teamStats = teams2022.map((team) => {
  //       const teamGames = userGames.filter(
  //         (game) =>
  //           game.date.getFullYear() === 2022 &&
  //           ((game.awayTeam === team && game.homeTeam === "Monarchs") ||
  //             (game.homeTeam === team && game.awayTeam === "Monarchs"))
  //       );

  //       const teamAtBats = teamGames.reduce((cumulatedAtBats, game) => {
  //         const atBats = game.atBats || [];
  //         return cumulatedAtBats.concat(atBats);
  //       }, []);

  //       console.log("====================================");
  //       console.log("teamAtBats: ", teamAtBats);
  //       console.log("====================================");
  //       const stats = new StatsCalculator(teamAtBats); // Use team-specific atBats
  //       const G = teamGames.length;
  //       // const AB = stats.getAB();
  //       const R = stats.getR();
  //       const H = stats.getH();
  //       const RBI = stats.getRBI();
  //       const BB = stats.getBB();
  //       const K = stats.getK();
  //       const AVG = stats.getAVG();
  //       const OBP = stats.getOBP();
  //       const SLG = stats.getSLG();
  //       const OPS = stats.getOPS();

  //       return {
  //         team,
  //         // AB,
  //         G,
  //         R,
  //         H,
  //         RBI,
  //         BB,
  //         K,
  //         AVG,
  //         OBP,
  //         SLG,
  //         OPS,
  //       };
  //     });
  //     console.log("====================================");
  //     console.log("teamStats: ", teamStats);
  //     console.log("====================================");
  //     setStats2022(teamStats);
  //   }
  // }, []);

  return (
    <View className="flex-1 justify-start items-center py-8 px-2">
      <View className="justify-start w-full">
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
            <Text className="font-extrabold">Team</Text>
          </View>
          <View className="w-12 h-8 justify-center items-center border-r-2">
            <Text className="font-extrabold">G</Text>
          </View>
          <View className="w-12 h-8 justify-center items-center border-r-2">
            <Text className="font-extrabold">AB</Text>
          </View>
          <View className="w-12 h-8 justify-center items-center border-r-2">
            <Text className="font-extrabold">R</Text>
          </View>
          <View className="w-12 h-8 justify-center items-center border-r-2">
            <Text className="font-extrabold">H</Text>
          </View>
          <View className="w-12 h-8 justify-center items-center border-r-2">
            <Text className="font-extrabold">RBI</Text>
          </View>
          <View className="w-12 h-8 justify-center items-center border-r-2">
            <Text className="font-extrabold">BB</Text>
          </View>
          <View className="w-12 h-8 justify-center items-center border-r-2">
            <Text className="font-extrabold">SO</Text>
          </View>
          <View className="w-12 h-8 justify-center items-center border-r-2">
            <Text className="font-extrabold">AVG</Text>
          </View>
          <View className="w-12 h-8 justify-center items-center border-r-2">
            <Text className="font-extrabold">OBP</Text>
          </View>
          <View className="w-12 h-8 justify-center items-center border-r-2">
            <Text className="font-extrabold">SLG</Text>
          </View>
          <View className="w-12 h-8 justify-center items-center">
            <Text className="font-extrabold">OPS</Text>
          </View>
        </View>
        {/* {teams2022.map((team) => {
          return (
            <View className="flex-row justify-start border-l-2">
              <View className="w-20 h-8 justify-center items-center border-r-2 border-b-2">
                <Text className="">{team}</Text>
              </View>
              <View className="w-12 h-8 justify-center items-center border-r-2">
                <Text className="">R</Text>
              </View>
              <View className="w-12 h-8 justify-center items-center border-r-2">
                <Text className="">AB</Text>
              </View>
            </View>
          );
        })} */}
        {/* {stats2022 &&
          stats2022.map((team) => {
            console.log("====================================");
            console.log("team.AB: ", team);
            console.log("====================================");
            return (
              <View className="flex-row justify-start border-l-2">
                <View className="w-20 h-8 justify-center items-center border-r-2 border-b-2">
                  <Text className="">{team.team}</Text>
                </View>
                <View className="w-12 h-8 justify-center items-center border-r-2">
                  <Text className="">{team.R}</Text>
                </View>
                <View className="w-12 h-8 justify-center items-center border-r-2">
                  <Text className="">{team.AB}</Text>
                </View>
              </View>
            );
          })} */}

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
        {/* </View> */}
      </ScrollView>
    </View>
  );
};

export default Stats;
