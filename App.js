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
import AddGameScreen from "./Screens/AddGameScreen";
import Stats from "./Screens/StatsScreen";
import GamesScreen from "./Screens/GamesScreen";
import {
  onAuthStateChanged,
  auth,
  db,
  doc,
  getDoc,
  getAllSeasons,
  getAllGames,
  getAllAtBats,
} from "./services/firebase";
import { FloatingAction } from "react-native-floating-action";
import { UserContext } from "./services/UserContext";

const Stack = createStackNavigator();
const BottomBar = createBottomTabNavigator();

function AuthStack() {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="Login"
        component={Login}
        options={{
          animationEnabled: false,
          headerBackTitleVisible: false,
          headerLeft: null,
          headerShown: false,
        }}
      />
      <Stack.Screen
        name="Register"
        component={Register}
        options={{
          animationEnabled: false,
          headerBackTitleVisible: false,
          headerLeft: null,
          headerShown: false,
        }}
      />
    </Stack.Navigator>
  );
}

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
          name="Add Game"
          component={AddGameScreen}
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
  const [userSeasons, setUserSeasons] = useState(null);
  const [userGames, setUserGames] = useState(null);
  const [userAtBats, setUserAtBats] = useState(null);
  const [currentGame, setCurrentGame] = useState(null);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      try {
        if (user) {
          const docSnap = await getDoc(doc(db, "users", user.uid));
          if (docSnap.exists()) {
            try {
              const [seasons, games, atBats] = await Promise.all([
                getAllSeasons(),
                getAllGames(),
                getAllAtBats(),
              ]).catch((error) => {
                console.log("Promise Error: ", error);
              });
              setUser(user);
              setUserSeasons(seasons);
              setUserGames(games);
              setUserAtBats(atBats);
            } catch (error) {
              console.log(error);
            }
          } else {
            console.log("No such document");
          }
        } else {
          setUser(null);
        }
      } catch (error) {
        console.log(error);
      }
    });
    return unsubscribe;
  }, [user]);

  return (
    <UserContext.Provider
      value={{
        user,
        setUser,
        userSeasons,
        setUserSeasons,
        userGames,
        setUserGames,
        userAtBats,
        setUserAtBats,
        currentGame,
        setCurrentGame,
      }}
    >
      <NavigationContainer>
        {user ? <AppStack /> : <AuthStack />}
      </NavigationContainer>
    </UserContext.Provider>
  );
}
