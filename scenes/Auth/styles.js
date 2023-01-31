import { StyleSheet } from "react-native";
import { fontSize, font, spacing, colors } from "../../styles";

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "space-between",
    backgroundColor: colors.blue[900],
  },
  top: {
    flex: 0.2,
    justifyContent: "center",
    paddingTop: spacing.xl,
    paddingBottom: spacing.s,
  },
  middle: {
    flex: 1,
    paddingTop: spacing.xl,
    backgroundColor: "white",
  },
  bottom: {
    flex: 0.18,
  },
  // Text
  h1: {
    ...font.h1,
    textAlign: "center",
    color: "white",
  },
  p: {
    ...font.body,
    textAlign: "center",
    color: colors.blue[900],
  },
  // Components
  input: {
    height: spacing.xl,
    margin: spacing.s,
    borderWidth: 1,
    padding: spacing.s,
  },
  button: {
    ...font.body,
    textAlign: "center",
    color: colors.blue[900],
  },
  // Icons
  eye: {
    position: "absolute",
    top: 163,
    left: 320,
  },
});
