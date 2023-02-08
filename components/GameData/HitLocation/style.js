import { StyleSheet } from 'react-native';
import { fontSize, font, spacing, colors } from '../../../styles';

export const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  top: {
    flex: 0.1,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: spacing.m,
  },
  middle: {
    flex: 1,
    paddingVertical: spacing.l,
  },
  h1: {
    ...font.h2,
    color: colors.blue[900],
  },
  bg: {
    flex: 1,
  },
});
