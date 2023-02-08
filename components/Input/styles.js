import { StyleSheet } from 'react-native';
import { fontSize, font, spacing, colors } from '../../styles';

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: spacing.l,
  },
  label: {
    ...font.label,
    paddingBottom: 4,
    color: 'white',
  },
  inputContainer: {
    color: '#283E51',
    backgroundColor: 'white',
    fontFamily: fontSize[400],

    borderRadius: 8,
  },
  inputText: {
    ...font.body,
    color: '#283E51',
    backgroundColor: 'transparent',
  },
});
