import React, { useState, useEffect } from "react";
import { View } from "react-native";
import { NavigationContainer, useNavigation } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import {
  House,
  ChartLineUp,
  Baseball,
  PlusCircle,
  CalendarPlus,
} from "phosphor-react-native";
import Login from "./Screens/LoginScreen";
import Register from "./Screens/RegisterScreen";
import LogAtBatScreen from "./Screens/LogAtBatScreen";
import AddGameScreen from "./Screens/AddGameScreen";
import Stats from "./Screens/StatsScreen";
import Settings from "./Screens/SettingsScreen";
import AddScreen from "./Screens/AddScreen";
import { onAuthStateChanged, auth, db, doc, getDoc } from "./services/firebase";
import { AuthContext } from "./components/AuthContext";
import { FloatingAction } from "react-native-floating-action";

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
          name="Settings"
          component={Settings}
          options={{
            tabBarIcon: ({ color, focused }) =>
              focused ? (
                <House size={40} color={color} weight="fill" />
              ) : (
                <House size={40} color={color} />
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
    <AuthContext.Provider value={userData}>
      <NavigationContainer>
        {!user ? <AppStack /> : <AuthStack />}
      </NavigationContainer>
    </AuthContext.Provider>
  );
}
