import { SafeAreaView, ScrollView, StyleSheet, Text, TextInput, TouchableOpacity, View, Alert } from 'react-native'
import React, { useState } from 'react'
import { ArrowLeftIcon } from 'react-native-heroicons/solid'
import { COLORS, SIZES } from '../../constants'
import { useNavigation } from '@react-navigation/native';
import { MaterialCommunityIcons } from '@expo/vector-icons';


const Food = () => {
    const navigation = useNavigation();

    const [selectedSource, setSelectedSource] = useState('home');
    const [selectedType, setSelectedType] = useState('');

    const handleSourcePress = (source) => {
        setSelectedSource(source);
    };

    const handleTypePress = (type) => {
        setSelectedType(type);
    };

    // food qt

    const [count, setCount] = useState(1); // Ensure count starts from 1

    const decrement = () => {
        if (count > 1) { // Ensure count doesn't go below 1
            setCount(count - 1);
        }
    };

    const increment = () => {
        setCount(count + 1);
    };

    //Types pf vehicle 
    const [selectedIcon, setSelectedIcon] = useState(null);

    // condition for next
    const handleNextPress = () => {
        if (!selectedSource || !selectedType || !selectedIcon) {
            Alert.alert('Incomplete Information', 'Please fill in all required fields.');
        } else {
            navigation.navigate('Address', {
                foodData: {
                    selectedSource,
                    selectedType,
                    selectedIcon,
                    foodItems,
                    count,
                },
            });
        }
    };
    //text input

    const [foodItems, setFoodItems] = useState("");

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
                        <Text style={styles.titleText(COLORS.primary, SIZES.xSmall - 5)}>Food Donation</Text>
                    </View>
                </View>
            </View>

            <View style={{ flex: 1, flexDirection: 'row', alignItems: 'center', marginTop: 50 }}>
                <View style={{ flex: 1, height: 1, backgroundColor: '#B4B4B8', width: '100%' }} />
            </View>
            <View>
                <Text style={{ fontSize: 18, fontWeight: '600', marginTop: 21, marginLeft: 19 }}>
                    Select Source of Food
                </Text>
                <View style={styles.containerTwo}>
                    <TouchableOpacity
                        style={[styles.tab, selectedSource === 'home' ? styles.selectedTab : null]}
                        onPress={() => handleSourcePress('home')}>
                        <Text style={[styles.tabText, selectedSource === 'home' ? styles.selectedTabText : null]}>Home</Text>
                    </TouchableOpacity>
                    <TouchableOpacity
                        style={[styles.tab, selectedSource === 'restaurant' ? styles.selectedTab : null]}
                        onPress={() => handleSourcePress('restaurant')}>
                        <Text style={[styles.tabText, selectedSource === 'restaurant' ? styles.selectedTabText : null]}>Restaurant</Text>
                    </TouchableOpacity>
                    <TouchableOpacity
                        style={[styles.tab, selectedSource === 'events' ? styles.selectedTab : null]}
                        onPress={() => handleSourcePress('events')}>
                        <Text style={[styles.tabText, selectedSource === 'events' ? styles.selectedTabText : null]}>Events</Text>
                    </TouchableOpacity>
                    <TouchableOpacity
                        style={[styles.tab, selectedSource === 'others' ? styles.selectedTab : null]}
                        onPress={() => handleSourcePress('others')}>
                        <Text style={[styles.tabText, selectedSource === 'others' ? styles.selectedTabText : null]}>Others</Text>
                    </TouchableOpacity>
                </View>
            </View>
            <View>
                <Text style={{ fontSize: 18, fontWeight: '600', marginTop: 21, marginLeft: 19 }}>
                    Select Type of Food
                </Text>
                <View style={styles.containerTwo}>
                    <TouchableOpacity
                        style={[styles.tab, selectedType === 'veg' ? styles.selectedTab : null]}
                        onPress={() => handleTypePress('veg')}>
                        <Text style={[styles.tabText, selectedType === 'veg' ? styles.selectedTabText : null]}>Veg</Text>
                    </TouchableOpacity>
                    <TouchableOpacity
                        style={[styles.tab, selectedType === 'non-veg' ? styles.selectedTab : null]}
                        onPress={() => handleTypePress('non-veg')}>
                        <Text style={[styles.tabText, selectedType === 'non-veg' ? styles.selectedTabText : null]}>Non-Veg</Text>
                    </TouchableOpacity>
                    <TouchableOpacity
                        style={[styles.tab, selectedType === 'both' ? styles.selectedTab : null]}
                        onPress={() => handleTypePress('both')}>
                        <Text style={[styles.tabText, selectedType === 'both' ? styles.selectedTabText : null]}>Veg & Non-Veg</Text>
                    </TouchableOpacity>
                </View>
            </View>
            <View>
                <Text style={{ fontSize: 18, fontWeight: '600', marginTop: 21, marginLeft: 19 }}>
                    Food Items
                </Text>
            </View>
            <View style={styles.containerThree}>
                <TextInput
                    style={styles.textInput}
                    multiline={true}
                    placeholder="1. Chapati - 12 ..."
                    textAlignVertical="top"
                    value={foodItems}
                    onChangeText={setFoodItems}
                    editable={true} // Ensure the TextInput is editable
                />
            </View>
            <View>
                <Text style={{ fontSize: 18, fontWeight: '600', marginTop: 91, marginLeft: 19 }}>
                    Food Quantity
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
                <View style={styles.separator}>
                    <Text style={styles.separatorText}>(Approx no. of persons)</Text>
                </View>

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
                <TouchableOpacity onPress={handleNextPress}
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


        </SafeAreaView>
    )
}

export default Food

const styles = StyleSheet.create({

    container: {
        flex: 1,
        backgroundColor: 'white',
        // alignItems: 'center'
    },
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
    separator: {
        // backgroundColor: '#E0E0E0',
        // height: 1,
        flex: 1,
        marginHorizontal: 10
    },
    separatorText: {
        fontSize: 14,
        color: '#808080'
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
        marginLeft: -51,
    }),


})

