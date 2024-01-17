import React from 'react';
import { Image, ImageBackground, Platform, ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
// import { LinearGradient } from "react-native-linear-gradient"


export default function Cards({ title, desc }) {
    return (
        <TouchableOpacity>
            <View style={styles.card}>
                <ImageBackground source={require('../assets/images/donate1.jpeg')} imageStyle={styles.image} >
                    <View style={styles.bottomContainer}>
                        <Text style={styles.containerText}>{title}</Text>
                        <Text style={styles.containerText}>{desc}</Text>
                    </View>
                </ImageBackground >
            </View >
        </TouchableOpacity>
    );
}


const styles = StyleSheet.create({
    card: {
        backgroundColor: "white",
        borderRadius: 16,
        width: 150,
        height: 200,
        marginTop: 10,
        marginEnd: 10,
        marginStart: 5,
        ...Platform.select({
            ios: {
                shadowOffset: { width: 2, height: 2 },
                shadowColor: "#d3d3d3",
                shadowCapacity: 0.3,
                shadowRadius: 4,
                elevation: 10
            },
            android: {
                elevation: 10,
            }
        })

    },
    bottomContainer: {
        marginTop: 165,
        marginStart: 5
    },
    containerText: {
        color: "white",
        fontSize: 13,
    },
    linearGradient: {
        flex: 1,
        paddingLeft: 15,
        paddingRight: 15,
        borderRadius: 5
    },
    nameContainer: {
        flexDirection: "row",
        justifyContent: "space-between",
        marginBottom: 32,
    },
    name: {
        fontSize: 30,
        fontWeight: "bold",
    },
    hp: {
        fontSize: 22,
    },
    image: {
        width: "100%",
        height: 200,
        marginBottom: 16,
        borderRadius: 15,
    },
    typeContainer: {
        alignItems: "center",
        marginBottom: 40
    },
    badge: {
        flexDirection: "row",
        alignItems: "center",
        paddingVertical: 6,
        paddingHorizontal: 12,
        borderRadius: 20,
        borderWidth: 4
    },
    typeEmoji: {
        fontSize: 30,
        marginRight: 12,
    },
    typeText: {
        fontSize: 22,
        fontWeight: "bold",

    },
    movesContainer: {
        marginBottom: 60,
    },
    movesText: {
        fontSize: 22,
        fontWeight: "bold",
    },
    weaknessesConatiner: {
        marginBottom: 8
    },
    weaknessesText: {
        fontSize: 22,
        fontWeight: "bold",
    },

});