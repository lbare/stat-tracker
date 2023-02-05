import React, { useRef } from 'react';
import { View, Text } from 'react-native';
import Button from '../../components/Button';
import { Input } from '../../components/Input';
import { styles } from './styles';
import {
  auth,
  signInWithEmailAndPassword,
  db,
  doc,
  getDoc,
} from '../../firebase';

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
            navigation.navigate('Home', { user: user });
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
      <View style={styles.main}>
        <View style={styles.middle1}>
          <Input
            title='EMAIL'
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
            title='PASSWORD'
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
        </View>
      </View>

      {/* Bottom Bar */}
      <View style={styles.bottom}>
        <Text style={styles.p}>Don't have an account?</Text>
        <Text style={styles.p} onPress={onSignupPress}>
          SIGN UP
        </Text>
      </View>
    </View>
  );
};
