import React, { useState } from 'react';
import { View, Alert, TouchableOpacity, Text } from 'react-native';
import StepIndicator from 'react-native-step-indicator';
import HitLocation from '../components/HitLocation';
import Result from '../components/Result';
import Trajectory from '../components/Trajectory';

const labels = ['Hit Location', 'Result'];

const LogGame = () => {
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
    <View className='flex flex-col h-full w-full py-5'>
      <StepIndicator
        customStyles={{
          stepIndicatorSize: 25,
          currentStepIndicatorSize: 30,
          separatorStrokeWidth: 2,
          currentStepStrokeWidth: 3,
          stepStrokeCurrentColor: '#fe7013',
          stepStrokeWidth: 3,
          stepStrokeFinishedColor: '#fe7013',
          stepStrokeUnFinishedColor: '#aaaaaa',
          separatorFinishedColor: '#fe7013',
          separatorUnFinishedColor: '#aaaaaa',
          stepIndicatorFinishedColor: '#fe7013',
          stepIndicatorUnFinishedColor: '#ffffff',
          stepIndicatorCurrentColor: '#ffffff',
          stepIndicatorLabelFontSize: 13,
          currentStepIndicatorLabelFontSize: 13,
          stepIndicatorLabelCurrentColor: '#fe7013',
          stepIndicatorLabelFinishedColor: '#ffffff',
          stepIndicatorLabelUnFinishedColor: '#aaaaaa',
          labelColor: '#999999',
          labelSize: 13,
          currentStepLabelColor: '#fe7013',
        }}
        currentPosition={0}
        labels={labels}
        stepCount={2}
      />
      <View
        className='flex-1 align-items `justify-content` max-h-96'
        style={{ overflow: 'hidden' }}
      >
        {content[activePage]}
      </View>

      <View className='flex flex-row justify-between'>
        {activePage > 0 && (
          <TouchableOpacity
            className='bg-gray-300 rounded-full p-3'
            onPress={handleBack}
          >
            <Text className='text-2xl text-center text-black'>Back</Text>
          </TouchableOpacity>
        )}
        {activePage < 1 && (
          <TouchableOpacity
            className='bg-gray-300 rounded-full p-3'
            onPress={handleNext}
          >
            <Text className='text-2xl text-center text-black'>Next</Text>
          </TouchableOpacity>
        )}
        {activePage === 1 && (
          <TouchableOpacity
            className='bg-gray-300 rounded-full p-3'
            onPress={handleFinish}
          >
            <Text className='text-2xl text-center text-black'>Finish</Text>
          </TouchableOpacity>
        )}
      </View>
    </View>
  );
};

export default LogGame;
