import {
  View,
  Text,
  SectionList,
  ActivityIndicator,
  TouchableOpacity,
  TextInput,
  TouchableWithoutFeedback,
  KeyboardAvoidingView,
  ScrollView,
  Keyboard,
} from "react-native";
import React from "react";
import { useContext, useState, useEffect, useCallback } from "react";
import { UserContext } from "../services/UserContext";
import { updateGameScore, addNotes } from "../services/firebase";
import { useFocusEffect } from "@react-navigation/native";
import { StatsCalculator } from "../services/StatsCalculator";
import { Check } from "phosphor-react-native";

const GameInfoScreen = ({ navigation }) => {
  const { currentGame, setCurrentGame, userGames, setUserGames } =
    useContext(UserContext);

  const [loading, setLoading] = useState(true);
  const [isMonarchs, setIsMonarchs] = useState(false);
  const [homeScore, setHomeScore] = useState("");
  const [awayScore, setAwayScore] = useState("");
  const [notes, setNotes] = useState("");
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
    setNotes(currentGame.notes || "");
    setStats(
      new StatsCalculator(currentGame.atBats || [], [
        currentGame.pitching || [],
      ])
    );

    setLoading(false);
  }, [currentGame]);

  const handleNotesUpdate = async () => {
    if (notes !== "") {
      try {
        await addNotes(currentGame.id, notes);

        setUserGames(
          userGames.map((game) => {
            if (game.id === currentGame.id) {
              return {
                ...game,
                notes: currentGame.notes,
              };
            } else {
              return game;
            }
          })
        );

        setCurrentGame({ ...currentGame, notes: notes });
        Keyboard.dismiss();
      } catch (error) {
        console.log(error);
      }
    }
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
        Keyboard.dismiss();
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
      <View className="justify-start items-center mt-10 border">
        <Text className="text-2xl font-bold pb-4">No At Bats</Text>
        <TouchableOpacity
          className="flex-row justify-center items-center self-center border-2 rounded-full w-1/3 py-2"
          onPress={() => navigation.navigate("Log AB")}
        >
          <Text className="text-4xl w-full text-center">+</Text>
        </TouchableOpacity>
      </View>
    );
  }

  function PitchingStack() {
    return currentGame.pitching ? (
      <View className="flex-1 justify-start items-center px-2">
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
      <View className="justify-start items-center border">
        <Text className="text-2xl font-bold pb-4">No Pitching</Text>
        <TouchableOpacity
          className="flex-row justify-center items-center self-center border-2 rounded-full w-1/3 py-2"
          onPress={() => navigation.navigate("Log Pitching")}
        >
          <Text className="text-4xl w-full text-center">+</Text>
        </TouchableOpacity>
      </View>
    );
  }

  function FieldingStack() {
    return currentGame.fielding ? (
      <View className="flex-1 justify-start items-start px-2">
        <View className="flex-row justify-evenly items-start w-full">
          <Text className="text-2xl font-bold w-full">Fielding</Text>
        </View>
        <View className="flex-row w-1/3 border-b justify-between px-5">
          <Text className="text-sm font-bold pr-5">POS</Text>
          <Text className="text-sm font-bold">INN</Text>
        </View>
        <View className="flex-row w-full justify-between items-between">
          <View className="flex-col w-1/3">
            {currentGame.fielding &&
              Object.entries(currentGame.fielding).map(([position, value]) =>
                position === "putouts" ||
                position === "assists" ||
                position === "errors" ? (
                  <React.Fragment key={position}></React.Fragment>
                ) : (
                  <View
                    className="flex-row w-full justify-between px-5"
                    key={position}
                  >
                    <Text className="text-sm">{position}</Text>
                    <Text className="text-sm">{value}</Text>
                  </View>
                )
              )}
          </View>
          <View className="flex-row w-1/3 justify-center items-center self-center bottom-4">
            <View className="flex-col w-1/2 justify-between">
              <Text className="text-sm font-bold pr-5">PO:</Text>
              <Text className="text-sm font-bold">A:</Text>
              <Text className="text-sm font-bold">E:</Text>
            </View>
            <View className="flex-col w-full justify-between px-5">
              <Text className="text-sm font-bold pr-5">
                {currentGame.fielding.putouts}
              </Text>
              <Text className="text-sm font-bold">
                {currentGame.fielding.assists}
              </Text>
              <Text className="text-sm font-bold">
                {currentGame.fielding.errors}
              </Text>
            </View>
          </View>
        </View>
        <View className="flex-row justify-evenly items-center w-full">
          <TouchableOpacity
            className="border-2 rounded-xl w-1/3 py-2"
            onPress={() => navigation.navigate("Log Fielding")}
          >
            <Text className="text-lg font-bold w-full text-center">+</Text>
          </TouchableOpacity>
        </View>
      </View>
    ) : (
      <View className="justify-start items-center border">
        <Text className="text-2xl font-bold pb-4">No Fielding</Text>
        <TouchableOpacity
          className="flex-row justify-center items-center self-center border-2 rounded-full w-1/3 py-2"
          onPress={() => navigation.navigate("Log Fielding")}
        >
          <Text className="text-4xl w-full text-center">+</Text>
        </TouchableOpacity>
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
    <ScrollView keyboardShouldPersistTaps="handled">
      <View className="flex-1 justify-start items-center">
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
        <View className="flex-row justify-center items-center w-full">
          <View className="flex-col justify-center items-center w-1/3">
            <Text className="text-2xl font-bold">{currentGame.homeTeam}</Text>
            <TextInput
              className="flex-row text-3xl self-center justify-center items-center w-1/2 border-2 rounded-xl px-2 text-center font-bold h-10"
              value={homeScore}
              onChangeText={(text) => setHomeScore(text)}
              placeholder="-"
              inputMode="numeric"
            />
          </View>
          <View className="flex-col justify-center items-center w-1/3">
            <Text className="text-2xl font-bold">{currentGame.awayTeam}</Text>
            <TextInput
              className="flex-row text-3xl self-center justify-center items-center w-1/2 border-2 rounded-xl px-2 text-center font-bold h-10"
              value={awayScore}
              onChangeText={(text) => setAwayScore(text)}
              placeholder="-"
              inputMode="numeric"
            />
          </View>
          <TouchableOpacity
            className="flex-row justify-center items-center self-end border-2 rounded-xl w-10 py-1"
            onPress={handleScoreUpdate}
          >
            <Check size={24} color="#000" weight="bold" />
          </TouchableOpacity>
        </View>
        {!isMonarchs ? (
          <></>
        ) : (
          <View className="w-full justify-evenly h-5/6 pb-48">
            <AtBatStack />
            <PitchingStack />
            <FieldingStack />
            <View className="flex-col justify-evenly items-start w-full px-2">
              <Text className="text-2xl font-bold w-full">Notes</Text>
              <View className="w-full flex-row justify-between items-center self-center pl-16">
                <TextInput
                  className="flex-row text-lg self-center w-3/4 border-2 rounded-xl px-2 text-left h-24"
                  value={notes}
                  onChangeText={(text) => setNotes(text)}
                  multiline={true}
                  onSubmitEditing={() => Keyboard.dismiss()}
                  returnKeyType="done"
                />
                <TouchableOpacity
                  className="flex-row justify-center items-center self-center border-2 rounded-xl w-10 py-1"
                  onPress={handleNotesUpdate}
                >
                  <Check size={24} color="#000" weight="bold" />
                </TouchableOpacity>
              </View>
            </View>
          </View>
        )}
      </View>
    </ScrollView>
  );
};

export default GameInfoScreen;
