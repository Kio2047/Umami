import { StyleSheet, SafeAreaView, Image } from 'react-native'
import React from 'react'
import type { DetailedImageScreenProps } from '../types'

const DetailedImage = ( {route, navigation}: DetailedImageScreenProps) => {

  const { imageURL } = route.params

  return (
    <SafeAreaView style={styles.container}>
      <Image style={styles.image} source={{uri: imageURL}} resizeMode="contain"></Image>
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1
  },
  image: {
    flex: 1
  }
})

export default DetailedImage