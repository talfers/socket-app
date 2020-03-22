import React, { useState, useContext } from 'react';
import { View, Text, TouchableOpacity, TextInput, StyleSheet } from 'react-native';
import { customColors } from '../styles'

function Button({title, onPress, disabled}) {
  return (
    <TouchableOpacity onPress={() => onPress()} style={[styles.container, disabled?{opacity: 0.4}:null]}>
      <View><Text style={{fontSize: 20, color: customColors.mainBlack}}>{title}</Text></View>
    </TouchableOpacity>
  )
}

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 8,
    marginHorizontal: 10,
    marginVertical: 16,
    backgroundColor: customColors.secondaryGreen,
    paddingHorizontal: 24,
    paddingVertical: 16,

  }
})


export default Button;
