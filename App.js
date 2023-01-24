import React from 'react';
import { StyleSheet, View } from 'react-native';
import {
  ApplicationProvider,
  IconRegistry,
  Layout,
  Text,
} from '@ui-kitten/components';
import * as eva from '@eva-design/eva';
import { EvaIconsPack } from '@ui-kitten/eva-icons';
import { Button } from '@ui-kitten/components';
import { default as theme } from './theme.json';
import { AppNavigator } from './scenes/navigation.component';

export default () => (
  <>
    
    <IconRegistry icons={EvaIconsPack} />
    <ApplicationProvider {...eva} theme={{ ...eva.dark, ...theme }}>
      <AppNavigator />
    </ApplicationProvider>
  </>
);
