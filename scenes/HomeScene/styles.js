import { StatusBar, StyleSheet } from 'react-native';
import { fontSize, font, spacing, colors } from '../../styles';

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
    backgroundColor: colors.blue[900],
    padding: 20,
    margin: 10,
  },
  h1: {
    ...font.h2,
    color: 'white',
  },
  item: {
    backgroundColor: 'white',
    borderRadius: 10,
    padding: 20,
    marginVertical: 8,
    marginHorizontal: 50,
  },
  header: {
    fontSize: 32,
    paddingTop: spacing.l,
    paddingHorizontal: spacing.l,
    color: 'white',
  },
  title: {
    fontSize: 24,
    color: 'black',
  },
});
