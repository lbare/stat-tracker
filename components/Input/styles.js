import { StyleSheet } from 'react-native';
import { fontSize, font, spacing, colors } from '../../styles';

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    paddingHorizontal: spacing.l,
    paddingVertical: spacing.m,
  },
  label: {
    ...font.label,
    justifyContent: 'center',
    color: 'white',
  },
  input: {
    ...font.body,
    color: colors.blue[900],
    backgroundColor: 'white',
    borderRadius: 7,
    paddingLeft: spacing.l,
    paddingBottom: spacing.l,
    paddingTop: spacing.m,
  },
});
