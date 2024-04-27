import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import React from 'react'
import { StyleSheet } from 'react-native';
import Ionicons from '@expo/vector-icons/Ionicons'
import NgoHomeNavigator from './NgoHomeNavigator';
import NgoProfile from '../NgoDashboard/NgoProfile';
import NgoPost from '../NgoDashboard/NgoPost';
import { MaterialIcons } from '@expo/vector-icons';

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

export default function NgoHomeNavigation() {
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
            <Tab.Screen name="HomeScreen" component={NgoHomeNavigator}
                options={{

                    tabBarLabel: "Home",
                    tabBarIcon: ({ color }) => (
                        <Ionicons name='home-sharp' size={20} color={color} />
                    ),
                }} />
            <Tab.Screen name="Post" component={NgoPost}
                options={{
                    tabBarLabel: "Post",
                    tabBarIcon: ({ color }) => (
                        <MaterialIcons name="post-add" size={28} color={color} />
                    ),

                }
                } />


            <Tab.Screen name="Profile" component={NgoProfile}
                options={{
                    tabBarLabel: "Profile",
                    tabBarIcon: ({ color }) => (
                        <Ionicons name="person" size={20} color={color} />
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