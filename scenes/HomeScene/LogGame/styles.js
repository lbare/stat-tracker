import { StyleSheet } from 'react-native';
import { fontSize, font, spacing, colors } from '../../../styles';

export const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  top: {
    flex: 0.3,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: spacing.m,
  },
  middle: {
    flex: 1,
    paddingVertical: spacing.l,
  },
  h1: {
    ...font.h1,
    fontSize: 50,
    color: colors.red[300],
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    bottom: -10,
    shadowOpacity: 0.3,
    shadowRadius: 5,
    elevation: 5,
  },
  bg: {
    flex: 1,
  },
});
