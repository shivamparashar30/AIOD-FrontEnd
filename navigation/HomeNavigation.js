import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import React from 'react'
import Donate from '../screens/Donate';
import AboutUs from '../screens/AboutUs';
import { View, StyleSheet, Image } from 'react-native';
import Ionicons from '@expo/vector-icons/Ionicons'
import HomeNavigator from './homeNavigator';
import { MaterialCommunityIcons, MaterialIcons } from '@expo/vector-icons';
import DonationNavigation from './DonationNavigation';

const Tab = createBottomTabNavigator();


const screenOptions = {
    tabBarShowLabel: false,
    headerShown: false,
    tabBarStyle: {
        position: "absolute",
        bottom: 0,
        left: 0,
        right: 0,
        elevation: 0,
        height: 60,
        background: '#fff'
    }
}

export default function HomeNavigation() {
    return (
        <Tab.Navigator
            screenOptions={{
                tabBarLabelPosition: "below-icon",
                headerShown: false,
                // tabBarStyle: [{ backgroundColor: "#111" }], // for bottom tab color grey 
                tabBarShowLabel: true,
                headerTintColor: "#0000",
                tabBarActiveTintColor: "#2A4D50",
                tabBarInactiveTintColor: "grey",
                headerStyle: {
                    backgroundColor: '#7970E1'
                },
                tabBarShowLabel: false,
                headerTintColor: "#fff",
                headerTitleStyle: { fontWeight: "bold" },
            }}
        >
            <Tab.Screen name="HomeScreen" component={HomeNavigator}
                options={{

                    tabBarLabel: "Home",
                    tabBarIcon: ({ color }) => (
                        <Ionicons name='home-sharp' size={20} color={color} />
                    ),
                }} />


            <Tab.Screen name="Donate" component={DonationNavigation}
                options={{
                    tabBarIcon: ({ color }) => (
                        <View style={styles.imageContainer}>

                            <MaterialCommunityIcons name='heart' size={80} color='#2A4D50' />

                        </View>
                    ),

                }} />
            <Tab.Screen name="AboutUs" component={AboutUs}
                options={{
                    tabBarLabel: "AboutUs",
                    tabBarIcon: ({ color }) => (
                        <Ionicons name='information-outline' size={20} color={color} />
                    ),

                }
                } />
        </Tab.Navigator>
    )
}

const styles = StyleSheet.create({
    icons: {
        marginHorizontal: 5
    },
    imageContainer: {
        width: 80,
        height: 80,
        borderRadius: 150 / 2,
        overflow: "hidden",
        // borderWidth: 1,
        // borderColor: "#877dfa",
        marginStart: 5,
        marginTop: -9,
        // borderRadius: 20,

    },
    profileImg: {
        height: 80,
        width: 80,
    },
})