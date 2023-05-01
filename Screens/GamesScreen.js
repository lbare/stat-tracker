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
  const [allGames, setAllGames] = useState(null);
  const [selectedTeam, setSelectedTeam] = useState({
    All: false,
    Brewers: false,
    Giants: false,
    Monarchs: true,
    Pirates: false,
    Reds: false,
    "Red Sox": false,
    Rockies: false,
    Royals: false,
    "White Sox": false,
  });
  const [selectedGameType, setSelectedGameType] = useState("exhibition");
  const [selectedYear, setSelectedYear] = useState(
    new Date().getFullYear().toString()
  );

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
          fielding: item.fielding !== null ? item.fielding : null,
          notes: item.notes !== null ? item.notes : null,
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

        const games = getFilteredGames(
          selectedYear,
          selectedTeamName,
          selectedGameType
        );
        setAllGames([games]);
      }
    }
  }, [selectedYear, selectedTeam, selectedGameType, userGames]);

  const handleButtonPress = (team) => {
    setSelectedTeam((prevSelectedTeam) => {
      const updatedSelectedTeam = { ...prevSelectedTeam };

      if (updatedSelectedTeam[team]) {
        updatedSelectedTeam[team] = false;
        updatedSelectedTeam["All"] = true;
      } else {
        updatedSelectedTeam[team] = true;

        Object.keys(updatedSelectedTeam).forEach((key) => {
          if (key !== team && (key !== "All" || updatedSelectedTeam[key])) {
            updatedSelectedTeam[key] = false;
          }
        });
      }

      return updatedSelectedTeam;
    });
  };

  function getFilteredGames(selectedYear, team, gameType) {
    const sortedGames = userGames.sort((a, b) => a.date - b.date);

    let filteredGames = sortedGames;

    if (selectedYear) {
      filteredGames = filteredGames.filter((item) => {
        return item.date.getFullYear().toString() === selectedYear.toString();
      });
    }

    if (gameType) {
      filteredGames = filteredGames.filter((item) => {
        return item.type === gameType;
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
        type: item.type,
        id: item.id,
        homeTeam: item.homeTeam,
        awayTeam: item.awayTeam,
        didWin: item.didWin !== null ? item.didWin : "N/A",
        homeScore: item.homeScore !== null ? item.homeScore : null,
        awayScore: item.awayScore !== null ? item.awayScore : null,
        atBats: item.atBats !== null ? item.atBats : null,
        pitching: item.pitching !== null ? item.pitching : null,
        fielding: item.fielding !== null ? item.fielding : null,
        notes: item.notes !== null ? item.notes : null,
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
      <View className="flex-row justify-between items-center w-full border-y-2 h-12">
        <Pressable
          onPress={() => setSelectedYear("2023")}
          className={`w-1/3 h-full justify-center items-center ${
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
          className={`w-1/3 h-full justify-center items-center ${
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
          className={`w-1/3 h-full justify-center items-center ${
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
      <View className="flex-row justify-between items-center w-full border-b-2 h-11">
        <Pressable
          onPress={() => setSelectedGameType("exhibition")}
          className={`w-1/3 h-full justify-center items-center ${
            selectedGameType === "exhibition" ? "bg-green-400" : ""
          }`}
        >
          <Text
            className={`text-lg ${
              selectedGameType === "exhibition" ? "font-bold" : ""
            }`}
          >
            Exhibition
          </Text>
        </Pressable>
        <Pressable
          onPress={() => setSelectedGameType("regular")}
          className={`w-1/3 h-full justify-center items-center ${
            selectedGameType === "regular" ? "bg-green-400" : ""
          }`}
        >
          <Text
            className={`text-lg ${
              selectedGameType === "regular" ? "font-bold" : ""
            }`}
          >
            Regular
          </Text>
        </Pressable>
        <Pressable
          onPress={() => setSelectedGameType("playoff")}
          className={`w-1/3 h-full justify-center items-center ${
            selectedGameType === "playoff" ? "bg-green-400" : ""
          }`}
        >
          <Text
            className={`text-lg ${
              selectedGameType === "playoff" ? "font-bold" : ""
            }`}
          >
            Playoffs
          </Text>
        </Pressable>
      </View>
      <View className="flex-row justify-between items-center w-full h-11">
        <Pressable
          onPress={() => handleButtonPress("Brewers")}
          className={`h-full justify-center w-1/5 items-center ${
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
          className={`h-full justify-center w-1/5 items-center ${
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
          className={`h-full w-1/5 justify-center items-center ${
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
          className={`h-full justify-center w-1/5 items-center ${
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
          className={`h-full justify-center w-1/5 items-center ${
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
      <View className="flex-row justify-between items-center w-full border-y-2 h-11">
        <Pressable
          onPress={() => handleButtonPress("Red Sox")}
          className={`h-full justify-center w-1/5 items-center ${
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
          className={`h-full justify-center w-1/5 items-center ${
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
          className={`h-full justify-center w-1/5 items-center ${
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
          className={`h-full justify-center w-1/5 items-center ${
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
          className={`h-full justify-center w-1/5 items-center ${
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
        sections={allGames}
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
    </View>
  );
};

export default GamesScreen;
