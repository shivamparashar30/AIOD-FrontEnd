// import { Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
// import React from 'react'

// const Category = (props) => {
//     return (

//         <View style={{ height: 140, backgroundColor: "#2A4D50", width: 140, marginLeft: 20, borderWidth: 0.5, borderRadius: 10 }}>
//             <View style={{ flex: 2, padding: 10 }}>
//                 <Image
//                     style={{ flex: 1, borderRadius: 10, width: null, height: null, resizeMode: 'cover' }}
//                     source={props.imgUri} />
//             </View>
//             <View style={{ flex: 1, flexDirection: 'row' }}>
//                 <View>
//                     <Text style={{ flex: 1, color: 'white', fontSize: 12, fontWeight: '600', paddingHorizontal: 10 }}>
//                         {props.name}
//                     </Text>
//                 </View>
//             </View>
//         </View>

//     )
// }

// export default Category

// const styles = StyleSheet.create({})


import AsyncStorage from '@react-native-async-storage/async-storage';
import { useNavigation } from '@react-navigation/native';
import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { Image, StyleSheet, Text, View, FlatList } from 'react-native';
import constant from '../constant';

const Category = ({ data }) => {
    const navigation = useNavigation();
    const [token, setToken] = useState("")
    const [userList, setUserList] = useState([])

    const getToken = async () => {
        try {
            const token = await AsyncStorage.getItem("userdata")
            console.log(token);

            if (token === null) {
                navigation.navigate('Welcome');
                return;
            }
            const response = JSON.parse(token);
            setToken(response[0]);
            getData(response[0]);
        } catch (error) {
            console.log("Category: " + error);
        }
    };

    const getData = (token) => {
        axios({
            method: 'get',
            url: constant.BASE_URL + '/auth/users',
            headers: { 'Authorization': token }
        }).then((apiResponse) => {
            console.log(apiResponse.data.data);
            setUserList(getNgos(apiResponse.data.data))

        }).catch((err) => {
            console.log("Categoryy" + err);
        })

    }
    useEffect(() => {
        getToken()
    }, []);

    function getNgos(data) {
        const filteredUser = data.filter((user) => {
            return user.role === "ngo";
        });
        return filteredUser;
    }

    const ItemLayout = ({ item }) => (
        <View style={styles.categoryContainer}>
            <Image
                style={styles.categoryImage}
                source={{ uri: item.ImageUrl }}
            />
            <Text style={styles.categoryName}>{item.name}</Text>
        </View>
    );

    return (

        <FlatList
            style={{ padding: 10 }}
            horizontal
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={styles.flatListContainer}
            data={userList}
            keyExtractor={(item) => item.id}
            renderItem={({ item }) => <ItemLayout item={item} />}
        />
    );
};

const styles = StyleSheet.create({
    flatListContainer: {
        paddingHorizontal: 10,
        marginTop: -10
    },
    categoryContainer: {
        height: 140,
        backgroundColor: "#2A4D50",
        width: 140,
        marginLeft: 10,
        borderWidth: 0.5,
        borderRadius: 10,
        padding: 10,
    },
    categoryImage: {
        flex: 1,
        borderRadius: 10,
        width: null,
        height: null,
        resizeMode: 'cover',
    },
    categoryName: {
        color: 'white',
        fontSize: 15,
        fontWeight: '700',
        marginTop: 5,
    },
});

export default Category;
