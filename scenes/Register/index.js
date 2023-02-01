import React from 'react';
import { View, Text } from 'react-native';
import Button from '../../components/Button';
import { Input } from '../../components/Input';
import { styles } from './styles';

export const Register = ({ navigation }) => {
  const [email, setEmail] = React.useState('');
  const [password, setPassword] = React.useState('');
  const [confirmPassword, setConfirmPassword] = React.useState('');

  const onLoginPress = () => {
    navigation.navigate('Login');
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
          textContentType='emailAddress'
          onChangeText={(value) => setEmail(value)}
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
        <Button title='Register' onPress={() => console.log('Pressed')} />
        <Button title='Login' onPress={onLoginPress} />
      </View>

      {/* Bottom Bar */}
      <View style={styles.bottom}></View>
    </View>
  );
};
