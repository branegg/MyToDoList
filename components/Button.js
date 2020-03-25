import React from 'react';
import {Text, TouchableOpacity, StyleSheet} from 'react-native';
import Colors from './../constants/Colors';

export default Button = ({label, onPress, bgColor, textColor, style}) => {
  return (
    <TouchableOpacity
      style={{
        ...styles.button,
        backgroundColor: bgColor || Colors.blue,
        ...style,
      }}
      onPress={onPress}>
      <Text style={{...styles.text, color: textColor || Colors.white}}>
        {label}
      </Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  button: {
    minWidth: 130,
    height: 30,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 10,
    paddingHorizontal: 10,
  },
  text: {
    fontSize: 16,
    fontWeight: 'bold',
    textTransform: 'uppercase',
    fontFamily: 'Sen-Bold',
  },
});
