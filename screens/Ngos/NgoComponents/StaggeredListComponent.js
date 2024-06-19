// import { StyleSheet, Text, View } from 'react-native'
// import React from 'react'

// const StaggeredListComponent = () => {
//     return (
//         <View>
//             <Text>staggeredList</Text>
//         </View>
//     )
// }

// export default StaggeredListComponent

// const styles = StyleSheet.create({})
import React from 'react';
import { FlatList, View, Text, StyleSheet } from 'react-native';


const DATA = [
    { id: '1', title: 'Money Donation', description: '250+', backgroundColor: '#FF6347' },
    { id: '2', title: 'Food Donation', description: '500+', backgroundColor: '#00CED1' },
    { id: '3', title: 'Clothes Donation', description: '99+', backgroundColor: '#FFA07A' },
    { id: '4', title: 'Books Donation', description: '400+', backgroundColor: '#20B2AA' },
    { id: '5', title: 'Monthly Reach', description: '1000+', backgroundColor: '#4682B4' },
    { id: '6', title: 'Weekly Reach', description: '300+', backgroundColor: '#9370DB' },
];

const Item = ({ title, description, backgroundColor }) => (
    <View style={[styles.item, { backgroundColor }]}>
        <Text style={styles.title}>{title}</Text>
        <Text style={styles.description}>{description}</Text>
    </View>
);

const StaggeredListComponent = () => {
    const renderItem = ({ item }) => (
        <Item title={item.title} description={item.description} backgroundColor={item.backgroundColor} />
    );

    return (
        <FlatList
            data={DATA}
            renderItem={renderItem}
            keyExtractor={item => item.id}
            numColumns={2}
        />
    );
};

const styles = StyleSheet.create({
    item: {
        flex: 1,
        margin: 10,
        height: 200,
        width: '40%',
        // justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 10,
    },
    title: {
        fontSize: 28,
        fontWeight: 'bold',
        color: 'white',
    },
    description: {
        fontSize: 24,
        marginTop: 10,
        fontWeight: 'bold',
        color: 'black',
    },
});

export default StaggeredListComponent;
