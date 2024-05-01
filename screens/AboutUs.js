import { ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React from 'react'
import { SafeAreaView } from 'react-native'
import { useNavigation } from '@react-navigation/native'
import { ArrowLeftIcon } from 'react-native-heroicons/solid'
// import { COLORS, SIZES } from '../../constants'
import { Image } from 'react-native'
import { Ionicons } from '@expo/vector-icons'
import { COLORS, SIZES } from '../constants'

const AboutUs = () => {
    const navigation = useNavigation();
    return (
        <SafeAreaView>
            <View style={styles.container}>
                <View style={styles.topContainer}>
                    <View style={styles.backIcon}>
                        <TouchableOpacity onPress={() => { navigation.goBack() }}>
                            <ArrowLeftIcon color={'#2A4D50'} />
                        </TouchableOpacity>
                    </View>
                    <View style={{
                        height: 30,
                        width: 30,
                        borderRadius: 20,
                        // borderWidth: 1,
                        marginHorizontal: 20,
                        marginLeft: 48
                    }}>
                        <Image
                            style={{
                                height: 40,
                                width: 40,
                                resizeMode: "cover",
                                borderRadius: 20,
                                marginTop: -5,
                                marginHorizontal: -16
                            }}
                            source={{
                                uri: 'https://png.pngtree.com/png-clipart/20200709/original/pngtree-colorful-teamwork-logo-png-image_4127032.jpg'
                            }} />
                    </View>
                    <View style={styles.titleTextContainer}>
                        <Text style={styles.titleText(COLORS.primary, SIZES.xSmall - 5)}>All In One Donation </Text>
                    </View>
                </View>
            </View>
            <View style={{ flex: 1, flexDirection: 'row', alignItems: 'center', marginTop: 50 }}>
                <View style={{ flex: 1, height: 1, backgroundColor: '#B4B4B8', width: '100%' }} />
            </View>

            <ScrollView
                showsHorizontalScrollIndicator={false}
                showsVerticalScrollIndicator={false}
            >

                <View style={styles.ngoImgContainer}>
                    <Image style={styles.ngoImg}
                        source={require('../assets/images/aiodlogo.png')}
                    />
                </View>
                <View >
                    <Text style={styles.chooseDonation}>
                        About Us
                    </Text>
                </View>
                <View>
                    <Text style={{
                        fontSize: 14,
                        fontWeight: '400',
                        marginTop: 14,
                        marginHorizontal: 20,
                        lineHeight: 21.5,
                        textAlign: 'justify'
                        // letterSpacing: 0.6
                    }}>
                        "All In One Donation" is a Mobile Application that connects individuals facing poverty-related challenges with those willing to assist them.
                        It facilitates donations for essential needs like food, clothing, and education, ensuring mutual satisfaction for both donors and recipients.


                    </Text>
                    <Text style={{
                        fontSize: 14,
                        fontWeight: '400',
                        marginTop: 14,
                        marginHorizontal: 20,
                        lineHeight: 21.5,
                        textAlign: 'justify'
                        // letterSpacing: 0.6
                    }}>
                        Organizations that perform charity across the country are struggling to meet the growing demand for food, clothes, books  assistance. One of the main challenges they face is the inefficient and time-consuming process of collecting and distributing surplus goods from donors. This often leads to goods wastage which rather should have reached to the people who needs it.
                    </Text>
                    {/* <Text style={{
                        fontSize: 14,
                        fontWeight: '400',
                        marginTop: 14,
                        marginHorizontal: 20,
                        lineHeight: 21.5,
                        textAlign: 'justify'
                        // letterSpacing: 0.6
                    }}>
                        With the support of our generous donors, we are able to continue our work and provide hope for the children we serve.

                    </Text> */}
                </View>
                <View style={{
                    height: 70,
                    width: '90%',
                    marginTop: 15,
                    marginHorizontal: 20,
                    borderWidth: 1,
                    borderRadius: 10,
                    borderColor: COLORS.gray2
                }}>
                    {/* <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                        <View>
                            <Ionicons name='location-sharp' color={COLORS.primary} size={22} style={{
                                marginTop: 7, marginHorizontal: 10
                            }} />
                        </View>
                        <View>
                            <Text style={{
                                fontSize: 14,
                                fontWeight: '400',
                                marginTop: 11,
                                marginHorizontal: 0,
                                textAlign: 'justify'
                            }}> No. 258, Park St, Anna Sagar West Chennai</Text>
                        </View>
                    </View> */}

                    <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                        <View>
                            <Ionicons name='call' color={COLORS.primary} size={22} style={{
                                marginTop: 7, marginHorizontal: 10
                            }} />
                        </View>
                        <View>
                            <Text style={{
                                fontSize: 14,
                                fontWeight: '400',
                                marginTop: 11,
                                marginHorizontal: 0,
                                textAlign: 'justify'
                            }}> +91 8112270790</Text>
                        </View>
                    </View>
                    <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                        <View>
                            <Ionicons name='mail' color={COLORS.primary} size={22} style={{
                                marginTop: 7, marginHorizontal: 10
                            }} />
                        </View>

                        <View>
                            <Text style={{
                                fontSize: 14,
                                fontWeight: '400',
                                marginTop: 11,
                                marginHorizontal: 0,
                                textAlign: 'justify'
                            }}> allinonedonation@gmail.com</Text>
                        </View>
                    </View>

                </View>
                {/* <View style={{
                    width: 200,
                    height: 200,
                    //  borderWidth: 1
                }}>
                    <TouchableOpacity onPress={() => navigation.navigate('HomeScreen')}>
                        <View style={{
                            height: 45,
                            width: 110,
                            // /Top: 20,
                            left: 260,
                            bottom: -19,
                            backgroundColor: COLORS.primary,
                            borderRadius: 14,
                            alignItems: 'center',
                            justifyContent: 'center'
                        }}>
                            <Text style={{
                                fontSize: 20,
                                fontWeight: 700,
                                color: 'white'

                            }}>Donate</Text>
                        </View>
                    </TouchableOpacity>
                </View> */}

            </ScrollView>
        </SafeAreaView>
    )
}

export default AboutUs

const styles = StyleSheet.create({
    chooseDonation: {
        fontSize: 20,
        fontWeight: '600',
        fontStyle: 'normal',
        margin: 0,
        marginHorizontal: 20,
        marginTop: 24

    },
    ngoImg: {
        height: 190,
        width: "100%",
        resizeMode: 'cover',
        borderRadius: 20,
        // aspectRatio: 1
    },
    ngoImgContainer: {
        alignItems: 'center',
        justifyContent: 'center',
        marginTop: 30,
        marginHorizontal: 22,
        height: 160,
        width: "89%",
        borderRadius: 20,
        // borderWidth: 1
    },
    container: {
        flex: 1,
        backgroundColor: 'white',
        // alignItems: 'center'
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
        marginHorizontal: 49
        // alignItems: 'center'
    },
    titleText: (color, top) => ({
        fontWeight: "500",
        fontSize: SIZES.xLarge,
        marginTop: top,
        color: color,
        marginLeft: -68,
    })
})


