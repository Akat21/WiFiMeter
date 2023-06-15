import React from "react";
import {View, Text, StyleSheet} from 'react-native'
import AsyncStorage from '@react-native-async-storage/async-storage';
import { LineChart, Grid, XAxis, YAxis } from 'react-native-svg-charts'
import { Divider } from "react-native-paper";
import * as shape from 'd3-shape'

export default function Statistics(){
    const [data, setData] = React.useState([0])

    React.useEffect(()=>{
        const startInterval = () => {
            retrieveData()
            intervalId = setInterval(() => {
                retrieveData()
            }, 15500);
        };
        startInterval()
    }, [])

    const retrieveData = async () => {
        try {
          const storedData = await AsyncStorage.getItem('data');
          if (storedData !== null) {
            const parsedData = JSON.parse(storedData)
            setData((prevData)=>[...prevData, parsedData.rssi])
        }
        } catch (error) {
          console.log('Error retrieving data from AsyncStorage:', error);
        }
    };
    console.log(data)
    return(
        <View>
            <Text style={styles.rssiTitle}>RSSI</Text>
            <View style={styles.plotContainer}>
                <View style={{flexDirection:"row"}}>
                    {data && <LineChart style={{ height: 200, flex:1, margin:6, marginRight:0, marginBottom:0 }} data={data} contentInset={{ top: 20, bottom: 10 }}
                            curve={shape.curveNatural} svg={{ stroke: 'rgb(134, 65, 244)', strokeWidth:2}} >
                        <Grid />
                    </LineChart>}
                    {data && <YAxis data = {data} contentInset={{top:20, bottom:5}} numberOfTicks={5} style={styles.yAxisLabel} key={JSON.stringify(data)}/>}
                </View>
                <XAxis data={data} contentInset={{left: 15, right: 20, top:20}} numberOfTicks={data.length < 5 ? data.length - 1 : 5} style={styles.xAxisLabel}/>

            </View>
        </View>
    )
}

const styles= StyleSheet.create({
    plotContainer:{
        margin:10,
        marginBottom:0,
        borderWidth:2,
        borderColor:"black"
    },
    yAxisLabel: {
        alignSelf:'flex-end',
        margin:5
    },
    xAxisLabel:{
    },
    rssiTitle:{
        color:"black",
        fontSize:20,
        alignSelf:"center",
        fontWeight:"bold",
        marginTop:15
    }
})