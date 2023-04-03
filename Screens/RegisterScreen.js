import React, { useContext, useEffect } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  Keyboard,
  KeyboardAvoidingView,
} from "react-native";
import { register } from "../services/firebase";
import { AuthContext } from "../components/AuthContext";

const Register = ({ navigation }) => {
  const [email, setEmail] = React.useState("");
  const [password, setPassword] = React.useState("");
  const [confirmPassword, setConfirmPassword] = React.useState("");

  const user = useContext(AuthContext);

  const onLoginPress = () => navigation.navigate("Login");
  const onRegisterPress = () => {
    if (password !== confirmPassword) {
      alert("Passwords don't match.");
      return;
    }
    register(email, password);
  };

  useEffect(() => {
    if (user) navigation.navigate("Home");
  }, []);

  return (
    <KeyboardAvoidingView
      className='flex-1 justify-center bg-white'
      behavior='padding'
    >
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
          onSubmitEditing={() => Keyboard.dismiss()}
          returnKeyType='next'
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
          onSubmitEditing={() => Keyboard.dismiss()}
          onChangeText={(value) => setPassword(value)}
          returnKeyType='next'
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
          Already have an account?{"\n"}SIGN IN
        </Text>
      </View>
    </KeyboardAvoidingView>
  );
};

export default Register;
