import React from 'react';
import { View, Text } from 'react-native';
import Button from '../../components/Button';
import { Input } from '../../components/Input';
import { styles } from './styles';
import {
  setDoc,
  addDoc,
  auth,
  db,
  collection,
  doc,
  createUserWithEmailAndPassword,
} from '../../firebase';

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
        const userRef = setDoc(doc(db, 'users', uid), data)
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
      {/* Top Bar */}
      <View style={styles.top}>
        <Text style={styles.h1}>Sign In</Text>
      </View>

      {/* Main Content */}
      <View style={styles.middle}>
        <Input
          title='EMAIL'
          keyboardType='email-address'
          value={email}
          onChangeText={(value) => setEmail(value)}
          textContentType='emailAddress'
        />
        <Input
          title='PASSWORD'
          textContentType='password'
          value={password}
          onChangeText={(value) => setPassword(value)}
        />
        <Input
          title='CONFIRM PASSWORD'
          textContentType='password'
          value={confirmPassword}
          onChangeText={(value) => setConfirmPassword(value)}
        />
        <Button title='Register' onPress={onRegisterPress} />
        <Button title='Login' onPress={onLoginPress} />
      </View>

      {/* Bottom Bar */}
      <View style={styles.bottom}></View>
    </View>
  );
};
