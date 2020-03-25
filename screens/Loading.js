import React, {useEffect} from 'react';
import {View, Text, ActivityIndicator, StyleSheet} from 'react-native';
import firebase from 'firebase';

export default Loading = ({navigation}) => {
  useEffect(() => {
    firebase.auth().onAuthStateChanged(user => {
      user ? navigation.navigate('Home') : navigation.navigate('Login');
    });
  });

  return (
    <View style={styles.container}>
      <Text>Loading</Text>
      <ActivityIndicator size="large" />
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
