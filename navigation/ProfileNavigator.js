
import React from 'react'
// import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Profile from '../screens/Profile';

import EditProfile from '../screens/EditProfile';
const Stack = createNativeStackNavigator();



export default function HomeNavigator() {

    let initalScreen = 'Profile'

    return (
        <Stack.Navigator initialRouteName={initalScreen} >
            <Stack.Screen name="Profile" options={{ headerShown: false }} component={Profile} />
            <Stack.Screen name="EditProfile" options={{ headerShown: false }} component={EditProfile} />

        </Stack.Navigator>
    )
}