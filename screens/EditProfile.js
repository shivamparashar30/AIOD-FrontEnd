import { View, Text, Image, StyleSheet, SafeAreaView, TouchableOpacity, TextInput, ActivityIndicator } from 'react-native'
import React, { useEffect, useState } from 'react'
import { useNavigation } from '@react-navigation/native';

import Ionicons from '@expo/vector-icons/Ionicons'
import { ArrowLeftIcon } from 'react-native-heroicons/solid';
import { Button } from 'react-native-elements';
// import Icon from 'react-native-vector-icons/FontAwesome';
import axios from 'axios'
import constant from '../constant'
import AppLoading from 'expo-app-loading'
import AsyncStorage from '@react-native-async-storage/async-storage';

export default function EditProfile() {
    const navigation = useNavigation();

    const [loading, setIsLoading] = useState(true)

    const [username, setUsername] = useState("")
    const [name, setName] = useState("")
    const [email, setEmail] = useState("")
    const [phoneno, setPhone] = useState()
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
        setIsLoading(true)
        axios({
            method: 'get',
            url: constant.BASE_URL + '/auth/me',
            headers: { 'Authorization': token }
        }).then((apiResponse) => {
            setIsLoading(false)
            const { username, name, email, phoneno } = apiResponse.data.data;

            console.log(username);
            setName(name)
            setUsername(username)
            setEmail(email)
            setPhone(phoneno)
        }).catch((err) => {
            console.log("Profile" + err);
            setIsLoading(false);
        });
    }

    useEffect(() => {
        const unsubscribeFocus = navigation.addListener('focus', () => {
            // Code to run when the screen comes into focus (when returning from the next screen)
            console.log('Returned to MyScreen from the next screen');
            getToken()
        });

        // Optional: You can also handle data passed back from the next screen
        const unsubscribeBlur = navigation.addListener('blur', () => {
            console.log('Screen is blurred (navigating away)');
            getToken()
        });

        // Cleanup function (optional)
        return () => {
            unsubscribeFocus();
            unsubscribeBlur();
        };
    }, [navigation]);

    const updateHandler = () => {
        setIsLoading(true)
        axios({
            method: 'put',
            url: constant.BASE_URL + '/auth/updatedetails',
            headers: { 'Content-Type': 'application/json', 'charset': 'utf-8', 'Authorization': token },
            data: {
                name: name,
                email: email,
                phoneno: phoneno
            },
        }).then((apiResponse) => {
            console.log(apiResponse.data);
            setIsLoading(false)
        }).catch((err) => {
            console.log("Update" + err);
            setIsLoading(false);
        });
    }

    return (
        <SafeAreaView>
            <View style={{ width: '100%', height: '100%', backgroundColor: 'white' }}>
                {loading && <ActivityIndicator size="large" color="#2A4D50" />}
                <View>
                    <TouchableOpacity
                        onPress={() => navigation.goBack()}
                        style={{ color: '#2A4D50' }}
                        className="p-2 w-10 rounded-tr-2xl rounded-bl-2xl ml-4"
                    >
                        <ArrowLeftIcon size="20" color="black" />


                    </TouchableOpacity>
                </View>
                <View>
                    <View style={{ padding: 20, alignItems: 'center' }}>
                        <Image style={styles.profileImg} source={require('../assets/images/shivam.jpeg')} />
                        <TouchableOpacity>
                            <View style={{
                                height: 40, width: 40,
                                backgroundColor: 'white', marginTop: -30, marginLeft: 75, borderRadius: 20
                            }}>
                                <Ionicons name="create-outline" size={25} marginTop={1} marginLeft={4} style={styles.icons} />
                            </View>
                        </TouchableOpacity>
                    </View>
                </View>
                <View className="form space-y-2">
                    <Text className="text-gray-700 ml-7 font-bold ">Username</Text>
                    <TextInput
                        value={username}
                        className="p-4 bg-gray-100 text-gray-700 rounded-2xl mb-4, mx-4"
                        style={{ padding: 30 }}
                    // placeholder='Enter Name'
                    />
                    <Text className="text-gray-700 ml-7 font-bold ">Name</Text>
                    <TextInput
                        value={name}
                        onChangeText={setName}
                        className="p-4 bg-gray-100 text-gray-700 rounded-2xl mb-4, mx-4"
                        style={{ padding: 30 }}

                    />
                    <TouchableOpacity>
                        <Ionicons name="create-outline" size={20} marginTop={-49} marginLeft={343} style={styles.icons} />
                    </TouchableOpacity>
                    <Text className="text-gray-700 ml-7 font-bold ">Email</Text>
                    <TextInput
                        value={email}
                        onChangeText={setEmail}
                        className="p-4 bg-gray-100 text-gray-700 rounded-2xl mb-4, mx-4"
                        style={{ padding: 30 }}

                    />
                    <TouchableOpacity>
                        <Ionicons name="create-outline" size={20} marginTop={-49} marginLeft={340} style={styles.icons} />
                    </TouchableOpacity>
                    <View>
                        <Text className="text-gray-700 ml-7 font-bold ">Phone Number</Text>
                        <TextInput
                            value={phoneno}
                            onChangeText={setPhone}
                            className="p-4 bg-gray-100 text-gray-700 rounded-2xl mb-4, mx-4"
                            style={{ padding: 30 }}
                        />
                        <TouchableOpacity>
                            <Ionicons name="create-outline" size={20} marginTop={-42} marginLeft={339} style={styles.icons} />
                        </TouchableOpacity>
                    </View>

                </View>
                <View className="form space-y-2 mx-16 my-8" style={{ borderRadius: 20, backgroundColor: '#2A4D50' }}>
                    <Button title="Update"
                        onPress={updateHandler}
                    />
                </View>
            </View>


        </SafeAreaView>
    )
}

const styles = StyleSheet.create({
    icons: {
        padding: 5
    }, profileImg: {
        height: 130,
        width: 130,
        borderRadius: 150 / 2,
        overflow: "hidden",
        borderColor: "#877dfa",
        marginTop: 20,
    },
}) 