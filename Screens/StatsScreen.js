import React, { useContext, useEffect, useState } from "react";
import { TouchableOpacity, ScrollView } from "react-native";
import { View, Text } from "react-native";
import { UserContext } from "../services/UserContext";
import { StatsCalculator } from "../services/StatsCalculator";

const Stats = () => {
  const teams2021 = [
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
    "Pirates",
    "Red Sox",
    "Reds",
    "Rockies",
    "Royals",
    "White Sox",
  ];

  const { userGames } = useContext(UserContext);
  const [stats2022, setStats2022] = useState(null);
  const [all2022, setAll2022] = useState(null);

  useEffect(() => {
    if (userGames) {
      const atBats = userGames.reduce((cumulatedAtBats, game) => {
        const gameAtBats = game.atBats || []; // handle empty atBats array if necessary
        return cumulatedAtBats.concat(gameAtBats);
      }, []);

      const all = new StatsCalculator(atBats);

      const teamStats = teams2022.map((team) => {
        const teamGames = userGames.filter(
          (game) =>
            game.date.getFullYear() === 2022 &&
            game.atBats &&
            game.atBats.length > 0 &&
            ((game.awayTeam === team && game.homeTeam === "Monarchs") ||
              (game.homeTeam === team && game.awayTeam === "Monarchs"))
        );

        const teamAtBats = teamGames.reduce((cumulatedAtBats, game) => {
          const atBats = game.atBats || [];
          return cumulatedAtBats.concat(atBats);
        }, []);

        const stats = new StatsCalculator(teamAtBats); // Use team-specific atBats
        const G = teamGames.length;
        const AB = stats.getAB();
        const R = stats.getR();
        const H = stats.getH();
        const RBI = stats.getRBI();
        const BB = stats.getBB();
        const K = stats.getK();
        const AVG = stats.getAVG();
        const OBP = stats.getOBP();
        const SLG = stats.getSLG();
        const OPS = stats.getOPS();

        return {
          team,
          AB,
          G,
          R,
          H,
          RBI,
          BB,
          K,
          AVG,
          OBP,
          SLG,
          OPS,
        };
      });

      setAll2022({
        G: teamStats.reduce((cumulatedG, team) => cumulatedG + team.G, 0),
        AB: all.getAB(),
        R: all.getR(),
        H: all.getH(),
        RBI: all.getRBI(),
        BB: all.getBB(),
        K: all.getK(),
        AVG: all.getAVG(),
        OBP: all.getOBP(),
        SLG: all.getSLG(),
        OPS: all.getOPS(),
      });

      setStats2022(teamStats);
    }
  }, []);

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
          <View className="w-20 h-6 justify-center items-center border-r-2">
            <Text className="font-extrabold">Team</Text>
          </View>
          <View className="w-12 h-6 justify-center items-center border-r-2">
            <Text className="font-extrabold">G</Text>
          </View>
          <View className="w-12 h-6 justify-center items-center border-r-2">
            <Text className="font-extrabold">AB</Text>
          </View>
          <View className="w-12 h-6 justify-center items-center border-r-2">
            <Text className="font-extrabold">R</Text>
          </View>
          <View className="w-12 h-6 justify-center items-center border-r-2">
            <Text className="font-extrabold">H</Text>
          </View>
          <View className="w-12 h-6 justify-center items-center border-r-2">
            <Text className="font-extrabold">RBI</Text>
          </View>
          <View className="w-12 h-6 justify-center items-center border-r-2">
            <Text className="font-extrabold">BB</Text>
          </View>
          <View className="w-12 h-6 justify-center items-center border-r-2">
            <Text className="font-extrabold">SO</Text>
          </View>
          <View className="w-12 h-6 justify-center items-center border-r-2">
            <Text className="font-extrabold">AVG</Text>
          </View>
          <View className="w-12 h-6 justify-center items-center border-r-2">
            <Text className="font-extrabold">OBP</Text>
          </View>
          <View className="w-12 h-6 justify-center items-center border-r-2">
            <Text className="font-extrabold">SLG</Text>
          </View>
          <View className="w-12 h-6 justify-center items-center">
            <Text className="font-extrabold">OPS</Text>
          </View>
        </View>
        {stats2022 &&
          stats2022.map((team, index) => {
            return (
              <View className="flex-row justify-start border-l-2" key={index}>
                <View className="w-20 h-8 justify-center items-center border-r-2 border-b-2">
                  <Text className="">{team.team}</Text>
                </View>
                <View className="w-12 h-8 justify-center items-center border-r-2">
                  <Text className="">{team.G}</Text>
                </View>
                <View className="w-12 h-8 justify-center items-center border-r-2">
                  <Text className="">{team.AB}</Text>
                </View>
                <View className="w-12 h-8 justify-center items-center border-r-2">
                  <Text className="">{team.R}</Text>
                </View>
                <View className="w-12 h-8 justify-center items-center border-r-2">
                  <Text className="">{team.H}</Text>
                </View>
                <View className="w-12 h-8 justify-center items-center border-r-2">
                  <Text className="">{team.RBI}</Text>
                </View>
                <View className="w-12 h-8 justify-center items-center border-r-2">
                  <Text className="">{team.BB}</Text>
                </View>
                <View className="w-12 h-8 justify-center items-center border-r-2">
                  <Text className="">{team.K}</Text>
                </View>
                <View className="w-12 h-8 justify-center items-center border-r-2">
                  <Text className="">{team.AVG.toFixed(3).substring(1)}</Text>
                </View>
                <View className="w-12 h-8 justify-center items-center border-r-2">
                  <Text className="">{team.OBP.toFixed(3).substring(1)}</Text>
                </View>
                <View className="w-12 h-8 justify-center items-center border-r-2">
                  <Text className="">{team.SLG.toFixed(3)}</Text>
                </View>
                <View className="w-12 h-8 justify-center items-center border-r-2">
                  <Text className="">{team.OPS.toFixed(3)}</Text>
                </View>
              </View>
            );
          })}
        {all2022 && (
          <View className="flex-row justify-start border-l-2 border-y-2">
            <View className="w-20 h-8 justify-center items-center border-r-2">
              <Text className="font-bold">Total</Text>
            </View>
            <View className="w-12 h-8 justify-center items-center border-r-2 ">
              <Text className="font-bold">{all2022.G}</Text>
            </View>
            <View className="w-12 h-8 justify-center items-center border-r-2">
              <Text className="font-bold">{all2022.AB}</Text>
            </View>
            <View className="w-12 h-8 justify-center items-center border-r-2">
              <Text className="font-bold">{all2022.R}</Text>
            </View>
            <View className="w-12 h-8 justify-center items-center border-r-2">
              <Text className="font-bold">{all2022.H}</Text>
            </View>
            <View className="w-12 h-8 justify-center items-center border-r-2">
              <Text className="font-bold">{all2022.RBI}</Text>
            </View>
            <View className="w-12 h-8 justify-center items-center border-r-2">
              <Text className="font-bold">{all2022.BB}</Text>
            </View>
            <View className="w-12 h-8 justify-center items-center border-r-2">
              <Text className="font-bold">{all2022.K}</Text>
            </View>
            <View className="w-12 h-8 justify-center items-center border-r-2">
              <Text className="font-bold">
                {all2022.AVG.toFixed(3).substring(1)}
              </Text>
            </View>
            <View className="w-12 h-8 justify-center items-center border-r-2">
              <Text className="font-bold">
                {all2022.OBP.toFixed(3).substring(1)}
              </Text>
            </View>
            <View className="w-12 h-8 justify-center items-center border-r-2">
              <Text className="font-bold">{all2022.SLG.toFixed(3)}</Text>
            </View>
            <View className="w-12 h-8 justify-center items-center border-r-2">
              <Text className="font-bold">{all2022.OPS.toFixed(3)}</Text>
            </View>
          </View>
        )}
      </ScrollView>
    </View>
  );
};

export default Stats;
