// import { StyleSheet, Text, View } from 'react-native'
// import React from 'react'

// const NgoOtherNotification = () => {
//     return (
//         <View>
//             <Text>NgoOtherNotification</Text>
//         </View>
//     )
// }

// export default NgoOtherNotification

// const styles = StyleSheet.create({})
import { FlatList, SafeAreaView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import React, { useEffect, useState } from 'react';
import { COLORS, SIZES } from '../../../constants';
import { ArrowLeftIcon } from 'react-native-heroicons/solid';
import { useNavigation } from '@react-navigation/native';
import axios from 'axios';
import constant from '../../../constant';
import Modal from 'react-native-modal';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Entypo } from '@expo/vector-icons';
import { format } from 'date-fns';

const formatDateTime = (isoString) => {
    const date = new Date(isoString);
    return format(date, 'dd-MM-yyyy HH:mm');
};

const NgoOtherNotification = () => {
    const navigation = useNavigation();

    const [isModalVisible, setIsModalVisible] = useState(false);
    const [token, setToken] = useState("");
    const [paymentData, setPaymentData] = useState([]);
    const [driverName, setDriverName] = useState("");
    const [driverPhone, setDriverPhone] = useState("");

    const [ngoName, setNgoName] = useState("");
    const [ngoContact, setNgoContact] = useState("");
    const [itemsQty, setItemsQty] = useState("");
    const [foodItem, setFoodItem] = useState("");
    const [vehicle, setVehicle] = useState("");
    const [time, setTime] = useState("");
    const [address, setAddress] = useState("");
    const [moneyData, setMoneyData] = useState({});

    const getToken = async () => {
        try {
            const token = await AsyncStorage.getItem("userdata");
            const response = JSON.parse(token);
            setToken(response[0]);
            getMeData(response[0]);
        } catch (error) {
            console.log("Splash: " + error);
        }
    };

    const getData = (token, id) => {
        axios({
            method: 'get',
            url: constant.BASE_URL + `/request/recipientRequests/${id}`,
            headers: { 'Authorization': token }
        }).then((apiResponse) => {
            setPaymentData(getCompletedRequests(apiResponse.data.message));
            console.log(apiResponse.data);
        }).catch((err) => {
            console.log("Recipient" + err);
        });
    };

    const getCompletedRequests = (userList) => {
        return userList.filter((user) => user.status == 4).reverse();
    };

    const getMeData = (token) => {
        axios({
            method: 'get',
            url: constant.BASE_URL + '/auth/me',
            headers: { 'Authorization': token },
        }).then((apiResponse) => {
            getData(token, apiResponse.data.data._id);
        }).catch((err) => {
            console.log("Profile" + err);
        });
    };


    useEffect(() => {
        getToken();
        const fetchDataInterval = setInterval(() => {
            getToken();
        }, 20000);

        return () => clearInterval(fetchDataInterval);
    }, []);

    const renderItem = ({ item }) => {
        if (item.status === 4) {
            return (
                <View style={{ height: 150, margin: 5, marginTop: 10, backgroundColor: COLORS.primary, borderRadius: 10 }}>
                    <View style={{ flexDirection: 'row' }}>
                        <Entypo name="dot-single" size={54} color="#A1DD70" />
                        <Text style={{
                            color: 'white',
                            fontSize: 16,
                            fontWeight: 'bold',
                            textAlign: 'auto',
                            marginTop: 10
                        }}>
                            {`Your Donation for ${item.donationType} has been completed.`}
                        </Text>
                    </View>
                    <Text style={{
                        fontSize: 20,
                        fontWeight: 'bold',
                        color: '#A1DD70',
                        textAlign: 'center',
                        marginTop: 10
                    }}>
                        Thank you for your donation.
                    </Text>
                    <TouchableOpacity onPress={() => handleAssign(item.recipient)}>
                        <Text style={{
                            textAlign: 'right',
                            marginHorizontal: 10,
                            marginTop: 10,
                            color: 'pink'
                        }}>More info</Text>
                    </TouchableOpacity>
                    <View style={{ height: 1, borderWidth: 1, borderColor: COLORS.secondary, marginTop: 5, width: '70%', marginHorizontal: 55 }}></View>
                </View>
            );
        }
        return null;
    };

    const handleAssign = (id) => {
        setIsModalVisible(true);
        getDriverData(id);
        const single = paymentData.find(item => item.recipient === id);
        setNgoName(single.ngoName);
        setItemsQty(single.count);
        setVehicle(single.vehicle);
        setAddress(single.address2);
        setFoodItem(single.Item);
        setTime(formatDateTime(single.createdAt.toString()));
    };

    const handleOk = () => {
        setIsModalVisible(false);
    };

    const getDriverData = (id) => {
        axios({
            method: 'get',
            url: constant.BASE_URL + `/auth/user/${id}`,
            headers: { 'Authorization': token }
        }).then((apiResponse) => {
            setDriverName(apiResponse.data.data.driverName);
            setDriverPhone(apiResponse.data.data.driverPhone);
        }).catch((err) => {
            console.log("Driver Data Error: ", err);
        });
    };

    return (
        <SafeAreaView>
            <FlatList
                style={{ padding: 10, marginTop: 30 }}
                showsHorizontalScrollIndicator={false}
                contentContainerStyle={styles.flatListContainer}
                data={paymentData}
                keyExtractor={(item) => item.id}
                renderItem={renderItem}
            />
            <Modal isVisible={isModalVisible}>
                <View style={styles.modalContent}>
                    <Text style={styles.modalHeader}>More Info</Text>

                    <View style={styles.modalRow}>
                        <Text style={styles.modalLabel}>Time:</Text>
                        <Text style={styles.modalValue}>{time}</Text>
                    </View>
                    <View style={styles.modalRow}>
                        <Text style={styles.modalLabel}>Quantity:</Text>
                        <Text style={styles.modalValue}>{itemsQty}</Text>
                    </View>
                    <View style={styles.modalRow}>
                        <Text style={styles.modalLabel}>Food Item:</Text>
                        <Text style={styles.modalValue}>{foodItem}</Text>
                    </View>
                    <View style={styles.modalRow}>
                        <Text style={styles.modalLabel}>Vehicle:</Text>
                        <Text style={styles.modalValue}>{vehicle}</Text>
                    </View>
                    <View style={styles.modalRow}>
                        <Text style={styles.modalLabel}>Address:</Text>
                        <Text style={styles.modalValue}>{address}</Text>
                    </View>
                    <TouchableOpacity onPress={handleOk} style={styles.modalButton}>
                        <Text style={styles.modalButtonText}>OK</Text>
                    </TouchableOpacity>
                </View>
            </Modal>
            <View style={{ height: 100 }}></View>
        </SafeAreaView>
    );
};

export default NgoOtherNotification;

const styles = StyleSheet.create({
    flatListContainer: {
        paddingHorizontal: 10,
        marginTop: -10
    },
    modalContent: {
        backgroundColor: 'white',
        padding: 20,
        borderRadius: 10,
    },
    modalHeader: {
        fontSize: 18,
        fontWeight: 'bold',
        marginBottom: 10,
    },
    modalRow: {
        flexDirection: 'row',
        marginBottom: 10,
    },
    modalLabel: {
        fontWeight: 'bold',
        marginRight: 10,
    },
    modalValue: {
        flex: 1,
        flexWrap: 'wrap',
    },
    modalButton: {
        backgroundColor: '#FF7F3E',
        padding: 10,
        borderRadius: 5,
        alignItems: 'center',
        marginTop: 10,
    },
    modalButtonText: {
        color: 'white',
        fontWeight: 'bold',
    },
});
