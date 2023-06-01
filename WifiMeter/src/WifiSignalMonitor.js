import React from 'react';
import { NativeEventEmitter, NativeModules, View, Text } from 'react-native';
import NetInfo from '@react-native-community/netinfo'
import WifiManager from 'react-native-wifi-reborn';
import * as Location from 'expo-location';

const WifiSignalMonitor = () =>{
    const [connectionStatus, setConnectionStatus] = React.useState(false)
    const [details, setDetails] = React.useState()
    const [permissionGranted, setPermissionGranted] = React.useState(false)
    const [type, setType] = React.useState()
    const [rssi, setRssi] = React.useState(null);

    React.useEffect(()=>{
        const requestLocationPermission = async () => {
            const { status } = await Location.requestForegroundPermissionsAsync();
            console.log(status)
            if (status === 'granted') {
                setPermissionGranted(true)
                
                const netInfoSubscription = NetInfo.addEventListener(
                    connectivityChangeHandle
                );
                return () => {
                    netInfoSubscription && netInfoSubscription();
                };
            }
            else{
                setPermissionGranted(false)
            }
        };

        requestLocationPermission();
    },[])

    const connectivityChangeHandle = (state) =>{
        setConnectionStatus(state.isConnected)
        setType(state.type)
        setDetails(state?.details)
    }

    return (
        <View>
            {permissionGranted ? <View>
                <Text>
                    Connection Status: {connectionStatus ? "Connected" : "Disconnected"}
                </Text>
                <Text>
                    {type === 'wifi' ? "WiFi details:" + "\n" + "SSID: " + details?.ssid + "\n" + "BSSID: " + details?.bssid + "\n"
                    + "Strength: " + details?.strength + "\n" + "IP Adress: " + details?.ipAddress + "\n" + "Subnet: " + details?.subnet + "\n"
                    + "Frequency: " + details?.frequency + "\n" + "LinkSpeed: " + details?.linkSpeed
                    : type === 'cellualar' ? "Cellular details: "
                    : "No WiFi connection established"}
                </Text>
            </View> :
            <Text>Permission not granted, change options of the app</Text>} 
        </View>
    )
}

export default WifiSignalMonitor