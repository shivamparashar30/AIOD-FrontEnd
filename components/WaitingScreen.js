import { SafeAreaView, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React from 'react'
import { ArrowLeftIcon } from 'react-native-heroicons/solid'
import { useNavigation } from '@react-navigation/native'
import { Ionicons } from '@expo/vector-icons';
// import LottieView from 'lottie-react-native';

const WaitingScreen = () => {
    const navigation = useNavigation()
    return (
        <SafeAreaView>
            <View style={styles.backIcon}>
                <TouchableOpacity onPress={() => { navigation.goBack() }}>
                    <ArrowLeftIcon color={'#2A4D50'} />
                </TouchableOpacity>
            </View>
            <View style={{
                borderWidth: 1,
                height: 400,
                width: '85%',
                marginHorizontal: 30,
                marginTop: 100,
                backgroundColor: '#2A4D50',
                borderRadius: 15,
                shadowOffset: { width: 1, height: 1 },
                shadowOpacity: 0.9,
                shadowColor: '#2A4D50'
            }}>
                <Text style={{
                    fontSize: 23,
                    color: 'white',
                    fontWeight: '500',
                    textAlign: 'center',
                    marginTop: 20
                }}>Wait till your donation gets Accepted</Text>
                {/* <LottieView
                    style={{ width: 300, height: 300 }}
                    source={require('../assets/images/waiting.json')} autoPlay loop /> */}
                {/* <Ionicons name="timer-outline" size={38} color="white" /> */}
            </View>

        </SafeAreaView>
    )
}

export default WaitingScreen

const styles = StyleSheet.create({
    backIcon: {
        marginLeft: 10
    },
})