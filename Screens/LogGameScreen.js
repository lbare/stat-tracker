import React, { useState } from 'react';
import { View, Alert } from 'react-native';
import Stepper from 'react-native-stepper-ui';
import { HitLocation } from '../components/HitLocation';
import { Result } from '../components/Result';
import { Trajectory } from '../components/Trajectory';

export const LogGame = () => {
  const [activePage, setActivePage] = useState(0);
  const [hitLocation, setHitLocation] = useState({ x: 0, y: 0 });
  const [value, setValue] = useState('');

  const handleNext = () => setActivePage(activePage + 1);
  const handleBack = () => setActivePage(activePage - 1);

  const handleFinish = () => {
    Alert.alert('Finish');
    console.log(inputValues);
  };

  const content = [
    <HitLocation hitLocation={hitLocation} setHitLocation={setHitLocation} />,
    <Result value={value} setValue={setValue} />,
  ];

  return (
    <View className='flex flex-col items-center justify-center h-full py-5'>
      <Stepper
        active={activePage}
        content={content}
        onNext={handleNext}
        onBack={handleBack}
        onFinish={handleFinish}
        wrapperStyle={{
          marginBottom: 120,
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
