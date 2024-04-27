import { SafeAreaView, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';
import React, { useState } from 'react';
import { ArrowLeftIcon } from 'react-native-heroicons/solid';
import { COLORS, SIZES } from '../../constants';
import { useNavigation } from '@react-navigation/native';
import MapView, { Marker, PROVIDER_GOOGLE } from 'react-native-maps';
import { FontAwesome5 } from '@expo/vector-icons';
import { useRoute } from '@react-navigation/native';


const AddAddressDetails = () => {
    const route = useRoute();
    let type = {}; // Default value for type if not provided in route.params
    if (route.params && route.params.foodData) {
        type = route.params.foodData;
        console.log('====================================');
        console.log(type);
        console.log('====================================');
    }

    // const { Food } = route.params;

    // const { FoodData } = route.params;
    // Use FoodData to access the data from the Food screen
    // console.log('Food Data:', FoodData);
    const navigation = useNavigation();
    const [markerPosition, setMarkerPosition] = useState({
        latitude: 12.93536,
        longitude: 77.5347508,
    });
    const [locationName, setLocationName] = useState('PES University');
    const [locationAddress, setLocationAddress] = useState('Pes University, Dwaraka Nagar, BSK 3rd Stage,\nBangalore, Karnataka, India - 560085');

    const handleMarkerDrag = (e) => {
        const { latitude, longitude } = e.nativeEvent.coordinate;
        setMarkerPosition({ latitude, longitude });
        // Here you can update the location name and address based on the marker's position
        // For simplicity, let's set a dummy location name and address
        setLocationName('New Location');
        setLocationAddress('New Address, City, State, Country - Zipcode');
    };

    const [selectedSource, setSelectedSource] = useState('home');
    const [selectedType, setSelectedType] = useState('');

    const handleSourcePress = (source) => {
        setSelectedSource(source);
    };

    const handleTypePress = (type) => {
        setSelectedType(type);
    };


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
                        <Text style={styles.titleText(COLORS.primary, SIZES.xSmall - 5)}>Add Address Details </Text>
                    </View>
                </View>
            </View>
            {/* Divider */}
            <View style={{ flex: 1, flexDirection: 'row', alignItems: 'center', marginTop: 50 }}>
                <View style={{ flex: 1, height: 1, backgroundColor: '#B4B4B8', width: '100%' }} />
            </View>
            {/* MapView */}
            <View style={{ height: 180 }}>
                <MapView
                    style={{ flex: 1, marginTop: 0, borderRadius: 10 }}
                    initialRegion={{
                        latitude: 12.93536,
                        // latitude: 12.56104,

                        longitude: 77.5347508,
                        // longitude: 77.32246,


                        latitudeDelta: 0.0922,
                        longitudeDelta: 0.0421,
                    }}
                    // provider={PROVIDER_GOOGLE}
                    provider={MapView.PROVIDER_GOOGLE}
                    showsUserLocation
                    showsMyLocationButton
                >
                    <Marker
                        draggable
                        coordinate={markerPosition}
                        title="Draggable Marker"
                        description="Drag and drop to set location"
                        onDragEnd={(e) => handleMarkerDrag(e)}
                    />
                </MapView>
            </View>
            {/* Location Details */}
            <View style={{ borderRadius: 12, margin: 6, height: 110, marginTop: 5, backgroundColor: '#135D66' }}>
                <View style={{ flexDirection: 'row' }}>
                    <View style={{ marginTop: 17, marginHorizontal: 20 }}>
                        <FontAwesome5 name="map-pin" size={24} color="black" />
                    </View>
                    <View>
                        <Text style={styles.locationName}>{locationName}</Text>
                    </View>
                    <View style={styles.changeButton}>
                        <TouchableOpacity onPress={() => alert("Feature will be implemented in Real Time Maps!")}>
                            <Text style={styles.changeButtonText}>Change</Text>
                        </TouchableOpacity>
                    </View>
                </View>
                <View style={{ marginTop: 10 }}>
                    <Text style={styles.locationAddress}>{locationAddress}</Text>
                </View>
            </View>

            {/* TextInput Fields */}
            <TextInput style={styles.textInputt} value="PES University"
            />
            <TextInput style={styles.textInputt} value="Pes University, Dwaraka Nagar, BSK 3rd Stage"
            />
            <TextInput style={styles.textInputt} value="Bangalore, Karnataka, India" />
            <TextInput style={styles.textInputt} value="560085" />
            <TextInput style={styles.textInputt} value="+91 8112270790" />


            <Text style={{
                fontSize: 16,
                fontWeight: '500',
                marginHorizontal: 15,
                marginTop: 10
            }}>Save this address as</Text>
            <View style={styles.containerTwo}>
                <TouchableOpacity
                    style={[styles.tab, selectedSource === 'home' ? styles.selectedTab : null]}
                    onPress={() => handleSourcePress('home')}>
                    <Text style={[styles.tabText, selectedSource === 'home' ? styles.selectedTabText : null]}>Home</Text>
                </TouchableOpacity>
                <TouchableOpacity
                    style={[styles.tab, selectedSource === 'Office' ? styles.selectedTab : null]}
                    onPress={() => handleSourcePress('Office')}>
                    <Text style={[styles.tabText, selectedSource === 'Office' ? styles.selectedTabText : null]}>Office</Text>
                </TouchableOpacity>
                <TouchableOpacity
                    style={[styles.tab, selectedSource === 'Friend' ? styles.selectedTab : null]}
                    onPress={() => handleSourcePress('Friend')}>
                    <Text style={[styles.tabText, selectedSource === 'Friend' ? styles.selectedTabText : null]}>Friend </Text>
                </TouchableOpacity>
                <TouchableOpacity
                    style={[styles.tab, selectedSource === 'others' ? styles.selectedTab : null]}
                    onPress={() => handleSourcePress('others')}>
                    <Text style={[styles.tabText, selectedSource === 'others' ? styles.selectedTabText : null]}>Others</Text>
                </TouchableOpacity>
            </View>
            <TouchableOpacity onPress={() => { navigation.navigate("SelectNgo", { AddAddressDetails }) }}>
                <View style={{
                    width: '26%',
                    height: 26,
                    borderRadius: 8,
                    backgroundColor: '#2A4D50',
                    position: "absolute",
                    marginTop: 3,
                    alignItems: 'center',
                    // justifyContent: 'center',
                    marginHorizontal: 269,



                }}>
                    <Text style={{
                        textAlign: 'center',
                        fontSize: 18,
                        // fontWeight: 'bold',
                        marginTop: 3,
                        color: 'white'
                    }}>Pickup</Text>

                </View>
            </TouchableOpacity>
        </SafeAreaView>
    );
};

export default AddAddressDetails;

const styles = StyleSheet.create({
    containerTwo: {
        flexDirection: 'row',
        // justifyContent: 'space-between',
        paddingHorizontal: 6,
        marginTop: 1,

    },
    tab: {
        // flex: 1,
        height: 30,
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
    textInputt: {

        height: 40,
        width: 350,
        borderWidth: 1,
        borderColor: '#CCCCCC',
        borderRadius: 20,
        paddingHorizontal: 20,
        // margin: 6, // Added margin for spacing
        marginHorizontal: 15,
        marginTop: 10

    },
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
    locationName: {
        fontSize: 20,
        color: 'black',
        fontWeight: 'bold',
        marginTop: 20,
        marginHorizontal: 0
    },
    changeButton: {
        height: 20,
        width: 80,
        borderRadius: 10,
        marginHorizontal: 81,
        marginTop: 24,
        alignItems: 'center'
    },
    changeButtonText: {
        color: '#2A4D50',
        fontWeight: 'bold'
    },
    locationAddress: {
        color: 'white',
        fontSize: 16,
        marginHorizontal: 20
    },
    inputField: {
        margin: 6,
        height: 40,
        backgroundColor: '#F2F2F2',
        borderRadius: 8,
        paddingHorizontal: 10,
    },
});



