import { Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React from 'react'

const Category = (props) => {
    return (

        <View style={{ height: 140, backgroundColor: "#2A4D50", width: 140, marginLeft: 20, borderWidth: 0.5, borderRadius: 10 }}>
            <View style={{ flex: 2, padding: 10 }}>
                <Image
                    style={{ flex: 1, borderRadius: 10, width: null, height: null, resizeMode: 'cover' }}
                    source={props.imgUri} />
            </View>
            <View style={{ flex: 1, flexDirection: 'row' }}>
                <View>
                    <Text style={{ flex: 1, color: 'white', fontSize: 12, fontWeight: '600', paddingHorizontal: 10 }}>
                        {props.name}
                    </Text>
                </View>
            </View>
        </View>

    )
}

export default Category

const styles = StyleSheet.create({})
