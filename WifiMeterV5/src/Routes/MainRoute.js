import React from 'react'
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import WifiMeter from '../WifiMeter';
import Statistics from '../Statistics/Statistics';
import ConnectedWifi from '../ConnectedWifi/ConnectedWifi';

const TopTab = createMaterialTopTabNavigator()
const WifiMeterRoute = () => <WifiMeter/>
const StatisticsRoute = () => <Statistics />
const ConnectedWifiRoute = () =>  <ConnectedWifi />

const MainRoute = () =>{
    return(
        <TopTab.Navigator>
            <TopTab.Screen name="Wifi List" component={WifiMeterRoute}/>
            <TopTab.Screen name="My Wifi" component={ConnectedWifiRoute}/>
            <TopTab.Screen name="Statistics" component={StatisticsRoute}/>
        </TopTab.Navigator>
    )
}

export default MainRoute
