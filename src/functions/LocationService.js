import * as Location from 'expo-location';
import * as Permissions from 'expo-permissions';

const getUserLocation = async () => {
  let { status } = await Permissions.askAsync(Permissions.LOCATION);
  if (status !== 'granted') {
    setError('Permission to access location was denied');
  }

  let location = await Location.getCurrentPositionAsync({});
  const region = {
    latitude: location.coords.latitude,
    longitude: location.coords.longitude,
    // ...deltas
  };
  return region;
}

export default {
  getUserLocation
};
