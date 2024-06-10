// import { FlatList, SafeAreaView, StatusBar, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
// import React, { useEffect, useState } from 'react'
// // import { COLORS, SIZES } from ''
// import { ArrowLeftIcon } from 'react-native-heroicons/solid'
// import { useNavigation } from '@react-navigation/native'
// import axios from 'axios'
// // import constant from '../../../constant'
// import AsyncStorage from '@react-native-async-storage/async-storage'
// import constant from '../constant'
// import { COLORS, SIZES } from '../constants'

// const MoneyNotification = () => {
//     const navigation = useNavigation();

//     const [token, setToken] = useState("")
//     const [paymentData, setPaymentData] = useState({})


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
//             getData(response[0]);
//             getNgoData(response[0]);
//         } catch (error) {
//             console.log("Splash: " + error);
//         }
//     };

//     const getData = (token) => {
//         // setIsLoading(true)
//         axios({
//             method: 'get',
//             url: constant.BASE_URL + '/money/getusermoneydonationlist',
//             headers: { 'Authorization': token }
//         }).then((apiResponse) => {
//             // const { name } = apiResponse.data.data
//             console.log(apiResponse.data.data);
//             setPaymentData(apiResponse.data.data.reverse())
//             // setUserList(apiResponse.data.data.filter)
//             // setIsLoading(false)
//         }).catch((err) => {
//             console.log("Profile" + err);
//             // setIsLoading(false);
//         });
//     }
//     const getNgoData = (token) => {
//         // setIsLoading(true)
//         axios({
//             method: 'get',
//             url: constant.BASE_URL + '/auth/users',
//             headers: { 'Authorization': token }
//         }).then((apiResponse) => {
//             // const { name } = apiResponse.data.data
//             console.log("Ngo Data ", apiResponse.data.data);
//             setUserList(getNgos(apiResponse.data.data))
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
//         }, 20000);

//         return () => clearInterval(fetchDataInterval);
//     }, []);

//     function getNgos(data) {
//         const filteredUser = data.filter((user) => {
//             return user.role === "ngo";
//         });
//         return filteredUser;
//     }

//     function getNgosData(name, userList) {
//         const filteredUser = userList.find((user) => {
//             return user.name === name;
//         });
//         return filteredUser;
//     }

//     return (

//         <SafeAreaView>

//             <FlatList
//                 style={{ padding: 10, marginTop: 20 }}
//                 showsHorizontalScrollIndicator={false}
//                 contentContainerStyle={styles.flatListContainer}
//                 data={paymentData}
//                 keyExtractor={(item) => item.id}
//                 renderItem={({ item }) =>
//                     <View style={{ height: 50, margin: 5, marginTop: 10, backgroundColor: COLORS.gray2, borderRadius: 10 }}>
//                         <Text style={{ fontWeight: 'bold', fontSize: 16, marginHorizontal: 5, marginTop: 10 }} > Thankyou for Donated ₹{item.donationAmount}</Text>
//                         {/* <View style={{ height: 1, borderWidth: 1 }}></View> */}
//                     </View>
//                 }

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
//         marginHorizontal: 140
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

// import { FlatList, SafeAreaView, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
// import React, { useEffect, useState } from 'react'
// import { ArrowLeftIcon } from 'react-native-heroicons/solid'
// import { useNavigation } from '@react-navigation/native'
// import axios from 'axios'
// import AsyncStorage from '@react-native-async-storage/async-storage'
// import constant from '../constant'
// import { COLORS, SIZES } from '../constants'

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
//                     return (
//                         <View style={{ height: 60, margin: 5, marginTop: 10, backgroundColor: COLORS.gray2, borderRadius: 10 }}>
//                             <Text style={{ fontWeight: 'bold', fontSize: 16, marginHorizontal: 5, marginTop: 10 }}>
//                                 {`Thank you for donating ₹${item.donationAmount} to ${ngoName}on `}
//                             </Text>
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

const MoneyNotification = () => {
    const navigation = useNavigation();

    const [token, setToken] = useState("")
    const [paymentData, setPaymentData] = useState([])
    const [ngoList, setNgoList] = useState([])

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

    return (
        <SafeAreaView>
            <FlatList
                style={{ padding: 10, marginTop: 20 }}
                showsHorizontalScrollIndicator={false}
                contentContainerStyle={styles.flatListContainer}
                data={paymentData}
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
                                    // marginHorizontal: 170
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
