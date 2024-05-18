
import React from 'react'
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Profile from '../screens/Profile';
import HomeScreen from '../screens/HomeScreen';
import CurrentLoc from '../components/CurrentLoc';
import ProfileNavigator from '../navigation/ProfileNavigator'
import Books from '../screens/DonationScreen/Books';
import Money from '../screens/DonationScreen/Money';
import Food from '../screens/DonationScreen/Food';
import Clothes from '../screens/DonationScreen/Clothes';
import GlobalAidNgo from '../screens/Ngos/GlobalAidNgo';
import CompassionateNgo from '../screens/Ngos/CompassionateNgo';
import EmpowermentNgo from '../screens/Ngos/EmpowermentNgo';
import HopeForNgo from '../screens/Ngos/HopeForNgo';
import HumanityNgo from '../screens/Ngos/HumanityNgo';
import FoodSecond from '../screens/DonationScreen/FoodSecond';
import SelectAddress from '../screens/SelectAddress';
import SelectLocMap from '../components/maps/SelectLocMap';
import AddAddressDetails from '../components/maps/AddAddressDetails';
import SelectNgo from '../components/maps/SelectNgo';
import PaymentGateway from '../screens/DonationScreen/PaymentGateway';
import Notification from '../screens/Notification';
const Stack = createNativeStackNavigator();



export default function HomeNavigator() {

  let initalScreen = 'HomeScreen'

  return (
    <Stack.Navigator initialRouteName={initalScreen} >
      <Stack.Screen name="HomeScreen" options={{ headerShown: false }} component={HomeScreen} />
      <Stack.Screen name="Profile" options={{ headerShown: false }} component={ProfileNavigator} />
      <Stack.Screen name="CurrentLoc" options={{ headerShown: false }} component={CurrentLoc} />
      <Stack.Screen name="Books" options={{ headerShown: false }} component={Books} />
      <Stack.Screen name="Clothes" options={{ headerShown: false }} component={Clothes} />
      <Stack.Screen name="Food" options={{ headerShown: false }} component={Food} />
      <Stack.Screen name="Money" options={{ headerShown: false }} component={Money} />
      <Stack.Screen name="GlobalAidNgo" options={{ headerShown: false }} component={GlobalAidNgo} />
      <Stack.Screen name="CompassionateNgo" options={{ headerShown: false }} component={CompassionateNgo} />
      <Stack.Screen name="EmpowermentNgo" options={{ headerShown: false }} component={EmpowermentNgo} />
      <Stack.Screen name="HopeForNgo" options={{ headerShown: false }} component={HopeForNgo} />
      <Stack.Screen name="HumanityNgo" options={{ headerShown: false }} component={HumanityNgo} />
      <Stack.Screen name="FoodSecond" options={{ headerShown: false }} component={FoodSecond} />
      <Stack.Screen name="Address" options={{ headerShown: false }} component={SelectAddress} />
      <Stack.Screen name="Map" options={{ headerShown: false }} component={SelectLocMap} />
      <Stack.Screen name="AddressDetails" options={{ headerShown: false }} component={AddAddressDetails} />
      {/* <Stack.Screen name="SelectNgoDropdown" options={{ headerShown: false }} component={SelectNgoDropdown} /> */}
      <Stack.Screen name="SelectNgo" options={{ headerShown: false }} component={SelectNgo} />
      <Stack.Screen name="PaymentGateway" options={{ headerShown: false }} component={PaymentGateway} />
      <Stack.Screen name="Notification" options={{ headerShown: false }} component={Notification} />

    </Stack.Navigator>
  )
}