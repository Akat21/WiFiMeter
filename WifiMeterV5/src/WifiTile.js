import React from 'react'
import { NativeEventEmitter, View, Text, PermissionsAndroid, Button, StyleSheet, FlatList, SafeAreaView } from 'react-native';
import { Slider } from 'react-native-elements';
import { Divider } from 'react-native-paper';

export default function WifiTile({item}){
    return(
        <View>
            <View style={styles.wifiTile}>
                <Text style={{fontSize: 18, fontWeight:'bold', color:"black"}}>{item.SSID}</Text>
                <Slider value={100 + item.RSSI} minimumValue={10} maximumValue={100} step={1} disabled={true}
                        trackStyle={{height:18, width:250}} thumbStyle={{height:0, width:0}} 
                        minimumTrackTintColor={item.RSSI >= -35 ? "green" : (item.RSSI >= -60 && item.RSSI < -35) ? "#b78727" : "#b22222"}/>
                <Text>RSSI: {item.RSSI}</Text>
                <Text>Distance: {item.distance}</Text>
            </View>
            <Divider bold={true} />
        </View >)
}

const styles = StyleSheet.create({
    wifiTile:{
      alignSelf:"flex-start",
      margin:12,
    }
  })