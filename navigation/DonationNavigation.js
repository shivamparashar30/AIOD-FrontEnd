
import React from 'react'
// import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Books from '../screens/DonationScreen/Books';
import Money from '../screens/DonationScreen/Money';
import Food from '../screens/DonationScreen/Food';
import Clothes from '../screens/DonationScreen/Clothes';
import Donate from '../screens/Donate';
import FoodSecond from '../screens/DonationScreen/FoodSecond';
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


        </Stack.Navigator>
    )
}