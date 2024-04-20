import { SafeAreaView, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native'
import React, { useState } from 'react'
import { ArrowLeftIcon } from 'react-native-heroicons/solid'
import { COLORS, SIZES } from '../../constants'
import { useNavigation } from '@react-navigation/native';
import ImagePickerButton from '../../components/ ImagePickerButton';
import { MaterialCommunityIcons } from '@expo/vector-icons';


const Clothes = () => {
    const navigation = useNavigation();

    //Dress for

    const [selectedSource, setSelectedSource] = useState('home');
    const [selectedType, setSelectedType] = useState('');

    const handleSourcePress = (source) => {
        setSelectedSource(source);
    };

    const handleTypePress = (type) => {
        setSelectedType(type);
    };

    //Quantity
    const [count, setCount] = useState(1); // Ensure count starts from 1

    const decrement = () => {
        if (count > 1) { // Ensure count doesn't go below 1
            setCount(count - 1);
        }
    };

    const increment = () => {
        setCount(count + 1);
    };

    //types of vehicle
    const [selectedIcon, setSelectedIcon] = useState(null);

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
                        <Text style={styles.titleText(COLORS.primary, SIZES.xSmall - 5)}>Clothes Donation</Text>
                    </View>
                </View>
            </View>
            <View style={{ flex: 1, flexDirection: 'row', alignItems: 'center', marginTop: 50 }}>
                <View style={{ flex: 1, height: 1, backgroundColor: '#B4B4B8', width: '100%' }} />
            </View>

            <View>
                <Text style={{ fontSize: 18, fontWeight: '600', marginTop: 21, marginLeft: 19 }}>
                    Dress For
                </Text>
            </View>

            <View style={styles.containerTwo}>
                <TouchableOpacity
                    style={[styles.tab, selectedSource === 'Men' ? styles.selectedTab : null]}
                    onPress={() => handleSourcePress('Men')}>
                    <Text style={[styles.tabText, selectedSource === 'Men' ? styles.selectedTabText : null]}>Men</Text>
                </TouchableOpacity>
                <TouchableOpacity
                    style={[styles.tab, selectedSource === 'Women' ? styles.selectedTab : null]}
                    onPress={() => handleSourcePress('Women')}>
                    <Text style={[styles.tabText, selectedSource === 'Women' ? styles.selectedTabText : null]}>Women</Text>
                </TouchableOpacity>
                <TouchableOpacity
                    style={[styles.tab, selectedSource === 'Children' ? styles.selectedTab : null]}
                    onPress={() => handleSourcePress('Children')}>
                    <Text style={[styles.tabText, selectedSource === 'Children' ? styles.selectedTabText : null]}>Childrens</Text>
                </TouchableOpacity>
                <TouchableOpacity
                    style={[styles.tab, selectedSource === 'All' ? styles.selectedTab : null]}
                    onPress={() => handleSourcePress('All')}>
                    <Text style={[styles.tabText, selectedSource === 'All' ? styles.selectedTabText : null]}>All</Text>
                </TouchableOpacity>
            </View>
            <View>
                <Text style={{ fontSize: 18, fontWeight: '600', marginTop: 13, marginLeft: 19 }}>
                    Total Quantity
                </Text>
            </View>
            <View style={styles.containerQty}>
                <TouchableOpacity style={styles.button} onPress={decrement}>
                    <Text style={styles.buttonText}>-</Text>
                </TouchableOpacity>
                <View>
                    <Text style={styles.counterText}>{count}</Text>
                </View>
                <TouchableOpacity style={styles.button} onPress={increment}>
                    <Text style={styles.buttonText}>+</Text>
                </TouchableOpacity>
                {/* Light grey line with text */}


            </View>
            <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                <Text style={{ fontSize: 18, fontWeight: '600', marginTop: 13, marginLeft: 19 }}>
                    Description
                </Text>
                <Text style={{ color: 'gray', marginTop: 15, marginHorizontal: 7 }}>(Optional)</Text>
            </View>
            <View style={styles.containerThree}>
                <TextInput
                    style={styles.textInput}
                    multiline={true}
                    placeholder=" 4 - Tshirts (Size-XL) ..."
                    textAlignVertical="top"
                />
            </View>
            <View>
                <Text style={{ fontSize: 18, fontWeight: '600', marginTop: 83, marginLeft: 19 }}>
                    Upload Images
                </Text>
                <Text style={{ fontSize: 14, color: 'grey', marginTop: 13, marginLeft: 19 }}>
                    You may add individual photos of each cloth
                    or including all in a clearly visible single photo.
                </Text>
            </View>
            <View style={{ justifyContent: 'center', alignItems: 'center' }}>
                <ImagePickerButton />
            </View>
            <View>
                <Text style={{ fontSize: 18, fontWeight: '600', marginTop: 10, marginLeft: 19 }}>
                    Types of Vehicle needed
                </Text>
            </View>
            <View style={styles.containerVehicle}>
                <TouchableOpacity
                    style={[
                        styles.iconContainer,
                        selectedIcon === 'truck' && styles.selectedIconContainer,
                    ]}
                    onPress={() => setSelectedIcon('truck')}
                >
                    <MaterialCommunityIcons
                        name="truck-delivery-outline"
                        size={20}
                        color={selectedIcon === 'truck' ? 'white' : 'black'}
                    />
                </TouchableOpacity>
                <TouchableOpacity
                    style={[
                        styles.iconContainer,
                        selectedIcon === 'bike' && styles.selectedIconContainer,
                    ]}
                    onPress={() => setSelectedIcon('bike')}
                >
                    <MaterialCommunityIcons
                        name="bike-fast"
                        size={20}
                        color={selectedIcon === 'bike' ? 'white' : 'black'}
                    />
                </TouchableOpacity>

                <Text style={styles.infoText}>(Select based on qty.)</Text>
            </View>
            <View style={{ marginHorizontal: 270, marginTop: 20 }}>
                <TouchableOpacity onPress={() => { navigation.navigate("FoodSecond") }}
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
        </SafeAreaView >
    )
}

export default Clothes

const styles = StyleSheet.create({

    containerVehicle: {
        flexDirection: 'row',
        alignItems: 'center',
        marginHorizontal: 10
    },
    iconContainer: {
        padding: 10,
        width: 70,
        alignItems: 'center',
        borderRadius: 10,
        borderWidth: 1,
        borderColor: 'black',
        marginHorizontal: 6,
        marginTop: 15
    },
    selectedIconContainer: {
        backgroundColor: '#2A4D50',
    },
    divider: {
        width: 1,
        height: '100%',
        backgroundColor: 'gray',
        marginHorizontal: 10,
    },
    infoText: {
        color: 'gray',
    },

    containerThree: {
        flex: 1,
        paddingHorizontal: 20,
        paddingTop: 17,
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

    containerQty: {
        flexDirection: 'row',
        alignItems: 'center',
        margin: 10,
        marginHorizontal: 20
    },
    button: {
        backgroundColor: '#2A4D50',
        padding: 10,
        borderRadius: 20,
    },
    buttonText: {
        color: 'white',
        fontSize: 20,
        fontWeight: 'bold',
    },
    counterText: {
        fontSize: 20,
        fontWeight: 'bold',
        marginHorizontal: 20
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
        marginLeft: 7,
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
        marginHorizontal: 140
        // alignItems: 'center'
    },
    titleText: (color, top) => ({
        fontWeight: "500",
        fontSize: SIZES.xLarge,
        marginTop: top,
        color: color,
        marginLeft: -73,
    }),
})





