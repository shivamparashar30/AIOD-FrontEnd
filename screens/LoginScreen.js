import { View, Text, StatusBar, TouchableOpacity, Image, TextInput, Alert, StyleSheet, ActivityIndicator } from 'react-native'
import React, { useState } from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import { ArrowLeftIcon } from 'react-native-heroicons/solid'
import { themeColors } from '../theme'
import { useNavigation } from '@react-navigation/native'
import axios from 'axios'
import constant from '../constant'
import AsyncStorage from '@react-native-async-storage/async-storage';
// import HomeNavigation from '../navigation/HomeNavigation'
// import Homee from './Homee'

export default function LoginScreen() {
  const navigation = useNavigation();
  const [getText, setText] = useState("")
  const [getPassText, setPassText] = useState("")

  // for loading 
  // const [isLoading, setIsLoading] = useState(true)

  const login = () => {
    axios({
      method: 'post',
      url: constant.BASE_URL + '/auth/login',
      headers: { 'Content-Type': 'application/json', 'charset': 'utf-8' },
      data: {
        email: getText,
        password: getPassText

      },
    }).then((apiResponse) => {
      if (apiResponse.data.role === "ngo") {
        if (apiResponse.data.message === constant.NOT_VERIFIED_MSG) {
          Alert.alert(constant.NOT_VERIFIED_MSG)
        } else {
          navigation.navigate('HomeScreen')
        }
      }
      handleAsyncStorage(apiResponse.data.message)
    }).catch((err) => {
      console.log(err);
      // setIsLoading(true);
    });
  }

  const handleAsyncStorage = (token) => {
    AsyncStorage.setItem('userdata', `Bearer ${token}`).then(() => {
      console.log("Token Saved")
      navigation.navigate('HomeScreen')

    }).catch(error => console.log("Login: " + error))
  }
  // loading container
  // if (isLoading) {
  //   return (
  //     <SafeAreaView style={styles.loadingContainer}>
  //       <ActivityIndicator size="large" color="#0000ff" />
  //       <Text>Loading...</Text>
  //     </SafeAreaView>
  //   )
  // }

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
          <Image source={require('../assets/images/login.png')}
            style={{ width: 200, height: 200 }} />
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
            autoCapitalize='none'
            onChangeText={setText}
            value={getText}
          />
          <Text className="text-gray-700 ml-4">Password</Text>
          <TextInput
            className="p-4 bg-gray-100 text-gray-700 rounded-2xl"
            secureTextEntry
            onChangeText={setPassText}
            placeholder="password"
            value={getPassText}
          />
          <TouchableOpacity onPress={() => navigation.navigate('ForgotPass')} className="flex items-end">
            <Text className="text-gray-700 mb-5">Forgot Password?</Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={login}
            className="py-3 bg-yellow-400 rounded-xl">
            <Text
              className="text-xl font-bold text-center text-gray-700"
            >
              Login
            </Text>
          </TouchableOpacity>

        </View>
        <Text className="text-xl text-gray-700 fornt-bold text-center py-5">Or</Text>
        <View className="flex-row justify-center space-x-12">
          <TouchableOpacity className="p-2 bg-gray-100 rounded-2xl">
            <Image source={require('../assets/icons/google.png')} className="w-10 h-10" />
          </TouchableOpacity>
          <TouchableOpacity className="p-2 bg-gray-100 rounded-2xl">
            <Image source={require('../assets/icons/apple.png')} className="w-10 h-10" />
          </TouchableOpacity>
          <TouchableOpacity className="p-2 bg-gray-100 rounded-2xl">
            <Image source={require('../assets/icons/facebook.png')} className="w-10 h-10" />
          </TouchableOpacity>
        </View>
        <View className="flex-row justify-center mt-7">
          <Text className="text-gray-500 font-semibold">
            Don't have an account?
          </Text>
          <TouchableOpacity onPress={() => navigation.navigate('SignUp')}>
            <Text className="font-semibold text-yellow-500"> Sign Up</Text>
          </TouchableOpacity>
        </View>

      </View>
    </View>
  )
}
// const styles = StyleSheet.create({
//   loadingContainer: {
//     flex: 1,
//     backgroundColor: "#f5f5f5",
//     paddingTop: StatusBar.currentHeight,
//     justifyContent: "center",
//     alignItems: "center",
//   },
// })