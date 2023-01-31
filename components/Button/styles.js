import { StyleSheet } from "react-native";
import { fontSize, font, spacing, colors } from "../../styles";

export const styles = StyleSheet.create({
  text: {
    ...font.h2,
    textAlign: "center",
    color: "white",
  },
  button: {
    backgroundColor: colors.blue[500],
    marginHorizontal: spacing.m,
    paddingVertical: spacing.xl,
    borderRadius: 7,
  },
});