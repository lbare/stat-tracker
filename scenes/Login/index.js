import React, { useRef } from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { Eye, EyeSlash } from 'phosphor-react-native';
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
import { colors, font } from '../../styles';

const EyeIcon = ({ password }) => {
  return password.showPassword ? (
    <Eye size={32} color={colors.blue[900]} />
  ) : (
    <EyeSlash size={32} color={colors.blue[900]} />
  );
};

export const Login = ({ navigation }) => {
  const [email, setEmail] = React.useState('');
  const [password, setPassword] = React.useState({
    password: '',
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
        console.log('SUCCESS', uid);
        const docRef = doc(db, 'users', uid);
        console.log(docRef);
        const docSnap = getDoc(docRef);

        if (docSnap === undefined) {
          console.log('Document data:', docSnap.data());
        } else {
          console.log('No document exists');
        }

        // const usersRef = firebase.firestore().collection('users');
        // usersRef
        //   .doc(uid)
        //   .get()
        //   .then((firestoreDocument) => {
        //     if (!firestoreDocument.exists) {
        //       alert('User does not exist anymore.');
        //       return;
        //     }
        //     const user = firestoreDocument.data();
        //     navigation.navigate('Home', { user: user });
        //   })
        //   .catch((error) => {
        //     alert(error);
        //   });
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
        {/* <TouchableOpacity
          style={styles.eye}
          onPress={() =>
            setPassword({ ...password, showPassword: !password.showPassword })
          }
        >
          <EyeIcon password={password} />
        </TouchableOpacity> */}
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
