import React from 'react';
import { View, ActivityIndicator } from 'react-native';
import { Login } from './scenes/Login';
import { useFonts } from 'expo-font';
import { Register } from './scenes/Register';
import { Home } from './scenes/Home';
import { NavigationContainer, StackActions } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { colors, spacing, font } from './styles';

const Stack = createStackNavigator();

export default () => {
  const [fontsLoaded] = useFonts({
    'SecularOne-Regular': require('./assets/fonts/SecularOne-Regular.ttf'),
  });

  if (!fontsLoaded) {
    return (
      <View style={{ flex: 1, justifyContent: 'center' }}>
        <ActivityIndicator />
      </View>
    );
  }
  return (
    <NavigationContainer>
      <Stack.Navigator>
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
            headerTintColor: colors.blue[900],
            headerTitleStyle: {
              ...font.h1,
            },
          }}
        />
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
            headerTintColor: colors.blue[900],
            headerTitleStyle: {
              ...font.h1,
            },
          }}
        />
        <Stack.Screen name='Home' component={Home} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};
