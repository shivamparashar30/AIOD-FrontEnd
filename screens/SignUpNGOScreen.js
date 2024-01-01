import { View, Text, TouchableOpacity, Image, TextInput } from 'react-native'
import React, { useState } from 'react'
import { themeColors } from '../theme'
import { SafeAreaView } from 'react-native-safe-area-context'
import { ArrowLeftIcon } from 'react-native-heroicons/solid';
import { useNavigation } from '@react-navigation/native';
import axios from 'axios'
import constant from '../constant'
// subscribe for more videos like this :)
export default function SignUpScreen() {
    const navigation = useNavigation();
    const [getName, setName] = useState("")
    const [getUserName, setUserName] = useState("")
    const [getPhone, setPhone] = useState("")
    const [getEmail, setEmail] = useState("")
    const [getPassText, setPassText] = useState("")

    const signUp = () => {
        axios({
            method: 'post',
            url: constant.BASE_URL + '/auth/register',
            headers: { 'Content-Type': 'application/json', 'charset': 'utf-8' },
            data: {
                name: getName,
                username: getUserName,
                phoneno: getPhone,
                email: getEmail,
                password: getPassText
            },
        }).then((apiResponse) => {
            console.log(apiResponse.data);
        }).catch((err) => {
            console.log();
            console.log(err);
        });
    }


    return (
        <View className="flex-1 bg-white" style={{ backgroundColor: themeColors.bg }}>
            <SafeAreaView className="flex">
                <View className="flex-row justify-start">
                    <TouchableOpacity
                        onPress={() => navigation.goBack()}
                        className="bg-yellow-400 p-2 rounded-tr-2xl rounded-bl-2xl ml-4"
                    >
                        <ArrowLeftIcon size="20" color="black" />
                    </TouchableOpacity>
                </View>
                <View className="flex-row justify-center">
                    <Image source={require('../assets/images/signup.png')}
                        style={{ width: 165, height: 110 }} />
                </View>
            </SafeAreaView>
            <View className="flex-1 bg-white px-8 pt-8"
                style={{ borderTopLeftRadius: 50, borderTopRightRadius: 50 }}
            >
                <View className="form space-y-2">
                    <Text className="text-gray-700 ml-4"> Name</Text>
                    <TextInput
                        className="p-4 bg-gray-100 text-gray-700 rounded-2xl mb-3"
                        onChangeText={setName}
                        value={getName}
                        placeholder='Enter Name'
                    />
                    <Text className="text-gray-700 ml-4">UserName</Text>
                    <TextInput
                        className="p-4 bg-gray-100 text-gray-700 rounded-2xl mb-3"
                        onChangeText={setUserName}
                        value={getUserName}
                        placeholder='Enter Username'
                    />
                    <Text className="text-gray-700 ml-4">Phone no</Text>
                    <TextInput
                        className="p-4 bg-gray-100 text-gray-700 rounded-2xl mb-3"
                        onChangeText={setPhone}
                        value={getPhone}
                        placeholder='Enter mob no'
                    />
                    <Text className="text-gray-700 ml-4">Email Address</Text>
                    <TextInput
                        className="p-4 bg-gray-100 text-gray-700 rounded-2xl mb-3"
                        onChangeText={setEmail}
                        value={getEmail}
                        placeholder='Enter Email'
                    />
                    <Text className="text-gray-700 ml-4">Password</Text>
                    <TextInput
                        className="p-4 bg-gray-100 text-gray-700 rounded-2xl mb-7"
                        secureTextEntry
                        onChangeText={setPassText}
                        value={getPassText}
                        placeholder='Enter Password'
                    />
                    <TouchableOpacity
                        onPress={signUp}
                        className="py-3 bg-yellow-400 rounded-xl"
                    >
                        <Text className="font-xl font-bold text-center text-gray-700">
                            Sign Up
                        </Text>
                    </TouchableOpacity>
                </View>
                {/* <Text className="text-xl text-gray-700 font-bold text-center py-5">
                    Or
                </Text> */}
                {/* <View className="flex-row justify-center space-x-12">
                    <TouchableOpacity className="p-2 bg-gray-100 rounded-2xl">
                        <Image source={require('../assets/icons/google.png')}
                            className="w-10 h-10" />
                    </TouchableOpacity>
                    <TouchableOpacity className="p-2 bg-gray-100 rounded-2xl">
                        <Image source={require('../assets/icons/apple.png')}
                            className="w-10 h-10" />
                    </TouchableOpacity>
                    <TouchableOpacity className="p-2 bg-gray-100 rounded-2xl">
                        <Image source={require('../assets/icons/facebook.png')}
                            className="w-10 h-10" />
                    </TouchableOpacity>
                </View> */}
                <View className="flex-row justify-center mt-7">
                    <Text className="text-gray-500 font-semibold">Already have an account?</Text>
                    <TouchableOpacity onPress={() => navigation.navigate('Login')}>
                        <Text className="font-semibold text-yellow-500"> Login</Text>
                    </TouchableOpacity>
                </View>
            </View>
        </View>
    )
}
