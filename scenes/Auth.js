import React from 'react';
import { SafeAreaView, View, TextInput, StyleSheet, Text } from 'react-native';

const Auth = () => {
  const [value, setValue] = React.useState('');

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <View style={styles.container}>
        <TextInput
          label='First Name'
          value={value}
          onChangeText={(nextValue) => setValue(nextValue)}
        />
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'space-between',
    backgroundColor: '#000',
    padding: 20,
    margin: 10,
  },
});

export default Auth;
