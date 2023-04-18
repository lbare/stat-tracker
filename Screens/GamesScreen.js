import React, { useContext, useEffect, useState } from "react";
import {
  View,
  Text,
  SectionList,
  TouchableOpacity,
  ActivityIndicator,
} from "react-native";
import { UserContext } from "../services/UserContext";
import { deleteGame } from "../services/firebase";
import { Alert } from "react-native";
import { SwipeListView } from "react-native-swipe-list-view";

const Settings = ({ navigation }) => {
  const {
    userGames,
    setUserGames,
    userAtBats,
    setUserAtBats,
    currentGame,
    setCurrentGame,
  } = useContext(UserContext);

  const [loading, setLoading] = useState(true);
  const [newData, setNewData] = useState(null);

  const testData = Array(20)
    .fill("")
    .map((_, i) => ({ key: `${i}`, text: `item #${i}` }));

  useEffect(() => {
    if (userGames !== null && userGames.length > 0) {
      setLoading(true);

      const sortedGames = userGames.sort((a, b) => a.date - b.date);

      setNewData([
        {
          title: "Games",
          data: sortedGames.map((item) => ({
            date: item.date,
            id: item.id,
            opponent: item.opponent,
            home: item.home,
            didWin: item.didWin !== null ? item.didWin : "N/A",
            runsScored: item.runsScored !== null ? item.runsScored : null,
            runsAllowed: item.runsAllowed !== null ? item.runsAllowed : null,
          })),
        },
      ]);
      setLoading(false);
    }
  }, [userGames]);

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
      <SectionList
        className="w-full"
        sections={newData}
        keyExtractor={(item, index) => item + index}
        renderItem={({ item }) => (
          <TouchableOpacity
            onPress={() => {
              setCurrentGame(item.id);
              navigation.navigate("Log AB");
              // handleDeleteGame(item.id);
            }}
            className="border-b border-gray-500 p-4 flex-row justify-between"
          >
            <Text className="text-xl">
              {item.date.toLocaleString("en-US", {
                month: "numeric",
                day: "2-digit",
              })}
            </Text>
            <Text className="text-xl text-left">{item.opponent}</Text>
            <Text className="text-xl">
              {item.runsAllowed !== null && item.runsScored !== null
                ? item.home === true
                  ? "H"
                  : "A"
                : "N/A"}
            </Text>
          </TouchableOpacity>
        )}
        renderSectionHeader={({ section: { title } }) => (
          <View className="border-b border-gray-500 pl-4 pt-8 bg-gray-100">
            <Text className="text-4xl font-bold">{title}</Text>
          </View>
        )}
      />
      <View className="flex-1 flex-row justify-evenly items-center w-full pb-10">
        <TouchableOpacity
          className="justify-center items-center bg-red-200 h-20 w-1/3 rounded-lg"
          onPress={() => navigation.navigate("Add Game")}
        >
          <Text>Add</Text>
        </TouchableOpacity>
        <TouchableOpacity className="justify-center items-center bg-red-200 h-20 w-1/3 rounded-lg">
          <Text>Import</Text>
        </TouchableOpacity>
      </View>
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

export default Settings;