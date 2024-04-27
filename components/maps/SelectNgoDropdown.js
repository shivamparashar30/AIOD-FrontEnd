// import { SafeAreaView, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
// import React from 'react'
// import { useNavigation } from '@react-navigation/native';
// import { ArrowLeftIcon } from 'react-native-heroicons/solid';
// import { COLORS, SIZES } from '../../constants';


// const SelectNgoDropdown = () => {
//     const navigation = useNavigation();
//     return (
//         <SafeAreaView>
//             <View style={styles.container}>
//                 {/* Header */}
//                 <View style={styles.topContainer}>
//                     <View style={styles.backIcon}>
//                         <TouchableOpacity onPress={() => { navigation.goBack() }}>
//                             <ArrowLeftIcon color={'#2A4D50'} />
//                         </TouchableOpacity>
//                     </View>
//                     <View style={styles.titleTextContainer}>
//                         <Text style={styles.titleText(COLORS.primary, SIZES.xSmall - 5)}>Select NGO </Text>
//                     </View>
//                 </View>
//             </View>
//             {/* Divider */}
//             <View style={{ flex: 1, flexDirection: 'row', alignItems: 'center', marginTop: 50 }}>
//                 <View style={{ flex: 1, height: 1, backgroundColor: '#B4B4B8', width: '100%' }} />
//             </View>
//             <View style={{ height: 80 }} />




//         </SafeAreaView>
//     )
// }

// export default SelectNgoDropdown

// const styles = StyleSheet.create({
//     container: {
//         flex: 1,
//     },
//     topContainer: {
//         flexDirection: "row",
//         alignItems: "center",
//         width: '100%',
//         height: 45,
//     },
//     backIcon: {
//         marginLeft: 10
//     },
//     titleTextContainer: {
//         marginHorizontal: 183,
//         width: 200
//     },
//     titleText: (color, top) => ({
//         fontWeight: "500",
//         fontSize: SIZES.xLarge,
//         marginTop: top,
//         color: color,
//         marginLeft: -82,
//     })
// })

import { SafeAreaView, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React, { useEffect, useState } from 'react'
import { useNavigation } from '@react-navigation/native';
import { ArrowLeftIcon } from 'react-native-heroicons/solid';
import { COLORS, SIZES } from '../../constants';
import SelectDropdown from 'react-native-select-dropdown'
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';
import constant from '../../constant';
// import constant from '../constant'


const emojisWithIcons = [
    { title: 'happy', icon: 'emoticon-happy-outline' },
    { title: 'cool', icon: 'emoticon-cool-outline' },
    { title: 'lol', icon: 'emoticon-lol-outline' },
    { title: 'sad', icon: 'emoticon-sad-outline' },
    { title: 'cry', icon: 'emoticon-cry-outline' },
    { title: 'angry', icon: 'emoticon-angry-outline' },
    { title: 'confused', icon: 'emoticon-confused-outline' },
    { title: 'excited', icon: 'emoticon-excited-outline' },
    { title: 'kiss', icon: 'emoticon-kiss-outline' },
    { title: 'devil', icon: 'emoticon-devil-outline' },
    { title: 'dead', icon: 'emoticon-dead-outline' },
    { title: 'wink', icon: 'emoticon-wink-outline' },
    { title: 'sick', icon: 'emoticon-sick-outline' },
    { title: 'frown', icon: 'emoticon-frown-outline' },
];


const SelectNgoDropdown = () => {
    const navigation = useNavigation();

    const [userList, setUserList] = useState([])
    const [token, setToken] = useState("")


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
        } catch (error) {
            console.log("Splash: " + error);
        }
    };

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
    useEffect(() => {
        getToken()
    }, []);

    function getNgos(data) {
        const filteredUser = data.filter((user) => {
            return user.role === "ngo";
        });
        return filteredUser;
    }


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
            {/* <View style={{ marginTop: 70 }}>
                <Text> Choose NGO according Your location</Text>
            </View> */}


            {/* Dropdown */}
            <View style={{ marginHorizontal: 20, marginTop: 70 }}>
                <SelectDropdown
                    data={userList.map(item => item.name)}
                    onSelect={(selectedItem, index) => {
                        console.log(selectedItem, index);
                    }}
                    renderButton={(selectedItem, isOpened) => {
                        return (
                            <View style={styles.dropdownButtonStyle}>
                                {selectedItem && (
                                    <Icon name={selectedItem.icon} style={styles.dropdownButtonIconStyle} />
                                )}
                                <Text style={styles.dropdownButtonTxtStyle}>
                                    {selectedItem || 'Select NGO'}
                                </Text>
                                <Icon name={isOpened ? 'chevron-up' : 'chevron-down'} style={styles.dropdownButtonArrowStyle} />
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
            </View>
        </SafeAreaView>
    )
}

export default SelectNgoDropdown

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
});
