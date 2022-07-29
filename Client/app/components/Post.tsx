import { View, Text } from 'react-native'
import React from 'react'

import { PostScreenProps } from '../types'

const Post = ( {route, navigation}: PostScreenProps ) => {
  const { user, scores, images, text, restaurant} = route.params
  return (
    <View>
      <Text>Post</Text>
    </View>
  )
}

export default Post