// import { StyleSheet, Text, View } from 'react-native'
// import React from 'react'

// const NgoProfile = () => {
//     return (
//         <View>
//             <Text>NgoProfile</Text>
//         </View>
//     )
// }

// export default NgoProfile

// const styles = StyleSheet.create({})

import { View, Text, Image, StyleSheet, SafeAreaView, TouchableOpacity, TextInput, ActivityIndicator, ScrollView } from 'react-native'
import React, { useEffect, useState } from 'react'
import { useNavigation } from '@react-navigation/native';

import Ionicons from '@expo/vector-icons/Ionicons'
import { ArrowLeftIcon } from 'react-native-heroicons/solid';
import { Button } from 'react-native-elements';
// import Icon from 'react-native-vector-icons/FontAwesome';
import axios from 'axios'
// import constant from '../constant'
import AppLoading from 'expo-app-loading'
import AsyncStorage from '@react-native-async-storage/async-storage';
import constant from '../../../constant';

export default function NgoProfile() {
    const navigation = useNavigation();

    const [loading, setIsLoading] = useState(true)

    const [username, setUsername] = useState("")
    const [name, setName] = useState("")
    const [email, setEmail] = useState("")
    const [phoneno, setPhone] = useState()
    const [token, setToken] = useState("")
    const [imageUrl, setImageUrl] = useState("")
    const [description, setDescription] = useState("")
    const [address, setAddress] = useState("")



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
            const { username, name, email, phoneno, ImageUrl, Description, Address } = apiResponse.data.data;

            console.log(username);
            setName(name)
            setUsername(username)
            setEmail(email)
            setPhone(phoneno)
            setImageUrl(ImageUrl)
            setDescription(Description)
            setAddress(Address)
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
                phoneno: phoneno,
                ImageUrl: imageUrl,
                Description: description,
                Address: address,


            },
        }).then((apiResponse) => {
            console.log(apiResponse.data);
            setIsLoading(false)
        }).catch((err) => {
            console.log("Update" + err);
            setIsLoading(false);
        });
    }
    const logout = () => {
        console.log("Logout");
        AsyncStorage.removeItem('userdata').then(() => {
            console.log("Token Removed")
            navigation.navigate('Login')
        }).catch(error => console.log("Profile: " + error))
    };

    return (
        <SafeAreaView>
            <View style={{ width: '100%', height: '100%' }}>
                {loading && <ActivityIndicator size="large" color="#2A4D50" />}
                <View style={{
                    height: 180, borderWidth: 0, width: '100%',
                    backgroundColor: '#135D66', borderBottomLeftRadius: 20,
                    borderBottomEndRadius: 20, marginTop: -140,
                }}>
                    <TouchableOpacity
                        onPress={() => navigation.goBack()}
                        style={{ color: '#2A4D50' }}
                        className="p-2 w-10 rounded-tr-2xl rounded-bl-2xl ml-4"
                    >
                        <ArrowLeftIcon style={{ marginTop: 130 }} size={24} color="black" />


                    </TouchableOpacity>
                </View>
                <ScrollView>
                    <View>
                        <View style={{ padding: 20, alignItems: 'center' }}>
                            <Image style={styles.profileImg} source={require('../../../assets/images/shivam.jpeg')} />
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
                            className="p-4 bg-gray-200 text-gray-700 rounded-2xl mb-4, mx-4"
                            style={{ padding: 30 }}
                        // placeholder='Enter Name'
                        />
                        <Text className="text-gray-700 ml-7 font-bold ">Name</Text>
                        <TextInput
                            value={name}
                            onChangeText={setName}
                            className="p-4 bg-gray-200 text-gray-700 rounded-2xl mb-4, mx-4"
                            style={{ padding: 30, marginTop: 10 }}

                        />
                        <TouchableOpacity>
                            <Ionicons name="create-outline" size={20} marginTop={-49} marginLeft={343} style={styles.icons} />
                        </TouchableOpacity>
                        <Text className="text-gray-700 ml-7 font-bold ">Email</Text>
                        <TextInput
                            value={email}
                            onChangeText={setEmail}
                            className="p-4 bg-gray-200 text-gray-700 rounded-2xl mb-4, mx-4"
                            style={{ padding: 30, marginTop: 10 }}

                        />
                        <TouchableOpacity>
                            <Ionicons name="create-outline" size={20} marginTop={-49} marginLeft={340} style={styles.icons} />
                        </TouchableOpacity>
                        <View>
                            <Text className="text-gray-700 ml-7 font-bold ">Phone Number</Text>
                            <TextInput
                                value={phoneno}
                                onChangeText={setPhone}
                                className="p-4 bg-gray-200 text-gray-700 rounded-2xl mb-4, mx-4"
                                style={{ padding: 30, marginTop: 10 }}
                            />
                            <TouchableOpacity>
                                <Ionicons name="create-outline" size={20} marginTop={-42} marginLeft={339} style={styles.icons} />
                            </TouchableOpacity>
                        </View>
                        <View>
                            <Text className="text-gray-700 ml-7 font-bold ">Image URL</Text>
                            <TextInput
                                value={imageUrl}
                                onChangeText={setImageUrl}
                                className="p-4 bg-gray-200 text-gray-700 rounded-2xl mb-4, mx-4"
                                style={{ padding: 30, marginTop: 10 }}
                                placeholder='Add Image Url'
                            />
                            <TouchableOpacity>
                                <Ionicons name="create-outline" size={20} marginTop={-42} marginLeft={339} style={styles.icons} />
                            </TouchableOpacity>
                        </View>
                        <View>
                            <Text className="text-gray-700 ml-7 font-bold ">Description</Text>
                            <TextInput
                                value={description}
                                onChangeText={setDescription}
                                className="p-4 bg-gray-200 text-gray-700 rounded-2xl mb-5, mx-4"
                                style={{ padding: 20, height: 100, marginTop: 10 }}
                                placeholder='Add Description'
                            />
                            <TouchableOpacity>
                                <Ionicons name="create-outline" size={20} marginTop={-92} marginLeft={339} style={styles.icons} />
                            </TouchableOpacity>
                        </View>
                        <View>
                            <Text className="text-gray-700 ml-7 font-bold ">Address</Text>
                            <TextInput
                                value={address}
                                onChangeText={setAddress}
                                className="p-4 bg-gray-200 text-gray-700 rounded-2xl mb-5, mx-4"
                                style={{ padding: 20, marginTop: 10 }}
                                placeholder='Add Address'
                            />
                            <TouchableOpacity>
                                <Ionicons name="create-outline" size={20} marginTop={-42} marginLeft={339} style={styles.icons} />
                            </TouchableOpacity>
                        </View>

                    </View>

                    {/* <View style={{ borderRadius: 20, backgroundColor: '#2A4D50', width: 150, mt }}> */}
                    {/* <Button title="Update"
                        onPress={updateHandler}
                    /> */}
                    {/* <View  style={{ height: 45, width: 70 }}>
                        <Text style={{ color: 'white', fontSize: 20, marginHorizontal: 30 }}>Update</Text>
                    </View>
                </View> */}
                    <TouchableOpacity onPress={updateHandler}>
                        <View style={{ borderWidth: 1, marginTop: 13, width: '40%', height: 45, borderRadius: 15, backgroundColor: '#2A4D50', marginHorizontal: 120 }}>
                            <Text style={{ color: 'white', fontSize: 20, marginHorizontal: 45, marginTop: 10 }}>Update</Text>
                        </View>
                    </TouchableOpacity>

                    <TouchableOpacity onPress={logout}>
                        <View >
                            <Text style={{ textAlign: 'center', color: 'red', marginTop: 25 }} >Logout</Text>
                        </View>
                    </TouchableOpacity>
                </ScrollView>
                <View style={{ height: 30 }} />
            </View>



        </SafeAreaView >
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