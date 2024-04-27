import { Image, SafeAreaView, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native'
import React, { useState } from 'react'
import { useNavigation, useRoute } from '@react-navigation/native'
import { ArrowLeftIcon } from 'react-native-heroicons/solid';
import { COLORS, SIZES } from '../constants';
import { Ionicons, Entypo } from '@expo/vector-icons';

const SelectAddress = () => {
    const navigation = useNavigation();
    const [searchKey, setSearchKey] = useState('');

    const handleClearSearch = () => {
        setSearchKey('');
    };
    const route = useRoute();
    let type = {}; // Default value for type if not provided in route.params
    if (route.params && route.params.foodData) {
        type = route.params.foodData;
        console.log('====================================');
        console.log(type);
        console.log('====================================');
    }

    return (
        <SafeAreaView>
            <View style={styles.container}>
                <View style={styles.topContainer}>
                    <View style={styles.backIcon}>
                        <TouchableOpacity onPress={() => { navigation.goBack() }}>
                            <ArrowLeftIcon color={'#2A4D50'} />
                        </TouchableOpacity>
                    </View>
                    <View style={styles.titleTextContainer}>
                        <Text style={styles.titleText(COLORS.primary, SIZES.xSmall - 5)}>Set Pickup Location </Text>
                    </View>
                </View>
            </View>
            <View style={{ flex: 1, flexDirection: 'row', alignItems: 'center', marginTop: 50 }}>
                <View style={{ flex: 1, height: 1, backgroundColor: '#B4B4B8', width: '100%' }} />
            </View>
            <Text style={{ fontSize: 18, fontWeight: '600', marginTop: 31, marginLeft: 19 }}>
                Search for pickup location
            </Text>

            <View style={styles.searchContainer}>


                <View style={styles.searchWrapper}>
                    <TextInput
                        style={styles.searchInput}
                        value={searchKey}
                        onChangeText={setSearchKey}
                        autoCapitalize="none"
                        placeholderTextColor="#ffffff"
                        placeholder='Enter Address'
                    />
                </View>
                <TouchableOpacity onPress={handleClearSearch}>
                    <Entypo name="cross" size={SIZES.xLarge - 2}
                        style={{
                            marginTop: 8,
                            marginHorizontal: 10
                        }}
                        color="white" />
                </TouchableOpacity>
                <TouchableOpacity>
                    <Ionicons name="search" size={SIZES.xLarge} style={styles.searchIcon} />
                </TouchableOpacity>

            </View>
            <View style={{ height: 20 }} />
            <View style={{ flexDirection: 'row' }}>
                <View style={{ height: 1, width: '40%', marginHorizontal: 30, backgroundColor: '#C7C8CC', }} />
                <Text style={{
                    fontSize: 13,
                    color: '#C7C8CC',
                    marginTop: -7,
                    marginHorizontal: -30
                }}>Or</Text>
                <View style={{ height: 1, width: '40%', marginHorizontal: 30, backgroundColor: '#C7C8CC', }} />
            </View>

            <View style={{ height: 20 }} />
            <View style={{ flexDirection: 'row' }}>
                <TouchableOpacity onPress={() => { navigation.navigate("Map") }}>
                    <Entypo name="location" size={24} color="green"
                        style={{ marginHorizontal: 30 }}
                    />
                </TouchableOpacity>
                <TouchableOpacity onPress={() => { navigation.navigate("AddressDetails") }}>
                    <Text style={{
                        fontSize: 16,
                        fontWeight: 'bold',
                        color: 'green',
                        marginTop: 3,
                        marginHorizontal: -10
                    }}>Select location via map</Text>
                </TouchableOpacity>

            </View>
            <View style={{ height: 3, backgroundColor: '#DDDDDD', marginTop: 24 }} />
            <View style={{
                // flexDirection: 'row',
                backgroundColor: '#2A4D50',
                height: 120,
                width: '90%',
                alignSelf: "center",
                borderRadius: 24,
                marginTop: 28,
                borderColor: "#ffffff",
                shadowOffset: { width: 1, height: 2 },
                shadowOpacity: 0.7,
                elevation: 10
            }}>
                <View>
                    <Text style={{
                        fontSize: 17,
                        fontWeight: '600',
                        color: 'white',
                        marginHorizontal: 14,
                        marginTop: 16
                    }}>Please keep them ready to go!
                    </Text>
                </View>
                <View style={{ flexDirection: 'row' }}>
                    <View>
                        <Text style={{
                            fontSize: 14,
                            fontWeight: '300',
                            color: 'white',
                            marginHorizontal: 20,
                            marginTop: 13
                        }} >Please keep the item packed </Text>
                        <Text style={{
                            fontSize: 14,
                            fontWeight: '300',
                            color: 'white',
                            marginHorizontal: 20,
                            marginTop: 2
                        }}  >and ready before the pickup </Text>
                        <Text style={{
                            fontSize: 14,
                            fontWeight: '300',
                            color: 'white',
                            marginHorizontal: 20,
                            marginTop: 2
                        }}  >agent arrives for pickup. </Text>
                    </View>
                    <View style={{
                        height: 75,
                        width: 140,
                        // borderWidth: 1,
                        marginHorizontal: -15,
                        marginTop: 6
                    }}>
                        <Image
                            style={{
                                aspectRatio: 2,
                                height: 73,
                                width: 130,
                            }}
                            source={require('../assets/images/donation-box.png')} />
                    </View>
                </View>

            </View>
        </SafeAreaView>
    )
}

export default SelectAddress

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    topContainer: {
        flexDirection: "row",
        alignItems: "center",
        width: '100%',
        height: 45,
    },
    containerThree: {
        flex: 1,
        paddingHorizontal: 20,
        paddingTop: 20,
    },
    textInput: {
        height: 70,
        borderWidth: 1,
        borderColor: '#ccc',
        borderRadius: 10,
        padding: 10,
        fontSize: 18,
        textAlignVertical: 'top',
    },
    backIcon: {
        marginLeft: 10
    },
    titleTextContainer: {
        marginHorizontal: 140,
        width: 200
    },
    titleText: (color, top) => ({
        fontWeight: "500",
        fontSize: SIZES.xLarge,
        marginTop: top,
        color: color,
        marginLeft: -82,
    }),
    searchContainer: {
        flexDirection: "row",
        justifyContent: "center",
        alignContent: "center",
        backgroundColor: "#31363F",
        borderRadius: SIZES.medium,
        marginVertical: SIZES.medium,
        marginHorizontal: 22,
        height: 38,
        width: '90%'
    },
    searchIcon: {
        marginHorizontal: 10,
        color: COLORS.white,
        marginTop: 6
    },
    searchWrapper: {
        flex: 1,
        backgroundColor: "#31363F",
        marginRight: SIZES.small,
        borderRadius: SIZES.small
    },
    searchInput: {
        fontFamily: "regular",
        width: "100%",
        height: "100%",
        paddingHorizontal: SIZES.small,
        color: "white", // Corrected color format
    },
})
