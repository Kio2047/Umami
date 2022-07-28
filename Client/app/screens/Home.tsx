import { View, Text, StyleSheet, Button } from "react-native"
import React, { useEffect } from "react"
import { HomeScreenProps } from "../navTypes"

const Home = ( {navigation}: HomeScreenProps ) => {

  return (
    <View style={styles.container}>
      <Text>Home</Text>
      <Button
        title="Go to About"
        onPress={() => navigation.navigate("About", {
          title: "Testing 1",
          body: "Testing 2"
        })}
      />
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "violet",
    justifyContent: "center",
    alignItems: "center",
  }
})

export default Home