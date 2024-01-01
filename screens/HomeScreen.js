import { View, Text } from 'react-native'
import React from 'react'
import { useNavigation } from '@react-navigation/native'
import { SafeAreaView } from 'react-native-safe-area-context'

export default function HomeScreen() {
  const navigation = useNavigation();
  return (
    <SafeAreaView>
      <Text onPress={() => navigation.goBack()}>Home Screen</Text>

    </SafeAreaView>
  )
}