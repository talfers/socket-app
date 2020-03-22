import React, { useState } from 'react';
import { View, TouchableOpacity, Text, StyleSheet, Animated } from 'react-native';
import { customColors } from '../styles'

function ToggleSwitch({ onPress }) {
  const [ position, setPosition ] = useState(new Animated.ValueXY({ x: -2, y: 0 }));
  const [ isOn, setIsOn ] = useState(false);
  const handleToggle = () => {
    setIsOn(!isOn);
    Animated.spring(position, {
      toValue: { x: isOn?-2:40, y: 0 }
    }).start();
  }
  return (
    <TouchableOpacity
      activeOpacity={1}
      style={[styles.toggleContainer, {backgroundColor: isOn?customColors.secondaryGreen:customColors.secondaryDark}]}
      onPress={() => {
        handleToggle();
        onPress();
      }}
    >
      <Animated.View style={position.getLayout()}>
        <View style={styles.toggleBall}></View>
      </Animated.View>
    </TouchableOpacity>
  )
}

ToggleSwitch.defaultProps = {
  onPress: () => {}
}

const styles = StyleSheet.create({
  toggleContainer: {
    borderColor: customColors.secondaryGreen,
    borderWidth: 1,
    width: 80,
    height: 40,
    borderRadius: 40,
    zIndex: -1,
    justifyContent: 'center'
  },
  toggleBall: {
    zIndex: 1,
    backgroundColor: customColors.mainBlack,
    height: 42,
    width: 42,
    borderRadius: 40
  }
});

export default ToggleSwitch;
