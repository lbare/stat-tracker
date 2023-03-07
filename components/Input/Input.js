import { Text, View, TextInput } from 'react-native';
import { styles } from './styles';

export const Input = ({
  title,
  blurOnSubmit,
  refInner = null,
  secureTextEntry = false,
  keyboardType,
  textContentType,
  value,
  onChangeText,
  returnKeyType,
  onSubmitEditing,
}) => {
  return (
    <View style={styles.container}>
      <Text style={styles.label}>{title}</Text>
      <TextInput
        ref={refInner}
        blurOnSubmit={blurOnSubmit}
        multiline={false}
        returnKeyType={returnKeyType}
        onSubmitEditing={onSubmitEditing}
        secureTextEntry={secureTextEntry}
        keyboardType={keyboardType}
        textContentType={textContentType}
        value={value}
        onChangeText={onChangeText}
        style={styles.input}
      />
    </View>
  );
};
