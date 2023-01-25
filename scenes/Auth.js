import React from 'react';
import { SafeAreaView, View } from 'react-native';
import {
  Button,
  Divider,
  Layout,
  TopNavigation,
  Text,
} from '@ui-kitten/components';

const Auth = () => {
  return (
    <SafeAreaView style={{ flex: 1 }}>
      <TopNavigation title='Login' alignment='center' />
      <Divider />
      <Layout
        style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}
      >
        <Text category='h1'>Auth</Text>
      </Layout>
    </SafeAreaView>
  );
};

export default Auth;
