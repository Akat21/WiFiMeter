import React from 'react';
import { NativeEventEmitter, View, Text, PermissionsAndroid } from 'react-native';
import {WifiManager} from 'react-native-wifi-reborn';

const WifiSignalMonitorV2 = () =>{
    const [permissionGranted, setPermissionGranted] = React.useState(false)

    React.useEffect(()=>{
        RequirePermissions()
    }, [])

    React.useEffect(()=>{
        if (permissionGranted){
          WifiManager.getCurrentWifiSSID().then(
            ssid => {
              console.log("Your current connected wifi SSID is " + ssid);
            },
            () => {
              console.log("Cannot get current SSID!");
            }
          );
        }
    }, [permissionGranted])
    
    const RequirePermissions = async () =>{
        const granted = await PermissionsAndroid.request(
            PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
            {
              title: 'Location permission is required for WiFi connections',
              message:
                'This app needs location permission as this is required  ' +
                'to scan for wifi networks.',
              buttonNegative: 'DENY',
              buttonPositive: 'ALLOW',
            },
        );
        if (granted === PermissionsAndroid.RESULTS.GRANTED) {
            setPermissionGranted(true)
        } else {
            setPermissionGranted(false)
        }
    }
    

    return(
      <View>
        <Text>{permissionGranted ? "Permission Granted" : "Permission denied"}</Text>
      </View>  
    )
}

export default WifiSignalMonitorV2