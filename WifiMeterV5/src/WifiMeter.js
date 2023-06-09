import React from 'react';
import { NativeEventEmitter, View, Text, PermissionsAndroid, Button } from 'react-native';
import WifiManager from 'react-native-wifi-reborn';

const WifiSignalMonitorV2 = () =>{
    const [permissionGranted, setPermissionGranted] = React.useState(false)
    const [rescan, setRescan] = React.useState(false)
    const [data, setData] = React.useState({SSID:"", RSSI:"", distance:""})

    React.useEffect(()=>{
        RequirePermissions()
    }, [])

    React.useEffect(()=>{
        console.log("???")
        if (permissionGranted){
          WifiManager.getCurrentWifiSSID().then(
            ssid => {
              console.log("Your current connected wifi SSID is " + ssid);

            },
            () => {
              console.log("Cannot get current SSID!");
            }
          );
          fetchWiFiList()
        }
    }, [])
    
    React.useEffect(()=>{
        if(permissionGranted && rescan){
            reFetchWifiList()
            setRescan(false)
        }
    }, [rescan])

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

    const fetchWiFiList = async () => {
        try {
            const wifiList = await WifiManager.loadWifiList();
            console.log(wifiList[0].level)
            setData({SSID: wifiList[0].SSID, RSSI: wifiList[0].level, distance: computeDistance(wifiList[0].frequency, wifiList[0].level)})
            console.log('Wi-Fi list:', wifiList);
          } catch (error) {
            console.log('Error fetching Wi-Fi list:', error);
          }
    }
    
    const reFetchWifiList = async () =>{
        try {
            const wifiList  = await WifiManager.reScanAndLoadWifiList();
            setData({SSID: wifiList[0].SSID, RSSI: wifiList[0].level, distance: computeDistance(wifiList[0].frequency, wifiList[0].level)})
            console.log('Wi-Fi scan initiated', wifiList);
          } catch (error) {
            console.log('Error rescanning Wi-Fi:', error);
          }
    }

    const computeDistance = (frequency, rssi) =>{
        dist = (27.55 - 20 * Math.log10(frequency) + rssi)
        return -Math.pow(10, (dist / 20)) + 40
    }

    return(
      <View>
        <Text>{permissionGranted ? "Permission Granted" : "Permission denied"}</Text>
        <Button onPress={() => setRescan(true)} title='Skanuj' />
        <Text>SSID: {data.SSID}</Text>
        <Text>RSSI: {data.RSSI} dBm</Text>
        <Text>Distance: {data.distance} m</Text>
      </View>  
    )
}

export default WifiSignalMonitorV2