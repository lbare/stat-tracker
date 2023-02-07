import { StatusBar, StyleSheet } from 'react-native';
import { fontSize, font, spacing, colors } from '../../styles';

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: StatusBar.currentHeight,
    marginHorizontal: 16,
  },
  top: {
    flex: 0.1,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: spacing.m,
  },
  middle: {
    backgroundColor: colors.blue[900],
    padding: 20,
    margin: 10,
  },
  h1: {
    ...font.h2,
    color: colors.blue[900],
  },
  item: {
    backgroundColor: colors.blue[900],
    borderRadius: 10,
    padding: 20,
    marginVertical: 8,
  },
  header: {
    fontSize: 32,
  },
  title: {
    fontSize: 24,
    color: 'white',
  },
});
