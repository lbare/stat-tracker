import React from 'react';
import { View, Text, TouchableOpacity, KeyboardAvoidingView } from 'react-native';
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
import { font } from '../../styles';

const EyeIcon = ({ password }) => {
  return password.showPassword ? (
    <Eye size={32} color='red' />
  ) : (
    <EyeSlash size={32} color='red' />
  );
};

export const Login = ({ navigation }) => {
  const [email, setEmail] = React.useState('test@gmail.com');
  const [password, setPassword] = React.useState({
    password: 'aksjdfsafd',
    showPassword: false,
  });

  const onRegistrationPress = () => {
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
        <View style={styles.middle}>
          <Input
            title='EMAIL'
            keyboardType='email-address'
            value={email}
            textContentType='emailAddress'
            onChangeText={(value) => setEmail(value)}
          />
          <Input
            title='PASSWORD'
            secureTextEntry={!password.showPassword}
            textContentType='password'
            value={password.password}
            onChangeText={(value) =>
              setPassword({ ...password, password: value })
            }
          />
        </View>
        <TouchableOpacity
          style={styles.eye}
          onPress={() =>
            setPassword({ ...password, showPassword: !password.showPassword })
          }
        >
          <EyeIcon password={password} />
        </TouchableOpacity>
        <View style={styles.middle}>
          <Button title='Login' onPress={onLoginPress} />
        </View>
      </View>

      {/* Bottom Bar */}
      <View style={styles.bottom}>
        <Text style={styles.p}>Already have an account?</Text>
        <Text style={styles.p} onPress={onRegistrationPress}>SIGN UP</Text>
      </View>
    </View>
  );
};
