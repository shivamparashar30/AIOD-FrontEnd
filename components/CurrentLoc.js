// import React, { useState } from 'react';
// import { StyleSheet, Text, View, TouchableOpacity } from 'react-native';
// import MapView from 'react-native-maps';
// import { point } from '@turf/helpers';
// import destination from '@turf/destination';
// import * as Location from 'expo-location';
// import { useNavigation } from '@react-navigation/native'

// // import { Navigate } from 'react-router-dom';
// // import { ArrowLeftIcon } from 'react-native-heroicons/solid';
// // import { SafeAreaView } from 'react-native-safe-area-context';
// // const navigation = useNavigation();


// export default class CurrentLoc extends React.Component {

//     navigation = useNavigation

//     constructor(props) {
//         super(props);
//         this.state = {
//             elements: [],
//             south: null,
//             west: null,
//             north: null,
//             east: null,
//             latitude: 12.93536,
//             longitude: 77.5347508,
//         };
//         this.navigation = useNavigation();
//     }

//     updateState(location) {
//         this.setState({
//             ...this.state,
//             latitude: location.coords.latitude,
//             longitude: location.coords.longitude,
//         });
//     }

//     async componentDidMount() {
//         try {
//             let { status } = await Location.requestPermissionsAsync();
//             if (status !== 'granted') {
//                 return;
//             }
//             let location = await Location.getCurrentPositionAsync({});
//             this.updateState(location);
//         } catch (error) {
//             console.log(error);
//         }
//     }

//     onRegionChangeComplete = (region) => {
//         const center = point([region.longitude, region.latitude]);
//         const verticalMeter = (111 * region.latitudeDelta) / 2;
//         const horizontalMeter = (111 * region.longitudeDelta) / 2;
//         const options = { units: 'kilometers' };
//         const south = destination(center, verticalMeter, 180, options);
//         const west = destination(center, horizontalMeter, -90, options);
//         const north = destination(center, verticalMeter, 0, options);
//         const east = destination(center, horizontalMeter, 90, options);
//         this.setState({
//             south: south.geometry.coordinates[1],
//             west: west.geometry.coordinates[0],
//             north: north.geometry.coordinates[1],
//             east: east.geometry.coordinates[0],
//         });
//     };

//     render() {

//         return (
//             // <SafeAreaView>
//             <View style={styles.container}>
//                 <View className="flex-row justify-start">
//                     <TouchableOpacity
//                         onPress={() => this.props.navigation.navigate.goBack()}
//                         className="bg-yellow-400 p-2 rounded-tr-2xl rounded-bl-2xl ml-4"
//                     >
//                         <ArrowLeftIcon size="20" color="black" />
//                     </TouchableOpacity>
//                 </View>
//                 <MapView
//                     onRegionChangeComplete={this.onRegionChangeComplete}
//                     style={styles.mapView}
//                     showsUserLocation
//                     initialRegion={{
//                         latitude: this.state.latitude,
//                         longitude: this.state.longitude,
//                         latitudeDelta: 0.02,
//                         longitudeDelta: 0.02,
//                     }}>
//                     {this.state.elements.map((element) => {
//                         return (
//                             <MapView.Marker
//                                 coordinate={{
//                                     latitude: location.coords.latitude,
//                                     longitude: location.coords.longitude,
//                                 }}
//                                 title={title}
//                                 key={'id_' + element.id}
//                             />
//                         );
//                     })}
//                 </MapView>

//             </View>
//             // </SafeAreaView>
//         );
//     }
// }

// const styles = StyleSheet.create({
//     container: {
//         flex: 1,
//         backgroundColor: '#fff',
//         alignItems: 'center',
//         justifyContent: 'flex-end',
//     },

//     mapView: {
//         ...StyleSheet.absoluteFillObject,
//     },

//     buttonContainer: {
//         flexDirection: 'row',
//         marginVertical: 20,
//         backgroundColor: 'transparent',
//         alignItems: 'center',
//     },

//     button: {
//         width: 150,
//         alignItems: 'center',
//         justifyContent: 'center',
//         backgroundColor: 'rgba(255,235,255,0.7)',
//         paddingHorizontal: 18,
//         paddingVertical: 12,
//         borderRadius: 20,
//     },

//     buttonItem: {
//         textAlign: 'center',
//     },
// });
import React, { useState, useEffect } from 'react';
import { StyleSheet, View, TouchableOpacity } from 'react-native';
import MapView, { Marker } from 'react-native-maps';
import { point } from '@turf/helpers';
import destination from '@turf/destination';
import * as Location from 'expo-location';
import { useNavigation } from '@react-navigation/native';
import { SafeAreaView } from 'react-native-safe-area-context';
// import { ArrowLeftIcon } from 'react-native-heroicons/solid'
import Ionicons from '@expo/vector-icons/Ionicons'


export default function CurrentLoc() {
    const navigation = useNavigation();

    const [elements, setElements] = useState([]);
    const [south, setSouth] = useState(null);
    const [west, setWest] = useState(null);
    const [north, setNorth] = useState(null);
    const [east, setEast] = useState(null);
    const [location, setLocation] = useState({
        latitude: 12.93536,
        longitude: 77.5347508,
    });

    const updateState = (coords) => {
        setLocation({
            ...location,
            latitude: coords.latitude,
            longitude: coords.longitude,
        });
    };

    const fetchLocation = async () => {
        try {
            let { status } = await Location.requestForegroundPermissionsAsync();
            if (status !== 'granted') {
                return;
            }
            let currentLocation = await Location.getCurrentPositionAsync({});
            updateState(currentLocation.coords);
        } catch (error) {
            console.log(error);
        }
    };

    useEffect(() => {
        fetchLocation();
    }, []);

    const onRegionChangeComplete = (region) => {
        const center = point([region.longitude, region.latitude]);
        const verticalMeter = (111 * region.latitudeDelta) / 2;
        const horizontalMeter = (111 * region.longitudeDelta) / 2;
        const options = { units: 'kilometers' };
        const south = destination(center, verticalMeter, 180, options);
        const west = destination(center, horizontalMeter, -90, options);
        const north = destination(center, verticalMeter, 0, options);
        const east = destination(center, horizontalMeter, 90, options);

        setSouth(south.geometry.coordinates[1]);
        setWest(west.geometry.coordinates[0]);
        setNorth(north.geometry.coordinates[1]);
        setEast(east.geometry.coordinates[0]);
    };

    return (
        <View className="flex-1 bg-white" >
            <SafeAreaView style={styles.container}>
                <MapView
                    onRegionChangeComplete={onRegionChangeComplete}
                    style={styles.mapView}
                    showsUserLocation
                    initialRegion={{
                        latitude: location.latitude,
                        longitude: location.longitude,
                        latitudeDelta: 0.02,
                        longitudeDelta: 0.02,
                    }}
                >

                    <View className="flex-row justify-start">
                        <TouchableOpacity
                            onPress={() => navigation.goBack()}
                            className="bg-indigo-500 p-3 rounded-tr-2xl rounded-bl-2xl mx-5 my-10"
                            style={styles.goback}
                        >
                            <Ionicons name="arrow-back-outline" size={20} color={"white"} style={styles.icons} />
                        </TouchableOpacity>
                    </View>
                    {elements.map((element) => (
                        <Marker
                            coordinate={{
                                latitude: location.latitude,
                                longitude: location.longitude,
                            }}
                            title={element.title}
                            key={'id_' + element.id}
                        />
                    ))}
                </MapView>
            </SafeAreaView>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'flex-end',
    },
    goback: {
        padding: 10,
        // marginTop: 10,
    },
    mapView: {
        ...StyleSheet.absoluteFillObject,
    },
    buttonContainer: {
        flexDirection: 'row',
        marginVertical: 20,
        backgroundColor: 'transparent',
        alignItems: 'center',
    },

    button: {
        width: 150,
        alignItems: 'center',
        // justifyContent: 'center',
        backgroundColor: 'rgba(255,235,255,0.7)',
        paddingHorizontal: 18,
        paddingVertical: 12,
        borderRadius: 20,
    },

    buttonItem: {
        textAlign: 'center',
    },
});
