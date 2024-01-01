import { View, Text, TouchableOpacity, Image, TextInput, Alert } from 'react-native'
import React, { useState } from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import { ArrowLeftIcon } from 'react-native-heroicons/solid'
import { themeColors } from '../theme'
import { useNavigation } from '@react-navigation/native'
import axios from 'axios'
import constant from '../constant'

export default function LoginScreen() {
    const navigation = useNavigation();
    const [getText, setText] = useState('')

    const forgotPassword = () => {
        axios({
            method: 'post',
            url: constant.BASE_URL + '/auth/forgotpassword',
            headers: { 'Content-Type': 'application/json', 'charset': 'utf-8' },
            data: {
                email: getText,
            },
        }).then((apiResponse) => {
            console.log(apiResponse.data);
            Alert.alert('Email Sent');
        }).catch((err) => {
            console.log();
            console.log(err);
        });
    }

    return (
        <View className="flex-1 bg-white" style={{ backgroundColor: themeColors.bg }}>
            <SafeAreaView className="flex ">
                <View className="flex-row justify-start">
                    <TouchableOpacity onPress={() => navigation.goBack()}
                        className="bg-yellow-400 p-2 rounded-tr-2xl rounded-bl-2xl ml-4">
                        <ArrowLeftIcon size="20" color="black" />
                    </TouchableOpacity>
                </View>
                <View className="flex-row justify-center">
                    <Image source={require('../assets/images/forgotpassword.png')}
                        style={{ width: 270, height: 200 }} />
                </View>


            </SafeAreaView>
            <View
                style={{ borderTopLeftRadius: 50, borderTopRightRadius: 50 }}
                className="flex-1 bg-white px-8 pt-8">
                <View className="form space-y-2">
                    <Text className="text-gray-700 ml-4">Email Address</Text>
                    <TextInput
                        className="p-4 bg-gray-100 text-gray-700 rounded-2xl mb-3"
                        placeholder="email"
                        onChangeText={setText}
                        value={getText}
                    />
                    <TouchableOpacity onPress={forgotPassword}
                        className="p-4 py-4 bg-yellow-500 rounded-xl">
                        <Text
                            className="text-xl font-bold text-center text-gray-700"
                        >
                            Submit
                        </Text>
                    </TouchableOpacity>

                </View>
                <View className="flex-row justify-center mt-7">
                    <Text className="text-gray-500 font-semibold">Back to login! </Text>
                    <TouchableOpacity onPress={() => navigation.navigate('Login')}>
                        <Text className="font-semibold text-yellow-500"> Login</Text>
                    </TouchableOpacity>
                </View>
            </View>

        </View>

    )
}