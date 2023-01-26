import { Text, StyleSheet, TextInput, View } from "react-native";

const Input = ({
  title,
  secureTextEntry = false,
  keyboardType,
  textContentType,
  value,
  onChangeText,
}) => {
  return (
    <View style={styles.input}>
      <Text style={styles.header}>{title}</Text>
      <TextInput
        secureTextEntry={secureTextEntry}
        keyboardType={keyboardType}
        textContentType={textContentType}
        value={value}
        onChangeText={onChangeText}
        style={styles.body}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  header: {
    fontFamily: "SecularOne-Regular",
    fontSize: 16,
    color: "#2D424F",
    position: "absolute",
    bottom: 46,
    left: 2,
  },
  body: {
    fontFamily: "SecularOne-Regular",
    fontSize: 20,
    color: "#FFF8DE",
    paddingVertical: 5,
    paddingLeft: 15,
  },
  input: {
    flex: 0.1,
    justifyContent: "space-between",
    backgroundColor: "#2D424F",
    margin: "5%",
    padding: 10,
    borderRadius: 7,
  },
});

export default Input;
