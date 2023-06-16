import React from 'react'
import {View, Text, PermissionsAndroid, Button, StyleSheet, FlatList, SafeAreaView } from 'react-native';
import WifiManager from 'react-native-wifi-reborn';
import WifiTile from './WifiTile';

const WifiMeter = () =>{
    const [permissionGranted, setPermissionGranted] = React.useState(false)
    const [data, setData] = React.useState()

    React.useEffect(()=>{
        RequirePermissions()
    }, [])

    React.useEffect(()=>{
      const fetchWiFiList = async () => {
        try {
          const wifiList = await WifiManager.loadWifiList();
          const fetchedData = wifiList.map((item) => ({
            SSID: item.SSID,
            RSSI: item.level,
            distance: computeDistance(item.frequency, item.level),
          }));
          fetchedData.sort((a, b) => b.RSSI - a.RSSI);
          setData(fetchedData);
        } catch (error) {
          console.log('Error fetching Wi-Fi list:', error);
        }
      };
  
      if (permissionGranted) {
        fetchWiFiList();
      }
    }, [permissionGranted])
    
    React.useEffect(()=>{
      let intervalId;
      const reFetchWifiList = async () => {
        try {
          const wifiList = await WifiManager.reScanAndLoadWifiList();
          const fetchedData = wifiList.map((item) => ({
            SSID: item.SSID,
            RSSI: item.level,
            distance: computeDistance(item.frequency, item.level),
          }));
          fetchedData.sort((a, b) => b.RSSI - a.RSSI);
          setData(fetchedData);
        } catch (error) {
          console.log('Error rescanning Wi-Fi:', error);
        }
      };
      
      const startInterval = () => {
        reFetchWifiList();
    
        intervalId = setInterval(() => {
          reFetchWifiList();
        }, 15500);
      };

      if (permissionGranted) {
        startInterval();
      }

      return () => {
        clearInterval(intervalId);
      };
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

    const computeDistance = (frequency, rssi) =>{
        const dist = (27.55 - 20 * Math.log10(frequency) + Math.abs(rssi) - 20) / 20
        return Math.pow(10, dist) * 10
    }
    
    const renderWifi = ({item}) =>{
      return (
        <WifiTile item={item} />
      )
    }

    return(
      <SafeAreaView style={{flex: 1}}>
        <FlatList data={data} renderItem={renderWifi} keyExtractor={(item, index) => index.toString()}/>
      </SafeAreaView>  
    )
}

export default WifiMeter