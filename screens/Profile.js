

import { View, Text, Image, ScrollView, StyleSheet, TouchableOpacity, ActivityIndicator, Alert, FlatList } from 'react-native'
import React, { useEffect, useState } from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import Ionicons from '@expo/vector-icons/Ionicons'
import { useNavigation } from '@react-navigation/native'
import axios from 'axios'
import constant from '../constant'
import AppLoading from 'expo-app-loading'
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useFocusEffect } from '@react-navigation/native';
// import EditProfile from './EditProfile'

// import LinearGradient from 'react-native-linear-gradient'
// import { Divider } from 'react-native-elements';
// import { Avatar } from 'react-native-elements';



function Profile() {
    const navigation = useNavigation();

    const [loading, setIsLoading] = useState(true)
    const [name, setName] = useState("")
    const [token, setToken] = useState("")


    const getToken = () => {
        setIsLoading(true)
        AsyncStorage.getItem("userdata").then(token => {
            if (token != null) {
                // setIsLoading(false)
                console.log("Something" + token)
                setToken(token)
                getData(token)
            }
        }).catch((err) => {
            console.log("Profle" + err)
            setIsLoading(false)
        });
    }

    const getData = (token) => {
        setIsLoading(true)
        axios({
            method: 'get',
            url: constant.BASE_URL + '/auth/me',
            headers: { 'Authorization': token }
        }).then((apiResponse) => {
            const { name } = apiResponse.data.data
            setName(name)
            setIsLoading(false)
        }).catch((err) => {
            console.log("Profile" + err);
            setIsLoading(false);
        });
    }
    const data = [
        { id: '1', title: 'App Update Available', icon: 'phone-portrait-outline' },
        { id: '2', title: 'Your Profile', icon: 'person-outline' },
        { id: '3', title: 'Your Donations', icon: 'globe-outline' },
        { id: '4', title: 'Address Book', icon: 'book-outline' },
        { id: '5', title: 'About', icon: 'information-circle-outline' },
        { id: '6', title: 'Logout', icon: 'log-out' },
        // Add more items as needed
    ];

    const ListItem = ({ title, icon, fullWidth }) => {
        return (
            <TouchableOpacity>
                <View style={[styles.itemCard, fullWidth ? styles.fullWidthCard : null]}>
                    <Ionicons name={icon} size={30} color="black" />
                    <Text style={styles.itemTitle}>{title}</Text>
                </View>
            </TouchableOpacity>
        );
    };

    useEffect(() => {
        getToken()
    }, []);


    return (
        <ScrollView>
            <SafeAreaView style={styles.container}>
                {/* <TouchableOpacity onPress={() => {
                    // console.log('You tapped the button!');
                    Alert.alert('Clicked On View Activity')
                }} > */}
                {loading && <ActivityIndicator size="large" color="#0000ff" />}

                <View style={styles.blockContainer} >

                    <View style={styles.DP} >
                        <Text title={name[0]} style={{ fontSize: 34, color: '#1E3A8A', fontWeight: 'bold' }}>{name[0]}</Text>
                    </View>
                    {/* <TouchableOpacity> */}

                    <View style={styles.NameSetting}>
                        <Text style={{ fontSize: 35, color: 'white', fontWeight: 'bold', marginLeft: 30 }}>{name}</Text>
                        <TouchableOpacity onPress={() => { navigation.navigate("EditProfile") }}>
                            <Text style={{ fontSize: 15, color: 'white', fontWeight: 'bold', marginLeft: 35, marginTop: 5 }}>Edit Profile</Text>
                            <Ionicons name="chevron-forward-outline" size={20} color={"white"} style={styles.icons} />
                        </TouchableOpacity>
                    </View>
                </View>

                <View style={styles.view}>
                    <TouchableOpacity>
                        <View style={styles.cardContainer}>
                            <Ionicons name="bookmark-outline" size={50} color={"black"} style={styles.icon} />
                            <Text style={styles.cardText}>Favorites</Text>
                        </View>
                    </TouchableOpacity>

                    <TouchableOpacity>
                        <View style={styles.cardContainer}>
                            <Ionicons name="timer-outline" size={50} color={"black"} style={styles.icon} />
                            {/* <Ionicons name="stats" size={50} color={"black"} style={styles.icon} /> */}
                            <Text style={styles.cardText}>Dashboard</Text>
                        </View>
                    </TouchableOpacity>
                </View>

                <FlatList
                    style={{ padding: 10 }}
                    data={data}
                    keyExtractor={(item) => item.id}
                    renderItem={({ item }) => (
                        <ListItem title={item.title} icon={item.icon} fullWidth={item.fullWidth} />
                    )}
                />
            </SafeAreaView>
        </ScrollView >
    )
}

const styles = StyleSheet.create({
    DP: {
        flex: 0,
        borderColor: 'black',
        backgroundColor: 'white',
        borderRadius: 40,
        height: 60,
        width: 70,
        alignItems: 'center',
        justifyContent: 'center',
        marginTop: 15,
        marginLeft: -240,
    },
    NameSetting: {
        // alignItems: 'center',
        // justifyContent: 'center',
        flex: 1,
        marginTop: -60,
        marginLeft: -40
    },
    icons: {
        padding: 5,
        marginLeft: 119,
        marginTop: -25
    },
    profileCont: {
        height: 100,
        width: 100,
    },
    container: {
        flex: 1,
        backgroundColor: 'white',
        borderRadius: 8,
        overflow: 'hidden',
        elevation: 2,
    },
    blockContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        margin: 10,
        height: 180,
        backgroundColor: 'indigo',
        borderRadius: 16,
        borderWidth: 1,
        borderColor: 'gray',
        padding: 6,
    },
    view: {
        flexDirection: "row",
        alignItems: "center",
        justifyContent: 'center',
    },
    viewInner: {
        flexDirection: "column",
        alignItems: "center",
        justifyContent: 'center',
    },

    iconInner: {
        padding: 5,
    },
    image: {
        width: '100%',
        height: 200,
    },
    contentContainer: {
        padding: 10,
    },
    eyebrowText: {
        fontSize: 10,
        color: '#4B5563',
        textTransform: 'uppercase',
        fontWeight: 'bold',
    },
    titleText: {
        fontSize: 16,
        color: '#1E3A8A',
        fontWeight: 'bold',
        marginTop: 5,
    },
    titleLink: {
        textDecorationLine: 'underline',
    },
    pricingText: {
        fontSize: 12,
        color: '#4B5563',
        marginTop: 5,
    },
    textRed: {
        color: 'red',
    },
    cardContainer: {
        backgroundColor: 'white',
        borderRadius: 10,
        padding: 20,
        margin: 10,
        shadowColor: '#000',
        shadowOffset: {
            width: 0,
            height: 2,
        },
        width: 150,
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
        elevation: 5,
    },
    icon: {
        width: 50, // adjust width as needed
        height: 50, // adjust height as needed
        marginBottom: 10,
        alignSelf: 'center'
    },
    cardText: {
        fontSize: 16,
        textAlign: 'center',
    },
    fullWidthCard: {
        width: '100%',
    },
    itemTitle: {
        marginLeft: 15,
        fontSize: 18,
    },
    itemCard: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: 'white',
        borderRadius: 10,
        padding: 16,
        marginBottom: 16,
        shadowColor: '#000',
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
        elevation: 5,
    },
});

export default Profile;
