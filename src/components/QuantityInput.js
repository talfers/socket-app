import React, { useState, useContext, useEffect } from 'react';
import { View, TextInput, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { customColors } from '../styles/'

function QuantityInput({ quantity, setQuantity }) {

  return (
    <View style={styles.container}>

      <TouchableOpacity
        style={[styles.incrementButton, quantity<=1?styles.disabled:null]}
        onPress={() => {
          setQuantity(Number(quantity) - 1)
        }}
        disabled={Number(quantity) === 1}
      >
          <Text style={{color: customColors.mainGreen, fontSize: 24}}> - </Text>
      </TouchableOpacity>

      <TextInput
        style={styles.quantityInput}
        value={quantity<1||!Number(quantity)?'':String(quantity)}
        onChangeText={(e) => {setQuantity(Number(e))}}
      />

      <TouchableOpacity
        style={[styles.incrementButton, quantity>=4?styles.disabled:null]}
        onPress={() => {
          setQuantity(Number(quantity) + 1)
        }}
        disabled={Number(quantity) >= 4}
      >
        <Text style={{color: customColors.mainGreen, fontSize: 24}}> + </Text>
      </TouchableOpacity>

    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    marginVertical: 10
  },
  incrementButton: {
    width: 60,
    height: 60,
    alignItems: 'center',
    justifyContent: 'center',
    color: 'palevioletred',
    fontSize: 20,
    textAlign: 'center',
    lineHeight: 60,
    marginHorizontal: 10,
    borderWidth: 2,
    borderColor: customColors.mainGreen,
    borderRadius: 16,
  },
  quantityInput: {
    fontSize: 18,
    width: 60,
    height: 60,
    justifyContent: 'center',
    textAlign: 'center',
    borderWidth: 0,
    color: customColors.mainGreen
  },
  disabled: {
    opacity: 0.3
  }

})


export default QuantityInput;
