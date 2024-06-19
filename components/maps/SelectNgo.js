import { Alert, SafeAreaView, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React, { useEffect, useState } from 'react'
import SelectNgoDropdown from './SelectNgoDropdown'
import { useNavigation, useRoute } from '@react-navigation/native';
import { ArrowLeftIcon } from 'react-native-heroicons/solid';
import { COLORS, SIZES } from '../../constants';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
import SelectDropdown from 'react-native-select-dropdown';
import { Icon } from 'react-native-elements';
import constant from '../../constant';
import { AntDesign } from '@expo/vector-icons';


const SelectNgo = () => {
    const [token, setToken] = useState("")
    const [userList, setUserList] = useState([])
    const [ngoData, setNgoData] = useState({})
    const [userData, setUserData] = useState({})

    const navigation = useNavigation()
    const route = useRoute();
    let type = {}; // Default value for type if not provided in route.params
    if (route.params && route.params.foodData) {
        type = route.params.foodData;
        console.log('====================================');
        console.log(type);
        console.log('====================================');
    }

    const getToken = async () => {
        try {
            const token = await AsyncStorage.getItem("userdata");
            console.log(token);
            if (token === null) {
                navigation.navigate('Welcome');
                return;
            }

            const response = JSON.parse(token);
            setToken(response[0]);
            getData(response[0]);
            getMeData(response[0])
        } catch (error) {
            console.log("Select Ngo: " + error);
        }
    }



    const getData = (token) => {
        // setIsLoading(true)
        axios({
            method: 'get',
            url: constant.BASE_URL + '/auth/users',
            headers: { 'Authorization': token }
        }).then((apiResponse) => {
            // const { name } = apiResponse.data.data
            console.log(apiResponse.data.data);
            setUserList(getNgos(apiResponse.data.data))
            // setUserList(apiResponse.data.data.filter)
            // setIsLoading(false)
        }).catch((err) => {
            console.log("Profile" + err);
            // setIsLoading(false);
        });
    }
    const getMeData = (token) => {
        axios({
            method: 'get',
            url: constant.BASE_URL + '/auth/me',
            headers: { 'Authorization': token }
        }).then((apiResponse) => {
            setUserData(apiResponse.data.data)
        }).catch((err) => {
            console.log("Profile" + err);
        });
    }
    useEffect(() => {
        getToken()
    }, []);

    const donateFood = () => {
        axios({
            method: 'post',
            url: constant.BASE_URL + '/food/immidiatepickup',
            headers: { 'Content-Type': 'application/json', 'charset': 'utf-8', 'Authorization': token },
            data: {
                ngo: ngoData._id,
                user: userData._id,
                address2: type.address2,
                address1: type.address1,
                address3: type.address3,
                phoneno: type.phoneno,
                pincode: type.pincode,
                estimateCount: type.type.count,
                typeOfFood: type.type.selectedType,
                Vehicle: type.type.selectedIcon,
                source: type.type.selectedSource,
                foodItem: type.type.foodItems



            },
        }).then((apiResponse) => {
            console.log(apiResponse.data.data);
            Alert.alert("sucess")
            sendRequest(apiResponse.data.data._id)
        }).catch((err) => {
            console.log(err);
            Alert.alert(err)
            // setIsLoading(true);
        });
    }

    // const sendRequest = (donationId) => {
    //     axios({
    //         method: 'post',
    //         url: constant.BASE_URL + '/request/sendrequest',
    //         headers: { 'Content-Type': 'application/json', 'charset': 'utf-8', 'Authorization': token },
    //         data: {
    //             recipient: ngoData._id,
    //             donationid: donationId,
    //             donationType: "Food",
    //             userName: userData.name,
    //             address2: type.address2,
    //             phoneno: type.phoneno,
    //             count: type.type.count,
    //             source: type.type.selectedType,
    //             vehicle: type.type.selectedIcon,
    //             Item: type.type.foodItems,
    //             status: 1
    //         },
    //     }).then((apiResponse) => {
    //         console.log(apiResponse.data.data);
    //         Alert.alert("Request Sent!")
    //     }).catch((err) => {
    //         console.log(err);
    //         Alert.alert(err)
    //         // setIsLoading(true);
    //     });
    // }
    const sendRequest = (donationId) => {
        axios({
            method: 'post',
            url: constant.BASE_URL + '/request/sendrequest',
            headers: { 'Content-Type': 'application/json', 'charset': 'utf-8', 'Authorization': token },
            data: {
                recipient: ngoData._id,
                donationid: donationId,
                donationType: "Food",
                userName: userData.name,
                address2: type.address2,
                phoneno: type.phoneno,
                count: type.type.count,
                source: type.type.selectedType,
                vehicle: type.type.selectedIcon,
                Item: type.type.foodItems,
                status: 1
            },
        }).then((apiResponse) => {
            console.log(apiResponse.data.data);
            Alert.alert(
                "Request Sent!",
                "",
                [
                    { text: "OK", onPress: () => navigation.navigate('HomeScreen') }
                ]
            );
        }).catch((err) => {
            console.log(err);
            Alert.alert(err.message);
        });
    }


    function getNgos(data) {
        const filteredUser = data.filter((user) => {
            return user.role === "ngo";
        });
        return filteredUser;
    }

    function getNgosData(name, userList) {
        const filteredUser = userList.find((user) => {
            return user.name === name;
        });
        return filteredUser;
    }
    // const route = useRoute();
    // const { Food, AddAddressDetails } = route.params;
    return (
        <SafeAreaView>
            <View style={styles.container}>
                {/* Header */}
                <View style={styles.topContainer}>
                    <View style={styles.backIcon}>
                        <TouchableOpacity onPress={() => { navigation.goBack() }}>
                            <ArrowLeftIcon color={'#2A4D50'} />
                        </TouchableOpacity>
                    </View>
                    <View style={styles.titleTextContainer}>
                        <Text style={styles.titleText(COLORS.primary, SIZES.xSmall - 5)}>Select NGO</Text>
                    </View>
                </View>
            </View>

            <SelectDropdown

                data={userList.map(item => item.name)}
                onSelect={(selectedItem, index) => {
                    setNgoData(getNgosData(selectedItem, userList));
                }}
                renderButton={(selectedItem, isOpened) => {
                    return (
                        <View style={styles.dropdownButtonStyle}>
                            {selectedItem && (
                                // <Icon name={selectedItem.icon} style={styles.dropdownButtonIconStyle} />
                                <AntDesign name={selectedItem.icon} style={styles.dropdownButtonIconStyle} />
                            )}
                            <Text style={styles.dropdownButtonTxtStyle}>
                                {selectedItem || 'Select NGO'}
                            </Text>
                            <AntDesign name={isOpened ? 'up' : 'down'} style={styles.dropdownButtonArrowStyle} />
                        </View>
                    );
                }}
                renderItem={(item, index, isSelected) => {
                    return (
                        <View style={{ ...styles.dropdownItemStyle, ...(isSelected && { backgroundColor: '#D2D9DF' }) }}>
                            <Icon name={item.icon} style={styles.dropdownItemIconStyle} />
                            <Text style={styles.dropdownItemTxtStyle}>{item}</Text>
                        </View>
                    );
                }}
                showsVerticalScrollIndicator={false}
                dropdownStyle={styles.dropdownMenuStyle}
            />
            <View style={{ marginHorizontal: 250, marginTop: 20 }}>
                <TouchableOpacity onPress={() => { donateFood() }}
                    style={{
                        backgroundColor: '#2A4D50',
                        paddingVertical: 20,
                        paddingHorizontal: 33,
                        borderRadius: 20,
                        width: 120
                    }}>
                    <Text style={{
                        color: 'white',
                        fontWeight: 'bold'
                    }}>
                        Donate
                    </Text>
                </TouchableOpacity>
            </View>

            {/* <Text>hi</Text> */}


        </SafeAreaView>
    )
}

export default SelectNgo

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    topContainer: {
        flexDirection: "row",
        alignItems: "center",
        width: '100%',
        height: 45,
    },
    backIcon: {
        marginLeft: 10
    },
    titleTextContainer: {
        marginHorizontal: 183,
        width: 200
    },
    titleText: (color, top) => ({
        fontWeight: "500",
        fontSize: SIZES.xLarge,
        marginTop: top,
        color: color,
        marginLeft: -82,
    }),
    dropdownButtonStyle: {
        width: 200,
        height: 50,
        backgroundColor: '#E9ECEF',
        borderRadius: 12,
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        paddingHorizontal: 12,
    },
    dropdownButtonTxtStyle: {
        flex: 1,
        fontSize: 18,
        fontWeight: '500',
        color: '#151E26',
    },
    dropdownButtonArrowStyle: {
        fontSize: 28,
    },
    dropdownButtonIconStyle: {
        fontSize: 28,
        marginRight: 8,
    },
    dropdownMenuStyle: {
        backgroundColor: '#E9ECEF',
        borderRadius: 8,
    },
    dropdownItemStyle: {
        width: '100%',
        flexDirection: 'row',
        paddingHorizontal: 12,
        justifyContent: 'center',
        alignItems: 'center',
        paddingVertical: 8,
    },
    dropdownItemTxtStyle: {
        flex: 1,
        fontSize: 18,
        fontWeight: '500',
        color: '#151E26',
    },
    dropdownItemIconStyle: {
        fontSize: 28,
        marginRight: 8,
    },
    dropdownButtonStyle: {
        width: 200,
        height: 50,
        backgroundColor: '#E9ECEF',
        borderRadius: 12,
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        paddingHorizontal: 12,
        marginTop: 70
    },
    dropdownButtonTxtStyle: {
        flex: 1,
        fontSize: 18,
        fontWeight: '500',
        color: '#151E26',
    },
    dropdownButtonArrowStyle: {
        fontSize: 28,
    },
    dropdownButtonIconStyle: {
        fontSize: 28,
        marginRight: 8,
    },
    dropdownMenuStyle: {
        backgroundColor: '#E9ECEF',
        borderRadius: 8,
    },
    dropdownItemStyle: {
        width: '100%',
        flexDirection: 'row',
        paddingHorizontal: 12,
        justifyContent: 'center',
        alignItems: 'center',
        paddingVertical: 8,
    },
    dropdownItemTxtStyle: {
        flex: 1,
        fontSize: 18,
        fontWeight: '500',
        color: '#151E26',
    },
    dropdownItemIconStyle: {
        fontSize: 28,
        marginRight: 8,
    },
})