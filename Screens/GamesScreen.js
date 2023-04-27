import React, { useContext, useEffect, useState } from "react";
import {
  View,
  Text,
  SectionList,
  TouchableOpacity,
  ActivityIndicator,
  Pressable,
} from "react-native";
import { UserContext } from "../services/UserContext";
import { deleteGame } from "../services/firebase";
import { Alert } from "react-native";
import { SwipeListView } from "react-native-swipe-list-view";

const GamesScreen = ({ navigation }) => {
  const {
    userGames,
    setUserGames,
    userAtBats,
    setUserAtBats,
    currentGame,
    setCurrentGame,
  } = useContext(UserContext);

  const [loading, setLoading] = useState(true);
  const [gameToggle, setGameToggle] = useState(false);
  const [monarchsGames, setMonarchsGames] = useState(null);
  const [allGames, setAllGames] = useState(null);
  const [selectedTeam, setSelectedTeam] = useState({
    All: true,
    Brewers: false,
    Giants: false,
    Monarchs: false,
    Pirates: false,
    Reds: false,
    "Red Sox": false,
    Rockies: false,
    Royals: false,
    "White Sox": false,
  });
  const [selectedYear, setSelectedYear] = useState(
    new Date().getFullYear().toString()
  );

  const testData = Array(20)
    .fill("")
    .map((_, i) => ({ key: `${i}`, text: `item #${i}` }));

  useEffect(() => {
    if (userGames !== null && userGames.length > 0) {
      setLoading(true);

      const sortedGames = userGames.sort((a, b) => a.date - b.date);

      const allGames = {
        title: "All Games",
        data: sortedGames.map((item) => ({
          date: item.date,
          id: item.id,
          homeTeam: item.homeTeam,
          awayTeam: item.awayTeam,
          didWin: item.didWin !== null ? item.didWin : "N/A",
          homeScore: item.homeScore !== null ? item.homeScore : null,
          awayScore: item.awayScore !== null ? item.awayScore : null,
          atBats: item.atBats !== null ? item.atBats : null,
          pitching: item.pitching !== null ? item.pitching : null,
        })),
      };
      setAllGames([allGames]);

      setLoading(false);
    }
  }, [userGames]);

  useEffect(() => {
    if (userGames !== null && userGames.length > 0) {
      const selectedTeamValue = Object.entries(selectedTeam).find(
        ([team, value]) => value === true
      );

      if (selectedTeamValue) {
        const selectedTeamName = selectedTeamValue[0]; // Get the team name

        const games = getFilteredGames(selectedYear, selectedTeamName);
        setAllGames([games]);
      }
    }
  }, [selectedYear, selectedTeam, userGames]);

  const handleButtonPress = (team) => {
    setSelectedTeam((prevSelectedTeam) => {
      const updatedSelectedTeam = { ...prevSelectedTeam };

      // If the current team is already pressed, unpress it
      if (updatedSelectedTeam[team]) {
        updatedSelectedTeam[team] = false;
        updatedSelectedTeam["All"] = true;
      } else {
        // Press the current team
        updatedSelectedTeam[team] = true;

        // Unpress all other teams
        Object.keys(updatedSelectedTeam).forEach((key) => {
          if (key !== team && (key !== "All" || updatedSelectedTeam[key])) {
            updatedSelectedTeam[key] = false;
          }
        });
      }

      return updatedSelectedTeam;
    });
  };

  function getFilteredGames(selectedYear, team) {
    const sortedGames = userGames.sort((a, b) => a.date - b.date);

    let filteredGames = sortedGames;

    if (selectedYear) {
      filteredGames = filteredGames.filter((item) => {
        return item.date.getFullYear().toString() === selectedYear.toString();
      });
    }

    if (team && team !== "All") {
      filteredGames = filteredGames.filter((item) => {
        return item.homeTeam === team || item.awayTeam === team;
      });
    }

    return {
      title:
        (selectedYear ? selectedYear + " " : "") + (team ? team + " " : ""),
      data: filteredGames.map((item) => ({
        date: item.date,
        id: item.id,
        homeTeam: item.homeTeam,
        awayTeam: item.awayTeam,
        didWin: item.didWin !== null ? item.didWin : "N/A",
        homeScore: item.homeScore !== null ? item.homeScore : null,
        awayScore: item.awayScore !== null ? item.awayScore : null,
        atBats: item.atBats !== null ? item.atBats : null,
        pitching: item.pitching !== null ? item.pitching : null,
      })),
    };
  }

  const handleDeleteGame = async (id) => {
    try {
      Alert.alert(
        "Delete Game",
        "Are you sure you want to delete this game?",
        [
          {
            text: "Cancel",
            style: "cancel",
          },
          {
            text: "Delete",
            onPress: async () => {
              await deleteGame(id);
              setUserGames(userGames.filter((item) => item.id !== id));
            },
            style: "destructive",
          },
        ],
        { cancelable: false }
      );
    } catch (error) {
      console.error("Error deleting game:", error);
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
    <View className="flex-1 w-full justify-center items-center pb-20">
      <View className="flex-row justify-between items-center w-full border-y-2">
        <Pressable
          onPress={() => setSelectedYear("2023")}
          className={`p-4 w-1/3 items-center ${
            selectedYear === "2023" ? "bg-green-400" : ""
          }`}
        >
          <Text
            className={`text-xl ${selectedYear === "2023" ? "font-bold" : ""}`}
          >
            2023
          </Text>
        </Pressable>
        <Pressable
          onPress={() => setSelectedYear("2022")}
          className={`p-4 w-1/3 items-center ${
            selectedYear === "2022" ? "bg-green-400" : ""
          }`}
        >
          <Text
            className={`text-xl ${selectedYear === "2022" ? "font-bold" : ""}`}
          >
            2022
          </Text>
        </Pressable>
        <Pressable
          onPress={() => setSelectedYear("2021")}
          className={`p-4 w-1/3 items-center ${
            selectedYear === "2021" ? "bg-green-400" : ""
          }`}
        >
          <Text
            className={`text-xl ${selectedYear === "2021" ? "font-bold" : ""}`}
          >
            2021
          </Text>
        </Pressable>
      </View>
      <View className="flex-row justify-between items-center w-full">
        <Pressable
          onPress={() => handleButtonPress("Brewers")}
          className={`py-4 w-1/5 items-center ${
            selectedTeam["Brewers"] ? "bg-green-400" : ""
          }`}
        >
          <Text
            className={`text-xs ${selectedTeam["Brewers"] ? "font-bold" : ""}`}
          >
            Brewers
          </Text>
        </Pressable>
        <Pressable
          onPress={() => handleButtonPress("Giants")}
          className={`py-4 w-1/5 items-center ${
            selectedTeam["Giants"] ? "bg-green-400" : ""
          }`}
        >
          <Text
            className={`text-xs ${selectedTeam["Giants"] ? "font-bold" : ""}`}
          >
            Giants
          </Text>
        </Pressable>
        <Pressable
          onPress={() => handleButtonPress("Monarchs")}
          className={`py-4 w-1/5 items-center ${
            selectedTeam["Monarchs"] ? "bg-green-400" : ""
          }`}
        >
          <Text
            className={`text-xs ${selectedTeam["Monarchs"] ? "font-bold" : ""}`}
          >
            Monarchs
          </Text>
        </Pressable>
        <Pressable
          onPress={() => handleButtonPress("Pirates")}
          className={`py-4 w-1/5 items-center ${
            selectedTeam["Pirates"] ? "bg-green-400" : ""
          }`}
        >
          <Text
            className={`text-xs ${selectedTeam["Pirates"] ? "font-bold" : ""}`}
          >
            Pirates
          </Text>
        </Pressable>
        <Pressable
          onPress={() => handleButtonPress("Reds")}
          className={`py-4 w-1/5 items-center ${
            selectedTeam["Reds"] ? "bg-green-400" : ""
          }`}
        >
          <Text
            className={`text-xs ${selectedTeam["Reds"] ? "font-bold" : ""}`}
          >
            Reds
          </Text>
        </Pressable>
      </View>
      <View className="flex-row justify-between items-center w-full border-y-2">
        <Pressable
          onPress={() => handleButtonPress("Red Sox")}
          className={`py-4 w-1/5 items-center ${
            selectedTeam["Red Sox"] ? "bg-green-400" : ""
          }`}
        >
          <Text
            className={`text-xs ${selectedTeam["Red Sox"] ? "font-bold" : ""}`}
          >
            Red Sox
          </Text>
        </Pressable>
        <Pressable
          onPress={() => handleButtonPress("Rockies")}
          className={`py-4 w-1/5 items-center ${
            selectedTeam["Rockies"] ? "bg-green-400" : ""
          }`}
        >
          <Text
            className={`text-xs ${selectedTeam["Rockies"] ? "font-bold" : ""}`}
          >
            Rockies
          </Text>
        </Pressable>
        <Pressable
          onPress={() => handleButtonPress("Royals")}
          className={`py-4 w-1/5 items-center ${
            selectedTeam["Royals"] ? "bg-green-400" : ""
          }`}
        >
          <Text
            className={`text-xs ${selectedTeam["Royals"] ? "font-bold" : ""}`}
          >
            Royals
          </Text>
        </Pressable>
        <Pressable
          onPress={() => handleButtonPress("White Sox")}
          className={`py-4 w-1/5 items-center ${
            selectedTeam["White Sox"] ? "bg-green-400" : ""
          }`}
        >
          <Text
            className={`text-xs ${
              selectedTeam["White Sox"] ? "font-bold" : ""
            }`}
          >
            White Sox
          </Text>
        </Pressable>
        <Pressable
          onPress={() => handleButtonPress("All")}
          className={`py-4 w-1/5 items-center ${
            selectedTeam["All"] ? "bg-green-400" : ""
          }`}
        >
          <Text className={`text-xs ${selectedTeam["All"] ? "font-bold" : ""}`}>
            All
          </Text>
        </Pressable>
      </View>
      <SectionList
        className="w-full"
        sections={gameToggle ? monarchsGames : allGames}
        keyExtractor={(item, index) => item + index}
        renderItem={({ item }) => (
          <Pressable
            onPress={() => {
              setCurrentGame(item);
              navigation.navigate("Game Info");
            }}
            className="border-b border-gray-500 p-4 flex-row justify-between w-screen"
          >
            <View className="flex-col justify-between items-center self-start">
              <Text className="text-lg">
                {item.date.toLocaleString("en-US", {
                  weekday: "short",
                  selectedYear: "2-digit",
                  month: "numeric",
                  day: "2-digit",
                })}
              </Text>
              <Text>
                {item.date.toLocaleString("en-US", {
                  hour: "numeric",
                  minute: "numeric",
                })}
              </Text>
            </View>
            <View className="flex-row justify-evenly items-center w-full pl-10 pr-24">
              <View className="flex-col justify-center items-center">
                <Text className="text-xl text-left">{item.awayTeam}</Text>
                <Text className="text-xl text-left">
                  {item.awayScore !== null ? item.awayScore : ""}
                </Text>
              </View>
              <Text className="text-xl text-center">@</Text>
              <View className="flex-col justify-center items-center">
                <Text className="text-xl text-right">{item.homeTeam}</Text>
                <Text className="text-xl text-right">
                  {item.homeScore !== null ? item.homeScore : ""}
                </Text>
              </View>
            </View>
          </Pressable>
        )}
        renderSectionHeader={({ section: { title } }) => (
          <View className="border-b border-gray-500 pl-4 pt-8 bg-gray-100">
            <Text className="text-4xl font-bold">{title}</Text>
          </View>
        )}
      />
      {/* <SwipeListView
        className="w-full"
        data={newData}
        renderItem={(data, rowMap) => (
          <View className="items-center bg-red-500 border-b-black border-b-2 justify-center h-24">
            <Text className="text-xl">I am in a SwipeListView</Text>
          </View>
        )}
        renderHiddenItem={(data, rowMap) => (
          <View className="flex-1 flex-row items-center bg-red-500 justify-between px-12">
            <Text className="">Left</Text>
            <TouchableOpacity className="items-center bottom-0 justify-center absolute top-0 w-full bg-red-500 right-48">
              <Text>Close</Text>
            </TouchableOpacity>
            <Text className="bg-red-500 justify-center items-center">
              Right
            </Text>
          </View>
        )}
        leftOpenValue={75}
        rightOpenValue={-150}
        previewRowKey={"0"}
        previewOpenValue={-40}
        previewOpenDelay={3000}
      /> */}
    </View>
  );
};

export default GamesScreen;
