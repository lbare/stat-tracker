import { StyleSheet } from 'react-native';
import { fontSize, font, spacing, colors } from '../../../styles';

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    marginBottom: 100,
  },
  fillColor: {
    outfield: 'none',
    infieldDirt: 'none',
    infieldGrass: 'none',
    bases: 'white',
    home: 'white',
    mound: 'none',
    rubber: 'white',
  },
  strokeColor: {
    outfield: 'white',
    infieldDirt: 'white',
    infieldGrass: 'white',
    bases: 'white',
    home: 'white',
    mound: 'white',
    rubber: 'white',
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
  hitMarker: {
    position: 'absolute',
  },
});
