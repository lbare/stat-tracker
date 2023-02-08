import { Text, View } from 'react-native';
import { TextInput } from 'react-native-paper';
import { styles } from './styles';

export const Input = ({ title, secureTextEntry = false, ...props }) => {
  return (
    <View style={styles.container}>
      {title && <Text style={styles.label}>{title}</Text>}
      <TextInput
        {...props}
        style={styles.inputText}
        contentStyle={styles.inputContainer}
      />
    </View>
  );
};
