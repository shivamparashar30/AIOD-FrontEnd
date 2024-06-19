import React, { useEffect, useState } from 'react';
import { SafeAreaView, ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { ArrowLeftIcon } from 'react-native-heroicons/solid';
import { useNavigation } from '@react-navigation/native';
import { LinearGradient } from 'expo-linear-gradient';
import { Image } from 'react-native';
import { COLORS, SIZES } from '../constants/index';
import { Button } from 'react-native';
import Category from '../components/Category';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
import constant from '../constant';

export default function Donate() {
    const navigation = useNavigation();
    const [donationCount, setDonationCount] = useState([]);
    const [token, setToken] = useState("")

    const getToken = async () => {
        try {
            const token = await AsyncStorage.getItem("userdata")
            console.log(token);

            if (token === null) {
                navigation.navigate('Welcome');
                return;
            }
            const response = JSON.parse(token);
            setToken(response[0]);
            getData(response[0]);
        } catch (error) {
            console.log("Donations: " + error);
        }
    };

    const getData = (token) => {
        axios({
            method: 'get',
            url: constant.BASE_URL + '/auth/me',
            headers: { 'Authorization': token }
        }).then((apiResponse) => {
            console.log(apiResponse.data.data);
            setDonationCount(apiResponse.data.data.donationCount)

        }).catch((err) => {
            console.log("Donation" + err);
        })

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
                <View style={styles.topContainer}>
                    <View style={styles.backIcon}>
                        <TouchableOpacity>
                            <ArrowLeftIcon color={'#2A4D50'} onPress={() => navigation.goBack()} />
                        </TouchableOpacity>

                    </View>
                    <View style={styles.titleTextContainer}>
                        <Text style={styles.titleText(COLORS.primary, SIZES.xSmall - 5)}>Donate</Text>
                    </View>
                </View>
            </View>
            <View style={{ flex: 1, flexDirection: 'row', alignItems: 'center', marginTop: 50 }}>
                <View style={{ flex: 1, height: 1, backgroundColor: '#B4B4B8', width: '100%' }} />
            </View>


            <View style={{
                height: 210, width: 380, backgroundColor: COLORS.primary, marginTop: 30,
                marginHorizontal: 5, borderRadius: 30
            }}>
                <View>
                    <Text style={{ color: "white", fontWeight: 'bold', fontSize: 18, marginLeft: 88, marginTop: 15 }}>
                        Live You Have Impacted
                    </Text>
                </View>
                <View style={styles.imageContainer}>
                    <Image style={styles.logoImg} source={require('../assets/images/donationBoxLogo.png')} />
                </View>
                <View>
                    <Text style={{ color: "white", fontSize: 18, marginLeft: 108, marginTop: 15, fontWeight: 'bold' }}>Total Donation - {donationCount}</Text>
                </View>
            </View>
            <View>
                <Text style={styles.chooseDonation} >Choose Your donation</Text>
            </View>
            <View style={styles.donationContainer}>
                <TouchableOpacity onPress={() => { navigation.navigate("Food") }}>
                    <View style={styles.innerDonationContainer}>
                        <View style={styles.donationImageContainer}>
                            <Image style={styles.donationImg} source={require('../assets/images/foodD.jpeg')} />
                        </View>
                        <View style={styles.donationTextContainer}>
                            <Text style={styles.donationText}>Food</Text>
                        </View>
                    </View>
                </TouchableOpacity>
                <TouchableOpacity onPress={() => { navigation.navigate("Clothes") }}>
                    <View style={styles.innerDonationContainer}>
                        <View style={styles.donationImageContainer}>
                            <Image style={styles.donationImg} source={require('../assets/images/clothD1.jpeg')} />
                        </View>
                        <View style={styles.donationTextContainer}>
                            <Text style={styles.donationText}>Clothes</Text>
                        </View>


                    </View>
                </TouchableOpacity>
                <TouchableOpacity onPress={() => { navigation.navigate("Books") }}>
                    <View style={styles.innerDonationContainer}>
                        <View style={styles.donationImageContainer}>
                            <Image style={styles.donationImg} source={require('../assets/images/bookD.jpeg')} />
                        </View>
                        <View style={styles.donationTextContainer}>
                            <Text style={styles.donationText}>Books</Text>
                        </View>


                    </View>
                </TouchableOpacity>

                <TouchableOpacity onPress={() => { navigation.navigate("Money") }}>
                    <View style={styles.innerDonationContainer}>
                        <View style={styles.donationImageContainer}>
                            <Image style={styles.donationImg} source={require('../assets/images/moneyD.jpeg')} />
                        </View>
                        <View style={styles.donationTextContainer}>
                            <Text style={styles.donationText}>Money</Text>
                        </View>

                    </View>
                </TouchableOpacity>
            </View>
            <View style={{ flex: 1, flexDirection: 'row', alignItems: 'center', marginTop: 15 }}>
                <View style={{ flex: 1, height: 3, backgroundColor: '#B4B4B8', width: '100%' }} />
            </View>

            <ScrollView scrollEventThrottle={16}>
                <View style={{ flex: 1, paddingTop: 10, paddingHorizontal: 5 }}>
                    <Text style={{
                        fontSize: 17, fontWeight: '500',
                        paddingHorizontal: 10
                    }}>
                        Urgent Needs
                    </Text>
                </View>
                <View style={{ height: 140, marginTop: 20, right: 10 }}>
                    {/* <ScrollView horizontal={true}
                        showsHorizontalScrollIndicator={false} > */}
                    {/* <TouchableOpacity onPress={() => { navigation.navigate("GlobalAidNgo") }}>
                        <Category imgUri={require('../assets/images/ngo1.jpeg')}
                            name="Global Aid Network" />
                    </TouchableOpacity> */}
                    <Category />
                    {/* <TouchableOpacity onPress={() => { navigation.navigate("GlobalAidNgo") }}>
                        
                    </TouchableOpacity> */}

                    {/* <TouchableOpacity onPress={() => { navigation.navigate("HopeForNgo") }}>
                            <Category imgUri={require('../assets/images/ngo2.jpg')}
                                name="Hope for Tomorrow Foundation" />
                        </TouchableOpacity>

                        <TouchableOpacity onPress={() => { navigation.navigate("CompassionateNgo") }}>
                            <Category imgUri={require('../assets/images/ngo3.jpeg')}
                                name="Compassionate Hearts Initiative" />
                        </TouchableOpacity>


                        <TouchableOpacity onPress={() => { navigation.navigate("EmpowermentNgo") }}>
                            <Category imgUri={require('../assets/images/ngo4.jpeg')}
                                name="Empowerment Alliance" />
                        </TouchableOpacity>


                        <TouchableOpacity onPress={() => { navigation.navigate("HumanityNgo") }}>
                            <Category imgUri={require('../assets/images/ngo5.jpeg')}
                                name="Humanity United Organization" />
                        </TouchableOpacity> */}


                    {/* </ScrollView> */}
                </View>


            </ScrollView>

            <View>

            </View>

        </SafeAreaView>



    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: 'white',
        // alignItems: 'center'
    },
    donationText: {
        fontSize: 15,
        fontWeight: '500',
        marginHorizontal: 13

    },
    donationTextContainer: {
        marginTop: 6,
        marginHorizontal: 10,
        // justifyContent: 'center',
        alignItems: 'center ',
        width: 150
    },
    donationImg: {
        height: 55,
        width: 55,
        borderRadius: 30,
        marginHorizontal: 9,
        marginTop: 14,
        aspectRatio: 1,
        resizeMode: "cover"
    },

    donationImageContainer: {
        height: 60,
        width: 75,
        marginTop: 6,
        marginHorizontal: 12,
        // justifyContent: 'center',
        alignItems: 'center ',
        backgroundColor: COLORS.primary,
        borderRadius: 50,
        // borderWidth: 1,
        // borderColor: 'black',

    },
    innerDonationContainer: {
        height: 88,
        width: 100,
        marginTop: 5,
        marginHorizontal: 0,
        // borderWidth: 1,
        // borderColor: 'black'
    },
    donationContainer: {
        flexDirection: "row",
        height: 100,
        width: '100%',
        marginTop: 1,
        // borderWidth: 1,
        // borderColor: 'black'
    },
    chooseDonation: {
        fontSize: 18,
        fontWeight: '600',
        fontStyle: 'normal',
        margin: 10,
        marginHorizontal: 15,
        marginTop: 22

    },
    imageContainer: {
        alignItems: 'center',
        height: 120,
        width: 150,
        marginTop: 9,
        marginHorizontal: 110,
        backgroundColor: 'white',
        borderRadius: 70



    },
    logoImg: {
        height: 120,
        width: 150,
        marginTop: 20
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
        fontSize: SIZES.xLarge + 2,
        marginTop: top,
        color: color,
        marginLeft: -16,
    }),


});
