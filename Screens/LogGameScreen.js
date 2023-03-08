import React from 'react';
import { useState } from 'react';
import { View, Text, Alert } from 'react-native';
import { HitLocation } from '../components/HitLocation';
import { Result } from '../components/Result';
import { Trajectory } from '../components/Trajectory';
import Stepper from 'react-native-stepper-ui';

export const LogGame = () => {
  const [active, setActive] = useState(0);

  return (
    <View className='flex flex-col items-center justify-center h-full py-5'>
      <Stepper
        active={active}
        content={content}
        onNext={() => setActive((p) => p + 1)}
        onBack={() => setActive((p) => p - 1)}
        onFinish={() => Alert.alert('Finish')}
        wrapperStyle={{
          marginBottom: 100,
        }}
        stepStyle={{
          backgroundColor: 'white',
          borderWidth: 1,
          borderColor: 'black',
        }}
        stepTextStyle={{
          color: 'black',
        }}
        buttonStyle={{
          backgroundColor: 'black',
          borderWidth: 1,
          borderRadius: 10,
          borderColor: 'black',
          width: 100,
        }}
        buttonTextStyle={{
          color: 'white',
          textAlign: 'center',
        }}
      />
    </View>
  );
};

const content = [
  <HitLocation title='Component 1' />,
  <Trajectory title='Component 2' />,
  <Result title='Component 3' />,
];
