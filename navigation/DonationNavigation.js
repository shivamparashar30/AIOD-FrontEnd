
import React from 'react'
// import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Books from '../screens/DonationScreen/Books';
import Money from '../screens/DonationScreen/Money';
import Food from '../screens/DonationScreen/Food';
import Clothes from '../screens/DonationScreen/Clothes';
import Donate from '../screens/Donate';
import FoodSecond from '../screens/DonationScreen/FoodSecond';
import SelectAddress from '../screens/SelectAddress';
import SelectLocMap from '../components/maps/SelectLocMap';
import AddAddressDetails from '../components/maps/AddAddressDetails';
import SelectNgoDropdown from '../components/maps/SelectNgoDropdown';
import SelectNgo from '../components/maps/SelectNgo';
import PaymentGateway from '../screens/DonationScreen/PaymentGateway';
import WaitingScreen from '../components/WaitingScreen';
import SelectAddressClothes from '../components/maps/SelectAddressClothes'
import SelectAddressBooks from '../components/maps/SelectAddressBooks'
import AddAddressDetailsClothes from '../components/maps/AddAddressDetailsClothes'
import AddAddressDetailsBooks from '../components/maps/AddAddressDetailsBooks'
import SelectNgoClothes from '../components/maps/SelectNgoClothes'
import SelectNgoBooks from '../components/maps/SelectNgoBooks'
const Stack = createNativeStackNavigator();



export default function DonationNavigation() {

    let initalScreen = 'Donate'

    return (
        <Stack.Navigator initialRouteName={initalScreen}>
            <Stack.Screen name="Donate" options={{ headerShown: false }} component={Donate} />
            <Stack.Screen name="Books" options={{ headerShown: false }} component={Books} />
            <Stack.Screen name="Clothes" options={{ headerShown: false }} component={Clothes} />
            <Stack.Screen name="Food" options={{ headerShown: false }} component={Food} />
            <Stack.Screen name="Money" options={{ headerShown: false }} component={Money} />
            <Stack.Screen name="FoodSecond" options={{ headerShown: false }} component={FoodSecond} />
            <Stack.Screen name="Address" options={{ headerShown: false }} component={SelectAddress} />
            <Stack.Screen name="SelectAddressClothes" options={{ headerShown: false }} component={SelectAddressClothes} />
            <Stack.Screen name="SelectAddressBooks" options={{ headerShown: false }} component={SelectAddressBooks} />
            <Stack.Screen name="Map" options={{ headerShown: false }} component={SelectLocMap} />
            <Stack.Screen name="AddressDetails" options={{ headerShown: false }} component={AddAddressDetails} />
            <Stack.Screen name="AddAddressDetailsClothes" options={{ headerShown: false }} component={AddAddressDetailsClothes} />
            <Stack.Screen name="AddAddressDetailsBooks" options={{ headerShown: false }} component={AddAddressDetailsBooks} />
            {/* <Stack.Screen name="SelectNgoDropdown" options={{ headerShown: false }} component={SelectNgoDropdown} /> */}
            <Stack.Screen name="SelectNgo" options={{ headerShown: false }} component={SelectNgo} />
            <Stack.Screen name="SelectNgoClothes" options={{ headerShown: false }} component={SelectNgoClothes} />
            <Stack.Screen name="SelectNgoBooks" options={{ headerShown: false }} component={SelectNgoBooks} />
            <Stack.Screen name="PaymentGateway" options={{ headerShown: false }} component={PaymentGateway} />
            <Stack.Screen name="WaitingScreen" options={{ headerShown: false }} component={WaitingScreen} />



        </Stack.Navigator>
    )
}