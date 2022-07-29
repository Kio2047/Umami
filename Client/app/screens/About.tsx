import { View, Text, StyleSheet, Button } from 'react-native'
import React from 'react'

import { AboutScreenProps } from '../types';

const About = ( {navigation, route}: AboutScreenProps ) => {

  const {title, body} = route.params;

  return (
    <View style={styles.container}>
      <Text>About</Text>
      <Text>{title}</Text>
      <Text>{body}</Text>
      <Button
        title="Go to Home"
        onPress={() => navigation.navigate("Home")}
      />
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "orange",
    justifyContent: "center",
    alignItems: "center",
  }
})


export default About