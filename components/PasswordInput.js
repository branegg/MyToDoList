import React, {useState} from 'react';
import {
  View,
  TextInput,
  Image,
  TouchableWithoutFeedback,
  StyleSheet,
} from 'react-native';
import eyeIcon from './../assets/images/eye-icon.png';
import Colors from './../constants/Colors';

export default PasswordInput = ({
  style,
  placeholder,
  placeholderTextColor,
  setPassword,
  value,
}) => {
  const [isVisible, changeVisibility] = useState(false);

  return (
    <View style={style}>
      <TextInput
        placeholder={placeholder}
        placeholderTextColor={placeholderTextColor}
        style={styles.input}
        secureTextEntry={!isVisible}
        onChangeText={password => {
          setPassword(password);
        }}
        value={value}
      />
      <TouchableWithoutFeedback
        onPress={() => changeVisibility(prevState => !prevState)}>
        <Image
          source={eyeIcon}
          style={isVisible ? styles.eyeIconActive : styles.eyeIcon}
        />
      </TouchableWithoutFeedback>
    </View>
  );
};

const styles = StyleSheet.create({
  eyeIcon: {opacity: 0.6, height: 17, width: '10%', resizeMode: 'contain'},
  eyeIconActive: {opacity: 1, height: 17, width: '10%', resizeMode: 'contain'},
  input: {
    width: '89%',
    paddingHorizontal: 10,
    color: Colors.black,
  },
});
