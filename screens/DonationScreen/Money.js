import { Alert, Image, SafeAreaView, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native'
import React, { useEffect, useState } from 'react'
import { ArrowLeftIcon } from 'react-native-heroicons/solid'
import { COLORS, SIZES } from '../../constants'
import { useNavigation } from '@react-navigation/native';
import RazorpayCheckout from 'react-native-razorpay';
import SelectNgo from '../../components/maps/SelectNgo';
import SelectNgoDropdown from '../../components/maps/SelectNgoDropdown';
import SelectDropdown from 'react-native-select-dropdown'
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';
import constant from '../../constant';
// import { err } from 'react-native-svg/lib/typescript/xml';


const Money = () => {

    // const navigation = useNavigation();

    const navigation = useNavigation();

    const [userList, setUserList] = useState([])
    const [token, setToken] = useState("")
    const [ngoData, setNgoData] = useState({})
    const [userData, setUserData] = useState({})

    const [selectedSource, setSelectedSource] = useState('');
    const [amountInput, setAmountInput] = useState('');
    const [fullName, setFullName] = useState('');
    const [email, setEmail] = useState('');
    const [phone, setPhone] = useState('');

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
            getMeData(response[0]);
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
    const getMeData = (token) => {
        axios({
            method: 'get',
            url: constant.BASE_URL + '/auth/me',
            headers: { 'Authorization': token }
        }).then((apiResponse) => {
            const { username, name, email, phoneno } = apiResponse.data.data;

            setUserData(apiResponse.data.data)
            setFullName(name)
            setEmail(email)
            setPhone(phoneno)
        }).catch((err) => {
            console.log("Profile" + err);
        });
    }

    useEffect(() => {
        getToken()
    }, []);


    const donateMoney = (tid) => {
        axios({
            method: 'post',
            url: constant.BASE_URL + '/money/moneydonate',
            headers: { 'Content-Type': 'application/json', 'charset': 'utf-8', 'Authorization': token },
            data: {
                paymentID: tid,
                donationAmount: amountInput,
                ngoId: ngoData._id,
                userId: userData._id,
                userName: fullName,
                userEmail: email,
                userPhoneno: phone

            },
        }).then((apiResponse) => {
            console.log(apiResponse.data.data);
        }).catch((err) => {
            console.log(err);
            // setIsLoading(true);
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




    const handleSourcePress = (source) => {
        setSelectedSource(source);
        setAmountInput(source); // Reflect selected amount in text input
    };

    const handleAmountChange = (text) => {
        setSelectedSource(''); // Clear selected amount when input changes
        setAmountInput(text);
    };

    const handleNextPress = () => {
        if (!amountInput || !fullName || !email || !phone) {
            Alert.alert('Incomplete Details', 'Please fill in all the required information.');
        } else {
            handleDonate();
        }
    };

    const handleDonate = () => {
        var options = {

            description: 'Credits towards Ngos',
            image: 'https://i.imgur.com/3g7nmJC.jpg',
            currency: 'INR',
            key: 'rzp_test_Xx4oAR91hPNqOt',
            amount: amountInput * 100,
            name: ngoData.name,
            // order_id: 'order_DslnoIgkIDL8Zt',//Replace this with an order_id created using Orders API.
            prefill: {
                email: 'user@email.com',
                contact: '8112270790',
                name: { setFullName }
            },
            theme: { color: '#2A4D50' }
        }
        RazorpayCheckout.open(options).then((data) => {
            // handle success
            alert(`Success: ${data.razorpay_payment_id}`);
            donateMoney(data.razorpay_payment_id);
        }).catch((error) => {
            // handle failure
            alert(`Error: ${error.code} | ${error.description}`);
        });
    }

    return (
        <SafeAreaView>
            <View style={styles.container}>
                <View style={styles.topContainer}>
                    <View style={styles.backIcon}>
                        <TouchableOpacity onPress={() => { navigation.goBack() }}>
                            <ArrowLeftIcon color={'#2A4D50'} />
                        </TouchableOpacity>
                    </View>
                    <View style={styles.titleTextContainer}>
                        <Text style={styles.titleText(COLORS.primary, SIZES.xSmall - 5)}>Money Donation</Text>
                    </View>
                </View>
            </View>
            <View style={{ flex: 1, flexDirection: 'row', alignItems: 'center', marginTop: 50 }}>
                <View style={{ flex: 1, height: 1, backgroundColor: '#B4B4B8', width: '100%' }} />
            </View>

            <View style={{ alignItems: 'center' }}>
                <Text style={{ fontSize: 20, fontWeight: '700', marginTop: 30 }}>
                    Most Donated Amount
                </Text>
            </View>
            <View style={styles.containerTwo}>
                <TouchableOpacity
                    style={[styles.tab, selectedSource === '500' ? styles.selectedTab : null]}
                    onPress={() => handleSourcePress('500')}>
                    <Text style={[styles.tabText, selectedSource === '500' ? styles.selectedTabText : null]}>₹500</Text>
                </TouchableOpacity>
                <TouchableOpacity
                    style={[styles.tab, selectedSource === '1000' ? styles.selectedTab : null]}
                    onPress={() => handleSourcePress('1000')}>
                    <Text style={[styles.tabText, selectedSource === '1000' ? styles.selectedTabText : null]}>₹1000</Text>
                </TouchableOpacity>
                <TouchableOpacity
                    style={[styles.tab, selectedSource === '3000' ? styles.selectedTab : null]}
                    onPress={() => handleSourcePress('3000')}>
                    <Text style={[styles.tabText, selectedSource === '3000' ? styles.selectedTabText : null]}>₹3000</Text>
                </TouchableOpacity>
                <TouchableOpacity
                    style={[styles.tab, selectedSource === '5000' ? styles.selectedTab : null]}
                    onPress={() => handleSourcePress('5000')}>
                    <Text style={[styles.tabText, selectedSource === '5000' ? styles.selectedTabText : null]}>₹5000</Text>
                </TouchableOpacity>
            </View>
            <View style={{ flex: 1, flexDirection: 'row', alignItems: 'center', marginTop: 10, marginHorizontal: 18, width: '90%', justifyContent: 'center' }}>
                <View style={{ flex: 1, height: 1, backgroundColor: '#B4B4B8', width: '100%' }} />
            </View>
            <View >
                <Text style={{ fontSize: 18, fontWeight: '700', marginTop: 20, marginHorizontal: 13 }}>
                    Enter Amount
                </Text>
            </View>

            <View style={{
                flexDirection: 'row', height: 35,
                width: 70, borderColor: 'grey', borderWidth: 1,
                marginHorizontal: 15, marginTop: 15, borderRadius: 40
            }}>
                <View style={{ flexDirection: 'row', alignItems: 'center' }} >
                    <View style={{ height: 20, width: 23 }}>
                        <Image style={{ height: 20, width: 23, borderRadius: 4, marginHorizontal: 10 }} source={{ uri: 'https://t3.ftcdn.net/jpg/06/12/34/84/360_F_612348476_k3i3brMUOo3N9Wk3yoceMHqZ8w4jpFqu.jpg' }} />
                    </View>
                    <View style={{ height: 19, backgroundColor: '#B4B4B8', width: 2, marginHorizontal: 17 }} />
                    <View>
                        <Text style={{ fontSize: 18, fontWeight: '600', marginHorizontal: -10 }}>
                            ₹
                        </Text>
                    </View>
                </View>

                <View style={styles.inputContainer}>
                    <TextInput
                        style={styles.input}
                        onChangeText={handleAmountChange}
                        value={amountInput}
                        keyboardType="numeric"
                        placeholder="Enter Amount"
                        placeholderTextColor={COLORS.gray}
                    />
                </View>
            </View>
            <View >
                <Text style={{ fontSize: 18, fontWeight: '700', marginTop: 20, marginHorizontal: 13 }}>
                    Full Name
                </Text>
            </View>
            <View style={styles.inputContainerTwo}>
                <TextInput
                    style={styles.inputTwo}
                    placeholder="Full Name"
                    value={fullName}
                    onChangeText={setFullName}
                />
            </View>
            <View >
                <Text style={{ fontSize: 18, fontWeight: '700', marginTop: 20, marginHorizontal: 18 }}>
                    Email
                </Text>
            </View>
            <View style={styles.inputContainerTwo}>
                <TextInput
                    style={styles.inputTwo}
                    placeholder="Email"
                    value={email}
                    onChangeText={setEmail}
                    keyboardType="email-address"
                />
            </View>
            <View >
                <Text style={{ fontSize: 18, fontWeight: '700', marginTop: 20, marginHorizontal: 18 }}>
                    Phone Number
                </Text>
            </View>
            <View style={styles.inputContainerTwo}>
                <TextInput
                    style={styles.inputTwo}
                    placeholder="Phone Number"
                    value={phone}
                    onChangeText={setPhone}
                    keyboardType="phone-pad"
                />
            </View>
            <View style={{ marginTop: 10, marginHorizontal: 20 }}>
                {/* <SelectNgoDropdown /> */}
                <SelectDropdown
                    data={userList.map(item => item.name)}
                    onSelect={(selectedItem, index) => {
                        setNgoData(getNgosData(selectedItem, userList));
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

            <View style={{ marginHorizontal: 250, marginTop: 20 }}>
                <TouchableOpacity onPress={handleNextPress}
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
        </SafeAreaView >
    )
}

export default Money

const styles = StyleSheet.create({
    inputContainerTwo: {
        // marginBottom: 25,
        marginTop: 20,
        marginHorizontal: 19

    },
    inputTwo: {
        height: 40,
        width: 350,
        borderWidth: 1,
        borderColor: '#CCCCCC',
        borderRadius: 5,
        paddingHorizontal: 10,
    },

    inputContainer: {
        paddingHorizontal: 20,
        marginTop: -1,
    },
    input: {
        height: 35,
        width: 220,
        marginHorizontal: 20,
        borderWidth: 1,
        borderColor: COLORS.primary,
        borderRadius: 10,
        paddingHorizontal: 10,
        color: COLORS.black,
    },

    containerTwo: {
        flexDirection: 'row',
        // justifyContent: 'space-between',
        paddingHorizontal: 6,
        marginTop: 4,

    },
    tab: {
        // flex: 1,
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

    container: {
        flex: 1,
        backgroundColor: 'white',
        // alignItems: 'center'
    },
    topContainer: {
        flexDirection: "row",
        // justifyContent: "space-between",
        alignItems: "center",
        width: '100%',
        height: 45,
        // borderColor: 'red',
        // borderWidth: 1
    },
    backIcon: {
        marginLeft: 10
    },
    titleTextContainer: {
        marginHorizontal: 140
        // alignItems: 'center'
    },
    titleText: (color, top) => ({
        fontWeight: "500",
        fontSize: SIZES.xLarge,
        marginTop: top,
        color: color,
        marginLeft: -64,
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
})