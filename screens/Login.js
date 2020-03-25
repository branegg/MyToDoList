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
import PasswordInput from './../components/PasswordInput';
import Colors from './../constants/Colors.js';
import firebase from 'firebase';

export default Login = ({navigation}) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  useEffect(() => {
    SplashScreen.hide();
  });

  const handleLogin = () => {
    firebase
      .auth()
      .signInWithEmailAndPassword(email, password)
      .then(() => {
        navigation.navigate('Home');
      })
      .catch(error => {
        Alert.alert(error.message);
      });
  };

  return (
    <KeyboardAvoidingView style={styles.container} behavior="padding" enabled>
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
        <View style={styles.forgottenPasswordWrapper}>
          <Text style={styles.forgottenPasswordText}>Forgotten password?</Text>
        </View>
        <TouchableOpacity onPress={() => handleLogin()}>
          <Text>Login</Text>
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
  forgottenPasswordWrapper: {
    width: '85%',
    flexDirection: 'row',
    justifyContent: 'flex-end',
    marginTop: 20,
  },
  forgottenPasswordText: {
    color: Colors.pink,
    fontSize: 10,
    fontWeight: '400',
  },
});
