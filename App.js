import React, { useState, useEffect } from "react";
import { View } from "react-native";
import "react-native-gesture-handler";
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
      } catch (error) {
        console.log(error);
      } finally {
        setAssetsLoaded(true);
      }
    }

    loadAssets();
  }, []);

  const [fontsLoaded] = useFonts({
    "WorkSans-Black": require("./assets/fonts/WorkSans-Black.ttf"),
    "WorkSans-BlackItalic": require("./assets/fonts/WorkSans-BlackItalic.ttf"),
    "WorkSans-Bold": require("./assets/fonts/WorkSans-Bold.ttf"),
    "WorkSans-BoldItalic": require("./assets/fonts/WorkSans-BoldItalic.ttf"),
    "WorkSans-ExtraBold": require("./assets/fonts/WorkSans-ExtraBold.ttf"),
    "WorkSans-ExtraBoldItalic": require("./assets/fonts/WorkSans-ExtraBoldItalic.ttf"),
    "WorkSans-ExtraLight": require("./assets/fonts/WorkSans-ExtraLight.ttf"),
    "WorkSans-ExtraLightItalic": require("./assets/fonts/WorkSans-ExtraLightItalic.ttf"),
    "WorkSans-Light": require("./assets/fonts/WorkSans-Light.ttf"),
    "WorkSans-LightItalic": require("./assets/fonts/WorkSans-LightItalic.ttf"),
    "WorkSans-Italic": require("./assets/fonts/WorkSans-Italic.ttf"),
    "WorkSans-Medium": require("./assets/fonts/WorkSans-Medium.ttf"),
    "WorkSans-MediumItalic": require("./assets/fonts/WorkSans-MediumItalic.ttf"),
    "WorkSans-Regular": require("./assets/fonts/WorkSans-Regular.ttf"),
    "WorkSans-SemiBold": require("./assets/fonts/WorkSans-SemiBold.ttf"),
    "WorkSans-SemiBoldItalic": require("./assets/fonts/WorkSans-SemiBoldItalic.ttf"),
    "WorkSans-Thin": require("./assets/fonts/WorkSans-Thin.ttf"),
    "WorkSans-ThinItalic": require("./assets/fonts/WorkSans-ThinItalic.ttf"),
  });

  console.log("====================================");
  console.log(fontsLoaded);
  console.log("====================================");

  if (!assetsLoaded || !fontsLoaded) {
    return <SplashScreen />;
  }

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
