import { Alert, Button, Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React, { useState } from 'react'
import { launchCameraAsync, useCameraPermissions, PermissionStatus } from 'expo-image-picker'
import { MaterialCommunityIcons } from '@expo/vector-icons';

function ImagePickerButton() {
    const [pickedImage, setPickedImage] = useState();
    const [cameraPermissionInformation, requestPermission] = useCameraPermissions()

    async function verifyPermissions() {
        if (cameraPermissionInformation.status === PermissionStatus.UNDETERMINED) {
            const permissionResponse = await requestPermission();
            return permissionResponse.granted;
        }
        if (cameraPermissionInformation.status = PermissionStatus.DENIED) {
            Alert.alert(
                'Insufficient Permission',
                'You need to grant camera permission to use this app');
            return false;
        }
        return true;
    }

    async function takeImageHandler() {
        const hasPermission = await verifyPermissions();

        if (!hasPermission) {
            return;
        }

        const image = await launchCameraAsync({
            allowsEditing: true,
            aspect: [16, 9],
            quality: 0.5,

        });
        setPickedImage(image.uri);
    }

    let imagePreview = <Text style={{ color: "white", fontWeight: 500 }}>No Image</Text>;
    if (pickedImage) {
        imagePreview = <Image style={styles.image} source={{ uri: pickedImage }} />
    }

    return (
        <View style={{ flexDirection: 'row', marginRight: 210 }}>
            <View style={styles.imagePreview}>
                {imagePreview}
            </View>
            <View style={{ height: 50, width: 50, }}>
                <TouchableOpacity style={{ height: 40, width: 40, alignItems: 'center', justifyContent: 'center', backgroundColor: '#2A4D50', borderRadius: 30, marginTop: 33, }}
                    onPress={takeImageHandler}
                >
                    <MaterialCommunityIcons name='camera' size={20} color='white' />
                </TouchableOpacity>
            </View>
        </View>
    )
}

export default ImagePickerButton

const styles = StyleSheet.create({
    imagePreview: {
        width: '50%',
        height: 60,
        marginVertical: 19,
        marginRight: 10,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#2A4D50',
        borderRadius: 4
    },
    image: {
        height: 100,
        width: '20%',
        justifyContent: 'center',
        alignItems: 'center'
    },
})