import { SafeAreaView, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React from 'react'
import SelectNgoDropdown from './SelectNgoDropdown'
import { useNavigation, useRoute } from '@react-navigation/native';

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

const styles = StyleSheet.create({})