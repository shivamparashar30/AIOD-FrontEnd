// import { FlatList, SafeAreaView, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
// import React, { useEffect, useState } from 'react'
// import { COLORS, SIZES } from '../constants'
// import { ArrowLeftIcon } from 'react-native-heroicons/solid'
// import { useNavigation } from '@react-navigation/native'
// import axios from 'axios'
// import constant from '../constant'
// import Modal from 'react-native-modal'
// import AsyncStorage from '@react-native-async-storage/async-storage'
// import { Entypo } from '@expo/vector-icons'
// import { format } from 'date-fns';


// const formatDateTime = (isoString) => {
//     const date = new Date(isoString);
//     return format(date, 'dd-MM-yyyy HH:mm');
// };

// const OtherNotification = () => {
//     const navigation = useNavigation()

//     const [isModalVisible, setIsModalVisible] = useState(false)
//     const [token, setToken] = useState("")
//     const [paymentData, setPaymentData] = useState([])
//     const [driverName, setDriverName] = useState("")
//     const [driverPhone, setDriverPhone] = useState("")

//     // Added-1
//     const [ngoName, setNgoName] = useState("");
//     const [ngoContact, setNgoContact] = useState("");
//     const [itemsQty, setItemsQty] = useState("");
//     const [foodItem, setFoodItem] = useState("");
//     const [vehicle, setVehicle] = useState("");
//     const [time, setTime] = useState("");
//     const [address, setAddress] = useState("");
//     const [moneyData, setMoneyData] = useState({})
//     //Added-1
//     const getToken = async () => {
//         try {
//             const token = await AsyncStorage.getItem("userdata")
//             console.log("Token: ", token)

//             const response = JSON.parse(token)
//             setToken(response[0])
//             getMeData(response[0])
//             getMoneyData(response[0])
//         } catch (error) {
//             console.log("Splash: " + error)
//         }
//     }

//     const getData = (token, id) => {
//         axios({
//             method: 'get',
//             url: constant.BASE_URL + `/request/requesterRequests/${id}`,
//             headers: { 'Authorization': token }
//         }).then((apiResponse) => {
//             console.log("Payment Data: ", apiResponse.data.message)
//             setPaymentData(getPendingRequests(apiResponse.data.message))
//             //Added-2
//             setNgoName(data.ngoName);
//             setNgoContact(data.ngoContact);
//             setItemsQty(data.itemsQty);
//             setFoodItem(data.foodItem);
//             setVehicle(apiResponse.data.data.vehicle);

//             setAddress(apiResponse.data.data.address2);
//             //Added-2
//         }).catch((err) => {
//             console.log("Recipient" + err)
//         })
//     }

//     const getDriverData = (id) => {
//         axios({
//             method: 'get',
//             url: constant.BASE_URL + `/auth/user/${id}`,
//             headers: { 'Authorization': token }
//         }).then((apiResponse) => {
//             console.log("Driver Data: ", apiResponse.data)
//             setNgoName(apiResponse.data.data.name)
//             setNgoContact(apiResponse.data.data.phoneno)
//             setDriverName(apiResponse.data.data.driverName) // Adjusted for correct data structure
//             setDriverPhone(apiResponse.data.data.driverPhone) // Adjusted for correct data structure
//         }).catch((err) => {
//             console.log("Driver Data Error: ", err)
//         })
//     }
//     const getNgoData = (id) => {
//         axios({
//             method: 'get',
//             url: constant.BASE_URL + `/auth/user/${id}`,
//             headers: { 'Authorization': token }
//         }).then((apiResponse) => {
//             console.log("Ngo Data: ", apiResponse.data)
//             setNgoName(apiResponse.data.data.name)
//             setNgoContact(apiResponse.data.data.phoneno)
//             // Adjusted for correct data structure
//         }).catch((err) => {
//             console.log("Driver Data Error: ", err)
//         })
//     }

//     const handleAssign = (id) => {
//         setIsModalVisible(true)
//         getDriverData(id)
//         var single = paymentData.find(item => item.recipient === id)
//         setNgoName(single.ngoName)
//         setItemsQty(single.count)
//         setVehicle(single.vehicle)
//         setAddress(single.address2)
//         setFoodItem(single.Item)
//         setTime(formatDateTime(single.createdAt.toString()))

//     }

//     const handleOk = () => {
//         setIsModalVisible(false)
//     }


//     const handleInfo = (id) => {
//         setIsModalVisible(true)
//         // getNgoData(id)
//         var single = paymentData.find(item => item.recipient === id)
//         // setNgoName(single.ngoName)
//         // setNgoContact(single.ngoContact)
//         setItemsQty(single.count)
//         setVehicle(single.vehicle)
//         setAddress(single.address2)
//         setFoodItem(single.Item)
//         setTime(formatDateTime(single.createdAt.toString()))
//     }


//     const getMeData = (token) => {
//         axios({
//             method: 'get',
//             url: constant.BASE_URL + '/auth/me',
//             headers: { 'Authorization': token },
//         }).then((apiResponse) => {
//             getData(token, apiResponse.data.data._id)
//         }).catch((err) => {
//             console.log("Profile" + err)
//         })
//     }
//     const getMoneyData = (token) => {
//         // setIsLoading(true)
//         axios({
//             method: 'get',
//             url: constant.BASE_URL + '/money/getusermoneydonationlist',
//             headers: { 'Authorization': token }
//         }).then((apiResponse) => {
//             // const { name } = apiResponse.data.data
//             console.log("MOney Data: ", apiResponse.data.data);
//             setMoneyData(apiResponse.data.data)
//             // setUserList(apiResponse.data.data.filter)
//             // setIsLoading(false)
//         }).catch((err) => {
//             console.log("Profile" + err);
//             // setIsLoading(false);
//         });
//     }

//     useEffect(() => {
//         getToken()
//         const fetchDataInterval = setInterval(() => {
//             getToken()
//         }, 20000)

//         return () => clearInterval(fetchDataInterval)
//     }, [])

//     function getPendingRequests(userList) {
//         const filteredUser = userList.filter((user) => {
//             return user.status == 2 || user.status == 4 || user.status == 3
//         })
//         return filteredUser.reverse()
//     }

//     const renderItem = ({ item }) => {
//         // let message
//         // if (item.status == 2) {
//         //     message = ` <Entypo name="dot-single" size={24} color="black" />${item.userName}, your Donation Request for ${item.donationType} donation is accepted and will be picked up shortly.`
//         // } else if (item.status == 4) {
//         //     message = `${item.userName}, your Donation Request for ${item.donationType} donation has been completed. Thank you for your donation.`
//         // }
//         let message;
//         if (item.status == 2) {
//             message = (
//                 <View>
//                     <View style={{ flexDirection: 'row' }}>
//                         <Entypo name="dot-single" size={54} color="#FF7F3E" />
//                         <Text style={{
//                             color: 'white',
//                             fontSize: 16,
//                             fontWeight: 'bold',
//                             textAlign: 'auto',
//                             marginTop: 10
//                         }}>
//                             {` Your Donation Request for ${item.donationType} is accepted.`}
//                         </Text>
//                     </View>

//                     <Text style={{
//                         fontSize: 20,
//                         fontWeight: 'bold',
//                         color: '#FF7F3E',
//                         textAlign: 'center',
//                         marginTop: 10,
//                         marginHorizontal: 10
//                     }}>
//                         Donation will be picked up shortly.
//                     </Text>
//                     <TouchableOpacity onPress={() => handleAssign(item.recipient)}>
//                         <Text style={{
//                             textAlign: 'right',
//                             marginHorizontal: 10,
//                             marginTop: 10,
//                             color: 'pink'
//                         }}>More info</Text>
//                     </TouchableOpacity>
//                 </View>
//             );
//         } else if (item.status == 4) {
//             message = (
//                 <View>
//                     <View style={{ flexDirection: 'row' }}>
//                         <Entypo name="dot-single" size={54} color="#A1DD70" />
//                         <Text style={{
//                             color: 'white',
//                             fontSize: 16,
//                             fontWeight: 'bold',
//                             textAlign: 'auto',
//                             marginTop: 10
//                         }}>
//                             {`Your Donation for ${item.donationType} has been completed.`}
//                         </Text>
//                     </View>

//                     <Text style={{
//                         fontSize: 20,
//                         fontWeight: 'bold',
//                         color: '#A1DD70',
//                         textAlign: 'center',
//                         marginTop: 10
//                     }}>
//                         Thank you for your donation.
//                     </Text>
//                     <TouchableOpacity onPress={() => handleAssign(item.recipient)}>
//                         <Text style={{
//                             textAlign: 'right',
//                             marginHorizontal: 10,
//                             marginTop: 10,
//                             color: 'pink'
//                         }}>More info</Text>
//                     </TouchableOpacity>
//                 </View>
//             );
//         } else if (item.status === 3) {
//             message = (
//                 <View>
//                     <View style={{ flexDirection: 'row' }}>
//                         <Entypo name="dot-single" size={54} color="red" />
//                         <Text style={{
//                             color: 'white',
//                             fontSize: 16,
//                             fontWeight: 'bold',
//                             textAlign: 'auto',
//                             marginTop: 10,
//                             marginHorizontal: 10
//                         }}>
//                             {`Your Donation for ${item.donationType} has been Cancelled.`}
//                         </Text>

//                     </View>
//                     <Text style={{
//                         fontSize: 20,
//                         fontWeight: 'bold',
//                         color: 'red',
//                         textAlign: 'center',
//                         marginTop: 10
//                     }}>
//                         We are Sorry for the inconvience caused.
//                     </Text>



//                 </View>
//             );
//         }

//         return (
//             <View style={{ height: 150, margin: 5, marginTop: 10, backgroundColor: COLORS.primary, borderRadius: 10 }}>
//                 <Text style={{ marginTop: 10, fontWeight: 'bold', color: 'white', fontSize: 20, textAlign: 'center' }}>{message}</Text>
//                 <View style={{ height: 1, borderWidth: 1, borderColor: COLORS.secondary, marginTop: 5, width: '70%', marginHorizontal: 55 }}></View>

//             </View>
//         )
//     }

//     return (
//         <SafeAreaView>
//             {/* <View style={styles.container}>
//                 <View style={styles.topContainer}>
//                     <View style={styles.backIcon}>
//                         <TouchableOpacity onPress={() => { navigation.navigate('HomeScreen') }}>
//                             <ArrowLeftIcon color={'#2A4D50'} />
//                         </TouchableOpacity>
//                     </View>
//                     <View style={styles.titleTextContainer}>
//                         <Text style={styles.titleText(COLORS.primary, SIZES.xSmall - 5)}>Notification</Text>
//                     </View>
//                 </View>
//             </View>

//             <View style={{ flex: 1, flexDirection: 'row', alignItems: 'center', marginTop: 50 }}>
//                 <View style={{ flex: 1, height: 1, backgroundColor: '#B4B4B8', width: '100%' }} />
//             </View> */}
//             <FlatList
//                 style={{ padding: 10, marginTop: 30 }}
//                 showsHorizontalScrollIndicator={false}
//                 contentContainerStyle={styles.flatListContainer}
//                 data={paymentData}
//                 keyExtractor={(item) => item.id}
//                 renderItem={renderItem}
//             />


//             <Modal isVisible={isModalVisible}>
//                 <View style={styles.modalContent}>
//                     <Text style={styles.modalHeader}>More Info</Text>

//                     <View style={styles.modalRow}>
//                         <Text style={styles.modalLabel}>NGO:</Text>
//                         <Text style={styles.modalValue}>{ngoName}</Text>
//                     </View>

//                     <View style={styles.modalRow}>
//                         <Text style={styles.modalLabel}>NGO Contact:</Text>
//                         <Text style={styles.modalValue}>{ngoContact}</Text>
//                     </View>

//                     <View style={styles.modalRow}>
//                         <Text style={styles.modalLabel}>Time:</Text>
//                         <Text style={styles.modalValue}>{time}</Text>
//                     </View>

//                     <View style={styles.modalRow}>
//                         <Text style={styles.modalLabel}>Quantity:</Text>
//                         <Text style={styles.modalValue}>{itemsQty}</Text>
//                     </View>

//                     <View style={styles.modalRow}>
//                         <Text style={styles.modalLabel}>Food Item:</Text>
//                         <Text style={styles.modalValue}>{foodItem}</Text>
//                     </View>

//                     <View style={styles.modalRow}>
//                         <Text style={styles.modalLabel}>Vehicle:</Text>
//                         <Text style={styles.modalValue}>{vehicle}</Text>
//                     </View>

//                     <View style={styles.modalRow}>
//                         <Text style={styles.modalLabel}>Address:</Text>
//                         <Text style={styles.modalValue}>{address}</Text>
//                     </View>

//                     {/* Only display driver name and phone if the status is not 3 or 4 */}
//                     {ngoName !== "" && (
//                         <View>
//                             <View style={styles.modalRow}>
//                                 <Text style={styles.modalLabel}>Driver Name:</Text>
//                                 <Text style={styles.modalValue}>{driverName}</Text>
//                             </View>

//                             <View style={styles.modalRow}>
//                                 <Text style={styles.modalLabel}>Driver Phone:</Text>
//                                 <Text style={styles.modalValue}>{driverPhone}</Text>
//                             </View>
//                         </View>
//                     )}

//                     <TouchableOpacity onPress={handleOk} style={styles.modalButton}>
//                         <Text style={styles.modalButtonText}>OK</Text>
//                     </TouchableOpacity>
//                 </View>
//             </Modal>


//             <View style={{ height: 100 }}></View>
//         </SafeAreaView>
//     )
// }

// export default OtherNotification

// const styles = StyleSheet.create({
//     flatListContainer: {
//         paddingHorizontal: 10,
//         marginTop: -10
//     },
//     container: {
//         flex: 1,
//         backgroundColor: 'white',
//     },
//     topContainer: {
//         flexDirection: "row",
//         alignItems: "center",
//         width: '100%',
//         height: 45,
//     },
//     containerThree: {
//         flex: 1,
//         paddingHorizontal: 20,
//         paddingTop: 20,
//     },
//     textInput: {
//         height: 70,
//         borderWidth: 1,
//         borderColor: '#ccc',
//         borderRadius: 10,
//         padding: 10,
//         fontSize: 18,
//         textAlignVertical: 'top',
//     },
//     backIcon: {
//         marginLeft: 10
//     },
//     titleTextContainer: {
//         marginHorizontal: 100,
//         width: 200
//     },
//     containerTwo: {
//         flexDirection: 'row',
//         paddingHorizontal: 6,
//         marginTop: 4,
//     },
//     tab: {
//         height: 40,
//         width: 82,
//         justifyContent: 'center',
//         alignItems: 'center',
//         backgroundColor: 'white',
//         borderRadius: 20,
//         margin: 8,
//         marginLeft: 8,
//         padding: 5,
//         borderWidth: 1,
//         borderColor: '#2A4D50',
//     },
//     selectedTab: {
//         backgroundColor: '#2A4D50',
//     },
//     tabText: {
//         color: '#2A4D50',
//     },
//     selectedTabText: {
//         color: 'white',
//     },
//     titleText: (color, top) => ({
//         fontWeight: "500",
//         fontSize: SIZES.xLarge,
//         marginTop: top,
//         color: color,
//         marginLeft: -1,
//     }),

//     modalContent: {
//         backgroundColor: 'white',
//         padding: 20,
//         borderRadius: 10,
//     },
//     modalHeader: {
//         fontSize: 18,
//         fontWeight: 'bold',
//         marginBottom: 10,
//     },
//     modalRow: {
//         flexDirection: 'row',
//         marginBottom: 10,
//     },
//     modalLabel: {
//         fontWeight: 'bold',
//         marginRight: 10,
//     },
//     modalValue: {
//         flex: 1,
//         flexWrap: 'wrap',
//     },
//     modalButton: {
//         backgroundColor: '#FF7F3E',
//         padding: 10,
//         borderRadius: 5,
//         alignItems: 'center',
//         marginTop: 10,
//     },
//     modalButtonText: {
//         color: 'white',
//         fontWeight: 'bold',
//     },

// })


import { FlatList, SafeAreaView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import React, { useEffect, useState } from 'react';
import { Picker } from '@react-native-picker/picker'; // Import the picker
import { COLORS, SIZES } from '../constants';
import { ArrowLeftIcon } from 'react-native-heroicons/solid';
import { useNavigation } from '@react-navigation/native';
import axios from 'axios';
import constant from '../constant';
import Modal from 'react-native-modal';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Entypo } from '@expo/vector-icons';
import { format } from 'date-fns';

const formatDateTime = (isoString) => {
    const date = new Date(isoString);
    return format(date, 'dd-MM-yyyy HH:mm');
};

const OtherNotification = () => {
    const navigation = useNavigation();

    const [isModalVisible, setIsModalVisible] = useState(false);
    const [token, setToken] = useState("");
    const [paymentData, setPaymentData] = useState([]);
    const [filteredData, setFilteredData] = useState([]);
    const [selectedFilter, setSelectedFilter] = useState("all"); // State for the selected filter

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
            console.log("Token: ", token);

            const response = JSON.parse(token);
            setToken(response[0]);
            getMeData(response[0]);
            getMoneyData(response[0]);
        } catch (error) {
            console.log("Splash: " + error);
        }
    };

    const getData = (token, id) => {
        axios({
            method: 'get',
            url: constant.BASE_URL + `/request/requesterRequests/${id}`,
            headers: { 'Authorization': token }
        }).then((apiResponse) => {
            console.log("Payment Data: ", apiResponse.data.message);
            const pendingRequests = getPendingRequests(apiResponse.data.message);
            setPaymentData(pendingRequests);
            setFilteredData(pendingRequests);
        }).catch((err) => {
            console.log("Recipient" + err);
        });
    };

    const getDriverData = (id) => {
        axios({
            method: 'get',
            url: constant.BASE_URL + `/auth/user/${id}`,
            headers: { 'Authorization': token }
        }).then((apiResponse) => {
            console.log("Driver Data: ", apiResponse.data);
            setNgoName(apiResponse.data.data.name);
            setNgoContact(apiResponse.data.data.phoneno);
            setDriverName(apiResponse.data.data.driverName); // Adjusted for correct data structure
            setDriverPhone(apiResponse.data.data.driverPhone); // Adjusted for correct data structure
        }).catch((err) => {
            console.log("Driver Data Error: ", err);
        });
    };

    const getNgoData = (id) => {
        axios({
            method: 'get',
            url: constant.BASE_URL + `/auth/user/${id}`,
            headers: { 'Authorization': token }
        }).then((apiResponse) => {
            console.log("Ngo Data: ", apiResponse.data);
            setNgoName(apiResponse.data.data.name);
            setNgoContact(apiResponse.data.data.phoneno);
        }).catch((err) => {
            console.log("Driver Data Error: ", err);
        });
    };

    const handleAssign = (id) => {
        setIsModalVisible(true);
        getDriverData(id);
        var single = paymentData.find(item => item.recipient === id);
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

    const handleInfo = (id) => {
        setIsModalVisible(true);
        var single = paymentData.find(item => item.recipient === id);
        setItemsQty(single.count);
        setVehicle(single.vehicle);
        setAddress(single.address2);
        setFoodItem(single.Item);
        setTime(formatDateTime(single.createdAt.toString()));
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

    const getMoneyData = (token) => {
        axios({
            method: 'get',
            url: constant.BASE_URL + '/money/getusermoneydonationlist',
            headers: { 'Authorization': token }
        }).then((apiResponse) => {
            console.log("MOney Data: ", apiResponse.data.data);
            setMoneyData(apiResponse.data.data);
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

    const getPendingRequests = (userList) => {
        const filteredUser = userList.filter((user) => {
            return user.status == 2 || user.status == 4 || user.status == 3;
        });
        return filteredUser.reverse();
    };

    const handleFilterChange = (value) => {
        setSelectedFilter(value);
        if (value === "all") {
            setFilteredData(paymentData);
        } else {
            const filtered = paymentData.filter(item => item.status.toString() === value);
            setFilteredData(filtered);
        }
    };

    const renderItem = ({ item }) => {
        // let message
        // if (item.status == 2) {
        //     message = ` <Entypo name="dot-single" size={24} color="black" />${item.userName}, your Donation Request for ${item.donationType} donation is accepted and will be picked up shortly.`
        // } else if (item.status == 4) {
        //     message = `${item.userName}, your Donation Request for ${item.donationType} donation has been completed. Thank you for your donation.`
        // }
        let message;
        if (item.status == 2) {
            message = (
                <View>
                    <View style={{ flexDirection: 'row' }}>
                        <Entypo name="dot-single" size={54} color="#FF7F3E" />
                        <Text style={{
                            color: 'white',
                            fontSize: 16,
                            fontWeight: 'bold',
                            textAlign: 'auto',
                            marginTop: 10
                        }}>
                            {` Your Donation Request for ${item.donationType} is accepted.`}
                        </Text>
                    </View>

                    <Text style={{
                        fontSize: 20,
                        fontWeight: 'bold',
                        color: '#FF7F3E',
                        textAlign: 'center',
                        marginTop: 10,
                        marginHorizontal: 10
                    }}>
                        Donation will be picked up shortly.
                    </Text>
                    <TouchableOpacity onPress={() => handleAssign(item.recipient)}>
                        <Text style={{
                            textAlign: 'right',
                            marginHorizontal: 10,
                            marginTop: 10,
                            color: 'pink'
                        }}>More info</Text>
                    </TouchableOpacity>
                </View>
            );
        } else if (item.status == 4) {
            message = (
                <View>
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
                </View>
            );
        } else if (item.status === 3) {
            message = (
                <View>
                    <View style={{ flexDirection: 'row' }}>
                        <Entypo name="dot-single" size={54} color="red" />
                        <Text style={{
                            color: 'white',
                            fontSize: 16,
                            fontWeight: 'bold',
                            textAlign: 'auto',
                            marginTop: 10,
                            marginHorizontal: 10
                        }}>
                            {`Your Donation for ${item.donationType} has been Cancelled.`}
                        </Text>

                    </View>
                    <Text style={{
                        fontSize: 20,
                        fontWeight: 'bold',
                        color: 'red',
                        textAlign: 'center',
                        marginTop: 10
                    }}>
                        We are Sorry for the inconvience caused.
                    </Text>



                </View>
            );
        }

        return (
            <View style={{ height: 150, margin: 5, marginTop: 10, backgroundColor: COLORS.primary, borderRadius: 10 }}>
                <Text style={{ marginTop: 10, fontWeight: 'bold', color: 'white', fontSize: 20, textAlign: 'center' }}>{message}</Text>
                <View style={{ height: 1, borderWidth: 1, borderColor: COLORS.secondary, marginTop: 5, width: '70%', marginHorizontal: 55 }}></View>

            </View>
        )
    }

    return (
        <SafeAreaView style={styles.container}>


            <View style={styles.filterContainer}>
                <Picker
                    selectedValue={selectedFilter}
                    onValueChange={handleFilterChange}
                    style={styles.picker}
                >
                    <Picker.Item label="All" value="all" />
                    <Picker.Item label="Accepted" value="2" />
                    <Picker.Item label="Completed" value="4" />
                    <Picker.Item label="Cancelled" value="3" />
                </Picker>
            </View>

            <FlatList
                data={filteredData}
                renderItem={renderItem}
                keyExtractor={(item) => item._id.toString()}
                style={{ marginTop: 110 }}
            />

            <Modal isVisible={isModalVisible}>
                <View style={styles.modalContent}>
                    <Text style={styles.modalHeader}>More Info</Text>

                    <View style={styles.modalRow}>
                        <Text style={styles.modalLabel}>NGO:</Text>
                        <Text style={styles.modalValue}>{ngoName}</Text>
                    </View>

                    <View style={styles.modalRow}>
                        <Text style={styles.modalLabel}>NGO Contact:</Text>
                        <Text style={styles.modalValue}>{ngoContact}</Text>
                    </View>

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

                    {ngoName !== "" && (
                        <View>
                            <View style={styles.modalRow}>
                                <Text style={styles.modalLabel}>Driver Name:</Text>
                                <Text style={styles.modalValue}>{driverName}</Text>
                            </View>

                            <View style={styles.modalRow}>
                                <Text style={styles.modalLabel}>Driver Phone:</Text>
                                <Text style={styles.modalValue}>{driverPhone}</Text>
                            </View>
                        </View>
                    )}

                    <TouchableOpacity onPress={handleOk} style={styles.modalButton}>
                        <Text style={styles.modalButtonText}>OK</Text>
                    </TouchableOpacity>
                </View>
            </Modal>

        </SafeAreaView>
    );
};

export default OtherNotification;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: COLORS.bgColor,
        paddingHorizontal: SIZES.padding,
        paddingTop: SIZES.padding2
    },
    header: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: SIZES.padding2,
    },
    backButton: {
        padding: SIZES.base,
    },
    headerText: {
        fontSize: SIZES.h2,
        fontWeight: 'bold',
        color: COLORS.white,
        marginLeft: SIZES.base,
    },
    filterContainer: {
        marginVertical: SIZES.padding,
        // backgroundColor: COLORS.white,
        borderRadius: SIZES.radius,
        marginTop: -50
    },
    picker: {
        height: 50,
        color: COLORS.black,
    },
    listItemContainer: {
        marginVertical: SIZES.padding,
        backgroundColor: COLORS.listItemBg,
        padding: SIZES.padding,
        borderRadius: SIZES.radius,
    },
    divider: {
        height: 1,
        backgroundColor: COLORS.divider,
        marginVertical: SIZES.padding,
    },
    // modalContent: {
    //     backgroundColor: COLORS.modalBg,
    //     padding: SIZES.padding,
    //     borderRadius: SIZES.radius,
    // },
    // modalTitle: {
    //     fontSize: SIZES.h2,
    //     fontWeight: 'bold',
    //     color: COLORS.white,
    //     marginBottom: SIZES.base,
    // },
    // modalSubTitle: {
    //     fontSize: SIZES.h3,
    //     color: COLORS.white,
    //     marginBottom: SIZES.base,
    // },
    // modalText: {
    //     fontSize: SIZES.body3,
    //     color: COLORS.white,
    //     marginBottom: SIZES.base,
    // },
    okButton: {
        backgroundColor: COLORS.primary,
        padding: SIZES.padding,
        borderRadius: SIZES.radius,
        alignItems: 'center',
    },
    okButtonText: {
        color: COLORS.white,
        fontWeight: 'bold',
        fontSize: SIZES.h3,
    },
    // modalButtonText: {
    //     color: 'white',
    //     fontWeight: 'bold',
    // },
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


