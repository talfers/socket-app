import React, { useState, useContext, useEffect } from 'react';
import { View, TouchableOpacity, Text, Dimensions, StyleSheet } from 'react-native';
import { Context as DevicesContext } from '../context/DevicesContext';
import ToggleSwitch from '../components/ToggleSwitch';
import ListItem from '../components/ListItem';
import { customColors } from '../styles/';
var socketIo = require('socket.io-client');

const SCREEN_HEIGHT = Dimensions.get('window').height;

function DevicesScreen({ navigation }) {
  const { state, setSocket, setServerConnection, toggleDevice, removeDevice } = useContext(DevicesContext);
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
    var socket = socketIo('http://36ee9b3a.ngrok.io');
    socket.on('connect', () => {
      setServerConnection(true);
      console.log('connected');
      setSocket(socket);
      socket.on('updated', (data) => {
        toggleDevice(data.device);
        console.log(data.device);
      })
    });
    socket.on('disconnect', () => {
      setServerConnection(false);
      console.log('disconnected');
      // setSocket(null);
      // socket.off();
      socket.connect();
    });

  }, []);

  const toggleFunction = (device, socket) => {
    state.socket.emit('toggle_device', { device: device });
  }

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
              toggleFunction={toggleFunction}
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
