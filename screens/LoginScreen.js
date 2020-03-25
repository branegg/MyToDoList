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
import firebase from 'firebase';

import background from './../assets/images/background.jpg';
import logo from './../assets/images/logo.png';

import PasswordInput from '../components/PasswordInput';
import Colors from './../constants/Colors.js';
import Loading from './../components/Loading';

export default Login = ({navigation}) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    SplashScreen.hide();
  });

  const handleLogin = () => {
    setIsLoading(true);
    firebase
      .auth()
      .signInWithEmailAndPassword(email, password)
      .then(() => {
        setIsLoading(false);
        navigation.navigate('Home');
      })
      .catch(error => {
        Alert.alert(error.message);
      });
  };

  return (
    <KeyboardAvoidingView style={styles.container} behavior="padding" enabled>
      {isLoading && (
        <Loading
          size="large"
          color={Colors.red}
          bgColor={Colors.transparentBlue}
        />
      )}
      <ImageBackground source={background} style={styles.container}>
        <Image style={styles.logo} source={logo} />
        <TextInput
          style={styles.input}
          onChangeText={email => setEmail(email)}
          placeholder="E-mail"
          placeholderTextColor={Colors.pink}
          value={email}
        />
        <PasswordInput
          style={styles.inputPassword}
          placeholder="Password"
          placeholderTextColor={Colors.pink}
          setPassword={password => setPassword(password)}
        />
        <View style={styles.forgotPasswordWrapper}>
          <Text style={styles.forgotPasswordText}>Forgot password?</Text>
        </View>
        <TouchableOpacity
          style={styles.loginButton}
          onPress={() => handleLogin()}>
          <Text style={styles.loginText}>Login</Text>
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
  input: {
    width: '85%',
    height: 40,
    borderColor: Colors.blue,
    borderRadius: 10,
    borderWidth: 2,
    paddingHorizontal: 10,
    marginBottom: 20,
    fontFamily: 'Sen-Regular',
  },
  inputPassword: {
    width: '85%',
    height: 40,
    display: 'flex',
    borderColor: Colors.blue,
    borderRadius: 10,
    borderWidth: 2,
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems: 'center',
  },
  forgotPasswordWrapper: {
    width: '85%',
    flexDirection: 'row',
    justifyContent: 'flex-end',
    marginTop: 15,
  },
  forgotPasswordText: {
    color: Colors.pink,
    fontSize: 10,
    fontWeight: '400',
    textDecorationLine: 'underline',
    fontFamily: 'Sen-Regular',
  },
  loginButton: {
    width: 130,
    height: 30,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: Colors.blue,
    borderRadius: 10,
    marginTop: 50,
  },
  loginText: {
    color: Colors.white,
    fontSize: 16,
    fontWeight: 'bold',
    textTransform: 'uppercase',
    fontFamily: 'Sen-Bold',
  },
});
