import React, {useState, useEffect} from 'react';
import {
  View,
  ScrollView,
  Text,
  StyleSheet,
  ImageBackground,
  Image,
  TextInput,
  KeyboardAvoidingView,
  Alert,
  TouchableOpacity,
  SafeAreaView,
} from 'react-native';
import firebase from 'firebase';
import SplashScreen from 'react-native-splash-screen';

import background from './../assets/images/background.jpg';
import logo from './../assets/images/logo.png';

import Colors from './../constants/Colors';
import Button from './../components/Button';

export default HomeScreen = ({navigation}) => {
  let uid;

  if (firebase.auth().currentUser) {
    uid = firebase.auth().currentUser.uid;
  }

  const [isLoading, setIsLoading] = useState(true);
  const [tasks, setTasks] = useState({});
  const [text, setText] = useState('');
  const [username, setUsername] = useState('');

  useEffect(() => {
    SplashScreen.hide();

    firebase
      .database()
      .ref(`users/${uid}`)
      .once('value')
      .then(snapshot => {
        setUsername(snapshot.val().username);
      });

    const tasksRef = firebase.database().ref('tasks/');
    tasksRef
      .orderByChild('user')
      .equalTo(uid)
      .on('value', snapshot => {
        setTasks(snapshot.val());
        setIsLoading(false);
      });
  }, []);

  const addTask = () => {
    if (text) {
      setText('');
      setIsLoading(true);
      firebase
        .database()
        .ref('tasks/')
        .push({
          user: uid,
          text: text,
        })
        .then(() => {
          setIsLoading(false);
        })
        .catch(error => {
          setIsLoading(false);
          Alert.alert(error.message);
        });
    } else {
      Alert.alert("Enter the task's description");
    }
  };

  const deleteTask = key => {
    Alert.alert(
      'Are you sure?',
      `It's irreversible!`,
      [
        {
          text: 'Yes',
          onPress: () => {
            firebase
              .database()
              .ref(`tasks/${key}`)
              .remove();
          },
        },
        {
          text: 'Cancel',
          style: 'cancel',
        },
      ],
      {cancelable: true},
    );
  };

  const handleLogout = () => {
    setIsLoading(true);
    firebase
      .auth()
      .signOut()
      .then(() => {
        setIsLoading(false);
        navigation.navigate('Login');
      });
  };

  const renderTasks = () =>
    tasks &&
    Object.keys(tasks).map(key => (
      <View key={key} style={styles.taskWrapper}>
        <Text style={styles.taskText}>{tasks[key].text}</Text>
        <TouchableOpacity
          style={styles.deleteButton}
          onPress={() => deleteTask(key)}>
          <Text style={styles.deleteText}>X</Text>
        </TouchableOpacity>
      </View>
    ));

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
        <SafeAreaView style={styles.container}>
          <View style={styles.header}>
            <Image style={styles.logo} source={logo} resizeMode="center" />
            <View style={styles.profile}>
              <Text style={styles.username}>Hi {username}!</Text>
              <Button label="Log out" onPress={() => handleLogout()} />
            </View>
          </View>
          <ScrollView style={styles.tasks}>{renderTasks()}</ScrollView>
          <TextInput
            style={styles.input}
            onChangeText={task => setText(task)}
            placeholder="Your next task"
            placeholderTextColor={Colors.pink}
            value={text}
          />
          <Button label="Add" onPress={() => addTask()} bgColor={Colors.red} />
        </SafeAreaView>
      </ImageBackground>
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'flex-start',
    alignItems: 'center',
    width: '100%',
    height: '100%',
  },
  header: {
    width: '90%',
    maxWidth: '90%',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  profile: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    alignItems: 'center',
    flexWrap: 'wrap',
  },
  username: {
    fontFamily: 'Sen-Regular',
    fontSize: 14,
    color: Colors.red,
    marginRight: 15,
  },
  logo: {
    width: 100,
    height: 60,
  },
  input: {
    width: '85%',
    height: 40,
    borderColor: Colors.blue,
    borderRadius: 10,
    borderWidth: 2,
    paddingHorizontal: 10,
    marginVertical: 20,
    fontFamily: 'Sen-Regular',
    color: Colors.black,
  },
  tasks: {
    width: '80%',
    height: '40%',
    borderWidth: 2,
    borderRadius: 10,
    borderColor: Colors.blue,
    marginTop: 10,
  },
  taskWrapper: {
    width: '100%',
    minHeight: 50,
    justifyContent: 'space-between',
    alignItems: 'center',
    borderBottomColor: Colors.blue,
    borderBottomWidth: 2,
    flexDirection: 'row',
    padding: 10,
  },
  taskText: {
    fontSize: 16,
    fontFamily: 'Sen-Regular',
    color: Colors.red,
    maxWidth: '85%',
  },
  deleteButton: {
    width: 30,
    height: 30,
    backgroundColor: Colors.red,
    borderRadius: 10,
    justifyContent: 'center',
    alignItems: 'center',
  },
  deleteText: {
    color: Colors.white,
    fontFamily: 'Sen-Bold',
    fontSize: 20,
  },
});
