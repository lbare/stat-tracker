import { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity } from 'react-native';

const Result = ({ value, setValue }) => {
  return (
    <View className='flex-1 w-full justify-center'>
      <View className='h-1/4'>
        <Text className='text-7xl pb-20 font-black text-center text-blue-500 pt-1'>
          Result
        </Text>
      </View>
      <View className='h-1/4'>
        <TouchableOpacity
          className='bg-gray-100 border border-gray-500 mx-10 p-4 rounded-lg'
          onPress={() => setValue('single')}
        >
          <Text className='text-xl text-center text-black'>Single</Text>
        </TouchableOpacity>
        <TouchableOpacity
          className='bg-gray-100 border border-gray-500 mx-10 mt-5 p-4 rounded-lg'
          onPress={() => setValue('double')}
        >
          <Text className='text-xl text-center text-black'>Double</Text>
        </TouchableOpacity>
        <TouchableOpacity
          className='bg-gray-100 border border-gray-500 mx-10 mt-5 p-4 rounded-lg'
          onPress={() => setValue('triple')}
        >
          <Text className='text-xl text-center text-black'>Triple</Text>
        </TouchableOpacity>
        <TouchableOpacity
          className='bg-gray-100 border border-gray-500 mx-10 mt-5 p-4 rounded-lg'
          onPress={() => setValue('home run')}
        >
          <Text className='text-xl text-center text-black'>Home Run</Text>
        </TouchableOpacity>
        <TouchableOpacity
          className='bg-gray-100 border border-gray-500 mx-10 mt-5 p-4 rounded-lg'
          onPress={() => setValue('out')}
        >
          <Text className='text-xl text-center text-black'>Out</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default Result;
