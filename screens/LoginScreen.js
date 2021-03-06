import React, {useState, useEffect} from 'react';
import {
  View,
  Text,
  StyleSheet,
  ImageBackground,
  Image,
  TextInput,
  KeyboardAvoidingView,
  Alert,
  Linking,
} from 'react-native';
import firebase from 'firebase';
import SplashScreen from 'react-native-splash-screen';

import background from './../assets/images/background.jpg';
import logo from './../assets/images/logo.png';

import PasswordInput from '../components/PasswordInput';
import Colors from './../constants/Colors.js';
import Loading from './../components/Loading';
import Button from './../components/Button';
import {TouchableOpacity} from 'react-native-gesture-handler';

export default LoginScreen = ({navigation}) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    SplashScreen.hide();
  });

  const handleLogin = () => {
    if (email) {
      setIsLoading(true);
      firebase
        .auth()
        .signInWithEmailAndPassword(email, password)
        .then(() => {
          setPassword('');
          setEmail('');
          setIsLoading(false);
          navigation.navigate('Home');
        })
        .catch(error => {
          setIsLoading(false);
          Alert.alert(error.message);
        });
    } else {
      Alert.alert('Enter your e-mail address');
    }
  };
  const handleSignUp = () => {
    navigation.navigate('SignUp');
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
          value={password}
        />
        <TouchableOpacity
          style={styles.forgotPasswordWrapper}
          onPress={() =>
            Linking.openURL(
              'https://emojipedia-us.s3.dualstack.us-west-1.amazonaws.com/thumbs/240/apple/237/shrug_1f937.png',
            )
          }>
          <Text style={styles.forgotPasswordText}>Forgot password?</Text>
        </TouchableOpacity>
        <Button
          label="Login"
          onPress={() => handleLogin()}
          style={{marginTop: 50}}
        />
        <Button
          label="Sign Up"
          onPress={() => handleSignUp()}
          bgColor={Colors.red}
          style={{marginTop: 20}}
        />
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
    color: Colors.black,
  },
  inputPassword: {
    width: '85%',
    height: 40,
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
});
