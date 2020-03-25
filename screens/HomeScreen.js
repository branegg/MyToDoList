import React, {useState, useEffect} from 'react';
import SplashScreen from 'react-native-splash-screen';
import {
  View,
  Text,
  StyleSheet,
  ImageBackground,
  Image,
  TextInput,
  KeyboardAvoidingView,
  Alert,
  TouchableOpacity,
} from 'react-native';
import background from './../assets/images/background.jpg';
import logo from './../assets/images/logo.png';
import firebase from 'firebase';

export default Home = ({navigation}) => {
  useEffect(() => {
    SplashScreen.hide();
  });

  const handleLogout = () => {
    firebase
      .auth()
      .signOut()
      .then(() => {
        navigation.navigate('Loading');
      });
  };

  return (
    <KeyboardAvoidingView style={styles.container} behavior="padding" enabled>
      <ImageBackground source={background} style={styles.container}>
        <Image style={styles.logo} source={logo} />
        <Text>Add something to your list!</Text>
        <TouchableOpacity onPress={() => handleLogout()}>
          <Text>Log out</Text>
        </TouchableOpacity>
      </ImageBackground>
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    width: '100%',
    height: '100%',
  },
  logo: {
    width: 275,
    height: 113,
    resizeMode: 'contain',
    marginTop: -50,
    marginBottom: 70,
  },
});
