import React from "react";
import {View, Text, StyleSheet} from 'react-native'
import AsyncStorage from '@react-native-async-storage/async-storage';
import WifiManager from 'react-native-wifi-reborn';
import { List } from "react-native-paper";
import NetInfo from '@react-native-community/netinfo';
import {Divider} from "react-native-paper";

export default function ConnectedWifi(){
    const [data, setData] = React.useState()
    React.useEffect(()=>{
        let intervalId;
        const startInterval = () => {
            WifiManager.getCurrentWifiSSID().then(ssid => {setData(prevData => ({...prevData, SSID: ssid}))})
            WifiManager.getCurrentSignalStrength().then(rssi => {setData(prevData => ({...prevData, RSSI: rssi})); storeData(rssi)})
            WifiManager.getBSSID().then(bssid => {setData(prevData => ({...prevData, BSSID: bssid}))})
            WifiManager.getFrequency().then(freq => {setData(prevData => ({...prevData, freq: freq}))})
            WifiManager.getIP().then(ip => {setData(prevData => ({...prevData, IP: ip}))})
            NetInfo.fetch().then((state) => {
                if (state.type === 'wifi') setData(prevData => ({...prevData, linkSpeed: state.details.linkSpeed}))
            });
            NetInfo.fetch().then((state) => {
                if (state.type === 'wifi') setData(prevData => ({...prevData, download: state.details.rxLinkSpeed}))
            });
            NetInfo.fetch().then((state) => {
                if (state.type === 'wifi') setData(prevData => ({...prevData, upload: state.details.txLinkSpeed}))
            });
            intervalId = setInterval(() => {
                WifiManager.getCurrentSignalStrength().then(rssi => {setData(prevData => ({...prevData, RSSI: rssi})); storeData(rssi)})
            }, 15500);
        };
        startInterval()
    },[])

    const storeData = async (val) => {
        try {
          await AsyncStorage.setItem('data', JSON.stringify({rssi: val}));
          console.log('Data stored successfully!');
        } catch (error) {
          console.log('Error storing data in AsyncStorage:', error);
        }
    };

    const Element = (props) =>{
        return (
            <View style={styles.elementContainer}>
                <Text style={styles.elementText}>{props.title}</Text>
                <Text style={[styles.elementText, {fontWeight:"bold"}]}>{props.val}</Text>
            </View>
        )
    }
    return(
        <View>
            {data && <View>
                <Text style={styles.title}>Wifi Info</Text>
                <List.Section>
                    <Element title="SSID" val={data.SSID} />
                    <Element title="BSSID" val={data.BSSID} />
                    <Element title="IP" val={data.IP} />
                    <Element title="RSSI" val={data.RSSI} />
                    <Element title="Frequency" val={data.freq} />
                </List.Section>
            </View>}
            <Divider bold={true}/>
            {data && <View>
                <Text style={styles.title}>Wifi Speed</Text>
                <List.Section>
                    <Element title="Link Speed" val={data.linkSpeed} />
                    <Element title="Transmit Speed" val={data.upload} />
                    <Element title="Receive Speed" val={data.download} />
                </List.Section>
            </View>}
        </View>
    )
}

const styles = StyleSheet.create({
    title:{
        fontSize:22,
        fontWeight:"bold",
        color:"black",
        margin:10,
        marginBottom:0
    },
    elementContainer:{
        flexDirection:"row",
        justifyContent:"space-between",
        margin:10
    },
    elementText:{
        fontSize:17,
        color: "black"
    }
})