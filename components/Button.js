import { Pressable, Text } from 'react-native';
const Button = ({ title, onPress }) => {
  return (
    <Pressable className='bg-white mx-30 py-20' onPress={onPress}>
      <Text className='text-30 text-center text-white'>{title}</Text>
    </Pressable>
  );
};

export default Button;
