import React, { useState, useContext } from 'react';
import { View, Text, TouchableOpacity, TextInput, StyleSheet } from 'react-native';
import { customColors } from '../styles'

function Title({title, size}) {
  return (
    <View style={styles.container}>
      <Text style={[ styles.text, { fontSize: size?size:30 } ]}>{title}</Text>
    </View>

  )
}

const styles = StyleSheet.create({
  container: {
    marginVertical: 6,
  },
  text: {
    color: customColors.mainGreen
  }
})


export default Title;
