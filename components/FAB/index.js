import * as React from 'react';
import { FAB } from 'react-native-paper';
import { styles } from './styles';

export const FloatingButton = ({ navigation }) => (
  <FAB icon='plus' style={styles.fab} onPress={() => console.log('Pressed')} />
);
