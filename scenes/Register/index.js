import React, { useRef } from 'react';
import { View, Text } from 'react-native';
import Button from '../../components/Button';
import { Input } from '../../components/Input';
import { styles } from './styles';
import {
  setDoc,
  auth,
  db,
  doc,
  createUserWithEmailAndPassword,
} from '../../firebase';

export const Register = ({ navigation }) => {
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
          .then(navigation.navigate('Home', { user: data }))
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
      <View style={styles.main}>
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
          <Input
            title='Confirm Password'
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
        </View>
        <View style={styles.middle2}>
          <Button title='Create Account' onPress={onRegisterPress} />
        </View>
      </View>

      {/* Bottom Bar */}
      <View style={styles.bottom}>
        <Text style={styles.p}>Already have an account?</Text>
        <Text style={styles.p} onPress={onLoginPress}>
          SIGN IN
        </Text>
      </View>
    </View>
  );
};
