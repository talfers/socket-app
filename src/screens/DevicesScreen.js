import React, { useState, useContext, useEffect } from 'react';
import { View, TouchableOpacity, Text, Dimensions, StyleSheet } from 'react-native';
import { Context as DevicesContext } from '../context/DevicesContext';
import ToggleSwitch from '../components/ToggleSwitch';
import ListItem from '../components/ListItem';
import { customColors } from '../styles/';
var socketIo = require('socket.io-client');

const SCREEN_HEIGHT = Dimensions.get('window').height;

function DevicesScreen({ navigation }) {

  const { state, toggleDevice, removeDevice, updateServerStatus } = useContext(DevicesContext);
  let orderedDevices = [];
  const currentDevices = [...state.devices];
  currentDevices.forEach(device => {
    orderedDevices[device.socket - 1] = device
  })

  const onListNavigate = (device) => {
    navigation.navigate('DeviceReview', { socket: device.socket });
  }

  const onItemDelete = (device) => {
    removeDevice(device);
  }

  useEffect(() => {
    var socket = socketIo('http://70279be6.ngrok.io');
    socket.on('connect', () => {
      console.log('connected');
    })
  }, [])

  return (
    <View style={styles.container}>
      {orderedDevices.map(device => {
        return (
            <ListItem
              key={device.socket}
              item={device}
              navigation={navigation}
              onListNavigate={onListNavigate}
              onItemDelete={onItemDelete}
              toggleFunction={toggleDevice}
            />
        )
      })}
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: customColors.mainDark
  }
})


export default DevicesScreen;
