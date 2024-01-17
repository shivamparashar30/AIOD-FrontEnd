
import React from 'react'
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import AsyncStorage from '@react-native-async-storage/async-storage';

// import HomeScreen from '../screens/HomeScreen';
import WelcomeScreen from '../screens/WelcomeScreen';
import LoginScreen from '../screens/LoginScreen';
import SignUpScreen from '../screens/SignUpScreen';
import forgotScreen from '../screens/forgotScreen'
import SignUpNGOScreen from '../screens/SignUpNGOScreen';
// import Profile from '../screens/Profile';
import CurrentLoc from '../components/CurrentLoc';
import HomeNavigation from './HomeNavigation';
const Stack = createNativeStackNavigator();



export default function AppNavigation() {

  let initalScreen = 'Home'

  _retrieveData = async () => {
    try {
      const value = await AsyncStorage.getItem('userdata');
      if (value !== null) {
        // We have data!!
        console.log(value);
        initalScreen = "HomeScreen"
      }
    } catch (error) {
      // Error retrieving data
      console.log(error);
    }
  };

  this._retrieveData()

  return (
    <NavigationContainer>
      {/* initialRouteName='Welcome' */}
      <Stack.Navigator initialRouteName={initalScreen} >
        <Stack.Screen name="HomeScreen" options={{ headerShown: false }} component={HomeNavigation} />
        <Stack.Screen name="Welcome" options={{ headerShown: false }} component={WelcomeScreen} />
        <Stack.Screen name="Login" options={{ headerShown: false }} component={LoginScreen} />
        <Stack.Screen name="SignUp" options={{ headerShown: false }} component={SignUpScreen} />
        <Stack.Screen name="SignUpNGO" options={{ headerShown: false }} component={SignUpNGOScreen} />
        <Stack.Screen name="ForgotPass" options={{ headerShown: false }} component={forgotScreen} />
        {/* <Stack.Screen name="CurrentLoc" options={{ headerShown: false }} component={CurrentLoc} /> */}
      </Stack.Navigator>


    </NavigationContainer>
  )
}