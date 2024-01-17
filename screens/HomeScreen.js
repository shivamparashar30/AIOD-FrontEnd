import React from 'react'
import { View, Text, StyleSheet, SafeAreaView, TouchableOpacity, Image, FlatList } from 'react-native';
import Ionicons from '@expo/vector-icons/Ionicons'
// import NgoComponent from './homeScreen/NgoComponent';
import Cards from '../components/cards';
import { useNavigation } from '@react-navigation/native';

function HomeScreen() {
  const navigation = useNavigation();


  return (
    <SafeAreaView>
      <View style={flexDirection = "column"}>
        <View style={styles.view}>
          <TouchableOpacity onPress={() => { navigation.navigate("CurrentLoc") }}>
            <View style={styles.view}>
              <Ionicons name="location" size={40} color={"#877dfa"} style={styles.icons} />
              <View>
                <View style={styles.viewDrop}>
                  <Text style={styles.text}>Location</Text>
                  <Ionicons name="chevron-down-outline" size={20} color={"black"} style={styles.icons} />
                </View>
                <Text style={styles.innerText}>Inner Location with accurate location</Text>
              </View>
            </View>
          </TouchableOpacity>
          <TouchableOpacity onPress={() => {
            navigation.navigate('Profile')
          }}>
            <View style={styles.imageContainer}>
              <Image style={styles.profileImg} source={require('../assets/images/shivam.jpeg')} />
            </View>
          </TouchableOpacity>
        </View>
        <FlatList
          style={styles.flatList}
          horizontal
          showsHorizontalScrollIndicator={false}
          data={data}
          renderItem={({ item }) => <Cards title={item.title} desc={item.desc} />}
          keyExtractor={item => item.id}
        />
      </View>

    </SafeAreaView >
  )
}

const data = [
  {
    id: "1",
    title: 'First Item',
    desc: "First Item Desc"
  },
  {
    id: "2",
    title: 'Second Item',
    desc: "Second Item Desc"
  },
  {
    id: "3",
    title: 'Third Item',
    desc: "Third Item Desc"
  },
  {
    id: "4",
    title: 'Fourth Item',
    desc: "Fourth Item Desc"
  },
  {
    id: "5",
    title: 'Fifth Item',
    desc: "Fifth Item Desc"
  },
]

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    width: '100%', // Set the width of the container to 100%
  },
  cardContainer: {
    width: 300, // Set the width of the card as per your design
  },
  flatList: {
    marginTop: 20,
  },
  view: {
    flexDirection: "row",
    alignItems: "center"
  },
  viewDrop: {
    flexDirection: "row",
  },
  icons: {
    padding: 5
  },
  text: {
    paddingTop: 5,
    fontSize: 20
  },
  innerText: {
    fontSize: 15
  },
  imageContainer: {
    width: 45,
    height: 45,
    borderRadius: 150 / 2,
    overflow: "hidden",
    borderWidth: 3,
    borderColor: "#877dfa",
    marginStart: 25,
    marginTop: 5
  },
  profileImg: {
    height: 45,
    width: 45,
  },
});
export default HomeScreen;