import React, {useEffect} from 'react';
import {View, Text, ActivityIndicator, StyleSheet} from 'react-native';
import firebase from 'firebase';

import Colors from './../constants/Colors';
import Loading from './../components/Loading';

export default LoadingScreen = ({navigation}) => {
  useEffect(() => {
    firebase.auth().onAuthStateChanged(user => {
      user ? navigation.navigate('Home') : navigation.navigate('Login');
    });
  });

  return (
    <View style={styles.container}>
      <Loading
        size="large"
        color={Colors.red}
        bgColor={Colors.transparentBlue}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
