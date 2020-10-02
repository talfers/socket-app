import React, { useState, useEffect, useContext } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { customColors } from '../styles';
import LocationService from '../functions/LocationService';
import Title from '../components/Title';
import { Context as DevicesContext } from '../context/DevicesContext';

function SettingsScreen() {
  const { state } = useContext(DevicesContext);
  const [_location, _setLocation] = useState(null);

  const getLocation = async () => {
    let location = await LocationService.getUserLocation();
    console.log(location);
    _setLocation(location);
  }

  useEffect(() => {
    getLocation();
  }, [])



  return (
    <View style={styles.screen}>

      <View style={styles.container}>
        <View style={styles.header}>
          <Title title={'Settings'} size={40}/>
        </View>
        <Text style={styles.text}>Current Location: {_location?<Text>{_location.latitude.toFixed(5)}, {_location.longitude.toFixed(5)}</Text>:'Finding Location...'}</Text>
        <Text style={styles.text}>Server Connection: {state.server_connection.status?<Text style={{color: customColors.mainGreen}}>Connected</Text>:<Text style={{color: customColors.mainRed}}>Disconnected</Text>}</Text>
        <Text style={styles.text}>Last Change: {state.server_connection.timestamp.substring(0, 21)}</Text>
        <Text style={styles.text}>Devices Connected: {state.devices.length}</Text>

      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    backgroundColor: customColors.mainDark
  },
  header: {
    marginVertical: 20
  },
  container: {
    alignItems: 'center',
    justifyContent: 'center',
    flex: 1,
    marginBottom: 100
  },
  text: {
    marginVertical: 4,
    color: customColors.mainLight,
    fontSize: 16
  }
})

export default SettingsScreen;
