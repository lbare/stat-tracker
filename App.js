import React, { useState, useEffect } from "react";
import { View } from "react-native";
import { DefaultTheme, NavigationContainer } from "@react-navigation/native";
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
import HomeScreen from "./Screens/HomeScreen";
import AddGameScreen from "./Screens/AddGameScreen";
import BackgroundImage from "./components/BackgroundImage";
import Stats from "./Screens/StatsScreen";
import { onAuthStateChanged, auth, db, doc, getDoc } from "./services/firebase";
import { AuthContext } from "./components/AuthContext";
import { useFonts } from "expo-font";
import SplashScreen from "./components/SplashScreen";
import { Asset } from "expo-asset";

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
        initialRouteName="Home"
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
          name="Home"
          component={HomeScreen}
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
  const [fontsLoaded] = useFonts({
    "WS-Bl": require("./assets/fonts/WorkSans-Black.ttf"),
    "WS-BlI": require("./assets/fonts/WorkSans-BlackItalic.ttf"),
    "WS-B": require("./assets/fonts/WorkSans-Bold.ttf"),
    "WS-BI": require("./assets/fonts/WorkSans-BoldItalic.ttf"),
    "WS-EB": require("./assets/fonts/WorkSans-ExtraBold.ttf"),
    "WS-EBI": require("./assets/fonts/WorkSans-ExtraBoldItalic.ttf"),
    "WS-EL": require("./assets/fonts/WorkSans-ExtraLight.ttf"),
    "WS-ELI": require("./assets/fonts/WorkSans-ExtraLightItalic.ttf"),
    "WS-L": require("./assets/fonts/WorkSans-Light.ttf"),
    "WS-LI": require("./assets/fonts/WorkSans-LightItalic.ttf"),
    "WS-I": require("./assets/fonts/WorkSans-Italic.ttf"),
    "WS-M": require("./assets/fonts/WorkSans-Medium.ttf"),
    "WS-MI": require("./assets/fonts/WorkSans-MediumItalic.ttf"),
    "WS-R": require("./assets/fonts/WorkSans-Regular.ttf"),
    "WS-SB": require("./assets/fonts/WorkSans-SemiBold.ttf"),
    "WS-SBI": require("./assets/fonts/WorkSans-SemiBoldItalic.ttf"),
    "WS-T": require("./assets/fonts/WorkSans-Thin.ttf"),
    "WS-TI": require("./assets/fonts/WorkSans-ThinItalic.ttf"),
  });

  const [user, setUser] = useState(null);
  const [userData, setUserData] = useState(null);
  const [assetsLoaded, setAssetsLoaded] = useState(false);

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

  useEffect(() => {
    async function loadAssets() {
      try {
        await Promise.all([
          Asset.loadAsync(require("./assets/bg-full.png")),
          Asset.loadAsync(require("./assets/cloud.png")),
        ]);
        setTimeout(() => {
          setAssetsLoaded(true);
        }, 3000);
      } catch (error) {
        console.log(error);
      }
    }
    loadAssets();
  }, []);

  return (
    <View
      style={{
        flex: 1,
      }}
    >
      {!assetsLoaded || !fontsLoaded ? (
        <SplashScreen />
      ) : (
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
      )}
    </View>
  );
}
