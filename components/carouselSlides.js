import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
// import { COLORS } from '../constants'
import { SliderBox } from 'react-native-image-slider-box'


const Carouselset = () => {
    const slides = [
        "https://d326fntlu7tb1e.cloudfront.net/uploads/cb2e64a8-ad4c-4d45-b58b-b0c7e11b6bb4-fn1.jpg",
        "https://img.freepik.com/free-photo/modern-luxurious-living-room-with-elegant-design-generative-ai_188544-8707.jpg",
        "https://img.freepik.com/premium-photo/living-room-with-blue-sofa-round-coffee-table_658005-1949.jpg",
        "https://image.architonic.com/pfm3-3/20139604/connery-04-fam-g-arcit18.jpg",
        "https://nydesignagenda.com/wp-content/uploads/2018/12/Luxury-Guide-The-Most-Expensive-Furniture-Brands-1.jpg",
        "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRxMCzLNEbp3sV-bs6_EB8AoJm3uAUe9U91mLCuLniVu5viePBXGFfr1kJ-5wciX-i2G-E&usqp=CAU",
    ]
    return (
        <View style={styles.carouselContainer}>
            <SliderBox images={slides}
                dotColor="red"
                inactiveDotColor="grey"
                ImageComponentStyle={{ borderRadius: 15, width: "94%", marginTop: 5 }}
                autoplay="true"
                circleLoop
            />
        </View>
    )
}

export default Carouselset

const styles = StyleSheet.create({
    carouselContainer: {
        flex: 1,
        alignItems: "center",


    },
})