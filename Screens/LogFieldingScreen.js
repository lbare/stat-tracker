import React, { useContext, useEffect, useState } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  TextInput,
  TouchableWithoutFeedback,
  Keyboard,
  Pressable,
} from "react-native";
import { UserContext } from "../services/UserContext";
import { addPitchingGame, addPitchingInning } from "../services/firebase";
import { Picker } from "@react-native-picker/picker";

const positions = ["P", "C", "1B", "2B", "3B", "SS", "LF", "CF", "RF"];

const LogFieldingScreen = ({ navigation }) => {
  const { currentGame, setCurrentGame, userGames, setUserGames } =
    useContext(UserContext);

  const [innings, setInnings] = useState([0, 0, 0, 0, 0, 0, 0, 0, 0]);
  const [pos, setPos] = useState({
    C: 0,
    "1B": 0,
    "2B": 0,
    "3B": 0,
    SS: 0,
    LF: 0,
    CF: 0,
    RF: 0,
  });
  const [putouts, setPutouts] = useState(0);
  const [assists, setAssists] = useState(0);
  const [errors, setErrors] = useState(0);

  const clearFields = () => {
    setInnings([0, 0, 0, 0, 0, 0, 0, 0, 0]);
    setPutouts(0);
    setAssists(0);
    setErrors(0);
  };

  //   const handleSubmit = async () => {
  //     const newGame = {
  //       position: "",
  //     };

  //     const addPitching = fieldToggle ? addPitchingGame : addPitchingInning;

  //     try {
  //       await addPitching(currentGame.id, newGame);
  //       console.log("Pitching added successfully");

  //       const newPitching = fieldToggle
  //         ? newGame
  //         : {
  //             inningsPitched:
  //               parseInt(innings) + parseInt(currentGame.pitching.inningsPitched),
  //             earnedRuns:
  //               parseInt(earnedRuns) + parseInt(currentGame.pitching.earnedRuns),
  //             runs: parseInt(runs) + parseInt(currentGame.pitching.runs),
  //             hits: parseInt(hits) + parseInt(currentGame.pitching.hits),
  //             walks: parseInt(walks) + parseInt(currentGame.pitching.walks),
  //             strikeouts:
  //               parseInt(strikeouts) + parseInt(currentGame.pitching.strikeouts),
  //           };

  //       setUserGames(
  //         userGames.map((game) =>
  //           game.id === currentGame.id
  //             ? { ...game, pitching: { ...newPitching } }
  //             : game
  //         )
  //       );

  //       setCurrentGame({ ...currentGame, pitching: { ...newPitching } });
  //     } catch (error) {
  //       console.log("Error adding pitching", error);
  //       throw error;
  //     }

  //     clearFields();
  //     navigation.navigate("Game Info");
  //   };

  return (
    <View className="justify-start items-center h-4/5">
      {/* CF */}
      <View className="flex-row justify-evenly items-center w-full pt-4">
        <View className="flex-row items-center justify-center w-1/2">
          <View className="flex-col justify-center items-center">
            <Text className="text-2xl font-bold">CF</Text>
            <View className="flex-row justify-between items-center border-2 rounded-xl h-12 w-40">
              <View className="bg-black rounded-l-lg justify-center items-center w-12 h-full">
                <Pressable
                  className="bg-black rounded-lg h-full justify-center"
                  disabled={pos.CF === 0}
                  onPress={() => {
                    setPos({ ...pos, CF: pos.CF - 1 });
                  }}
                >
                  <Text className="text-2xl font-bold text-gray-200 w-12 text-center">
                    -
                  </Text>
                </Pressable>
              </View>
              <Text className="text-4xl font-bold">{pos.CF}</Text>
              <View className="bg-black rounded-r-lg justify-center items-center w-12 h-full">
                <Pressable
                  className="bg-black rounded-lg h-full justify-center"
                  onPress={() => {
                    setPos({ ...pos, CF: pos.CF + 1 });
                  }}
                >
                  <Text className="text-2xl font-bold text-gray-200 text-center">
                    +
                  </Text>
                </Pressable>
              </View>
            </View>
          </View>
        </View>
      </View>
      {/* Corner Outfield */}
      <View className="flex-row justify-evenly items-center w-full">
        <View className="flex-row items-center justify-center w-1/2">
          <View className="flex-col justify-center items-center pr-8">
            <Text className="text-2xl font-bold">LF</Text>
            <View className="flex-row justify-between items-center border-2 rounded-xl h-12 w-40">
              <View className="bg-black rounded-l-lg justify-center items-center w-12 h-full">
                <Pressable
                  className="bg-black rounded-lg h-full justify-center"
                  disabled={pos.LF === 0}
                  onPress={() => {
                    setPos({ ...pos, LF: pos.LF - 1 });
                  }}
                >
                  <Text className="text-2xl font-bold text-gray-200 w-12 text-center">
                    -
                  </Text>
                </Pressable>
              </View>
              <Text className="text-4xl font-bold">{pos.LF}</Text>
              <View className="bg-black rounded-r-lg justify-center items-center w-12 h-full">
                <Pressable
                  className="bg-black rounded-lg h-full justify-center"
                  onPress={() => {
                    setPos({ ...pos, LF: pos.LF + 1 });
                  }}
                >
                  <Text className="text-2xl font-bold text-gray-200 text-center">
                    +
                  </Text>
                </Pressable>
              </View>
            </View>
          </View>
          <View className="flex-col justify-center items-center">
            <Text className="text-2xl font-bold">RF</Text>
            <View className="flex-row justify-between items-center border-2 rounded-xl h-12 w-40">
              <View className="bg-black rounded-l-lg justify-center items-center w-12 h-full">
                <Pressable
                  className="bg-black rounded-lg h-full justify-center"
                  disabled={pos.RF === 0}
                  onPress={() => {
                    setPos({ ...pos, RF: pos.RF - 1 });
                  }}
                >
                  <Text className="text-2xl font-bold text-gray-200 w-12 text-center">
                    -
                  </Text>
                </Pressable>
              </View>
              <Text className="text-4xl font-bold">{pos.RF}</Text>
              <View className="bg-black rounded-r-lg justify-center items-center w-12 h-full">
                <Pressable
                  className="bg-black rounded-lg h-full justify-center"
                  onPress={() => {
                    setPos({ ...pos, RF: pos.RF + 1 });
                  }}
                >
                  <Text className="text-2xl font-bold text-gray-200 text-center">
                    +
                  </Text>
                </Pressable>
              </View>
            </View>
          </View>
        </View>
      </View>
      {/* Middle Infield */}
      <View className="flex-row justify-evenly items-center w-full">
        <View className="flex-row items-center justify-center w-1/2">
          <View className="flex-col justify-center items-center pr-8">
            <Text className="text-2xl font-bold">SS</Text>
            <View className="flex-row justify-between items-center border-2 rounded-xl h-12 w-40">
              <View className="bg-black rounded-l-lg justify-center items-center w-12 h-full">
                <Pressable
                  className="bg-black rounded-lg h-full justify-center"
                  disabled={pos.SS === 0}
                  onPress={() => {
                    setPos({ ...pos, SS: pos.SS - 1 });
                  }}
                >
                  <Text className="text-2xl font-bold text-gray-200 w-12 text-center">
                    -
                  </Text>
                </Pressable>
              </View>
              <Text className="text-4xl font-bold">{pos.SS}</Text>
              <View className="bg-black rounded-r-lg justify-center items-center w-12 h-full">
                <Pressable
                  className="bg-black rounded-lg h-full justify-center"
                  onPress={() => {
                    setPos({ ...pos, SS: pos.SS + 1 });
                  }}
                >
                  <Text className="text-2xl font-bold text-gray-200 text-center">
                    +
                  </Text>
                </Pressable>
              </View>
            </View>
          </View>
          <View className="flex-col justify-center items-center">
            <Text className="text-2xl font-bold">2B</Text>
            <View className="flex-row justify-between items-center border-2 rounded-xl h-12 w-40">
              <View className="bg-black rounded-l-lg justify-center items-center w-12 h-full">
                <Pressable
                  className="bg-black rounded-lg h-full justify-center"
                  disabled={pos["2B"] === 0}
                  onPress={() => {
                    setPos({ ...pos, "2B": pos["2B"] - 1 });
                  }}
                >
                  <Text className="text-2xl font-bold text-gray-200 w-12 text-center">
                    -
                  </Text>
                </Pressable>
              </View>
              <Text className="text-4xl font-bold">{pos["2B"]}</Text>
              <View className="bg-black rounded-r-lg justify-center items-center w-12 h-full">
                <Pressable
                  className="bg-black rounded-lg h-full justify-center"
                  onPress={() => {
                    setPos({ ...pos, "2B": pos["2B"] + 1 });
                  }}
                >
                  <Text className="text-2xl font-bold text-gray-200 text-center">
                    +
                  </Text>
                </Pressable>
              </View>
            </View>
          </View>
        </View>
      </View>
      {/* Corner Infield */}
      <View className="flex-row justify-evenly items-center w-full">
        <View className="flex-row items-center justify-center w-1/2">
          <View className="flex-col justify-center items-center pr-8">
            <Text className="text-2xl font-bold">3B</Text>
            <View className="flex-row justify-between items-center border-2 rounded-xl h-12 w-40">
              <View className="bg-black rounded-l-lg justify-center items-center w-12 h-full">
                <Pressable
                  className="bg-black rounded-lg h-full justify-center"
                  disabled={pos["3B"] === 0}
                  onPress={() => {
                    setPos({ ...pos, "3B": pos["3B"] - 1 });
                  }}
                >
                  <Text className="text-2xl font-bold text-gray-200 w-12 text-center">
                    -
                  </Text>
                </Pressable>
              </View>
              <Text className="text-4xl font-bold">{pos["3B"]}</Text>
              <View className="bg-black rounded-r-lg justify-center items-center w-12 h-full">
                <Pressable
                  className="bg-black rounded-lg h-full justify-center"
                  onPress={() => {
                    setPos({ ...pos, "3B": pos["3B"] + 1 });
                  }}
                >
                  <Text className="text-2xl font-bold text-gray-200 text-center">
                    +
                  </Text>
                </Pressable>
              </View>
            </View>
          </View>
          <View className="flex-col justify-center items-center">
            <Text className="text-2xl font-bold">1B</Text>
            <View className="flex-row justify-between items-center border-2 rounded-xl h-12 w-40">
              <View className="bg-black rounded-l-lg justify-center items-center w-12 h-full">
                <Pressable
                  className="bg-black rounded-lg h-full justify-center"
                  disabled={pos["1B"] === 0}
                  onPress={() => {
                    setPos({ ...pos, "1B": pos["1B"] - 1 });
                  }}
                >
                  <Text className="text-2xl font-bold text-gray-200 w-12 text-center">
                    -
                  </Text>
                </Pressable>
              </View>
              <Text className="text-4xl font-bold">{pos["1B"]}</Text>
              <View className="bg-black rounded-r-lg justify-center items-center w-12 h-full">
                <Pressable
                  className="bg-black rounded-lg h-full justify-center"
                  onPress={() => {
                    setPos({ ...pos, "1B": pos["1B"] + 1 });
                  }}
                >
                  <Text className="text-2xl font-bold text-gray-200 text-center">
                    +
                  </Text>
                </Pressable>
              </View>
            </View>
          </View>
        </View>
      </View>
      {/* C */}
      <View className="flex-row justify-evenly items-center w-full pt-4">
        <View className="flex-row items-center justify-center w-1/2">
          <View className="flex-col justify-center items-center">
            <Text className="text-2xl font-bold">C</Text>
            <View className="flex-row justify-between items-center border-2 rounded-xl h-12 w-40">
              <View className="bg-black rounded-l-lg justify-center items-center w-12 h-full">
                <Pressable
                  className="bg-black rounded-lg h-full justify-center"
                  disabled={pos.C === 0}
                  onPress={() => {
                    setPos({ ...pos, C: pos.C - 1 });
                  }}
                >
                  <Text className="text-2xl font-bold text-gray-200 w-12 text-center">
                    -
                  </Text>
                </Pressable>
              </View>
              <Text className="text-4xl font-bold">{pos.C}</Text>
              <View className="bg-black rounded-r-lg justify-center items-center w-12 h-full">
                <Pressable
                  className="bg-black rounded-lg h-full justify-center"
                  onPress={() => {
                    setPos({ ...pos, C: pos.C + 1 });
                  }}
                >
                  <Text className="text-2xl font-bold text-gray-200 text-center">
                    +
                  </Text>
                </Pressable>
              </View>
            </View>
          </View>
        </View>
      </View>
      <View className="flex-row justify-evenly w-full">
        <View className="flex-row justify-evenly w-full">
          <View className="flex-col justify-center items-center">
            <Text className="text-2xl font-bold">PO</Text>
            <View className="flex-col justify-between items-center rounded-xl h-10 w-24">
              <View className="justify-center items-center w-24 h-full">
                <Pressable
                  className="bg-black rounded-t-lg h-full justify-center items-center w-24"
                  onPress={() => {
                    setPutouts(putouts + 1);
                  }}
                >
                  <Text className="text-2xl font-bold text-gray-200 w-12 text-center">
                    +
                  </Text>
                </Pressable>
              </View>
              <View className="justify-center items-center border-2 w-full">
                <Text className="text-4xl font-bold">{putouts}</Text>
              </View>
              <View className="justify-center items-center w-24 h-full">
                <Pressable
                  className="bg-black rounded-b-lg h-full justify-center w-24"
                  disabled={putouts === 0}
                  onPress={() => {
                    setPutouts(putouts - 1);
                  }}
                >
                  <Text className="text-2xl font-bold text-gray-200 text-center">
                    -
                  </Text>
                </Pressable>
              </View>
            </View>
          </View>
          <View className="flex-col justify-center items-center">
            <Text className="text-2xl font-bold">A</Text>
            <View className="flex-col justify-between items-center rounded-xl h-10 w-24">
              <View className="justify-center items-center w-24 h-full">
                <Pressable
                  className="bg-black rounded-t-lg h-full justify-center items-center w-24"
                  onPress={() => {
                    setAssists(assists + 1);
                  }}
                >
                  <Text className="text-2xl font-bold text-gray-200 w-12 text-center">
                    +
                  </Text>
                </Pressable>
              </View>
              <View className="justify-center items-center border-2 w-full">
                <Text className="text-4xl font-bold">{assists}</Text>
              </View>
              <View className="justify-center items-center w-24 h-full">
                <Pressable
                  className="bg-black rounded-b-lg h-full justify-center w-24"
                  disabled={assists === 0}
                  onPress={() => {
                    setAssists(assists - 1);
                  }}
                >
                  <Text className="text-2xl font-bold text-gray-200 text-center">
                    -
                  </Text>
                </Pressable>
              </View>
            </View>
          </View>
          <View className="flex-col justify-center items-center">
            <Text className="text-2xl font-bold">E</Text>
            <View className="flex-col justify-between items-center rounded-xl h-10 w-24">
              <View className="justify-center items-center w-24 h-full">
                <Pressable
                  className="bg-black rounded-t-lg h-full justify-center items-center w-24"
                  onPress={() => {
                    setErrors(errors + 1);
                  }}
                >
                  <Text className="text-2xl font-bold text-gray-200 w-12 text-center">
                    +
                  </Text>
                </Pressable>
              </View>
              <View className="justify-center items-center border-2 w-full">
                <Text className="text-4xl font-bold">{errors}</Text>
              </View>
              <View className="justify-center items-center w-24 h-full">
                <Pressable
                  className="bg-black rounded-b-lg h-full justify-center w-24"
                  disabled={errors === 0}
                  onPress={() => {
                    setErrors(errors - 1);
                  }}
                >
                  <Text className="text-2xl font-bold text-gray-200 text-center">
                    -
                  </Text>
                </Pressable>
              </View>
            </View>
          </View>
        </View>
      </View>
      <View className="mt-24 self-end px-6 w-42 h-14">
        <TouchableOpacity
          // onPress={handleSubmit}
          className="bg-blue-500 rounded-xl px-8 py-4 w-full"
        >
          <Text className="text-center text-white font-bold text-xl">
            Submit
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default LogFieldingScreen;
