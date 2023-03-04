import { StyleSheet } from 'react-native';
import { fontSize, font, spacing, colors } from '../../styles';

export const styles = StyleSheet.create({
  text: {
    ...font.h2,
    fontSize: spacing.l,
    textAlign: 'center',
    color: '#385976',
    fontWeight: '900',
  },
  button: {
    backgroundColor: 'white',
    marginHorizontal: spacing.l,
    paddingVertical: spacing.m,
    borderColor: 'orange',
    borderWidth: 0,
    borderRadius: 7,
  },
});
