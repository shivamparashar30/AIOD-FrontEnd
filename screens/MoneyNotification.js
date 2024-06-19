// import { FlatList, SafeAreaView, StyleSheet, Text, View } from 'react-native'
// import React, { useEffect, useState } from 'react'
// import { ArrowLeftIcon } from 'react-native-heroicons/solid'
// import { useNavigation } from '@react-navigation/native'
// import axios from 'axios'
// import AsyncStorage from '@react-native-async-storage/async-storage'
// import constant from '../constant'
// import { COLORS, SIZES } from '../constants'
// import { format } from 'date-fns'

// const MoneyNotification = () => {
//     const navigation = useNavigation();

//     const [token, setToken] = useState("")
//     const [paymentData, setPaymentData] = useState([])
//     const [ngoList, setNgoList] = useState([])

//     const getToken = async () => {
//         try {
//             const token = await AsyncStorage.getItem("userdata");
//             const response = JSON.parse(token);
//             setToken(response[0]);
//             getData(response[0]);
//             getNgoData(response[0]);
//         } catch (error) {
//             console.log("Splash: " + error);
//         }
//     };

//     const getData = (token) => {
//         axios({
//             method: 'get',
//             url: constant.BASE_URL + '/money/getusermoneydonationlist',
//             headers: { 'Authorization': token }
//         }).then((apiResponse) => {
//             setPaymentData(apiResponse.data.data.reverse());
//         }).catch((err) => {
//             console.log("Profile" + err);
//         });
//     }

//     const getNgoData = (token) => {
//         axios({
//             method: 'get',
//             url: constant.BASE_URL + '/auth/users',
//             headers: { 'Authorization': token }
//         }).then((apiResponse) => {
//             setNgoList(getNgos(apiResponse.data.data));
//         }).catch((err) => {
//             console.log("Profile" + err);
//         });
//     }

//     const getNgos = (data) => {
//         return data.filter(user => user.role === "ngo");
//     }

//     useEffect(() => {
//         getToken();
//         const fetchDataInterval = setInterval(() => {
//             getToken();
//         }, 20000);

//         return () => clearInterval(fetchDataInterval);
//     }, []);

//     const findNgoName = (ngoId) => {
//         const ngo = ngoList.find(ngo => ngo._id === ngoId);
//         return ngo ? ngo.name : 'NGO';
//     }

//     const formatDateTime = (isoString) => {
//         const date = new Date(isoString);
//         return format(date, 'dd-MM-yyyy HH:mm');
//     }

//     return (
//         <SafeAreaView>
//             <FlatList
//                 style={{ padding: 10, marginTop: 20 }}
//                 showsHorizontalScrollIndicator={false}
//                 contentContainerStyle={styles.flatListContainer}
//                 data={paymentData}
//                 keyExtractor={(item) => item._id}
//                 renderItem={({ item }) => {
//                     const ngoName = findNgoName(item.ngoId);
//                     const formattedDate = formatDateTime(item.createdAt);
//                     return (
//                         <View style={{ height: 60, margin: 5, marginTop: 10, backgroundColor: COLORS.gray2, borderRadius: 10 }}>
//                             <Text style={{ fontWeight: 'bold', fontSize: 16, marginHorizontal: 25, marginTop: 10, lineHeight: 23 }}>
//                                 {`Thank you for donating ₹${item.donationAmount} to`}
//                             </Text>
//                             <Text style={{ fontWeight: 'bold', fontSize: 16, marginHorizontal: 25, marginTop: 0, lineHeight: 23, color: COLORS.primary }}> {ngoName}</Text>
//                             <View style={{ borderWidth: 0, width: 150, marginHorizontal: 217, marginTop: -15 }}>
//                                 <Text style={{
//                                     // marginHorizontal: 170
//                                     fontWeight: '300'
//                                 }}>{formattedDate}</Text>
//                             </View>
//                         </View>
//                     );
//                 }}
//             />
//         </SafeAreaView>
//     )
// }

// export default MoneyNotification

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
//         marginHorizontal: 140
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
//         marginLeft: -38,
//     }),
// })
import { FlatList, SafeAreaView, StyleSheet, Text, View } from 'react-native'
import React, { useEffect, useState } from 'react'
import { ArrowLeftIcon } from 'react-native-heroicons/solid'
import { useNavigation } from '@react-navigation/native'
import axios from 'axios'
import AsyncStorage from '@react-native-async-storage/async-storage'
import constant from '../constant'
import { COLORS, SIZES } from '../constants'
import { format } from 'date-fns'
import { Picker } from '@react-native-picker/picker'

const MoneyNotification = () => {
    const navigation = useNavigation();

    const [token, setToken] = useState("")
    const [paymentData, setPaymentData] = useState([])
    const [ngoList, setNgoList] = useState([])
    const [selectedDate, setSelectedDate] = useState('all')

    const getToken = async () => {
        try {
            const token = await AsyncStorage.getItem("userdata");
            const response = JSON.parse(token);
            setToken(response[0]);
            getData(response[0]);
            getNgoData(response[0]);
        } catch (error) {
            console.log("Splash: " + error);
        }
    };

    const getData = (token) => {
        axios({
            method: 'get',
            url: constant.BASE_URL + '/money/getusermoneydonationlist',
            headers: { 'Authorization': token }
        }).then((apiResponse) => {
            setPaymentData(apiResponse.data.data.reverse());
        }).catch((err) => {
            console.log("Profile" + err);
        });
    }

    const getNgoData = (token) => {
        axios({
            method: 'get',
            url: constant.BASE_URL + '/auth/users',
            headers: { 'Authorization': token }
        }).then((apiResponse) => {
            setNgoList(getNgos(apiResponse.data.data));
        }).catch((err) => {
            console.log("Profile" + err);
        });
    }

    const getNgos = (data) => {
        return data.filter(user => user.role === "ngo");
    }

    useEffect(() => {
        getToken();
        const fetchDataInterval = setInterval(() => {
            getToken();
        }, 20000);

        return () => clearInterval(fetchDataInterval);
    }, []);

    const findNgoName = (ngoId) => {
        const ngo = ngoList.find(ngo => ngo._id === ngoId);
        return ngo ? ngo.name : 'NGO';
    }

    const formatDateTime = (isoString) => {
        const date = new Date(isoString);
        return format(date, 'dd-MM-yyyy HH:mm');
    }

    const filterDataByDate = () => {
        if (selectedDate === 'all') {
            return paymentData;
        }
        const today = new Date();
        const filteredData = paymentData.filter(item => {
            const itemDate = new Date(item.createdAt);
            if (selectedDate === 'last7days') {
                return itemDate >= today.setDate(today.getDate() - 7);
            } else if (selectedDate === 'last30days') {
                return itemDate >= today.setDate(today.getDate() - 30);
            } else if (selectedDate === 'last6months') {
                return itemDate >= today.setMonth(today.getMonth() - 6);
            }
            return false;
        });
        return filteredData;
    }

    return (
        <SafeAreaView>
            <Picker
                selectedValue={selectedDate}
                onValueChange={(itemValue, itemIndex) => setSelectedDate(itemValue)}
                style={{ height: 50, width: 200, alignSelf: 'center', marginTop: -50 }}
            >
                <Picker.Item label="All" value="all" />
                <Picker.Item label="Last 7 Days" value="last7days" />
                <Picker.Item label="Last 30 Days" value="last30days" />
                <Picker.Item label="Last 6 Months" value="last6months" />
            </Picker>
            <FlatList
                style={{ padding: 10, marginTop: 110 }}
                showsHorizontalScrollIndicator={false}
                contentContainerStyle={styles.flatListContainer}
                data={filterDataByDate()}
                keyExtractor={(item) => item._id}
                renderItem={({ item }) => {
                    const ngoName = findNgoName(item.ngoId);
                    const formattedDate = formatDateTime(item.createdAt);
                    return (
                        <View style={{ height: 60, margin: 5, marginTop: 10, backgroundColor: COLORS.gray2, borderRadius: 10 }}>
                            <Text style={{ fontWeight: 'bold', fontSize: 16, marginHorizontal: 25, marginTop: 10, lineHeight: 23 }}>
                                {`Thank you for donating ₹${item.donationAmount} to`}
                            </Text>
                            <Text style={{ fontWeight: 'bold', fontSize: 16, marginHorizontal: 25, marginTop: 0, lineHeight: 23, color: COLORS.primary }}> {ngoName}</Text>
                            <View style={{ borderWidth: 0, width: 150, marginHorizontal: 217, marginTop: -15 }}>
                                <Text style={{
                                    fontWeight: '300'
                                }}>{formattedDate}</Text>
                            </View>
                        </View>
                    );
                }}
            />
        </SafeAreaView>
    )
}

export default MoneyNotification

const styles = StyleSheet.create({
    flatListContainer: {
        paddingHorizontal: 10,
        marginTop: -10
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
    containerThree: {
        flex: 1,
        paddingHorizontal: 20,
        paddingTop: 20,
    },
    textInput: {
        height: 70,
        borderWidth: 1,
        borderColor: '#ccc',
        borderRadius: 10,
        padding: 10,
        fontSize: 18,
        textAlignVertical: 'top',
    },
    backIcon: {
        marginLeft: 10
    },
    titleTextContainer: {
        marginHorizontal: 140
    },
    containerTwo: {
        flexDirection: 'row',
        paddingHorizontal: 6,
        marginTop: 4,
    },
    tab: {
        height: 40,
        width: 82,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'white',
        borderRadius: 20,
        margin: 8,
        marginLeft: 8,
        padding: 5,
        borderWidth: 1,
        borderColor: '#2A4D50',
    },
    selectedTab: {
        backgroundColor: '#2A4D50',
    },
    tabText: {
        color: '#2A4D50',
    },
    selectedTabText: {
        color: 'white',
    },
    titleText: (color, top) => ({
        fontWeight: "500",
        fontSize: SIZES.xLarge,
        marginTop: top,
        color: color,
        marginLeft: -38,
    }),
})

