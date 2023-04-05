import React, { useContext, useEffect, useState } from "react";
import {
  View,
  Text,
  SectionList,
  TouchableOpacity,
  ActivityIndicator,
} from "react-native";
import { UserContext } from "../services/UserContext";

const Settings = () => {
  const { userGames, setUserGames, userAtBats, setUserAtBats } =
    useContext(UserContext);

  const [loading, setLoading] = useState(true);
  const [newData, setNewData] = useState(null);

  useEffect(() => {
    if (userGames !== null && userGames.length > 0) {
      setLoading(true);
      setNewData([
        {
          title: "Games",
          data: userGames.map((item) => ({
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
              console.log("Pressed");
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
              {item.runsAllowed || ""}-{item.runsScored || ""}
            </Text>
          </TouchableOpacity>
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

export default Settings;
