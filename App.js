import React from 'react';
import { View, ActivityIndicator } from 'react-native';
import { Login } from './scenes/AuthScene/Login';
import {
  useFonts,
  Lexend_100Thin,
  Lexend_200ExtraLight,
  Lexend_300Light,
  Lexend_400Regular,
  Lexend_500Medium,
  Lexend_600SemiBold,
  Lexend_700Bold,
  Lexend_800ExtraBold,
  Lexend_900Black,
} from '@expo-google-fonts/lexend';
import { Register } from './scenes/AuthScene/Register';
import { HomeScene } from './scenes/HomeScene';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { colors, font } from './styles';
import { Provider as PaperProvider } from 'react-native-paper';
import { createMaterialBottomTabNavigator } from '@react-navigation/material-bottom-tabs';

const Stack = createStackNavigator();
const Tab = createMaterialBottomTabNavigator();

export default () => {
  const [fontsLoaded] = useFonts({
    Lexend_100Thin,
    Lexend_200ExtraLight,
    Lexend_300Light,
    Lexend_400Regular,
    Lexend_500Medium,
    Lexend_600SemiBold,
    Lexend_700Bold,
    Lexend_800ExtraBold,
    Lexend_900Black,
  });

  if (!fontsLoaded) {
    return (
      <View style={{ flex: 1, justifyContent: 'center' }}>
        <ActivityIndicator />
      </View>
    );
  }
  return (
    <PaperProvider>
      <NavigationContainer>
        <Stack.Screen
          name='HomeScene'
          component={HomeScene}
          options={{
            headerShown: false,
            animationEnabled: false,
            headerBackTitleVisible: false,
            headerLeft: null,
          }}
        />
        <Stack.Navigator>
          <Stack.Screen
            name='Login'
            component={Login}
            options={{
              animationEnabled: false,
              headerBackTitleVisible: false,
              headerLeft: null,
              title: 'Welcome',
              headerStyle: {
                backgroundColor: '#ffffff',
                height: 200,
              },
              headerTintColor: '#4B79A1',
              headerTitleStyle: {
                ...font.h1,
              },
            }}
          />
          <Stack.Screen
            name='Register'
            component={Register}
            options={{
              animationEnabled: false,
              headerBackTitleVisible: false,
              headerLeft: null,
              title: 'Welcome',
              headerStyle: {
                backgroundColor: '#ffffff',
                height: 200,
              },
              headerTintColor: '#4B79A1',
              headerTitleStyle: {
                ...font.h1,
              },
            }}
          />
        </Stack.Navigator>
      </NavigationContainer>
    </PaperProvider>
  );
};
