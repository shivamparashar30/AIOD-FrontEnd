// import { View, Text, Image, ScrollView, StyleSheet } from 'react-native'
// import React from 'react'
// import { SafeAreaView } from 'react-native-safe-area-context'

// export default function Profile() {
//     return (
//         <ScrollView>
//             <SafeAreaView className="my-12 ">
//                 <View className="block p-6 max-w-sm my-8 bg-indigo-400 rounded-lg border border-gray-200">
//                     {/* <Text className="text-red-100 mb-1"> Hello!</Text> */}
//                     <View className="font-bold text-gray-700 rounded-full bg-white flex items-center justify-center font-mono" style={styles.profileCont}>
//                         <Text>S</Text>
//                     </View>
//                 </View>

//                 <View className="block shrink-0 p-6 max-w-sm my-0 bg-indigo-400 rounded-lg border border-gray-200">
//                     <Text className="text-red-100"> Hello!</Text>
//                 </View>
//                 <View className="block shrink p-6 max-w-sm my-8 bg-indigo-400 rounded-lg border border-gray-200">
//                     <Text className="text-red-100"> Hello!</Text>
//                 </View>
//                 <View className="block shrink p-6 max-w-sm my-0 bg-indigo-400 rounded-lg border border-gray-200">
//                     <Text className="text-red-100"> Hello!</Text>
//                 </View>

//             </SafeAreaView>
//         </ScrollView>
//     )
// }

// const styles = StyleSheet.create({
//     DP: {
//         borderColor: 'black',
//         backgroundColor: 'pink',
//         borderRadius: 20,
//         height: 40,
//         width: 50
//     },
//     profileCont: {
//         height: 100,
//         width: 100,
//     },
//     container: {
//         flexDirection: 'column',
//         backgroundColor: 'white', // Set your background color
//         borderRadius: 8,
//         overflow: 'hidden',
//         margin: 10,
//         elevation: 2, // Add elevation for shadow (Android)
//     },
//     image: {
//         width: '100%',
//         height: 200, // Adjust the height as needed
//     },
//     contentContainer: {
//         padding: 10,
//     },
//     eyebrowText: {
//         fontSize: 10,
//         color: '#4B5563', // Adjust the color
//         textTransform: 'uppercase',
//         fontWeight: 'bold',
//     },
//     titleText: {
//         fontSize: 16,
//         color: '#1E3A8A', // Adjust the color
//         fontWeight: 'bold',
//         marginTop: 5,
//     },
//     titleLink: {
//         textDecorationLine: 'underline',
//     },
//     pricingText: {
//         fontSize: 12,
//         color: '#4B5563', // Adjust the color
//         marginTop: 5,
//     },

// });
//..........----------------------------------------------------....................---------------...............


import { View, Text, Image, ScrollView, StyleSheet, TouchableOpacity, Linking, Alert } from 'react-native'
import React from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
// import { Divider } from 'react-native-elements';
// import { Avatar } from 'react-native-elements';

const Profile = ({ img, imgAlt, eyebrow, title, pricing, url }) => {

    return (
        <ScrollView>
            <SafeAreaView style={styles.container}>
                <TouchableOpacity onPress={() => {
                    // console.log('You tapped the button!');
                    Alert.alert('Clicked On View Activity')
                }} >
                    <View style={styles.blockContainer} >

                        <View style={styles.DP} >
                            <Text style={{ fontSize: 34, color: '#1E3A8A', fontWeight: 'bold' }}>S</Text>
                        </View>
                        {/* <TouchableOpacity> */}

                        <View style={styles.NameSetting}>
                            <Text style={{ fontSize: 35, color: 'white', fontWeight: '', marginLeft: 30 }}>Shivam</Text>
                        </View>
                        {/* </TouchableOpacity> */}
                        {/* <View>

                            <Divider
                                color={StyleSheet.hairlineWidth < 1 ? '#bcbbc1' : 'rgba(0, 0, 0, 0.12)'}
                                style={{ borderBottomWidth: 1, borderBottomColor: 'black' }}
                                orientation="horizontal"
                            />
                        </View> */}

                    </View>
                </TouchableOpacity>
                {/* <View style={styles.container}> */}
                {/* <Image source={require('../assets/images/shivam.jpeg')} style={styles.image} resizeMode="cover" /> */}
                {/* <View style={styles.contentContainer}>
                        <View>
                            <Text style={styles.eyebrowText}>{eyebrow}</Text>
                            <Text style={styles.titleText}>
                                <TouchableOpacity onPress={() => Linking.openURL(url)}>
                                    <Text style={styles.titleLink}>{title}</Text>
                                </TouchableOpacity>
                            </Text>
                            <Text style={styles.pricingText}>{pricing}</Text>
                        </View>
                    </View> */}
                {/* </View> */}
                <View className="block shrink p-6 max-w-sm my-0 bg-indigo-400 rounded-lg border border-gray-200">
                    <Text style={styles.textRed}> Hello!</Text>
                </View>
                <View className="block shrink p-6 max-w-sm my-3 bg-indigo-400 rounded-lg border border-gray-200">
                    <Text style={styles.textRed}> Hello!</Text>
                </View>
                <View className="block shrink p-6 max-w-sm my-0 bg-indigo-400 rounded-lg border border-gray-200">
                    <Text style={styles.textRed}> Hello!</Text>
                </View>
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
    profileCont: {
        height: 100,
        width: 100,
    },
    container: {
        flex: 1,
        backgroundColor: 'white',
        borderRadius: 8,
        overflow: 'hidden',
        margin: 10,
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
});

export default Profile;
