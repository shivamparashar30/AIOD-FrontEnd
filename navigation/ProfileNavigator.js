
import React from 'react'
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Profile from '../screens/Profile';
// import HomeScreen from '../screens/HomeScreen';
// import CurrentLoc from '../components/CurrentLoc';
import EditProfile from '../screens/EditProfile';
const Stack = createNativeStackNavigator();



export default function HomeNavigator() {

    let initalScreen = 'Profile'

    _retrieveData = async () => {
        try {
            const value = await AsyncStorage.getItem('userdata');
            if (value !== null) {
                // We have data!!
                console.log(value);
                initalScreen = "Profile"
            }
        } catch (error) {
            // Error retrieving data
            console.log(error);
        }
    };

    this._retrieveData()

    return (
        <Stack.Navigator initialRouteName={initalScreen} >
            <Stack.Screen name="Profile" options={{ headerShown: false }} component={Profile} />
            <Stack.Screen name="EditProfile" options={{ headerShown: false }} component={EditProfile} />

        </Stack.Navigator>
    )
}