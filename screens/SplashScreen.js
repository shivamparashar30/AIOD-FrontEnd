
import { StyleSheet, View, Text, SafeAreaView } from 'react-native'
import React, { useState, useEffect } from 'react'
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useNavigation } from '@react-navigation/native'

const SplashScreen = () => {
    const navigation = useNavigation();
    const [token, setToken] = useState("");

    const getToken = async () => {
        try {
            const token = await AsyncStorage.getItem("userdata");
            console.log(token);

            if (!token) {
                navigation.navigate('Welcome');
                return;
            }

            const response = JSON.parse(token);
            setTimeout(() => {
                if (response[1] === "ngo") {
                    navigation.navigate('NgoHomeScreen');
                } else {
                    navigation.navigate('HomeScreen');
                }
                setToken(response[0]);
            }, 2000);
        } catch (error) {
            console.log("Splash: " + error);
        }
    };

    useEffect(() => {
        getToken();
    }, []);

    return (
        <SafeAreaView>
            <View style={styles.container}>
                <Text>Splash Screen</Text>
            </View>
        </SafeAreaView>
    );
};

export default SplashScreen;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#877dfa",
        width: "100%",
        height: '100%',
    },
});
