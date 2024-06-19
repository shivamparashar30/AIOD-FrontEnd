// import { FlatList, SafeAreaView, StyleSheet, Text, View } from 'react-native';
// import React, { useEffect, useState } from 'react';
// import { useNavigation } from '@react-navigation/native';
// import axios from 'axios';
// import AsyncStorage from '@react-native-async-storage/async-storage';
// import constant from '../../../constant';
// import { COLORS, SIZES } from '../../../constants';
// import { format } from 'date-fns';

// const MoneyNotification = () => {
//     const navigation = useNavigation();

//     const [token, setToken] = useState("");
//     const [paymentData, setPaymentData] = useState([]);

//     const getToken = async () => {
//         try {
//             const token = await AsyncStorage.getItem("userdata");
//             const response = JSON.parse(token);
//             setToken(response[0]);
//             getData(response[0]);
//         } catch (error) {
//             console.log("Splash: " + error);
//         }
//     };

//     const getData = (token) => {
//         axios({
//             method: 'get',
//             url: constant.BASE_URL + '/money/getmoneydonationlist',
//             headers: { 'Authorization': token }
//         }).then((apiResponse) => {
//             setPaymentData(apiResponse.data.data.reverse());
//         }).catch((err) => {
//             console.log("Profile" + err);
//         });
//     }

//     useEffect(() => {
//         getToken();
//         const fetchDataInterval = setInterval(() => {
//             getToken();
//         }, 20000);

//         return () => clearInterval(fetchDataInterval);
//     }, []);

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
//                     const formattedDate = formatDateTime(item.createdAt);
//                     return (
//                         <View style={{ height: 60, margin: 5, marginTop: 10, backgroundColor: COLORS.gray2, borderRadius: 10 }}>
//                             <Text style={{ fontWeight: 'bold', fontSize: 16, marginHorizontal: 25, marginTop: 10, lineHeight: 23 }}>
//                                 {`You Received ₹${item.donationAmount} from`}
//                             </Text>
//                             <Text style={{ fontWeight: 'bold', fontSize: 16, marginHorizontal: 25, marginTop: 0, lineHeight: 23, color: COLORS.primary }}> {item.userName}</Text>
//                             <View style={{ borderWidth: 0, width: 150, marginHorizontal: 217, marginTop: -15 }}>
//                                 <Text style={{
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
// });


import { FlatList, SafeAreaView, StyleSheet, Text, View } from 'react-native';
import React, { useEffect, useState } from 'react';
import { useNavigation } from '@react-navigation/native';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
import constant from '../../../constant';
import { COLORS, SIZES } from '../../../constants';
import { format } from 'date-fns';
import { Picker } from '@react-native-picker/picker';

const MoneyNotification = () => {
    const navigation = useNavigation();

    const [token, setToken] = useState("");
    const [paymentData, setPaymentData] = useState([]);
    const [filteredData, setFilteredData] = useState([]);
    const [selectedFilter, setSelectedFilter] = useState("all");

    const getToken = async () => {
        try {
            const token = await AsyncStorage.getItem("userdata");
            const response = JSON.parse(token);
            setToken(response[0]);
            getData(response[0]);
        } catch (error) {
            console.log("Splash: " + error);
        }
    };

    const getData = (token) => {
        axios({
            method: 'get',
            url: constant.BASE_URL + '/money/getmoneydonationlist',
            headers: { 'Authorization': token }
        }).then((apiResponse) => {
            const data = apiResponse.data.data.reverse();
            setPaymentData(data);
            setFilteredData(data); // Initially, all data is displayed
        }).catch((err) => {
            console.log("Profile" + err);
        });
    }

    useEffect(() => {
        getToken();
        const fetchDataInterval = setInterval(() => {
            getToken();
        }, 20000);

        return () => clearInterval(fetchDataInterval);
    }, []);

    const formatDateTime = (isoString) => {
        const date = new Date(isoString);
        return format(date, 'dd-MM-yyyy HH:mm');
    }

    const handleFilterChange = (value) => {
        setSelectedFilter(value);
        let filteredData = paymentData;

        const today = new Date();
        const oneWeekAgo = new Date(today);
        oneWeekAgo.setDate(today.getDate() - 7);
        const oneMonthAgo = new Date(today);
        oneMonthAgo.setMonth(today.getMonth() - 1);

        if (value === "last_week") {
            filteredData = paymentData.filter(item => new Date(item.createdAt) >= oneWeekAgo);
        } else if (value === "last_month") {
            filteredData = paymentData.filter(item => new Date(item.createdAt) >= oneMonthAgo);
        }

        setFilteredData(filteredData);
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
                    <Picker.Item label="Last Week" value="last_week" />
                    <Picker.Item label="Last Month" value="last_month" />
                </Picker>
            </View>

            <FlatList
                style={{ padding: 10, marginTop: 70 }}
                showsHorizontalScrollIndicator={false}
                contentContainerStyle={styles.flatListContainer}
                data={filteredData}
                keyExtractor={(item) => item._id}
                renderItem={({ item }) => {
                    const formattedDate = formatDateTime(item.createdAt);
                    return (
                        <View style={{ height: 60, margin: 5, marginTop: 10, backgroundColor: COLORS.gray2, borderRadius: 10 }}>
                            <Text style={{ fontWeight: 'bold', fontSize: 16, marginHorizontal: 25, marginTop: 10, lineHeight: 23 }}>
                                {`You Received ₹${item.donationAmount} from`}
                            </Text>
                            <Text style={{ fontWeight: 'bold', fontSize: 16, marginHorizontal: 25, marginTop: 0, lineHeight: 23, color: COLORS.primary }}> {item.userName}</Text>
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
    filterContainer: {
        marginVertical: 20,
        marginHorizontal: 10,
        // backgroundColor: COLORS.white,
        // borderRadius: SIZES.radius,
        // borderWidth: 1,
        // borderColor: COLORS.gray,
    },
    picker: {
        height: 50,
        marginTop: -80,
        color: COLORS.black,
    },
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
        // marginTop: 10
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
});
