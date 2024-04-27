import { SafeAreaView, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React from 'react'
import SelectNgoDropdown from './SelectNgoDropdown'
import { useNavigation, useRoute } from '@react-navigation/native';
import { ArrowLeftIcon } from 'react-native-heroicons/solid';
import { COLORS, SIZES } from '../../constants';

const SelectNgo = () => {
    const navigation = useNavigation()
    const route = useRoute();
    let type = {}; // Default value for type if not provided in route.params
    if (route.params && route.params.AddAddressDetails) {
        type = route.params.AddAddressDetails;
        console.log('====================================');
        console.log(type);
        console.log('====================================');
    }

    // const route = useRoute();
    // const { Food, AddAddressDetails } = route.params;
    return (
        <SafeAreaView>
            <View style={styles.container}>
                {/* Header */}
                <View style={styles.topContainer}>
                    <View style={styles.backIcon}>
                        <TouchableOpacity onPress={() => { navigation.goBack() }}>
                            <ArrowLeftIcon color={'#2A4D50'} />
                        </TouchableOpacity>
                    </View>
                    <View style={styles.titleTextContainer}>
                        <Text style={styles.titleText(COLORS.primary, SIZES.xSmall - 5)}>Select NGO</Text>
                    </View>
                </View>
            </View>

            <View>
                <SelectNgoDropdown />
            </View>
            <View style={{ marginHorizontal: 270, marginTop: 20 }}>
                <TouchableOpacity onPress={() => navigation.navigate("WaitingScreen")}
                    style={{
                        backgroundColor: '#2A4D50',
                        paddingVertical: 20,
                        paddingHorizontal: 33,
                        borderRadius: 20,
                        width: 100
                    }}>
                    <Text style={{
                        color: 'white',
                        fontWeight: 'bold'
                    }}>
                        Next
                    </Text>
                </TouchableOpacity>
            </View>

            {/* <Text>hi</Text> */}


        </SafeAreaView>
    )
}

export default SelectNgo

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
    backIcon: {
        marginLeft: 10
    },
    titleTextContainer: {
        marginHorizontal: 183,
        width: 200
    },
    titleText: (color, top) => ({
        fontWeight: "500",
        fontSize: SIZES.xLarge,
        marginTop: top,
        color: color,
        marginLeft: -82,
    }),
    dropdownButtonStyle: {
        width: 200,
        height: 50,
        backgroundColor: '#E9ECEF',
        borderRadius: 12,
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        paddingHorizontal: 12,
    },
    dropdownButtonTxtStyle: {
        flex: 1,
        fontSize: 18,
        fontWeight: '500',
        color: '#151E26',
    },
    dropdownButtonArrowStyle: {
        fontSize: 28,
    },
    dropdownButtonIconStyle: {
        fontSize: 28,
        marginRight: 8,
    },
    dropdownMenuStyle: {
        backgroundColor: '#E9ECEF',
        borderRadius: 8,
    },
    dropdownItemStyle: {
        width: '100%',
        flexDirection: 'row',
        paddingHorizontal: 12,
        justifyContent: 'center',
        alignItems: 'center',
        paddingVertical: 8,
    },
    dropdownItemTxtStyle: {
        flex: 1,
        fontSize: 18,
        fontWeight: '500',
        color: '#151E26',
    },
    dropdownItemIconStyle: {
        fontSize: 28,
        marginRight: 8,
    },
})