import React, { useContext, useEffect, useState } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  TextInput,
  TouchableWithoutFeedback,
  Keyboard,
} from "react-native";
import { UserContext } from "../services/UserContext";
import { addPitchingGame, addPitchingInning } from "../services/firebase";

const LogPitchingScreen = ({ navigation }) => {
  const { currentGame, setCurrentGame, userGames, setUserGames } =
    useContext(UserContext);

  const [innings, setInnings] = useState("");
  const [earnedRuns, setEarnedRuns] = useState("");
  const [runs, setRuns] = useState("");
  const [hits, setHits] = useState("");
  const [walks, setWalks] = useState("");
  const [strikeouts, setStrikeouts] = useState("");
  const [pitchToggle, setPitchToggle] = useState(false);

  useEffect(() => {
    pitchToggle ? setInnings("") : setInnings("1");
  }, [pitchToggle]);

  const clearFields = () => {
    setInnings("");
    setEarnedRuns("");
    setRuns("");
    setHits("");
    setWalks("");
    setStrikeouts("");
  };

  const handleSubmit = async () => {
    const newGame = {
      inningsPitched: parseInt(innings),
      earnedRuns: parseInt(earnedRuns),
      runs: parseInt(runs),
      hits: parseInt(hits),
      walks: parseInt(walks),
      strikeouts: parseInt(strikeouts),
    };

    const addPitching = pitchToggle ? addPitchingGame : addPitchingInning;

    try {
      await addPitching(currentGame.id, newGame);
      console.log("Pitching added successfully");

      const newPitching = pitchToggle
        ? newGame
        : {
            inningsPitched:
              parseInt(innings) + parseInt(currentGame.pitching.inningsPitched),
            earnedRuns:
              parseInt(earnedRuns) + parseInt(currentGame.pitching.earnedRuns),
            runs: parseInt(runs) + parseInt(currentGame.pitching.runs),
            hits: parseInt(hits) + parseInt(currentGame.pitching.hits),
            walks: parseInt(walks) + parseInt(currentGame.pitching.walks),
            strikeouts:
              parseInt(strikeouts) + parseInt(currentGame.pitching.strikeouts),
          };

      setUserGames(
        userGames.map((game) =>
          game.id === currentGame.id
            ? { ...game, pitching: { ...newPitching } }
            : game
        )
      );

      setCurrentGame({ ...currentGame, pitching: { ...newPitching } });
    } catch (error) {
      console.log("Error adding pitching", error);
      throw error;
    }

    clearFields();
    navigation.navigate("Game Info");
  };

  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss} accessible={false}>
      <View className="flex-1 justify-center items-center">
        <View className="flex-row justify-evenly items-center w-3/4 h-20 px-10">
          <View className="items-center justify-center w-full">
            <Text className="text-2xl font-bold">IP:</Text>
            <TextInput
              placeholder={innings || "-"}
              onChangeText={(text) => setInnings(text)}
              value={innings}
              editable={pitchToggle}
              keyboardType="numeric"
              className="items-center w-1/3 border-2 rounded-xl p-2 text-center font-bold"
            />
          </View>
          <View className="items-center justify-center w-full">
            <Text className="text-2xl font-bold">ER:</Text>
            <TextInput
              placeholder="-"
              onChangeText={(text) => setEarnedRuns(text)}
              value={earnedRuns}
              keyboardType="numeric"
              className="items-center w-1/3 border-2 rounded-xl p-2 text-center font-bold"
            />
          </View>
          <View className="items-center justify-center w-full">
            <Text className="text-2xl font-bold">R:</Text>
            <TextInput
              placeholder="-"
              onChangeText={(text) => setRuns(text)}
              value={runs}
              keyboardType="numeric"
              className="items-center w-1/3 border-2 rounded-xl p-2 text-center font-bold"
            />
          </View>
        </View>
        <View className="flex-row justify-evenly items-center w-3/4 h-20 px-10 mb-10">
          <View className="items-center justify-evenly w-full">
            <Text className="text-2xl font-bold">K:</Text>
            <TextInput
              placeholder="-"
              onChangeText={(text) => setStrikeouts(text)}
              value={strikeouts}
              keyboardType="numeric"
              className="items-center w-1/3 border-2 rounded-xl p-2 text-center font-bold"
            />
          </View>
          <View className="items-center justify-evenly w-full">
            <Text className="text-2xl font-bold">BB:</Text>
            <TextInput
              placeholder="-"
              onChangeText={(text) => setWalks(text)}
              value={walks}
              keyboardType="numeric"
              className="items-center w-1/3 border-2 rounded-xl p-2 text-center font-bold"
            />
          </View>
          <View className="items-center justify-evenly w-full py-4">
            <Text className="text-2xl font-bold">H:</Text>
            <TextInput
              placeholder="-"
              onChangeText={(text) => setHits(text)}
              value={hits}
              keyboardType="numeric"
              className="items-center w-1/3 border-2 rounded-xl p-2 text-center font-bold"
            />
          </View>
        </View>
        <View className="justify-center items-center w-full h-20 px-10">
          <View className="flex-row justify-between items-center w-full border-2 rounded-xl">
            <TouchableOpacity
              onPress={() => setPitchToggle(false)}
              className={`p-4 w-1/2 items-center rounded-xl ${
                !pitchToggle ? "bg-green-400" : ""
              }`}
            >
              <Text className={`text-xl ${!pitchToggle ? "font-bold" : ""}`}>
                Inning
              </Text>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => setPitchToggle(true)}
              className={`p-4 w-1/2 items-center rounded-xl ${
                pitchToggle ? "bg-green-400" : ""
              }`}
            >
              <Text className={`text-xl ${pitchToggle ? "font-bold" : ""}`}>
                Game
              </Text>
            </TouchableOpacity>
          </View>
        </View>
        <View className="pt-14">
          <TouchableOpacity
            onPress={handleSubmit}
            className="bg-blue-500 rounded-xl px-8 py-4 w-1/2"
          >
            <Text className="text-center text-white font-bold text-xl">
              Submit
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    </TouchableWithoutFeedback>
  );
};

export default LogPitchingScreen;
