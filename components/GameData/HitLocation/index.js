import { View, Text, Image } from 'react-native';
import { styles } from './style';
import Field from '../../../assets/field';

export const HitLocation = () => {
  return (
    <View style={styles.container}>
      <Field
        fillColor={styles.fillColor}
        strokeColor={styles.strokeColor}
        strokeWidth={styles.strokeWidth}
      />
    </View>
  );
};
