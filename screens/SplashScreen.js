import { StyleSheet, View, Text, SafeAreaView } from 'react-native'
import React, { useState, useEffect } from 'react'
import { Image } from 'react-native-elements'
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useNavigation } from '@react-navigation/native'

// import React, { useState, useEffect, useRef, Animated } from 'react';
// import { Animated, Easing } from 'react-native';
// import LottieView from 'lottie-react-native';


// const AnimatedLottieView = Animated.createAnimatedComponent(LottieView);

const SplashScreen = () => {
    // const animationProgress = useRef(new Animated.Value(0));


    const navigation = useNavigation();

    const [token, setToken] = useState("")

    const getToken = () => {
        AsyncStorage.getItem("userdata").then(token => {
            setTimeout(() => {
                if (token == null) {
                    navigation.navigate('Welcome')
                } else {
                    setToken(token)
                    navigation.navigate('HomeScreen')
                }
            }, 2000)
        }).catch((err) => {
            console.log("Splash" + err)
        });
    }

    useEffect(() => {
        getToken()
    }, []);

    return (
        <SafeAreaView>
            <View style={styles.container}>
                <Text>Splash Screen</Text>
            </View>


        </SafeAreaView>
    )
}




export default SplashScreen

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#877dfa",
        width: "100%",
        height: '100%',

    },
})




// import React, { useEffect, useRef, Animated } from 'react';
// import { Animated, Easing } from 'react-native';
// import LottieView from 'lottie-react-native';

// const AnimatedLottieView = Animated.createAnimatedComponent(LottieView);

// export default function ControllingAnimationProgress() {
//   const animationProgress = useRef(new Animated.Value(0));

//   useEffect(() => {
//     Animated.timing(animationProgress.current, {
//       toValue: 1,
//       duration: 5000,
//       easing: Easing.linear,
//       useNativeDriver: false,
//     }).start();
//   }, []);

//   return (
//     <AnimatedLottieView
//       source={require('../path/to/animation.json')}
//       progress={animationProgress.current}
//     />
//   );
// }