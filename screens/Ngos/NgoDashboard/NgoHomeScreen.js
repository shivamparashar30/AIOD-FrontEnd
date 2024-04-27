import { Alert, SafeAreaView, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React, { useState, useEffect } from 'react'
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useNavigation } from '@react-navigation/native';
import StaggeredListComponent from '../NgoComponents/StaggeredListComponent';
import { Feather } from '@expo/vector-icons';

const NgoHomeScreen = () => {
    const navigation = useNavigation();
    const [greeting, setGreeting] = useState("");

    const getCurrentGreeting = () => {
        const currentHour = new Date().getHours();
        let greetingText = "";
        let emoji = "";
        if (currentHour >= 5 && currentHour < 12) {
            greetingText = "Good Morning!";
            emoji = "🌞";
        } else if (currentHour >= 12 && currentHour < 18) {
            greetingText = "Good Afternoon!";
            emoji = "☀️";
        } else if (currentHour >= 18 && currentHour < 22) {
            greetingText = "Good Evening!";
            emoji = "⛅️";
        } else {
            greetingText = "Good Night!";
            emoji = "🌙";
        }
        setGreeting(greetingText + " " + emoji);
    };

    useEffect(() => {
        getCurrentGreeting();
    }, []);



    return (
        <SafeAreaView>
            <View style={{
                flexDirection: 'row', height: 120, borderWidth: 0, width: '100%',
                backgroundColor: '#135D66', borderBottomLeftRadius: 20,
                borderBottomEndRadius: 20, marginTop: -70,
            }}>
                <View>
                    <Text style={{
                        fontSize: 25,
                        fontWeight: 'bold',
                        marginTop: 75,
                        marginHorizontal: 20,
                        color: 'white'

                    }}>{greeting}</Text>
                </View>
                <TouchableOpacity style={{
                    height: 40,
                    width: 40,
                    borderRadius: 20,
                    // borderWidth: 1,
                    marginTop: 70,
                    marginHorizontal: 94,
                    justifyContent: 'center',
                    alignItems: 'center', // Center the icon vertically
                }} onPress={() => navigation.navigate('NgoNotification')}>
                    <Feather name="bell" size={24} color="white" />
                </TouchableOpacity>
            </View>


            <StaggeredListComponent />
        </SafeAreaView>
    )
}

export default NgoHomeScreen

const styles = StyleSheet.create({})
