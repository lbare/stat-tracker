import React, { useState, createContext } from 'react';
import { View } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { House, ChartLineUp, Baseball } from 'phosphor-react-native';
import { Login } from './Screens/LoginScreen';
import { Register } from './Screens/RegisterScreen';
import { LogGame } from './Screens/LogGameScreen';
import { Stats } from './Screens/StatsScreen';
import { Settings } from './Screens/SettingsScreen';
import { LogBox } from 'react-native';

LogBox.ignoreLogs(['AsyncStorage']);

const Stack = createStackNavigator();
const BottomBar = createBottomTabNavigator();

function AuthStack() {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name='Login'
        component={Login}
        options={{
          animationEnabled: false,
          headerBackTitleVisible: false,
          headerLeft: null,
          headerShown: false,
        }}
      />
      <Stack.Screen
        name='Register'
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
  return (
    <BottomBar.Navigator
      detachInactiveScreens={false}
      initialRouteName='Stats'
      screenOptions={{
        tabBarShowLabel: false,
        tabBarActiveTintColor: 'black',
        tabBarInactiveTintColor: 'gray',
        tabBarStyle: {
          backgroundColor: 'white',
          borderRadius: 20,
          marginBottom: 25,
          marginTop: 5,
          paddingTop: 30,
          height: 70,
          borderColor: '#fff',
          marginHorizontal: 20,
          position: 'absolute',
          shadowColor: '#000',
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
        name='Stats'
        component={Stats}
        options={{
          tabBarIcon: ({ color, focused }) =>
            focused ? (
              <ChartLineUp size={32} color={color} weight='fill' />
            ) : (
              <ChartLineUp size={32} color={color} />
            ),
        }}
      />
      <BottomBar.Screen
        name='LogGame'
        component={LogGame}
        options={{
          tabBarIcon: ({ focused }) =>
            focused ? (
              <View
                style={{
                  width: 80,
                  height: 80,
                  borderRadius: 100,
                  position: 'absolute',
                  shadowColor: '#000',
                  shadowOffset: {
                    width: 0,
                    height: 2,
                  },
                  bottom: -10,
                  shadowOpacity: 0.25,
                  shadowRadius: 3.84,
                  elevation: 5,
                  backgroundColor: 'red',
                }}
              >
                <Baseball size={80} color='white' />
              </View>
            ) : (
              <View
                style={{
                  width: 80,
                  height: 80,
                  borderRadius: 100,
                  position: 'absolute',
                  shadowColor: '#000',
                  shadowOffset: {
                    width: 0,
                    height: 2,
                  },
                  bottom: -10,
                  shadowOpacity: 0.25,
                  shadowRadius: 3.84,
                  elevation: 5,
                  backgroundColor: 'white',
                }}
              >
                <Baseball size={80} color='#E84444' />
              </View>
            ),
        }}
      />
      <BottomBar.Screen
        name='Settings'
        component={Settings}
        options={{
          tabBarIcon: ({ color, focused }) =>
            focused ? (
              <House size={32} color={color} weight='fill' />
            ) : (
              <House size={32} color={color} />
            ),
        }}
      />
    </BottomBar.Navigator>
  );
}

export default () => {
  const [authenticated, setAuthenticated] = useState(true);

  return (
    <NavigationContainer>
      {authenticated ? <AppStack /> : <AuthStack />}
    </NavigationContainer>
  );
};
