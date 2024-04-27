import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import NgoHomeScreen from '../NgoDashboard/NgoHomeScreen';
import NgoProfile from '../NgoDashboard/NgoProfile';
import NgoNotification from '../NgoDashboard/NgoNotification';

const Stack = createNativeStackNavigator();


const NgoHomeNavigator = () => {
    let initalScreen = 'NgoHomeScreen'
    return (
        <Stack.Navigator initialRouteName={initalScreen} >
            <Stack.Screen name="NgoHomeScreen" options={{ headerShown: false }} component={NgoHomeScreen} />
            <Stack.Screen name="NgoProfile" options={{ headerShown: false }} component={NgoProfile} />
            <Stack.Screen name="NgoNotification" options={{ headerShown: false }} component={NgoNotification} />
        </Stack.Navigator>
    )
}

export default NgoHomeNavigator

const styles = StyleSheet.create({})