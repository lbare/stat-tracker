import React, { useRef } from 'react';
import { View, Text } from 'react-native';
import Button from '../../../components/Button';
import { Input } from '../../../components/Input';
import { styles } from './styles';
import { LinearGradient } from 'expo-linear-gradient';

import {
  auth,
  signInWithEmailAndPassword,
  db,
  doc,
  getDoc,
} from '../../../firebase';

export const Login = ({ navigation }) => {
  const [email, setEmail] = React.useState('levi.bare@gmail.com');
  const [password, setPassword] = React.useState({
    password: 'password',
    showPassword: false,
  });

  const ref_to_input2 = useRef();

  const onSignupPress = () => {
    navigation.navigate('Register');
  };

  const onLoginPress = () => {
    signInWithEmailAndPassword(auth, email, password.password)
      .then((userCredentials) => {
        const uid = userCredentials.user.uid;
        getDoc(doc(db, 'users', uid)).then((docSnap) => {
          if (docSnap.exists()) {
            const user = docSnap.data();
            navigation.navigate('HomeScene', { user: user });
          } else {
            console.log('No such document');
          }
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
            onSubmitEditing={() => ref_to_input2.current.focus()}
          />
          <Input
            title='Password'
            blurOnSubmit={true}
            secureTextEntry={!password.showPassword}
            keyboardType='default'
            textContentType='password'
            value={password}
            onChangeText={(value) =>
              setPassword({ ...password, password: value })
            }
            returnKeyType='done'
            refInner={ref_to_input2}
            onSubmitEditing={onLoginPress}
          />
        </View>
        <View style={styles.middle2}>
          <Button title='Login' onPress={onLoginPress} />
          <Text
            style={styles.p}
            onPress={onSignupPress}
            suppressHighlighting={true}
          >
            Don't have an account?{'\n'}SIGN UP
          </Text>
        </View>
      </LinearGradient>
    </View>
  );
};
