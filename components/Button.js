import { Pressable, StyleSheet, Text } from "react-native";

const Button = ({ title, onPress }) => {
  return (
    <Pressable style={styles.button} onPress={onPress}>
      <Text style={styles.text}>{title}</Text>
    </Pressable>
  );
};

const styles = StyleSheet.create({
  text: {
    fontFamily: "SecularOne-Regular",
    textAlign: "center",
    fontSize: 36,
    color: "#FFF8DE",
  },
  button: {
    display: "block",
    backgroundColor: "#379F47",
    marginHorizontal: "3%",
    paddingVertical: 30,
    borderRadius: 7,
  },
});

export default Button;
