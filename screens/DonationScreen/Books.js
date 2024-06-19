import { SafeAreaView, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native'
import React, { useState } from 'react'
import { ArrowLeftIcon } from 'react-native-heroicons/solid'
import { COLORS, SIZES } from '../../constants'
import { useNavigation } from '@react-navigation/native';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import ImagePickerButton from '../../components/ ImagePickerButton';

const Books = () => {
    const navigation = useNavigation();

    //qty
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

    //text Input
    const [bookDetail, setBookDetail] = useState('')

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
                        <Text style={styles.titleText(COLORS.primary, SIZES.xSmall - 5)}>Books Donation</Text>
                    </View>
                </View>
            </View>
            <View style={{ flex: 1, flexDirection: 'row', alignItems: 'center', marginTop: 50 }}>
                <View style={{ flex: 1, height: 1, backgroundColor: '#B4B4B8', width: '100%' }} />
            </View>

            <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                <Text style={{ fontSize: 18, fontWeight: '600', marginTop: 13, marginLeft: 19 }}>
                    Enter Book Details
                </Text>

            </View>
            {/* <View style={styles.containerThree}> */}
            <TextInput
                style={styles.textInput}
                multiline={true}
                placeholder="More Puzzle by Shakuntala Devi ...... Hindi Grammer Class-8th .."
                textAlignVertical="top"
                value={bookDetail} // Ensure `bookDetail` is properly initialized and updated
                onChangeText={setBookDetail} // Use a function to update `bookDetail`
            />
            {/* </View> */}
            <View>
                <Text style={{ fontSize: 18, fontWeight: '600', marginTop: 91, marginLeft: 19 }}>
                    Books Quantity
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
                    <Text style={styles.separatorText}>(Approx no. of Books)</Text>
                </View>

            </View>
            <View>
                <Text style={{ fontSize: 18, fontWeight: '600', marginTop: 13, marginLeft: 19 }}>
                    Upload Images
                </Text>
                <Text style={{ fontSize: 14, color: 'grey', marginTop: 13, marginLeft: 19 }}>
                    You may add individual photos of each book
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
                <TouchableOpacity onPress={() => {
                    navigation.navigate("SelectAddressBooks", {
                        booksData: {
                            selectedIcon,
                            bookDetail,
                            count,
                        },
                    })
                }}
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

export default Books

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

    containerThree: {
        flex: 1,
        paddingHorizontal: 20,
        paddingTop: 17,
    },
    textInput: {
        // flex: 1,
        paddingHorizontal: 20,
        paddingTop: 20,
        height: 70,
        width: '90%',
        marginHorizontal: 20,
        marginTop: 10,
        // Set the height to 300
        borderWidth: 1,
        borderColor: '#ccc',
        borderRadius: 10,
        // padding: 10,
        fontSize: 18,
        textAlignVertical: 'top', // Aligns text at the top vertically
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
        marginLeft: -58,
    }),
})

