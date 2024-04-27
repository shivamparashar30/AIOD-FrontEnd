import { SafeAreaView, StatusBar, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React from 'react'
import { COLORS, SIZES } from '../../../constants'
import { ArrowLeftIcon } from 'react-native-heroicons/solid'
import { useNavigation } from '@react-navigation/native'

const NgoNotification = () => {
    const navigation = useNavigation();
    return (

        <SafeAreaView>
            <View style={styles.container}>
                <View style={styles.topContainer}>
                    <View style={styles.backIcon}>
                        <TouchableOpacity onPress={() => { navigation.navigate('NgoHomeScreen') }}>
                            <ArrowLeftIcon color={'#2A4D50'} />
                        </TouchableOpacity>
                    </View>
                    <View style={styles.titleTextContainer}>
                        <Text style={styles.titleText(COLORS.primary, SIZES.xSmall - 5)}>Notification</Text>
                    </View>
                </View>
            </View>

            <View style={{ flex: 1, flexDirection: 'row', alignItems: 'center', marginTop: 50 }}>
                <View style={{ flex: 1, height: 1, backgroundColor: '#B4B4B8', width: '100%' }} />
            </View>
        </SafeAreaView>

    )
}

export default NgoNotification

const styles = StyleSheet.create({
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
    containerThree: {
        flex: 1,
        paddingHorizontal: 20,
        paddingTop: 20,
    },
    textInput: {
        height: 70, // Set the height to 300
        borderWidth: 1,
        borderColor: '#ccc',
        borderRadius: 10,
        padding: 10,
        fontSize: 18,
        textAlignVertical: 'top', // Aligns text at the top vertically
    },
    backIcon: {
        marginLeft: 10
    },
    titleTextContainer: {
        marginHorizontal: 140
        // alignItems: 'center'
    },
    containerTwo: {
        flexDirection: 'row',
        // justifyContent: 'space-between',
        paddingHorizontal: 6,
        marginTop: 4,

    },
    tab: {
        // flex: 1,
        height: 40,
        width: 82,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'white',
        borderRadius: 20,
        margin: 8,
        marginLeft: 8,
        padding: 5,
        borderWidth: 1,
        borderColor: '#2A4D50',
    },
    selectedTab: {
        backgroundColor: '#2A4D50',
    },
    tabText: {
        color: '#2A4D50',
    },
    selectedTabText: {
        color: 'white',
    },

    titleText: (color, top) => ({
        fontWeight: "500",
        fontSize: SIZES.xLarge,
        marginTop: top,
        color: color,
        marginLeft: -38,
    }),
})