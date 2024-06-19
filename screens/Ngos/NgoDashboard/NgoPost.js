
// import { Alert, FlatList, Modal, SafeAreaView, StatusBar, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
// import React, { useEffect, useState } from 'react'
// import { COLORS, SIZES } from '../../../constants'
// import { ArrowLeftIcon } from 'react-native-heroicons/solid'
// import { useNavigation } from '@react-navigation/native'
// import axios from 'axios'
// import constant from '../../../constant'
// import AsyncStorage from '@react-native-async-storage/async-storage'
// import { Entypo } from '@expo/vector-icons';
// import { format } from 'date-fns';


// const formatDateTime = (isoString) => {
//     const date = new Date(isoString);
//     return format(date, 'dd-MM-yyyy HH:mm');
// };


// const NgoPost = () => {
//     const navigation = useNavigation();

//     const [token, setToken] = useState("")
//     const [paymentData, setPaymentData] = useState({})
//     // const [isModalVisible, setIsModalVisible] = useState(false)
//     // const [itemsQty, setItemsQty] = useState("");
//     // const [foodItem, setFoodItem] = useState("");
//     // const [vehicle, setVehicle] = useState("");
//     // const [time, setTime] = useState("");
//     // const [address, setAddress] = useState("");



//     const getToken = async () => {
//         try {
//             const token = await AsyncStorage.getItem("userdata");
//             console.log(token);

//             // if (token === null) {
//             //     navigation.navigate('Welcome');
//             //     return;
//             // }

//             const response = JSON.parse(token);
//             setToken(response[0]);
//             getMeData(response[0]);
//             // getMeData(response[0]);
//         } catch (error) {
//             console.log("Splash: " + error);
//         }
//     };

//     const getData = (token, id) => {
//         // setIsLoading(true)
//         axios({
//             method: 'get',
//             url: constant.BASE_URL + `/request/recipientRequests/${id}`,
//             headers: { 'Authorization': token }
//         }).then((apiResponse) => {
//             // const { name } = apiResponse.data.data
//             console.log(apiResponse.data.message);
//             setPaymentData(getPendingRequests(apiResponse.data.message))
//             // setPaymentData(apiResponse.data.message)
//             // setUserList(apiResponse.data.data.filter)
//             // setIsLoading(false)
//             // setNgoName(data.ngoName);
//             // setNgoContact(data.ngoContact);
//             // setItemsQty(data.itemsQty);
//             // setFoodItem(data.foodItem);
//             // setVehicle(apiResponse.data.data.vehicle);

//             // setAddress(apiResponse.data.data.address2);
//         }).catch((err) => {
//             console.log("Recipient" + err);
//             // setIsLoading(false);
//         });
//     }
//     const getMeData = (token) => {
//         axios({
//             method: 'get',
//             url: constant.BASE_URL + '/auth/me',
//             headers: { 'Authorization': token },
//         }).then((apiResponse) => {
//             getData(token, apiResponse.data.data._id)
//         }).catch((err) => {
//             console.log("Profile" + err);
//         });
//     }

//     // const handleAssign = (id) => {
//     //     setIsModalVisible(true)
//     //     getDriverData(id)
//     //     var single = paymentData.find(item => item.recipient === id)
//     //     setItemsQty(single.count)
//     //     setVehicle(single.vehicle)
//     //     setAddress(single.address2)
//     //     setFoodItem(single.Item)
//     //     setTime(formatDateTime(single.createdAt.toString()))

//     // }
//     // const handleOk = () => {
//     //     setIsModalVisible(false)
//     // }

//     function handleAcceptRequest(id) {
//         axios({
//             method: 'put',
//             url: constant.BASE_URL + `/request/${id}`,
//             headers: { 'Content-Type': 'application/json', 'charset': 'utf-8', 'Authorization': token },
//             data: {
//                 status: 2
//             },
//         }).then((apiResponse) => {
//             console.log(apiResponse.data);
//             Alert.alert(apiResponse.data.message)
//         }).catch((err) => {
//             console.log(err)
//         })
//     }
//     function handleDeliverRequest(id) {
//         axios({
//             method: 'put',
//             url: constant.BASE_URL + `/request/${id}`,
//             headers: { 'Content-Type': 'application/json', 'charset': 'utf-8', 'Authorization': token },
//             data: {
//                 status: 4
//             },
//         }).then((apiResponse) => {
//             console.log(apiResponse.data);
//             Alert.alert(apiResponse.data.message)
//         }).catch((err) => {
//             console.log(err)
//         })
//     }

//     // const handleAcceptRequest = (id) => {

//     // }

//     function handleRejectRequest(id) {
//         axios({
//             method: 'put',
//             url: constant.BASE_URL + `/request/${id}`,
//             headers: { 'Content-Type': 'application/json', 'charset': 'utf-8', 'Authorization': token },
//             data: {
//                 status: 3
//             }
//         }).then((apiResponse) => {
//             console.log(apiResponse.data);
//             Alert.alert(apiResponse.data.message)
//         }).catch((err) => {
//             console.log(err)
//         })
//     }

//     // const handleRejectRequest = (id) => {

//     // }
//     useEffect(() => {
//         getToken()
//         const fetchDataInterval = setInterval(() => {
//             getToken()
//         }, 20000);

//         return () => clearInterval(fetchDataInterval);
//     }, []);

//     function getPendingRequests(userList) {
//         const filteredUser = userList.filter((user) => {
//             return user.status == 1 || user.status == 2;
//         });
//         return filteredUser;
//     }
//     return (

//         <SafeAreaView>
//             <View style={styles.container}>
//                 <View style={styles.topContainer}>
//                     <View style={styles.backIcon}>
//                         <TouchableOpacity onPress={() => { navigation.navigate('NgoHomeScreen') }}>
//                             <ArrowLeftIcon color={'#2A4D50'} />
//                         </TouchableOpacity>
//                     </View>
//                     <View style={styles.titleTextContainer}>
//                         <Text style={styles.titleText(COLORS.primary, SIZES.xSmall - 5)}>Donation Requests</Text>
//                     </View>
//                 </View>
//             </View>

//             <View style={{ flex: 1, flexDirection: 'row', alignItems: 'center', marginTop: 50 }}>
//                 <View style={{ flex: 1, height: 1, backgroundColor: '#B4B4B8', width: '100%' }} />
//             </View>
//             <FlatList
//                 style={{ padding: 10 }}
//                 showsHorizontalScrollIndicator={false}
//                 contentContainerStyle={styles.flatListContainer}
//                 data={paymentData}
//                 keyExtractor={(item) => item.id}
//                 renderItem={({ item }) =>
//                     <View style={{ height: 220, margin: 10, marginTop: 10, backgroundColor: COLORS.primary, borderRadius: 10 }}>
//                         <Text style={{ marginTop: 10, fontWeight: 'bold', color: 'white', fontSize: 20, textAlign: 'center' }} >{item.userName} Donated {item.donationType} </Text>
//                         <View style={{ height: 1, borderWidth: 1, borderColor: COLORS.secondary, marginTop: 5, width: '70%', marginHorizontal: 55 }}></View>

//                         <Text style={{ marginTop: 15, marginHorizontal: 10, fontWeight: 'bold', color: 'white', fontSize: 17, textAlign: 'center' }} >from- {item.address2}</Text>
//                         <Text style={{ marginTop: 5, fontWeight: 'bold', color: 'white', fontSize: 17, textAlign: 'center' }} >contact - {item.phoneno}</Text>
//                         <View style={{ flexDirection: 'row', justifyContent: 'center' }}>
//                             <Text style={{ marginTop: 5, fontWeight: 'bold', color: 'white', fontSize: 17, textAlign: 'center' }} >Time - {formatDateTime(item.createdAt.toString())}   </Text>
//                             <TouchableOpacity>
//                                 <Text style={{ marginTop: 10, fontWeight: 'bold', color: 'red', fontSize: 12, textAlign: 'center' }}>  more info</Text>

//                             </TouchableOpacity>
//                         </View>

//                         <View style={{ height: 1, borderWidth: 1, borderColor: COLORS.secondary, marginTop: 15, width: '70%', marginHorizontal: 55 }}></View>
//                         <View style={{ flexDirection: 'row', marginTop: 5 }}>
//                             <TouchableOpacity onPress={() => {
//                                 console.log("FlatList", item._id);
//                                 handleRejectRequest(item._id)
//                             }
//                             }>

//                                 {/* <TouchableOpacity onPress={() => {
//                                 Alert.alert('Donation Rejected');
//                                 handleDeleteItem(item.id); // Pass the item's id to delete it
//                             }}> */}
//                                 <Entypo style={{
//                                     marginHorizontal: 100,
//                                 }} name="cross" size={26} color="red" />
//                             </TouchableOpacity>
//                             <TouchableOpacity onPress={() => handleAcceptRequest(item._id)}>
//                                 <Entypo name="check" size={26} color="green" />
//                             </TouchableOpacity>


//                         </View>

//                         <TouchableOpacity onPress={() => handleDeliverRequest(item._id)}
//                             style={{
//                                 height: 30,
//                                 backgroundColor: 'pink',
//                                 marginTop: 0,
//                                 borderRadius: 10,
//                                 width: '70%',
//                                 marginHorizontal: 55,
//                             }}>
//                             <Text style={{
//                                 fontSize: 19,
//                                 fontWeight: 'bold',
//                                 color: COLORS.primary,
//                                 textAlign: 'center'
//                             }}
//                             >Mark As Recieved</Text>
//                         </TouchableOpacity>
//                     </View>
//                 }

//             />
//             {/* <Modal
//                 isVisible={isModalVisible}
//                 onBackdropPress={() => setIsModalVisible(false)}
//                 animationIn="slideInUp"
//                 animationOut="slideOutDown"
//                 backdropOpacity={0.4}>
//                 <View style={styles.modalContainer}>

//                     <Text style={styles.modalText}>Items Quantity: {itemsQty}</Text>
//                     <Text style={styles.modalText}>Food Item: {foodItem}</Text>
//                     <Text style={styles.modalText}>Vehicle: {vehicle}</Text>
//                     <Text style={styles.modalText}>Time: {time}</Text>
//                     <Text style={styles.modalText}>Address: {address}</Text>
//                     <TouchableOpacity onPress={handleOk}>
//                         <Text style={styles.modalButton}>OK</Text>
//                     </TouchableOpacity>
//                 </View>
//             </Modal> */}
//         </SafeAreaView >

//     )
// }

// export default NgoPost

// const styles = StyleSheet.create({
//     modalContainer: {
//         backgroundColor: 'white',
//         padding: 20,
//         borderRadius: 10,
//         alignItems: 'center',
//     },
//     modalText: {
//         fontSize: 18,
//         marginBottom: 10,
//     },
//     modalButton: {
//         fontSize: 18,
//         color: COLORS.primary,
//         marginTop: 10,
//     },
//     flatListContainer: {
//         paddingHorizontal: 10,
//         marginTop: -10
//     },
//     container: {
//         flex: 1,
//         backgroundColor: 'white',
//         // alignItems: 'center'
//     },
//     topContainer: {
//         flexDirection: "row",
//         // justifyContent: "space-between",
//         alignItems: "center",
//         width: '100%',
//         height: 45,
//         // borderColor: 'red',
//         // borderWidth: 1
//     },
//     containerThree: {
//         flex: 1,
//         paddingHorizontal: 20,
//         paddingTop: 20,
//     },
//     textInput: {
//         height: 70, // Set the height to 300
//         borderWidth: 1,
//         borderColor: '#ccc',
//         borderRadius: 10,
//         padding: 10,
//         fontSize: 18,
//         textAlignVertical: 'top', // Aligns text at the top vertically
//     },
//     backIcon: {
//         marginLeft: 10
//     },
//     titleTextContainer: {
//         marginHorizontal: 100,
//         width: 200
//         // alignItems: 'center'
//     },
//     containerTwo: {
//         flexDirection: 'row',
//         // justifyContent: 'space-between',
//         paddingHorizontal: 6,
//         marginTop: 4,

//     },
//     tab: {
//         // flex: 1,
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
//         marginLeft: -38,
//     }),
// })

import { Alert, FlatList, Modal, SafeAreaView, StatusBar, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import React, { useEffect, useState } from 'react';
import { COLORS, SIZES } from '../../../constants';
import { ArrowLeftIcon } from 'react-native-heroicons/solid';
import { useNavigation } from '@react-navigation/native';
import axios from 'axios';
import constant from '../../../constant';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Entypo } from '@expo/vector-icons';
import { format } from 'date-fns';

const formatDateTime = (isoString) => {
    const date = new Date(isoString);
    return format(date, 'dd-MM-yyyy HH:mm');
};

const NgoPost = () => {
    const navigation = useNavigation();

    const [token, setToken] = useState("");
    const [paymentData, setPaymentData] = useState([]);
    const [isModalVisible, setIsModalVisible] = useState(false);
    const [selectedRequest, setSelectedRequest] = useState(null);

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
            setPaymentData(getPendingRequests(apiResponse.data.message));
            console.log(apiResponse.data);
        }).catch((err) => {
            console.log("Recipient" + err);
        });
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

    const handleAcceptRequest = (id) => {
        axios({
            method: 'put',
            url: constant.BASE_URL + `/request/${id}`,
            headers: { 'Content-Type': 'application/json', 'charset': 'utf-8', 'Authorization': token },
            data: {
                status: 2
            },
        }).then((apiResponse) => {
            Alert.alert(apiResponse.data.message);
        }).catch((err) => {
            console.log(err);
        });
    };

    const handleDeliverRequest = (id) => {
        axios({
            method: 'put',
            url: constant.BASE_URL + `/request/${id}`,
            headers: { 'Content-Type': 'application/json', 'charset': 'utf-8', 'Authorization': token },
            data: {
                status: 4
            },
        }).then((apiResponse) => {
            Alert.alert(apiResponse.data.message);
        }).catch((err) => {
            console.log(err);
        });
    };

    const handleRejectRequest = (id) => {
        axios({
            method: 'put',
            url: constant.BASE_URL + `/request/${id}`,
            headers: { 'Content-Type': 'application/json', 'charset': 'utf-8', 'Authorization': token },
            data: {
                status: 3
            }
        }).then((apiResponse) => {
            Alert.alert(apiResponse.data.message);
        }).catch((err) => {
            console.log(err);
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
        return userList.filter((user) => {
            return user.status == 1 || user.status == 2;
        });
    };

    const handleMoreInfo = (item) => {
        setSelectedRequest(item);
        setIsModalVisible(true);
    };

    const handleModalClose = () => {
        setIsModalVisible(false);
        setSelectedRequest(null);
    };

    return (
        <SafeAreaView>
            <View style={styles.container}>
                <View style={styles.topContainer}>
                    <View style={styles.backIcon}>
                        <TouchableOpacity onPress={() => { navigation.navigate('NgoHomeScreen') }}>
                            <ArrowLeftIcon color={'#2A4D50'} />
                        </TouchableOpacity>
                    </View>
                    <View style={styles.titleTextContainer}>
                        <Text style={styles.titleText(COLORS.primary, SIZES.xSmall - 5)}>Donation Requests</Text>
                    </View>
                </View>
            </View>

            <View style={{ flex: 1, flexDirection: 'row', alignItems: 'center', marginTop: 50 }}>
                <View style={{ flex: 1, height: 1, backgroundColor: '#B4B4B8', width: '100%' }} />
            </View>
            <FlatList
                style={{ padding: 10 }}
                showsHorizontalScrollIndicator={false}
                contentContainerStyle={styles.flatListContainer}
                data={paymentData}
                keyExtractor={(item) => item.id}
                renderItem={({ item }) =>
                    <View style={{ height: 220, margin: 10, marginTop: 10, backgroundColor: COLORS.primary, borderRadius: 10 }}>
                        <Text style={{ marginTop: 10, fontWeight: 'bold', color: 'white', fontSize: 20, textAlign: 'center' }} >{item.userName} Donated {item.donationType} </Text>
                        <View style={{ height: 1, borderWidth: 1, borderColor: COLORS.secondary, marginTop: 5, width: '70%', marginHorizontal: 55 }}></View>

                        <Text style={{ marginTop: 15, marginHorizontal: 10, fontWeight: 'bold', color: 'white', fontSize: 17, textAlign: 'center' }} >from- {item.address2}</Text>
                        <Text style={{ marginTop: 5, fontWeight: 'bold', color: 'white', fontSize: 17, textAlign: 'center' }} >contact - {item.phoneno}</Text>
                        <View style={{ flexDirection: 'row' }}>
                            <Text style={{ marginTop: 5, fontWeight: 'bold', color: 'white', fontSize: 17, textAlign: 'center' }} >Time - {formatDateTime(item.createdAt.toString())} </Text>
                            <TouchableOpacity onPress={() => handleMoreInfo(item)}>
                                <Text style={{ marginTop: 10, fontWeight: 'bold', color: 'red', fontSize: 12, textAlign: 'center' }}> more info</Text>
                            </TouchableOpacity>
                        </View>

                        <View style={{ height: 1, borderWidth: 1, borderColor: COLORS.secondary, marginTop: 15, width: '70%', marginHorizontal: 55 }}></View>
                        <View style={{ flexDirection: 'row', marginTop: 5 }}>
                            <TouchableOpacity onPress={() => handleRejectRequest(item._id)}>
                                <Entypo style={{ marginHorizontal: 100 }} name="cross" size={26} color="red" />
                            </TouchableOpacity>
                            <TouchableOpacity onPress={() => handleAcceptRequest(item._id)}>
                                <Entypo name="check" size={26} color="green" />
                            </TouchableOpacity>
                        </View>

                        <TouchableOpacity onPress={() => handleDeliverRequest(item._id)}
                            style={{
                                height: 30,
                                backgroundColor: 'pink',
                                marginTop: 0,
                                borderRadius: 10,
                                width: '70%',
                                marginHorizontal: 55,
                            }}>
                            <Text style={{
                                fontSize: 19,
                                fontWeight: 'bold',
                                color: COLORS.primary,
                                textAlign: 'center'
                            }}
                            >Mark As Received</Text>
                        </TouchableOpacity>
                    </View>
                }
            />

            {selectedRequest && (
                <Modal
                    animationType="slide"
                    transparent={true}
                    visible={isModalVisible}
                    onRequestClose={handleModalClose}
                >
                    <View style={styles.modalContainer}>
                        <View style={styles.modalContent}>
                            <Text style={styles.modalText}>Username: {selectedRequest.userName}</Text>
                            {/* <Text style={styles.modalText}>Name: {selectedRequest.name}</Text> */}
                            <Text style={styles.modalText}>Mobile No: {selectedRequest.phoneno}</Text>
                            <Text style={styles.modalText}>Item: {selectedRequest.Item}</Text>
                            <Text style={styles.modalText}>Count: {selectedRequest.count}</Text>
                            <Text style={styles.modalText}>Vehicle: {selectedRequest.vehicle}</Text>
                            <Text style={styles.modalText}>Address: {selectedRequest.address2}</Text>
                            <TouchableOpacity onPress={handleModalClose}>
                                <Text style={styles.modalButton}>Close</Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                </Modal>
            )}
        </SafeAreaView>
    );
};

export default NgoPost;

const styles = StyleSheet.create({
    modalContainer: {
        flex: 1,
        // justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
    },
    modalContent: {
        backgroundColor: 'white',
        padding: 20,
        borderRadius: 10,
        alignItems: 'center',
    },
    modalText: {
        fontSize: 18,
        marginBottom: 10,
    },
    modalButton: {
        fontSize: 18,
        color: COLORS.primary,
        marginTop: 10,
    },
    flatListContainer: {
        paddingHorizontal: 10,
        marginTop: -10,
    },
    container: {
        flex: 1,
        backgroundColor: 'white',
    },
    topContainer: {
        flexDirection: "row",
        alignItems: "center",
        width: '100%',
        height: 45,
    },
    backIcon: {
        marginLeft: 10,
    },
    titleTextContainer: {
        marginHorizontal: 100,
        width: 200,
    },
    titleText: (color, top) => ({
        fontWeight: "500",
        fontSize: SIZES.xLarge,
        marginTop: top,
        color: color,
        marginLeft: -38,
    }),
});

