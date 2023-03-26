import React, { useRef } from 'react';
import { View, Text, TextInput, TouchableOpacity } from 'react-native';
import {
  setDoc,
  auth,
  db,
  doc,
  createUserWithEmailAndPassword,
} from '../firebase';

const Register = ({ navigation }) => {
  const [email, setEmail] = React.useState('');
  const [password, setPassword] = React.useState('');
  const [confirmPassword, setConfirmPassword] = React.useState('');

  const ref_to_input2 = useRef();
  const ref_to_input3 = useRef();

  const onLoginPress = () => {
    navigation.navigate('Login');
  };

  const onRegisterPress = () => {
    if (password !== confirmPassword) {
      alert("Passwords don't match.");
      return;
    }

    createUserWithEmailAndPassword(auth, email, password)
      .then((response) => {
        const uid = response.user.uid;
        const data = {
          uid: uid,
          email,
        };
        setDoc(doc(db, 'users', uid), data)
          .then(navigation.navigate('HomeScene', { user: data }))
          .catch((error) => {
            alert(error);
          });
      })
      .catch((error) => {
        alert(error);
      });
  };

  return (
    <View className='flex-1 justify-center bg-white'>
      <View className='h-1/4'>
        <Text className='text-7xl pb-20 font-black text-center text-blue-500 pt-1'>
          Sign Up
        </Text>
      </View>
      <View className='h-1/4'>
        <TextInput
          className='bg-gray-100 border border-gray-500 mx-10 p-4 rounded-lg'
          title='Email'
          placeholder='Email'
          blurOnSubmit={false}
          secureTextEntry={false}
          keyboardType='email-address'
          textContentType='emailAddress'
          value={email}
          onChangeText={(value) => setEmail(value)}
          returnKeyType='next'
          onSubmitEditing={() => ref_to_input2.current.focus()}
        />
        <TextInput
          className='bg-gray-100 border border-gray-500 mx-10 mt-5 p-4 rounded-lg'
          title='Password'
          placeholder='Password'
          blurOnSubmit={false}
          secureTextEntry={true}
          keyboardType='default'
          textContentType='password'
          value={password}
          onChangeText={(value) => setPassword(value)}
          returnKeyType='next'
          refInner={ref_to_input2}
          onSubmitEditing={() => ref_to_input3.current.focus()}
        />
        <TextInput
          className='bg-gray-100 border border-gray-500 mx-10 mt-5 p-4 rounded-lg'
          title='Confirm Password'
          placeholder='Confirm Password'
          blurOnSubmit={true}
          secureTextEntry={true}
          keyboardType='default'
          textContentType='password'
          value={confirmPassword}
          onChangeText={(value) => setConfirmPassword(value)}
          returnKeyType='done'
          refInner={ref_to_input3}
          onSubmitEditing={onRegisterPress}
        />
        <TouchableOpacity
          className='bg-blue-500 mx-10 mt-5 py-5 rounded-lg'
          onPress={onRegisterPress}
        >
          <Text className='text-xl text-center text-white'>Create Account</Text>
        </TouchableOpacity>
        <Text
          className='mt-5 text-center text-20 text-blue-900 text-sm'
          onPress={onLoginPress}
          suppressHighlighting={true}
        >
          Already have an account?{'\n'}SIGN IN
        </Text>
      </View>
    </View>
  );
};

export default Register;
