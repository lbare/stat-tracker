import React, { useRef } from 'react';
import { View, Text } from 'react-native';
import Button from '../../../components/Button';
import { Input } from '../../../components/Input';
import { styles } from './styles';
import { LinearGradient } from 'expo-linear-gradient';
import {
  setDoc,
  auth,
  db,
  doc,
  createUserWithEmailAndPassword,
} from '../../../firebase';

export const Register = ({ navigation }) => {
  const [email, setEmail] = React.useState('');
  const [password, setPassword] = React.useState('');
  const [confirmPassword, setConfirmPassword] = React.useState('');

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
    <View style={styles.container}>
      {/* Main Content */}
      <LinearGradient
        colors={['#4B79A1', '#283E51']}
        style={styles.main}
        start={{ x: 1, y: 0 }}
        end={{ x: 1, y: 1 }}
      >
        <View style={styles.middle1}>
          <Input
            title='Email'
            blurOnSubmit={false}
            secureTextEntry={false}
            keyboardType='email-address'
            textContentType='emailAddress'
            value={email}
            onChangeText={(value) => setEmail(value)}
            returnKeyType='next'
          />
          <Input
            title='Password'
            blurOnSubmit={false}
            secureTextEntry={true}
            keyboardType='default'
            textContentType='password'
            value={password}
            onChangeText={(value) => setPassword(value)}
            returnKeyType='next'
          />
          <Input
            title='Confirm Password'
            blurOnSubmit={true}
            secureTextEntry={true}
            keyboardType='default'
            textContentType='password'
            value={confirmPassword}
            onChangeText={(value) => setConfirmPassword(value)}
            returnKeyType='done'
            onSubmitEditing={onRegisterPress}
          />
        </View>
        <View style={styles.middle2}>
          <Button title='Create Account' onPress={onRegisterPress} />
          <Text
            style={styles.p}
            onPress={onLoginPress}
            suppressHighlighting={true}
          >
            Already have an account?{'\n'}SIGN IN
          </Text>
        </View>
      </LinearGradient>
    </View>
  );
};
