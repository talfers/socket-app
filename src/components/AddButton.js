import React from 'react';
import { View, TouchableOpacity, Text, StyleSheet } from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';
import { customColors } from '../styles'

function AddButton({ title, onPress }) {

  return (

    <TouchableOpacity style={styles.container} onPress={() => {onPress()}}>

      <MaterialIcons name={'add'} size={30} style={styles.icon} color={customColors.secondaryGreen}/>
    </TouchableOpacity>

  )
}

const styles = StyleSheet.create({
  container: {
    justifyContent: 'center',
    alignItems: 'center'
  },
  icon: {
    marginRight: 14

  }
})


export default AddButton;
