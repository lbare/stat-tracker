import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import Auth from './Auth';
import Home from './Home';
import Details from './Details';

const { Navigator, Screen } = createStackNavigator();

const Navigation = () => (
  <NavigationContainer>
    <Navigator screenOptions={{ headerShown: false }}>
      <Screen name='Auth' component={Auth} />
      <Screen name='Home' component={Home} />
      <Screen name='Details' component={Details} />
    </Navigator>
  </NavigationContainer>
);

export default Navigation;
