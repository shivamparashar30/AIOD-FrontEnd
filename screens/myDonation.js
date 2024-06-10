import React, { useEffect, useState } from 'react';
import { SafeAreaView, FlatList, StyleSheet, Text, View } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { COLORS, SIZES } from '../constants/index';
import constant from '../constant';

export default function myDonation() {
    const navigation = useNavigation();
    const [donations, setDonations] = useState([]);
    const [token, setToken] = useState("");

    const getToken = async () => {
        try {
            const token = await AsyncStorage.getItem("userdata");
            if (token === null) {
                navigation.navigate('Welcome');
                return;
            }
            const response = JSON.parse(token);
            setToken(response[0]);
            getDonations(response[0]);
        } catch (error) {
            console.log("Donations: " + error);
        }
    };

    const getDonations = (token) => {
        axios({
            method: 'get',
            url: `${constant.BASE_URL}/auth/me`,
            headers: { 'Authorization': token }
        }).then((apiResponse) => {
            const donationsData = apiResponse.data.data.donationHistory; // Adjust based on actual response structure
            setDonations(donationsData);
        }).catch((err) => {
            console.log("Donations: " + err);
        });
    };

    useEffect(() => {
        getToken();
    }, []);

    const renderItem = ({ item }) => (
        <View style={styles.itemContainer}>
            <Text style={styles.title}>NGO Name: {item.ngoName}</Text>
            <Text>Donation Type: {item.type}</Text>
            <Text>Item: {item.item}</Text>
            <Text>Vehicle: {item.vehicle}</Text>
            <Text>Count: {item.count}</Text>
            <Text>Address: {item.address}</Text>
        </View>
    );

    return (
        <SafeAreaView style={styles.container}>
            <FlatList
                data={donations}
                renderItem={renderItem}
                keyExtractor={(item) => item.id.toString()}
            />
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: COLORS.lightGray,
        padding: SIZES.padding
    },
    itemContainer: {
        backgroundColor: COLORS.white,
        padding: SIZES.padding,
        marginVertical: SIZES.base,
        borderRadius: SIZES.radius,
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
        elevation: 5,
    },
    title: {
        fontSize: SIZES.h2,
        fontWeight: 'bold',
    },
});
