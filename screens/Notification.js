import React from "react";
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import MoneyNotification from "./MoneyNotification";
import OtherNotification from "./OtherNotification";
import { SafeAreaView } from "react-native";
import { COLORS } from "../constants";

const Tab = createMaterialTopTabNavigator();

const Notification = () => {
    return (
        <SafeAreaView style={{ flex: 1 }}>
            <Tab.Navigator
                screenOptions={{
                    activeTintColor: "white",
                    tabBarActiveTintColor: "white",
                    tabBarInactiveTintColor: "gray",
                    tabBarStyle: { backgroundColor: COLORS.primary },
                }}
            >
                <Tab.Screen name="Money " component={MoneyNotification} />
                <Tab.Screen name="Others " component={OtherNotification} />
            </Tab.Navigator>
        </SafeAreaView>

    )
}
export default Notification