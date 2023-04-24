import {
  View,
  Text,
  ScrollView,
  SectionList,
  ActivityIndicator,
  TouchableOpacity,
  TextInput,
} from "react-native";
import { useContext, useState, useEffect } from "react";
import { UserContext } from "../services/UserContext";
import { updateGameScore } from "../services/firebase";

const GameInfoScreen = ({ navigation }) => {
  const { currentGame, userGames, setUserGames } = useContext(UserContext);

  const [loading, setLoading] = useState(true);
  const [newData, setNewData] = useState(null);
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
      (currentGame.homeTeam === "Monarchs" ||
        currentGame.awayTeam === "Monarchs") &&
      currentGame.atBats !== null &&
      currentGame.atBats.length > 0
    ) {
      setLoading(true);

      const sortedAtBats = currentGame.atBats
        .slice()
        .sort((a, b) => a.numAtBat - b.numAtBat);

      setNewData([
        {
          title: "At Bats",
          data: sortedAtBats.map((item) => ({
            numAtBat: item.numAtBat + 1,
            count: item.count,
            RBI: item.RBI,
            result: item.result,
            hardHit: item.hardHit,
            runsScored: item.runsScored,
            trajectory: item.trajectory !== null ? item.trajectory : null,
            hitLocation: item.hitLocation !== null ? item.hitLocation : null,
          })),
        },
      ]);
      setLoading(false);
    } else {
      setLoading(false);
    }
  }, [currentGame]);

  useEffect(() => {
    return () => {
      clearFields();
    };
  }, []);

  const clearFields = () => {
    setHomeScore("");
    setAwayScore("");
  };

  const handleScoreUpdate = async () => {
    if (homeScore !== "" && awayScore !== "") {
      const homeScoreInt = parseInt(homeScore);
      const awayScoreInt = parseInt(awayScore);
      if (homeScoreInt >= 0 && awayScoreInt >= 0) {
        await updateGameScore(currentGame.id, homeScoreInt, awayScoreInt);
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

  if (loading) {
    return (
      <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
        <ActivityIndicator size="large" color="red" />
      </View>
    );
  }

  return (
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
      ) : newData !== null ? (
        <SectionList
          className="w-full"
          sections={newData}
          renderItem={({ item }) => (
            <View className="flex-row justify-between px-2">
              <Text className="text-sm">{item.numAtBat}</Text>
              <Text className="text-sm">{item.result}</Text>
              <Text className="text-sm">{item.hardHit ? "T" : "F"}</Text>
              <Text className="text-sm">
                {item.count.strikes}-{item.count.balls}
              </Text>
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
                <Text className="text-sm font-bold">Count</Text>
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
      )}
    </View>
  );
};

export default GameInfoScreen;
