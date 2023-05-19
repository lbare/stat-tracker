import React, { useState, useEffect } from "react";
import { View, Image, StatusBar } from "react-native";
import {
  DefaultTheme,
  NavigationContainer,
  useNavigation,
} from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import {
  House,
  ChartBar,
  Trophy,
  Calendar,
  PlusCircle,
} from "phosphor-react-native";
import QuickAddScreen from "./Screens/QuickAddScreen";
import LogAtBatScreen from "./Screens/LogAtBatScreen";
import AddGameScreen from "./Screens/AddGameScreen";
import BackgroundImage from "./components/BackgroundImage";
import Stats from "./Screens/StatsScreen";
import Settings from "./Screens/SettingsScreen";
import { onAuthStateChanged, auth, db, doc, getDoc } from "./services/firebase";
import { AuthContext } from "./components/AuthContext";

const BottomBar = createBottomTabNavigator();

function AppStack() {
  return (
    <View
      style={{
        flex: 1,
      }}
    >
      <BottomBar.Navigator
        detachInactiveScreens={false}
        initialRouteName="Stats"
        screenOptions={{
          tabBarShowLabel: false,
          tabBarActiveTintColor: "white",
          tabBarInactiveTintColor: "white",
          headerShown: false,
          tabBarStyle: {
            position: "absolute",
            backgroundColor: "transparent",
            borderTopWidth: 0,
            paddingTop: 10,
          },
        }}
      >
        <BottomBar.Screen
          name="Stats"
          component={Stats}
          options={{
            tabBarIcon: ({ color, focused }) =>
              focused ? (
                <ChartBar size={32} color={color} weight="fill" />
              ) : (
                <ChartBar size={32} color={color} />
              ),
          }}
        />
        <BottomBar.Screen
          name="Log AB"
          component={LogAtBatScreen}
          options={{
            tabBarIcon: ({ color, focused }) =>
              focused ? (
                <Trophy size={32} color={color} weight="fill" />
              ) : (
                <Trophy size={32} color={color} />
              ),
          }}
        />
        <BottomBar.Screen
          name="Settings"
          component={Settings}
          options={{
            tabBarIcon: ({ color, focused }) =>
              focused ? (
                <House size={32} color={color} weight="fill" />
              ) : (
                <House size={32} color={color} />
              ),
          }}
        />
        <BottomBar.Screen
          name="Add Game"
          component={AddGameScreen}
          options={{
            tabBarIcon: ({ color, focused }) =>
              focused ? (
                <Calendar size={32} color={color} weight="fill" />
              ) : (
                <Calendar size={32} color={color} />
              ),
          }}
        />
        <BottomBar.Screen
          name="QuickAddScreen"
          component={QuickAddScreen}
          options={{
            tabBarIcon: ({ color, focused }) =>
              focused ? (
                <PlusCircle size={32} color={color} weight="fill" />
              ) : (
                <PlusCircle size={32} color={color} />
              ),
          }}
        />
      </BottomBar.Navigator>
    </View>
  );
}

export default function App() {
  const [user, setUser] = useState(null);
  const [userData, setUserData] = useState(null);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      try {
        if (user) {
          const docSnap = await getDoc(doc(db, "users", user.uid));
          if (docSnap.exists()) {
            const data = docSnap.data();
            setUserData(data);
            setUser(user);
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
  }, []);

  return (
    <View
      style={{
        flex: 1,
      }}
    >
      <BackgroundImage>
        <AuthContext.Provider value={userData}>
          <NavigationContainer
            theme={{
              colors: {
                ...DefaultTheme.colors,
                background: "transparent",
              },
            }}
          >
            <AppStack />
          </NavigationContainer>
        </AuthContext.Provider>
      </BackgroundImage>
    </View>
  );
}
