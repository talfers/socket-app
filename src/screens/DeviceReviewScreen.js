import React, { useContext } from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { Context as DevicesContext } from '../context/DevicesContext';
import { customColors } from '../styles'
import Title from '../components/Title';

function DeviceReviewScreen({ navigation, route }) {
  const device_socket = route.params.socket;
  const { state, removeDevice } = useContext(DevicesContext);
  const device = state.devices.filter(device => device.socket === device_socket)[0];
  return (
    <View style={styles.container}>
      <View style={styles.infoContainer}>
        <Title title={device.name}/>
        <Text style={styles.room}>- {device.room} -</Text>
        <Text style={styles.socket}>Socket #: {device.socket}</Text>
      </View>
      <TouchableOpacity onPress={() => navigation.navigate('EditDevice', { device })}>
        <Text style={styles.editText}>Edit Device</Text>
      </TouchableOpacity>
      <TouchableOpacity onPress={() => {
          removeDevice(device);
        }}
      >
        <Text style={styles.deleteText}>Delete Device</Text>
      </TouchableOpacity>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: customColors.mainDark
  },
  infoContainer: {
    marginVertical: 24,
    alignItems: 'center',
    justifyContent: 'center'
  },
  deleteText: {
    margin: 8,
    fontSize: 20,
    color: customColors.mainRed
  },
  editText: {
    margin: 8,
    fontSize: 20,
    color: customColors.mainPurple
  },
  room: {
    fontSize: 20,
    color: customColors.mainGrey
  },
  socket: {
    color: customColors.secondaryGreen,
    marginVertical: 8,
    fontSize: 18
  }
})


export default DeviceReviewScreen;
