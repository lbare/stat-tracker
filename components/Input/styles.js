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
    flex: 1,
    display: 'flex',
    color: colors.blue[900],
    verticalAlign: 'middle',
    backgroundColor: 'white',
    borderRadius: 7,
    paddingVertical: spacing.m,
    paddingLeft: spacing.l,
    borderColor: 'transparent',
    borderWidth: 5,
    textBreakStrategy: 'simple',
  },
});
