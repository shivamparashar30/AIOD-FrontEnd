import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import React from 'react'
import { NavigationContainer } from '@react-navigation/native';
import HomeScreen from '../screens/HomeScreen';
import Profile from '../screens/Profile';
import Donate from '../screens/Donate';
import AboutUs from '../screens/AboutUs';
import { View, Text } from 'react-native';
import { Entypo } from 'react-native-vector-icons';

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
        <NavigationContainer independent={true} >
            <Tab.Navigator>
                <Tab.Screen name="HomeScreen" component={HomeScreen}
                    options={{
                        tabBarIcon: ({ focused }) => {
                            return (
                                <View style={{ alignItems: "center", justifyContent: "center" }} >
                                    <Entypo name="home" size={24} color={focused ? "#16247d" : "#111"} />
                                    <Text style={{ fontSize: 12, color: "#16247d" }}>Home</Text>
                                </View>
                            )
                        }
                    }} />
                <Tab.Screen name="Profile" component={Profile}
                    options={{
                        tabBarIcon: ({ focused }) => {
                            return (
                                <View style={{ alignItems: "center", justifyContent: "center" }} >
                                    <Entypo name="home" size={24} color={focused ? "#16247d" : "#111"} />
                                    <Text style={{ fontSize: 12, color: "#16247d" }}>Home</Text>
                                </View>
                            )
                        }
                    }} />
                <Tab.Screen name="Donate" component={Donate}
                    options={{
                        tabBarIcon: ({ focused }) => {
                            return (
                                <View style={{ alignItems: "center", justifyContent: "center" }} >
                                    <Entypo name="home" size={24} color={focused ? "#16247d" : "#111"} />
                                    <Text style={{ fontSize: 12, color: "#16247d" }}>Home</Text>
                                </View>
                            )
                        }
                    }} />
                <Tab.Screen name="AboutUs" component={AboutUs}
                    options={{
                        tabBarIcon: ({ focused }) => {
                            return (
                                <View style={{ alignItems: "center", justifyContent: "center" }} >
                                    <Entypo name="home" size={24} color={focused ? "#16247d" : "#111"} />
                                    <Text style={{ fontSize: 12, color: "#16247d" }}>Home</Text>
                                </View>
                            )
                        }
                    }} />

            </Tab.Navigator>
        </NavigationContainer>
    )
}