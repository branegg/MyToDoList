import {AppRegistry} from 'react-native';
import App from './App';
import {name as appName} from './app.json';
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

AppRegistry.registerComponent(appName, () => App);
