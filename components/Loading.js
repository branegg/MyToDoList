import React, {useState, useEffect} from 'react';
import {View, ActivityIndicator, StyleSheet, Animated} from 'react-native';
import SplashScreen from 'react-native-splash-screen';

export default Loading = ({size, color, bgColor}) => {
  const [fadeAnim] = useState(new Animated.Value(0));

  useEffect(() => {
    Animated.timing(fadeAnim, {
      toValue: 1,
      duration: 300,
    }).start();
  }, []);

  return (
    <Animated.View style={{...styles.container, opacity: fadeAnim}}>
      <View style={{...styles.wrapper, backgroundColor: bgColor}}>
        <ActivityIndicator style={styles.indicator} size={size} color={color} />
      </View>
    </Animated.View>
  );
};

const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    flex: 1,
    width: '100%',
    height: '100%',
    justifyContent: 'center',
    alignItems: 'center',
    zIndex: 10,
    backgroundColor: 'rgba(255, 255, 255, 0.5)',
  },
  wrapper: {
    width: 100,
    height: 100,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 20,
  },
  indicator: {},
});
