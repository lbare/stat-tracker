import { View, Text, Image, TouchableOpacity } from 'react-native';
import { styles } from './style';
import Field from '../../../assets/field';
import { useState } from 'react';
import { CrosshairSimple } from 'phosphor-react-native';
import Draggable from 'react-native-draggable';

export const HitLocation = () => {
  const [hitLocation, setHitLocation] = useState({ x: 0, y: 0 });

  const handlePress = (event) => {
    const { nativeEvent } = event;
    const { locationX, locationY } = nativeEvent;
    console.log(
      Math.round(nativeEvent.locationX),
      Math.round(nativeEvent.locationY)
    );
    setHitLocation({
      x: locationX,
      y: locationY,
    });
  };

  return (
    <TouchableOpacity
      onPress={handlePress}
      style={styles.container}
      activeOpacity={1}
    >
      <Field
        fillColor={styles.fillColor}
        strokeColor={styles.strokeColor}
        strokeWidth={styles.strokeWidth}
      />
      <View
        style={[
          {
            position: 'absolute',
            top: hitLocation.y - 100,
            left: hitLocation.x - 16,
          },
        ]}
      >
        <CrosshairSimple size={32} color='red' weight='duotone' />
      </View>
    </TouchableOpacity>
  );
};
