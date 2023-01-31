import { Text, TextInput, View } from "react-native";
import { styles } from "./styles";

export const Input = ({
  title,
  secureTextEntry = false,
  keyboardType,
  textContentType,
  value,
  onChangeText,
}) => {
  return (
    <View style={styles.input}>
      <Text style={styles.label}>{title}</Text>
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
