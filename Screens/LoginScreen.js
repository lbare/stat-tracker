import React, { useContext, useEffect } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  TextInput,
  Keyboard,
  KeyboardAvoidingView,
} from "react-native";
import { login } from "../services/firebase";
import { AuthContext } from "../components/AuthContext";

const Login = ({ navigation }) => {
  const [email, setEmail] = React.useState("");
  const [password, setPassword] = React.useState("");

  const onRegisterPress = () => navigation.navigate("Register");
  const onLoginPress = () => {
    console.log(email, password);
    login(email, password);
  };

  const user = useContext(AuthContext);

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
          Sign In
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
          onChangeText={(value) => setEmail(value.toString())}
          onSubmitEditing={() => Keyboard.dismiss()}
          returnKeyType='next'
        />
        <TextInput
          className='bg-gray-100 border border-gray-500 mx-10 mt-5 p-4 rounded-lg'
          title='Password'
          placeholder='Password'
          blurOnSubmit={true}
          keyboardType='default'
          textContentType='password'
          value={password}
          onChangeText={(value) => setPassword(value.toString())}
          returnKeyType='done'
          onSubmitEditing={onLoginPress}
        />
        <TouchableOpacity
          className='bg-blue-500 mx-10 mt-5 py-5 rounded-lg'
          onPress={onLoginPress}
        >
          <Text className='text-xl text-center text-white'>Login</Text>
        </TouchableOpacity>
        <Text
          className='mt-5 text-center text-20 text-blue-900 text-sm'
          onPress={onRegisterPress}
          suppressHighlighting={true}
        >
          Don't have an account?{"\n"}SIGN UP
        </Text>
      </View>
    </KeyboardAvoidingView>
  );
};

export default Login;
