import React, { useState, useContext } from 'react';
import { View, Text, TouchableOpacity, TextInput, Dimensions, StyleSheet } from 'react-native';
import { Context as DevicesContext } from '../context/DevicesContext';
import Button from '../components/Button';
import Title from '../components/Title';
import { customColors } from '../styles';
import QuantityInput from '../components/QuantityInput';

const SCREEN_WIDTH = Dimensions.get('window').width;

function DeviceForm({ inputsObject, currentSockets, onSubmit, submitText, title, error }) {
  return (
    <View style={styles.container}>
      <Title title={title}/>
      <Text style={{color: customColors.mainRed}}>{error}</Text>
      <TextInput
        style={styles.input}
        value={inputsObject.first}
        onChangeText={e => inputsObject.setFirst(e)}
        placeholder={'Device Name'}
        placeholderTextColor={customColors.secondaryDark}
      />

      <TextInput
        style={styles.input}
        value={inputsObject.second}
        onChangeText={e => inputsObject.setSecond(e)}
        placeholder={'Room in residence'}
        placeholderTextColor={customColors.secondaryDark}
      />

      <Text style={styles.inputLabel}>Socket #:</Text>
      <QuantityInput
        quantity={inputsObject.third}
        setQuantity={inputsObject.setThird}
      />

      <Button
        title={submitText}
        onPress={onSubmit}
      />
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: customColors.mainDark
  },
  input: {
    height: 60,
    borderWidth: 1,
    borderColor: customColors.secondaryDark,
    borderRadius: 8,
    paddingLeft: 10,
    width: 260,
    margin: 10,
    fontSize: 20,
    color: customColors.mainGreen
  },
  inputLabel: {
    marginTop: 10,
    fontSize: 16,
    color: customColors.mainGreen
  }
})


export default DeviceForm;
