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
  middle1: {
    paddingTop: spacing.s,
    flex: 0.53,
    paddingVertical: spacing.s,
  },
  middle2: {
    flex: 0.4,
    paddingVertical: spacing.s,
  },
  bottom: {
    flex: 0.12,
    backgroundColor: colors.blue[900],
    justifyContent: 'flex-start',
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
  input: {
    ...font.body,
    flex: 1,
    display: 'flex',
    color: colors.blue[900],
    verticalAlign: 'middle',
    backgroundColor: 'white',
    borderRadius: 7,
    paddingVertical: spacing.l,
    paddingLeft: spacing.l,
    borderColor: 'transparent',
    borderWidth: 5,
    textBreakStrategy: 'simple',
  },
});
