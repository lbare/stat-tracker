import { StyleSheet } from 'react-native';
import { fontSize, font, spacing, colors } from '../../styles';

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
  },
  main: {
    borderTopLeftRadius: 50,
    backgroundColor: colors.blue[900],
    flex: 1,
    paddingVertical: spacing.m,
  },
  middle: {
    flex: 0.4,

    borderColor: 'red',
    borderWidth: 0,
    paddingVertical: spacing.s,
  },
  bottom: {
    flex: 0.18,
    backgroundColor: colors.blue[900],
    justifyContent: 'center',
  },
  // Text
  h1: {
    ...font.h1,
    textAlign: 'center',
    color: 'white',
  },
  p: {
    ...font.body,
    fontSize: fontSize.s,
    textAlign: 'center',
    color: 'white',
  },
  // Icons
  eye: {
    position: 'absolute',
    right: 45,
    bottom: 355,
    zIndex: 4,
  },
});
