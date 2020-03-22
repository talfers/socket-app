import React, { useState, useContext, useEffect } from 'react';
import { View, Text, TouchableOpacity, TextInput, StyleSheet } from 'react-native';
import { Context as DevicesContext } from '../context/DevicesContext';
import DeviceForm from '../components/DeviceForm';
import { customColors } from '../styles'
import Title from '../components/Title';


function EditDeviceScreen({ navigation, route }) {
  const device = route.params.device;
  const { state, editDevice, addError, clearError } = useContext(DevicesContext);
  const currentSockets = state.devices.map(device => device.socket);
  const [ name, setName ] = useState(device.name);
  const [ desc, setDesc ] = useState(device.desc);
  const [ room, setRoom ] = useState(device.room);
  const [ socket, setSocket ] = useState(device.socket);
  const formPropsObj = {
    first: name,
    setFirst: setName,
    second: room,
    setSecond: setRoom,
    third: socket,
    setThird: setSocket,
  }

  useEffect(() => {
    const unsubscribe = navigation.addListener('focus', () => {
      clearError();
  });
    return unsubscribe;
  }, [navigation]);

  const onSubmit = () => {
    const editedDevice = { ...device, name, room, socket }
    if(!name || !room || !socket){
      addError('Please complete form');
    }
    else if(currentSockets.length >= 5) {
      addError('Maximum 4 devices reached');
    }
    else if(currentSockets.includes(editedDevice.socket) && editedDevice.socket !== device.socket) {
      addError('Socket is already taken')
    } else {
      clearError();
      editDevice(editedDevice)
      navigation.navigate('DeviceReview', editedDevice)
    }

  }

  return (
    <View style={styles.screen}>
      <View style={styles.container}>
        <DeviceForm
          inputsObject={formPropsObj}
          onSubmit={onSubmit}
          submitText={'Edit Device'}
          title={'Edit Device'}
          error={state.error}
        />
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    backgroundColor: customColors.mainDark
  },
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 24,
    backgroundColor: customColors.mainDark
  }
})


export default EditDeviceScreen;
