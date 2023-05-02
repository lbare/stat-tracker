import React, { useState, useEffect, createContext } from "react";
import { View, ActivityIndicator } from "react-native";
import { NavigationContainer, useNavigation } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import {
  List,
  ChartLineUp,
  Baseball,
  CalendarPlus,
} from "phosphor-react-native";
import Login from "./Screens/LoginScreen";
import Register from "./Screens/RegisterScreen";
import LogAtBatScreen from "./Screens/LogAtBatScreen";
import LogPitchingScreen from "./Screens/LogPitchingScreen";
import LogFieldingScreen from "./Screens/LogFieldingScreen";
import AddGameScreen from "./Screens/AddGameScreen";
import Stats from "./Screens/StatsScreen";
import GamesScreen from "./Screens/GamesScreen";
import GameInfoScreen from "./Screens/GameInfoScreen";
import { auth, db, getAllGames } from "./services/firebase";
import { onAuthStateChanged } from "firebase/auth";
import { getDoc, doc } from "firebase/firestore";
import { FloatingAction } from "react-native-floating-action";
import { UserContext } from "./services/UserContext";
import AsyncStorage from "@react-native-async-storage/async-storage";

const Stack = createStackNavigator();
const BottomBar = createBottomTabNavigator();

function AppStack() {
  const navigation = useNavigation();
  return (
    <View style={{ flex: 1 }}>
      <BottomBar.Navigator
        detachInactiveScreens={false}
        initialRouteName="Stats"
        screenOptions={{
          tabBarShowLabel: false,
          tabBarActiveTintColor: "black",
          tabBarInactiveTintColor: "gray",
          tabBarStyle: {
            backgroundColor: "white",
            borderRadius: 20,
            marginBottom: 25,
            marginTop: 5,
            paddingTop: 30,
            height: 70,
            borderColor: "#fff",
            marginHorizontal: 30,
            paddingHorizontal: 20,
            position: "absolute",
            shadowColor: "#000",
            shadowOffset: {
              width: 0,
              height: 2,
            },
            shadowOpacity: 0.25,
            shadowRadius: 3.84,
            elevation: 5,
          },
        }}
      >
        <BottomBar.Screen
          name="Games"
          component={GamesScreen}
          options={{
            tabBarIcon: ({ color, focused }) =>
              focused ? (
                <List size={40} color={color} weight="fill" />
              ) : (
                <List size={40} color={color} />
              ),
          }}
        />
        <BottomBar.Screen
          name="Log AB"
          component={LogAtBatScreen}
          options={{
            tabBarIcon: () => (
              <CalendarPlus size={0} color="white" weight="fill" />
            ),
          }}
        />
        <BottomBar.Screen
          name="Log Pitching"
          component={LogPitchingScreen}
          options={{
            tabBarIcon: () => (
              <CalendarPlus size={0} color="white" weight="fill" />
            ),
          }}
        />
        <BottomBar.Screen
          name="Log Fielding"
          component={LogFieldingScreen}
          options={{
            tabBarIcon: () => (
              <CalendarPlus size={0} color="white" weight="fill" />
            ),
          }}
        />

        <BottomBar.Screen
          name="Add Game"
          component={AddGameScreen}
          options={{
            tabBarIcon: () => (
              <CalendarPlus size={0} color="white" weight="fill" />
            ),
          }}
        />
        <BottomBar.Screen
          name="Game Info"
          component={GameInfoScreen}
          options={{
            tabBarIcon: () => (
              <CalendarPlus size={0} color="white" weight="fill" />
            ),
          }}
        />
        <BottomBar.Screen
          name="Stats"
          component={Stats}
          options={{
            tabBarIcon: ({ color, focused }) =>
              focused ? (
                <ChartLineUp size={40} color={color} weight="fill" />
              ) : (
                <ChartLineUp size={40} color={color} />
              ),
          }}
        />
      </BottomBar.Navigator>
      <View
        style={{
          bottom: 20,
          right: 124,
        }}
      >
        <FloatingAction
          actions={[
            {
              text: "Add AB",
              name: "add_ab",
              icon: <Baseball size={40} color="white" />,
              position: 1,
              buttonSize: 60,
              margin: 10,
              textStyle: {
                display: "none",
              },
              textBackground: "transparent",
            },
            {
              text: "Add Game",
              name: "add_game",
              icon: <CalendarPlus size={32} color="white" />,
              position: 2,
              buttonSize: 60,
              margin: 10,
              textStyle: {
                display: "none",
              },
              textBackground: "transparent",
            },
          ]}
          onPressItem={(name) => {
            if (name === "add_ab") {
              navigation.navigate("Log AB");
            } else if (name === "add_game") {
              navigation.navigate("Add Game");
            }
          }}
          showBackground={false}
          buttonSize={80}
          iconHeight={22}
          iconWidth={22}
          position="right"
          actionsPaddingTopBottom={5}
          floatingIcon={null}
        />
      </View>
    </View>
  );
}

export default function App() {
  const [user, setUser] = useState(null);
  const [userGames, setUserGames] = useState(null);
  const [currentGame, setCurrentGame] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        console.log("**********************************************");
        console.log("FETCHING FROM FIREBASE");
        console.log("**********************************************");
        const games = await getAllGames().catch((error) => {
          console.log("Promise Error: ", error);
        });
        return games;
      } catch (error) {
        console.log(error);
      }
    };

    const setData = async () => {
      let gameData;
      const cachedGameData = await AsyncStorage.getItem("games");

      if (cachedGameData) {
        gameData = JSON.parse(cachedGameData, (key, value) => {
          if (key === "date") {
            return new Date(value);
          }
          return value;
        });
      } else {
        gameData = await fetchData();
        // Convert Date objects to strings before storing in AsyncStorage
        gameData = gameData.map((game) => ({
          ...game,
          date: game.date.toISOString(),
        }));
        await AsyncStorage.setItem("games", JSON.stringify(gameData));
      }

      // Parse string dates back to Date objects
      gameData = gameData.map((game) => ({
        ...game,
        date: new Date(game.date),
      }));

      setUserGames(gameData);
    };

    if (!userGames) {
      setData();
    }
  }, []);

  useEffect(() => {
    const updateAsyncStorage = async () => {
      try {
        // Convert Date objects to strings before storing in AsyncStorage
        const gameData = userGames.map((game) => ({
          ...game,
          date: game.date.toISOString(),
        }));

        await AsyncStorage.setItem("games", JSON.stringify(gameData));
        console.log("====================================");
        console.log("UPDATED ASYNC STORAGE");
        console.log("====================================");
      } catch (error) {
        console.log(error);
      }
    };

    if (userGames) {
      updateAsyncStorage();
    }
  }, [userGames]);

  return (
    <UserContext.Provider
      value={{
        user,
        setUser,
        userGames,
        setUserGames,
        currentGame,
        setCurrentGame,
      }}
    >
      <NavigationContainer>
        <AppStack />
      </NavigationContainer>
    </UserContext.Provider>
  );
}
