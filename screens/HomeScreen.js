import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, SafeAreaView, TouchableOpacity, Image, FlatList, ScrollView, ImageBackground } from 'react-native';
import Ionicons from '@expo/vector-icons/Ionicons'
// import NgoComponent from './homeScreen/NgoComponent';
import Cards from '../components/cards';
import { useNavigation } from '@react-navigation/native';
import { SliderBox } from 'react-native-image-slider-box'
import Heading from '../components/Heading';
import { COLORS } from '../constants';
import Category from '../components/Category';
import { MaterialCommunityIcons } from '@expo/vector-icons';

const CardSkeleton = () => {

  return (
    <View style={styles.containerSecond}>
      {/* Placeholder card content */}
      <View style={styles.placeholder} />
      <View style={styles.placeholder} />
      <View style={styles.placeholder} />
    </View>
  );
};
// const App = () => {

//---------------
function HomeScreen() {
  const navigation = useNavigation();

  const slides = [
    "https://images.unsplash.com/photo-1488521787991-ed7bbaae773c?q=80&w=2670&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    "https://images.unsplash.com/photo-1593113646773-028c64a8f1b8?q=80&w=2670&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    "https://images.unsplash.com/photo-1559027615-cd4628902d4a?q=80&w=2674&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    // "https://media.istockphoto.com/id/870402320/photo/a-social-worker-meeting-with-a-group-of-villagers.jpg?s=612x612&w=0&k=20&c=2JlS1vqg4pU5lCp8oiFXjVgMPlHbhrmH4wmtRJdq384=",
    // "https://lakshyamngoindelhi.files.wordpress.com/2020/01/sld-1.jpg?w=640",
    // "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSyOLPyw4KFp6ACpOZGypJeANprTrUbfxUjLRMEZBYoX9zZMG7ngDhDKCe1Kx1jbD7m5Q0&usqp=CAUhttps://www.gofundme.com/c/wp-content/uploads/2022/01/fooddrive.jpeg?w=1920",
  ]
  //Ist channge 
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {

    // Simulating an asynchronous data fetch 
    setTimeout(() => {

      // Set isLoading to false after  
      // the data is fetched 
      setIsLoading(false);

      // Adjust the timeout value  
      // according to your needs 
    }, 2000);
  }, []);

  return (
    <SafeAreaView>
      {/* <View style={{ backgroundColor: 'plum', marginTop: -60 }}> */}
      <View style={flexDirection = "column"}>
        <View style={styles.view}>
          <TouchableOpacity onPress={() => { navigation.navigate("CurrentLoc") }}>
            <View style={styles.view}>
              <Ionicons name="location" size={40} color={"#2A4D50"} style={styles.icons} />
              <View>
                <View style={styles.viewDrop}>
                  <Text style={styles.text}>Pes University</Text>
                  <Ionicons name="chevron-down-outline" size={20} color={"#2A4D50"} style={styles.icons} />
                </View>
                <Text style={styles.innerText}>Dwaraka Nagar Banashankari..</Text>
              </View>
            </View>
          </TouchableOpacity>
          <TouchableOpacity onPress={() => navigation.navigate("Notification")} style={{ marginHorizontal: 25, marginTop: 4 }}>
            <Ionicons name="notifications" size={32} color="#2A4D50" />
          </TouchableOpacity>

          <TouchableOpacity onPress={() => {
            navigation.navigate('Profile')
          }}>

            <View style={styles.imageContainer}>
              <Image style={styles.profileImg} source={require('../assets/images/shivam.jpeg')} />
            </View>
          </TouchableOpacity>
        </View>



        {/* //---------------------------- */}
        <View>
          {/* {isLoading ? (
            // Render the skeleton loading effect
            // while isLoading is true 
            <CardSkeleton />

          ) : (
            // Render the actual card component
            // once isLoading is false 

            <FlatList
              style={styles.flatList}
              horizontal
              showsHorizontalScrollIndicator={false}
              data={data}
              renderItem={({ item }) => <Cards title={item.title} desc={item.desc} />}
              keyExtractor={item => item.id}
            />
            
          )} */}

          {/* <View style={styles.carouselContainer}>


          </View> */}

        </View>
        <View style={{ flex: 1, flexDirection: 'row', alignItems: 'center', marginTop: 5 }}>
          <View style={{ flex: 1, height: 1, backgroundColor: '#B4B4B8', width: '100%' }} />
        </View>
        <View stystyle={{ height: '90%' }}>
          <ScrollView automaticallyAdjustKeyboardInsets={true}
            bouncesZoom={false}
            showsHorizontalScrollIndicator={false}
            showsVerticalScrollIndicator={false}
          >
            {/* <ScrollView></ScrollView> */}
            <Heading />
            <SliderBox
              images={slides}
              dotColor="red"
              inactiveDotColor="grey"
              ImageComponentStyle={{ borderRadius: 5, width: '90%', height: 180, marginTop: 10 }}
              autoplay={true}  // Change from "true" to true
              circleLoop
            />
            <View>
              <Text style={styles.chooseDonation} >Choose Your donation</Text>
            </View>
            <View style={styles.donationContainer}>
              <TouchableOpacity onPress={() => { navigation.navigate("Food") }}>
                <View style={styles.innerDonationContainer}>
                  <View style={styles.donationImageContainer}>
                    <Image style={styles.donationImg} source={require('../assets/images/foodD.jpeg')} />
                  </View>
                  <View style={styles.donationTextContainer}>
                    <Text style={styles.donationText}>Food</Text>
                  </View>
                </View>
              </TouchableOpacity>
              <TouchableOpacity onPress={() => { navigation.navigate("Clothes") }}>
                <View style={styles.innerDonationContainer}>
                  <View style={styles.donationImageContainer}>
                    <Image style={styles.donationImg} source={require('../assets/images/clothD1.jpeg')} />
                  </View>
                  <View style={styles.donationTextContainer}>
                    <Text style={styles.donationText}>Clothes</Text>
                  </View>


                </View>
              </TouchableOpacity>
              <TouchableOpacity onPress={() => { navigation.navigate("Books") }}>
                <View style={styles.innerDonationContainer}>
                  <View style={styles.donationImageContainer}>
                    <Image style={styles.donationImg} source={require('../assets/images/bookD.jpeg')} />
                  </View>
                  <View style={styles.donationTextContainer}>
                    <Text style={styles.donationText}>Books</Text>
                  </View>


                </View>
              </TouchableOpacity>

              <TouchableOpacity onPress={() => { navigation.navigate("Money") }}>
                <View style={styles.innerDonationContainer}>
                  <View style={styles.donationImageContainer}>
                    <Image style={styles.donationImg} source={require('../assets/images/moneyD.jpeg')} />
                  </View>
                  <View style={styles.donationTextContainer}>
                    <Text style={styles.donationText}>Money</Text>
                  </View>

                </View>
              </TouchableOpacity>
            </View>
            {/* <View style={{ flex: 1, flexDirection: 'row', alignItems: 'center', marginTop: 15 }}>
              <View style={{ flex: 1, height: 3, backgroundColor: '#B4B4B8', width: '100%' }} />
            </View> */}

            {/* <View style={{ flex: 1, paddingTop: 10, paddingHorizontal: 5, marginTop: -10 }}>
              <Text style={styles.chooseDonation}>
                Urgent Needs
              </Text>
            </View> */}
            {/* <View style={{ height: 140, marginTop: 20 }}> */}
            {/* <ScrollView horizontal={true}
                showsHorizontalScrollIndicator={false}
                showsVerticalScrollIndicator={false}> */}

            {/* <TouchableOpacity onPress={() => { navigation.navigate("GlobalAidNgo") }}>
                  <Category imgUri={require('../assets/images/ngo1.jpeg')}
                    name="Global Aid Network" />
                </TouchableOpacity>


                <TouchableOpacity onPress={() => { navigation.navigate("HopeForNgo") }}>
                  <Category imgUri={require('../assets/images/ngo2.jpg')}
                    name="Hope for Tomorrow Foundation" />
                </TouchableOpacity>

                <TouchableOpacity onPress={() => { navigation.navigate("CompassionateNgo") }}>
                  <Category imgUri={require('../assets/images/ngo3.jpeg')}
                    name="Compassionate Hearts Initiative" />
                </TouchableOpacity>


                <TouchableOpacity onPress={() => { navigation.navigate("EmpowermentNgo") }}>
                  <Category imgUri={require('../assets/images/ngo4.jpeg')}
                    name="Empowerment Alliance" />
                </TouchableOpacity>


                <TouchableOpacity onPress={() => { navigation.navigate("HumanityNgo") }}>
                  <Category imgUri={require('../assets/images/ngo5.jpeg')}
                    name="Humanity United Organization" />
                </TouchableOpacity> */}
            {/* <Category /> */}


            {/* </ScrollView> */}
            {/* </View> */}
            <View style={{ flex: 1, flexDirection: 'row', alignItems: 'center', marginTop: 15 }}>
              <View style={{ flex: 1, height: 3, backgroundColor: '#B4B4B8', width: '100%' }} />
            </View>

            <View style={{ flex: 1, paddingTop: 10, paddingHorizontal: 5, marginTop: -10 }}>
              <Text style={styles.chooseDonation}>
                See Our Impact
              </Text>
              <Text style={{
                fontSize: 14,
                marginHorizontal: 16,
                marginTop: 10,
                opacity: 0.50

              }}>With the help donars like you, we are able to tranform
                many lives. </Text>

            </View>
            <View style={{ width: '100', height: 270, marginTop: 10 }}>
              <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'center' }}>
                <View style={{
                  height: 120,
                  width: 160,
                  borderRadius: 20,
                  marginTop: 5,
                  marginHorizontal: 20,
                  backgroundColor: '#2A4D50'
                }}>
                  <MaterialCommunityIcons
                    style={{ left: 110, top: 10 }}
                    name='food' size={30} color={COLORS.secondary} />
                  <Text style={{
                    color: COLORS.secondary,
                    fontSize: 24,
                    fontWeight: 600,
                    marginHorizontal: 43,
                    marginTop: 13
                  }}>502k+</Text>
                  <Text style={{
                    color: COLORS.secondary,
                    fontSize: 14,
                    fontWeight: 500,
                    marginHorizontal: 29,
                    marginTop: 2
                  }}>Food Donation</Text>

                </View>

                <View style={{
                  height: 120,
                  width: 160,
                  borderRadius: 20,
                  marginTop: 5,
                  marginHorizontal: 20,
                  backgroundColor: '#B4B4B8'
                }}>
                  <MaterialCommunityIcons
                    style={{ left: 110, top: 10 }}
                    name='tshirt-crew' size={30} color={COLORS.primary} />
                  <Text style={{
                    color: COLORS.primary,
                    fontSize: 24,
                    fontWeight: 600,
                    marginHorizontal: 43,
                    marginTop: 13
                  }}>235k+</Text>
                  <Text style={{
                    color: COLORS.primary,
                    fontSize: 14,
                    fontWeight: 500,
                    marginHorizontal: 22,
                    marginTop: 2
                  }}>Clothes Donation</Text>
                </View>

              </View>
              <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'center', marginTop: 10 }}>
                <View style={{
                  height: 120,
                  width: 160,
                  borderRadius: 20,
                  marginTop: 5,
                  marginHorizontal: 20,
                  backgroundColor: '#B4B4B8'
                }}>
                  <MaterialCommunityIcons
                    style={{ left: 110, top: 10 }}
                    name='bookshelf' size={30} color={COLORS.primary} />
                  <Text style={{
                    color: COLORS.primary,
                    fontSize: 24,
                    fontWeight: 600,
                    marginHorizontal: 43,
                    marginTop: 13
                  }}>344k+</Text>
                  <Text style={{
                    color: COLORS.primary,
                    fontSize: 14,
                    fontWeight: 500,
                    marginHorizontal: 25,
                    marginTop: 2
                  }}>Books Donation</Text>
                </View>
                <View style={{
                  height: 120,
                  width: 160,
                  borderRadius: 20,
                  marginTop: 5,
                  marginHorizontal: 20,
                  backgroundColor: '#2A4D50'
                }}>
                  <MaterialCommunityIcons
                    style={{ left: 110, top: 10 }}
                    name='currency-inr' size={30} color={COLORS.secondary} />
                  <Text style={{
                    color: COLORS.secondary,
                    fontSize: 24,
                    fontWeight: 600,
                    marginHorizontal: 36,
                    marginTop: 13
                  }}>10.29Cr</Text>
                  <Text style={{
                    color: COLORS.secondary,
                    fontSize: 14,
                    fontWeight: 500,
                    marginHorizontal: 25,
                    marginTop: 2
                  }}>Money Donation</Text>
                </View>
              </View>
            </View>
            <View style={{ flex: 1, flexDirection: 'row', alignItems: 'center', marginTop: 5 }}>
              <View style={{ flex: 1, height: 3, backgroundColor: '#B4B4B8', width: '100%' }} />
            </View>



            <View style={{ height: 200, width: '100%' }}>
            </View>



          </ScrollView>

        </View>
      </View>
      {/* <View style={{ flex: 1, flexDirection: 'row', alignItems: 'center', marginTop: 10 }}>
          <View style={{ flex: 1, height: 1, backgroundColor: '#B4B4B8', width: '100%' }} />
        </View> */}




      {/* </View> */}

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
    alignItems: "center",
    // marginTop: 25
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
    borderColor: "#2A4D50",
    marginStart: 1,
    marginTop: 5
  },
  profileImg: {
    height: 45,
    width: 45,
  },
  containerSecond: {
    backgroundColor: '#F6F6F6',
    borderRadius: 13,
    padding: 16,
    marginBottom: 16,
    marginTop: 50,
    height: 100,
  },
  placeholder: {
    backgroundColor: '#ccc',
    height: 16,
    borderRadius: 4,
    marginBottom: 8,
  },
  carouselContainer: {
    flex: 1,
    alignItems: "center",
  },


  donationText: {
    fontSize: 15,
    fontWeight: '500',
    marginHorizontal: 13

  },
  donationTextContainer: {
    marginTop: 6,
    marginHorizontal: 10,
    justifyContent: 'center',
    alignItems: 'center ',
    width: 150
  },
  donationImg: {
    height: 55,
    width: 55,
    borderRadius: 30,
    marginHorizontal: 9,
    marginTop: 14,
    aspectRatio: 1,
    resizeMode: "cover"
  },

  donationImageContainer: {
    height: 60,
    width: 75,
    marginTop: 6,
    marginHorizontal: 12,
    justifyContent: 'center',
    alignItems: 'center ',
    backgroundColor: COLORS.primary,
    borderRadius: 50,
    // borderWidth: 1,
    // borderColor: 'black',

  },
  innerDonationContainer: {
    height: 88,
    width: 100,
    marginTop: 5,
    marginHorizontal: 0,
    // borderWidth: 1,
    // borderColor: 'black'
  },
  donationContainer: {
    flexDirection: "row",
    height: 100,
    width: '100%',
    marginTop: 1,
    // borderWidth: 1,
    // borderColor: 'black'
  },
  chooseDonation: {
    fontSize: 18,
    fontWeight: '600',
    fontStyle: 'normal',
    margin: 0,
    marginHorizontal: 15,
    marginTop: 12

  },
});
export default HomeScreen;