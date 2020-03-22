import React, { useState, useContext, useEffect } from 'react';
import { View, Text, TouchableOpacity, TextInput, StyleSheet } from 'react-native';
import { Context as DevicesContext } from '../context/DevicesContext';
import DeviceForm from '../components/DeviceForm';
import { customColors } from '../styles';
import Title from '../components/Title';

function NewDeviceScreen({ navigation }) {
  const { state, addDevice, addError, clearError } = useContext(DevicesContext);
  const currentSockets = state.devices.map(device => device.socket);

  const [ name, setName ] = useState('');
  const [ desc, setDesc ] = useState('');
  const [ room, setRoom ] = useState('');
  const [ socket, setSocket ] = useState(1);
  const formPropsObj = {
    first: name,
    setFirst: setName,
    second: room,
    setSecond: setRoom,
    third: socket,
    setThird: setSocket
  }

  useEffect(() => {
    const unsubscribe = navigation.addListener('focus', () => {
      clearError();
  });

    return unsubscribe;
  }, [navigation]);

  const onSubmit = () => {
    const ids = state.devices.map(device => device.id);
    const newId = Math.max(...ids) + 1;
    const newDevice = { name, room, socket, isOn: false };
    if(!name || !room || !socket){
      addError('Please complete form');
    }
    else if(currentSockets.length >= 4) {
      addError('Maximum 4 devices reached');
    }
    else if(currentSockets.includes(newDevice.socket)) {
      addError('Socket is already taken')
    } else {
      clearError();
      addDevice(newDevice, currentSockets, navigation)
      navigation.navigate('Devices')
    }
  }


  return (
    <View style={styles.screen}>
      <View style={styles.container}>
        <DeviceForm
          inputsObject={formPropsObj}
          currentSockets={currentSockets}
          onSubmit={onSubmit}
          submitText={'Create Device'}
          title={'New Device'}
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


export default NewDeviceScreen;
