import React, {useEffect} from 'react';
import {SafeAreaView, StyleSheet, StatusBar, Platform} from 'react-native';
import SplashScreen from 'react-native-splash-screen';
import LoginScreen from './screens/LoginScreen';
import firebase from 'firebase/app';
import 'firebase/auth';

const firebaseConfig = {
  apiKey: 'AIzaSyBY21mBiKbh0itzfcdQqnxfMpEWl08Sp88',
  authDomain: 'mytodolist-55a23.firebaseapp.com',
  databaseURL: 'https://mytodolist-55a23.firebaseio.com',
  projectId: 'mytodolist-55a23',
  storageBucket: 'mytodolist-55a23.appspot.com',
  messagingSenderId: '607428398461',
  appId: '1:607428398461:web:bb51c68b92205bf5109014',
};

firebase.initializeApp(firebaseConfig);

const App = () => {
  useEffect(() => {
    SplashScreen.hide();
  });

  return (
    <>
      {Platform.OS === 'ios' && <StatusBar barStyle="dark-content" />}
      <LoginScreen />
    </>
  );
};

const styles = StyleSheet.create({
  wrapper: {
    flex: 1,
    justifyContent: 'center',
  },
});

export default App;
