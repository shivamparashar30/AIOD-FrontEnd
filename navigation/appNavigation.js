
import React from 'react'
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import WelcomeScreen from '../screens/WelcomeScreen';
import LoginScreen from '../screens/LoginScreen';
import SignUpScreen from '../screens/SignUpScreen';
import forgotScreen from '../screens/forgotScreen'
import SignUpNGOScreen from '../screens/SignUpNGOScreen';
import SplashScreen from '../screens/SplashScreen';
import HomeNavigation from './HomeNavigation';
// import NgoHomeScreen from '../screens/Ngos/NgoDashboard/NgoHomeScreen';
import NgoHomeNavigation from '../screens/Ngos/NgoNavigation/NgoHomeNavigation';


const Stack = createNativeStackNavigator();



export default function AppNavigation() {

  let initalScreen = 'SplashScreen'

  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName={initalScreen} >
        <Stack.Screen name="SplashScreen" options={{ headerShown: false }} component={SplashScreen} />
        <Stack.Screen name="HomeScreen" options={{ headerShown: false }} component={HomeNavigation} />
        <Stack.Screen name="Welcome" options={{ headerShown: false }} component={WelcomeScreen} />
        <Stack.Screen name="Login" options={{ headerShown: false }} component={LoginScreen} />
        <Stack.Screen name="SignUp" options={{ headerShown: false }} component={SignUpScreen} />
        <Stack.Screen name="SignUpNGO" options={{ headerShown: false }} component={SignUpNGOScreen} />
        <Stack.Screen name="ForgotPass" options={{ headerShown: false }} component={forgotScreen} />
        {/* <Stack.Screen name="NgoHomeScreen" options={{ headerShown: false }} component={NgoHomeScreen} /> */}
        <Stack.Screen name="NgoHomeScreen" options={{ headerShown: false }} component={NgoHomeNavigation} />
      </Stack.Navigator>


    </NavigationContainer>
  )
}