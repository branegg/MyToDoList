import React, {useEffect} from 'react';
import {SafeAreaView, StyleSheet, StatusBar, Platform} from 'react-native';
import SplashScreen from 'react-native-splash-screen';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import Login from './screens/Login';
import Loading from './screens/Loading';
import Home from './screens/Home';
import firebase from 'firebase';

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
  const Stack = createStackNavigator();

  return (
    <NavigationContainer>
      {Platform.OS === 'ios' ? (
        <StatusBar barStyle="dark-content" />
      ) : (
        <StatusBar barStyle="light-content" backgroundColor="#1F2C64" />
      )}
      <Stack.Navigator headerMode="none">
        <Stack.Screen name="Loading" component={Loading} />
        <Stack.Screen name="Login" component={Login} />
        <Stack.Screen name="Home" component={Home} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

const styles = StyleSheet.create({
  wrapper: {
    flex: 1,
    justifyContent: 'center',
  },
});

export default App;
