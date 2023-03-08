import { useState } from 'react';
import { View, Text, TextInput } from 'react-native';

export const Result = ({ value, setValue }) => {
  return (
    <View>
      <TextInput
        className='bg-gray-100 border border-gray-500 mx-10 p-4 rounded-lg'
        title='Result'
        placeholder='Result'
        blurOnSubmit={false}
        secureTextEntry={false}
        value={value}
        onChangeText={(value) => setValue(value)}
      />
    </View>
  );
};
