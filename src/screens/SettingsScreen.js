import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { customColors } from '../styles';
import LocationService from '../functions/LocationService';

function SettingsScreen() {
  // const [_location, _setLocation] = useState(null);
  //
  // const getLocation = async () => {
  //   let location = await LocationService.getUserLocation();
  //   _setLocation(location);
  // }
  //
  //
  // getLocation();


  return (
    <View style={styles.screen}>
      <Text>Settings Screen</Text>
      <Text>Settings Screen</Text>
      <Text>Settings Screen</Text>
      
    </View>
  )
}

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    backgroundColor: customColors.mainDark
  },
})

export default SettingsScreen;
