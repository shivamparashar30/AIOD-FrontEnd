import { SafeAreaView, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React, { useState } from 'react'
import { ArrowLeftIcon } from 'react-native-heroicons/solid'
import { COLORS, SIZES } from '../../constants'
import { useNavigation } from '@react-navigation/native'
import MapView, { Marker, PROVIDER_GOOGLE } from 'react-native-maps';
import { FontAwesome5 } from '@expo/vector-icons';


const SelectLocMap = () => {
    const navigation = useNavigation();
    const [markerPosition, setMarkerPosition] = useState({
        latitude: 12.93536,
        longitude: 77.5347508,
        latitudeDelta: 2,
        longitudeDelta: 2
    });

    const handleMarkerDrag = (e) => {
        setMarkerPosition(e.nativeEvent.coordinate);
    };

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
            <View style={{
                height: 450,
                marginTop: 4,
                borderRadius: 10,
                // borderWidth: 1
            }}>
                <View style={{ flex: 1 }}>
                    <MapView
                        style={{ flex: 1, marginTop: 4, borderRadius: 10 }}
                        initialRegion={{
                            latitude: 12.93536,
                            longitude: 77.5347508,
                            latitudeDelta: 0.0922,
                            longitudeDelta: 0.0421,
                        }}
                        provider={PROVIDER_GOOGLE}
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

            </View>
            <View style={{ flexDirection: 'row' }}>
                <View style={{ marginTop: 17, marginHorizontal: 20 }}>
                    <FontAwesome5 name="map-pin" size={24} color="black" />
                </View>
                <View>
                    <Text style={{
                        fontSize: 20,
                        color: 'black',
                        fontWeight: 'bold',
                        marginTop: 20,
                        marginHorizontal: 0

                    }}>
                        PES University


                    </Text>
                </View>
                <View style={{
                    height: 20,
                    width: 80,
                    // borderWidth: 1,
                    borderRadius: 10,
                    // borderColor: 'grey',
                    marginHorizontal: 81,
                    marginTop: 24,
                    alignItems: 'center'

                }}>

                    <Text style={{
                        color: 'green',
                        fontWeight: 'bold'
                    }}>
                        Change
                    </Text>


                </View>
            </View>
            <View style={{ marginTop: 20 }}>
                <Text style={{
                    color: '#7D7C7C',
                    fontSize: 16,
                    marginHorizontal: 20
                }}>
                    Pes University, Dwaraka Nagar,BSK 3rd Stage,

                </Text>
                <Text style={{
                    color: '#7D7C7C',
                    fontSize: 16,
                    marginHorizontal: 27,
                    marginTop: 3
                }}>Bangalore, Karnataka, India - 560085</Text>
            </View>
            <TouchableOpacity onPress={() => { navigation.navigate("AddressDetails") }}>
                <View style={{
                    width: '80%',
                    height: 40,
                    borderRadius: 20,
                    backgroundColor: '#2A4D50',
                    position: "absolute",
                    marginTop: 30,
                    alignItems: 'center',
                    marginHorizontal: 40


                }}>
                    <Text style={{
                        textAlign: 'center',
                        fontSize: 18,
                        fontWeight: 'bold',
                        marginTop: 7,
                        color: 'white'
                    }}>Enter Complete Address</Text>

                </View>
            </TouchableOpacity>

        </SafeAreaView>
    )
}

export default SelectLocMap

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
})
