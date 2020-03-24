/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */

import React, {useEffect} from 'react';
import {SafeAreaView, StyleSheet, StatusBar, Platform} from 'react-native';
import SplashScreen from 'react-native-splash-screen';

const App = () => {
  useEffect(() => {
    SplashScreen.hide();
  });

  return (
    <>
      {Platform.OS === 'ios' && <StatusBar barStyle="dark-content" />}
      <SafeAreaView />
    </>
  );
};

const styles = StyleSheet.create({});

export default App;
