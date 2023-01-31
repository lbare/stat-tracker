import { StyleSheet } from "react-native";
import { fontSize, font, spacing, colors } from "../../styles";

export const styles = StyleSheet.create({
  label: {
    ...font.body,
    color: colors.blue[900],
    position: "absolute",
    bottom: 46,
    left: 2,
  },
  body: {
    ...font.body,
    color: "white",
    paddingVertical: spacing.xs,
    paddingLeft: spacing.m,
  },
  input: {
    flex: 0.1,
    backgroundColor: colors.blue[900],
    margin: spacing.m,
    padding: spacing.s,
    borderRadius: 7,
  },
});
