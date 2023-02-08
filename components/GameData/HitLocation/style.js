import { StyleSheet } from 'react-native';
import { fontSize, font, spacing, colors } from '../../../styles';

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    marginBottom: 100,
  },
  fillColor: {
    outfield: '#71A075',
    infieldDirt: '#FFDAA2',
    infieldGrass: '#71A075',
    bases: 'black',
    home: 'black',
    mound: '#FFDAA2',
    rubber: 'black',
  },
  strokeColor: {
    outfield: 'black',
    infieldDirt: 'black',
    infieldGrass: 'black',
    bases: 'black',
    home: 'black',
    mound: 'black',
    rubber: 'black',
  },
  strokeWidth: {
    outfield: 10,
    infieldDirt: 10,
    infieldGrass: 10,
    bases: 4,
    home: 4,
    mound: 10,
    rubber: 3,
  },
});
