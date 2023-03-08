import { View, Text, Image, TouchableOpacity } from 'react-native';
import Field from './Field';
import { useState } from 'react';
import { CrosshairSimple } from 'phosphor-react-native';
import { StyleSheet } from 'react-native';

export const HitLocation = ({ hitLocation, setHitLocation }) => {
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
        options={{
          outfield: {
            fillColor: 'none',
            strokeColor: 'black',
            strokeWidth: 10,
          },
          infieldDirt: {
            fillColor: 'none',
            strokeColor: 'black',
            strokeWidth: 10,
          },
          infieldGrass: {
            fillColor: 'none',
            strokeColor: 'black',
            strokeWidth: 10,
          },
          bases: {
            fillColor: 'black',
            strokeColor: 'black',
            strokeWidth: 4,
          },
          home: {
            fillColor: 'black',
            strokeColor: 'black',
            strokeWidth: 4,
          },
          mound: {
            fillColor: 'none',
            strokeColor: 'black',
            strokeWidth: 10,
          },
          rubber: {
            fillColor: 'black',
            strokeColor: 'black',
            strokeWidth: 3,
          },
        }}
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

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    marginBottom: 100,
  },
  fillColor: {
    outfield: 'none',
    infieldDirt: 'none',
    infieldGrass: 'none',
    bases: 'white',
    home: 'white',
    mound: 'none',
    rubber: 'white',
  },
  strokeColor: {
    outfield: 'white',
    infieldDirt: 'white',
    infieldGrass: 'white',
    bases: 'white',
    home: 'white',
    mound: 'white',
    rubber: 'white',
  },
  strokeWidth: {
    outfield: 10,
    infieldDirt: 10,
    infieldGrass: 10,
    bases: 4,
    home: 4,
    mound: 10,
    rubber: 3,
  },
  hitMarker: {
    position: 'absolute',
  },
});
