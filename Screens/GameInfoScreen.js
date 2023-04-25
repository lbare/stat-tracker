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

const GameInfoScreen = ({ navigation }) => {
  const { currentGame, setCurrentGame, userGames, setUserGames } =
    useContext(UserContext);

  const [loading, setLoading] = useState(true);
  const [atBats, setAtBats] = useState(null);
  const [pitching, setPitching] = useState(null);
  const [isMonarchs, setIsMonarchs] = useState(false);
  const [homeScore, setHomeScore] = useState("");
  const [awayScore, setAwayScore] = useState("");

  useEffect(() => {
    setHomeScore(
      currentGame.homeScore !== null ? currentGame.homeScore.toString() : ""
    );
    setAwayScore(
      currentGame.awayScore !== null ? currentGame.awayScore.toString() : ""
    );
    setIsMonarchs(
      currentGame.homeTeam === "Monarchs" || currentGame.awayTeam === "Monarchs"
    );

    if (
      currentGame.homeTeam === "Monarchs" ||
      currentGame.awayTeam === "Monarchs"
    ) {
      setLoading(true);

      if (currentGame.pitching !== null) setPitching(currentGame.pitching);

      if (currentGame.atBats !== null && currentGame.atBats.length > 0) {
        setAtBats([
          {
            title: "At Bats",
            data: currentGame.map((item) => ({
              numAtBat: item.numAtBat + 1,
              count: item.count,
              RBI: item.RBI,
              result: item.result,
              runsScored: item.runsScored,
              hardHit: item.hardHit !== null ? item.hardHit : null,
              trajectory: item.trajectory !== null ? item.trajectory : null,
              hitLocation: item.hitLocation !== null ? item.hitLocation : null,
            })),
          },
        ]);
      }
    }
    setLoading(false);
  }, [currentGame]);

  useEffect(() => {
    return () => {
      clearFields();
    };
  }, []);

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
    setAtBats([]);
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
    return atBats && atBats.length > 0 ? (
      <SectionList
        className="w-full"
        sections={atBats}
        style={{ flexGrow: 0 }}
        renderItem={({ item }) => (
          <View className="flex-row justify-between px-2">
            <Text className="text-sm">{item.numAtBat}</Text>
            <Text className="text-sm">{item.result}</Text>
            <Text className="text-sm">{item.hardHit ? "T" : "F"}</Text>
            <Text className="text-sm">{item.pitches}</Text>
            <Text className="text-sm">{item.runsScored ? "T" : "F"}</Text>
            <Text className="text-sm">{item.RBI}</Text>
            <Text className="text-sm">{item.trajectory ? "T" : "F"}</Text>
          </View>
        )}
        renderSectionHeader={({ section: { title } }) => (
          <View className="flex-1 justify-evenly items-center border-b border-gray-500 px-2">
            <View className="flex-row justify-evenly items-start w-full">
              <Text className="text-2xl font-bold w-full">{title}</Text>
            </View>
            <View className="flex-row justify-between items-center w-full">
              <Text className="text-sm font-bold">#</Text>
              <Text className="text-sm font-bold">Result</Text>
              <Text className="text-sm font-bold">Hard Hit</Text>
              <Text className="text-sm font-bold">Pitches</Text>
              <Text className="text-sm font-bold">Run</Text>
              <Text className="text-sm font-bold">RBI</Text>
              <Text className="text-sm font-bold">Trajectory</Text>
            </View>
          </View>
        )}
        renderSectionFooter={() => (
          <TouchableOpacity
            className="flex-row justify-center items-center self-center border-2 rounded-xl w-1/3 py-2"
            onPress={() => navigation.navigate("Log AB")}
          >
            <Text className="text-2xl font-bold w-full text-center">+</Text>
          </TouchableOpacity>
        )}
      />
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
    return pitching ? (
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
          <Text className="text-sm">{pitching.inningsPitched}</Text>
          <Text className="text-sm">{pitching && pitching.earnedRuns}</Text>
          <Text className="text-sm">{pitching && pitching.runs}</Text>
          <Text className="text-sm">{pitching && pitching.hits}</Text>
          <Text className="text-sm">{pitching && pitching.strikeouts}</Text>
          <Text className="text-sm">{pitching && pitching.walks}</Text>
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
