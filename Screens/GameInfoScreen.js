import {
  View,
  Text,
  SectionList,
  ActivityIndicator,
  TouchableOpacity,
  TextInput,
  TouchableWithoutFeedback,
  Keyboard,
} from "react-native";
import { useContext, useState, useEffect, useCallback } from "react";
import { UserContext } from "../services/UserContext";
import { updateGameScore } from "../services/firebase";
import { useFocusEffect } from "@react-navigation/native";
import { StatsCalculator } from "../services/StatsCalculator";

const GameInfoScreen = ({ navigation }) => {
  const { currentGame, setCurrentGame, userGames, setUserGames } =
    useContext(UserContext);

  const [loading, setLoading] = useState(true);
  const [isMonarchs, setIsMonarchs] = useState(false);
  const [homeScore, setHomeScore] = useState("");
  const [awayScore, setAwayScore] = useState("");
  const [stats, setStats] = useState(new StatsCalculator());

  useEffect(() => {
    setLoading(true);

    setIsMonarchs(
      currentGame.homeTeam === "Monarchs" || currentGame.awayTeam === "Monarchs"
    );
    setHomeScore(
      currentGame.homeScore !== null ? currentGame.homeScore.toString() : ""
    );
    setAwayScore(
      currentGame.awayScore !== null ? currentGame.awayScore.toString() : ""
    );
    setStats(
      new StatsCalculator(currentGame.atBats || [], [
        currentGame.pitching || [],
      ])
    );

    setLoading(false);
  }, [currentGame]);

  useFocusEffect(
    useCallback(() => {
      // Do something when the screen is focused

      return () => {
        clearFields();
      };
    }, [])
  );

  const clearFields = () => {
    setHomeScore("");
    setAwayScore("");
  };

  const handleScoreUpdate = async () => {
    if (homeScore !== "" && awayScore !== "") {
      const homeScoreInt = parseInt(homeScore);
      const awayScoreInt = parseInt(awayScore);
      const winner =
        homeScoreInt > awayScoreInt
          ? currentGame.homeTeam
          : homeScoreInt < awayScoreInt
          ? currentGame.awayTeam
          : "Tie";
      if (homeScoreInt >= 0 && awayScoreInt >= 0) {
        await updateGameScore(
          currentGame.id,
          homeScoreInt,
          awayScoreInt,
          winner
        );
        setUserGames(
          userGames.map((game) => {
            if (game.id === currentGame.id) {
              return {
                ...game,
                homeScore: homeScoreInt,
                awayScore: awayScoreInt,
              };
            } else {
              return game;
            }
          })
        );
      }
    }
  };

  function AtBatStack() {
    return currentGame.atBats && currentGame.atBats.length > 0 ? (
      <View className="flex-1 justify-start items-center px-2">
        <View className="flex-row justify-evenly items-start w-full">
          <Text className="text-2xl font-bold w-full">At Bats</Text>
        </View>
        <View className="flex-row justify-between items-center w-full border-b">
          <Text className="text-sm font-bold">#</Text>
          <Text className="text-sm font-bold">Result</Text>
          <Text className="text-sm font-bold">Hard Hit</Text>
          <Text className="text-sm font-bold">Pitches</Text>
          <Text className="text-sm font-bold">Run</Text>
          <Text className="text-sm font-bold">RBI</Text>
          <Text className="text-sm font-bold">Trajectory</Text>
        </View>
        <View className="justify-evenly items-center w-full">
          {currentGame.atBats.map((atBat, index) => (
            <View
              key={index}
              className="flex-row justify-between items-center w-full"
            >
              <Text className="text-sm">{index + 1}</Text>
              <Text className="text-sm">{atBat.result}</Text>
              <Text className="text-sm">{atBat.hardHit ? "T" : "F"}</Text>
              <Text className="text-sm">{atBat.pitches}</Text>
              <Text className="text-sm">{atBat.runsScored ? "T" : "F"}</Text>
              <Text className="text-sm">{atBat.RBI}</Text>
              <Text className="text-sm">{atBat.trajectory ? "T" : "F"}</Text>
            </View>
          ))}
          <View className="flex-row justify-between items-center w-full border-t">
            <View className="flex-col justify-between items-center">
              <Text className="text-sm font-bold">AB</Text>
              <Text className="text-sm font-bold">
                {currentGame.atBats.length}
              </Text>
            </View>
            <View className="flex-col justify-between items-center">
              <Text className="text-sm font-bold">R</Text>
              <Text className="text-sm font-bold">
                {stats ? stats.getR() : 0}
              </Text>
            </View>
            <View className="flex-col justify-between items-center">
              <Text className="text-sm font-bold">H</Text>
              <Text className="text-sm font-bold">
                {stats ? stats.getH() : 0}
              </Text>
            </View>
            <View className="flex-col justify-between items-center">
              <Text className="text-sm font-bold">2B</Text>
              <Text className="text-sm font-bold">
                {stats ? stats.get2B() : 0}
              </Text>
            </View>
            <View className="flex-col justify-between items-center">
              <Text className="text-sm font-bold">3B</Text>
              <Text className="text-sm font-bold">
                {stats ? stats.get3B() : 0}
              </Text>
            </View>
            <View className="flex-col justify-between items-center">
              <Text className="text-sm font-bold">HR</Text>
              <Text className="text-sm font-bold">
                {stats ? stats.getHR() : 0}
              </Text>
            </View>
            <View className="flex-col justify-between items-center">
              <Text className="text-sm font-bold">AVG</Text>
              <Text className="text-sm font-bold">
                {stats ? stats.getAVG().toFixed(3).substring(1) : 0}
              </Text>
            </View>
            <View className="flex-col justify-between items-center">
              <Text className="text-sm font-bold">OBP</Text>
              <Text className="text-sm font-bold">
                {stats ? stats.getOBP().toFixed(3).substring(1) : 0}
              </Text>
            </View>
            <View className="flex-col justify-between items-center">
              <Text className="text-sm font-bold">OPS</Text>
              <Text className="text-sm font-bold">
                {stats ? stats.getOPS().toFixed(3) : 0}
              </Text>
            </View>
          </View>
        </View>
        <TouchableOpacity
          className="flex-row justify-center items-center self-center border-2 rounded-xl w-1/3 py-2"
          onPress={() => navigation.navigate("Log AB")}
        >
          <Text className="text-2xl font-bold w-full text-center">+</Text>
        </TouchableOpacity>
      </View>
    ) : (
      <View className="flex-1 justify-center items-center">
        <Text className="text-2xl font-bold">No At Bats Logged</Text>
        <TouchableOpacity
          className="flex-row justify-center items-center self-center border-2 rounded-xl w-1/3 py-2"
          onPress={() => navigation.navigate("Log AB")}
        >
          <Text className="text-2xl font-bold w-full text-center">+</Text>
        </TouchableOpacity>
      </View>
    );
  }

  function PitchingStack() {
    return currentGame.pitching ? (
      <View className="flex-1 justify-start items-center border-b border-gray-500 px-2">
        <View className="flex-row justify-evenly items-start w-full">
          <Text className="text-2xl font-bold w-full">Pitching</Text>
        </View>
        <View className="flex-row justify-between items-center w-full border-b">
          <Text className="text-sm font-bold">IP</Text>
          <Text className="text-sm font-bold">ER</Text>
          <Text className="text-sm font-bold">R</Text>
          <Text className="text-sm font-bold">H</Text>
          <Text className="text-sm font-bold">K</Text>
          <Text className="text-sm font-bold">BB</Text>
        </View>
        <View className="flex-row justify-between items-center w-full">
          <Text className="text-sm">{currentGame.pitching.inningsPitched}</Text>
          <Text className="text-sm">
            {currentGame.pitching && currentGame.pitching.earnedRuns}
          </Text>
          <Text className="text-sm">
            {currentGame.pitching && currentGame.pitching.runs}
          </Text>
          <Text className="text-sm">
            {currentGame.pitching && currentGame.pitching.hits}
          </Text>
          <Text className="text-sm">
            {currentGame.pitching && currentGame.pitching.strikeouts}
          </Text>
          <Text className="text-sm">
            {currentGame.pitching && currentGame.pitching.walks}
          </Text>
        </View>
        <View className="flex-row justify-evenly items-center w-full">
          <TouchableOpacity
            className="border-2 rounded-xl w-1/3 py-2"
            onPress={() => navigation.navigate("Log Pitching")}
          >
            <Text className="text-lg font-bold w-full text-center">+</Text>
          </TouchableOpacity>
        </View>
      </View>
    ) : (
      <View className="flex-1 justify-center items-center">
        <View className="flex-row justify-center items-center w-full">
          <Text className="text-2xl font-bold">No Pitching</Text>
        </View>
        <View className="flex-row justify-evenly items-center w-full">
          <TouchableOpacity
            className="border-2 rounded-xl w-1/3 py-2"
            onPress={() => navigation.navigate("Log Pitching")}
          >
            <Text className="text-lg font-bold w-full text-center">+</Text>
          </TouchableOpacity>
        </View>
      </View>
    );
  }

  if (loading) {
    return (
      <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
        <ActivityIndicator size="large" color="red" />
      </View>
    );
  }

  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss} accessible={false}>
      <View className="flex-1">
        <Text className="font-extrabold text-4xl pt-10">
          {currentGame.awayTeam} vs. {currentGame.homeTeam}
        </Text>
        <Text className="font-extrabold text-2xl pb-6">
          {currentGame.date.toLocaleString("en-US", {
            month: "numeric",
            day: "2-digit",
            hour: "numeric",
            minute: "numeric",
          })}
        </Text>
        <View className="flex-row justify-evenly items-center w-full">
          <Text className="text-2xl font-bold">{currentGame.homeTeam}</Text>
          <Text className="text-2xl font-bold">{currentGame.awayTeam}</Text>
        </View>

        <View className="flex-row justify-evenly items-center w-full">
          <TextInput
            className="flex-row justify-center items-center w-1/3 border-2 rounded-xl p-2 text-center font-bold"
            value={homeScore}
            onChangeText={(text) => setHomeScore(text)}
            placeholder="-"
            inputMode="numeric"
          />
          <TextInput
            className="flex-row justify-center items-center w-1/3 border-2 rounded-xl p-2 text-center font-bold"
            value={awayScore}
            onChangeText={(text) => setAwayScore(text)}
            placeholder="-"
            inputMode="numeric"
          />
        </View>
        <View className="flex-row justify-evenly items-center w-full pt-4">
          <TouchableOpacity
            className="flex-row justify-center items-center self-center border-2 rounded-xl w-1/3 py-2"
            onPress={handleScoreUpdate}
          >
            <Text className="text-2xl font-bold w-full text-center">
              Save Score
            </Text>
          </TouchableOpacity>
        </View>
        {!isMonarchs ? (
          <></>
        ) : (
          <>
            <AtBatStack />
            <PitchingStack />
          </>
        )}
      </View>
    </TouchableWithoutFeedback>
  );
};

export default GameInfoScreen;
