import React from 'react';
import { View, TextInput, Text } from 'react-native';

const Auth = ({ styles }) => {
  const [value, setValue] = React.useState('');

  return (
    <View style={styles.container}>
      <View style={styles.topBar}>
        <Text style={styles.h1}>Sign In</Text>
      </View>
      <View style={styles.middle}>
        <TextInput
          label='First Name'
          value={value}
          onChangeText={(nextValue) => setValue(nextValue)}
        />
        <Text style={styles.p}>Test</Text>
      </View>
      <View style={styles.topBar}></View>
    </View>
  );
};

export default Auth;
