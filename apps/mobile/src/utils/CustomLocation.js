import Geolocation from 'react-native-geolocation-service';
import { Alert, PermissionsAndroid, Platform } from 'react-native';

export async function requestLocationPermission() {
  if (Platform.OS === 'ios') {
    Geolocation.requestAuthorization('whenInUse');
    return true;
  }

  if (Platform.OS === 'android') {
    const granted = await PermissionsAndroid.request(
      PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
      {
        title: 'Location Permission',
        message: 'This app needs your location for GPS address.',
        buttonNeutral: 'Ask Me Later',
        buttonNegative: 'Cancel',
        buttonPositive: 'OK',
      }
    );
    return granted === PermissionsAndroid.RESULTS.GRANTED;
    // ✅ removed ACCESS_BACKGROUND_LOCATION check — not needed for getCurrentPosition
  }

  return true;
}


export async function getCurrentLocation(setLocation) {
  const hasPermission = await requestLocationPermission();
  if (!hasPermission) return null;

  return new Promise((resolve, reject) => {
    Geolocation.getCurrentPosition(
      (position) => {
        if (setLocation) setLocation(position);
        resolve(position);
      },
      (error) => {
        reject(error);
      },
      {
        enableHighAccuracy: true,
        timeout: 15000,
        maximumAge: 10000,
      }
    );
  });
}




export const startWatchingLocation = (setLocation, setwatchid, setError) => {
  const id = Geolocation.watchPosition(
    (position) => {
      setLocation(position);
      setError(null)
    },
    (err) => {
      setError(err.message);
    },
    {
      enableHighAccuracy: true,
      distanceFilter: 10, // meters
      interval: 5000, // milliseconds
      fastestInterval: 2000 // milliseconds
    }
  );
  setwatchid(id)

};

// Stop watching location
export const stopWatchingLocation = (watchId) => {
  if (watchId !== null) {
    Geolocation.clearWatch(watchId);
    setWatchId(null);
  }
};
