import { View, Text, StyleSheet, Button, SafeAreaView, TouchableOpacity, Image } from "react-native"
import React from "react"
import { AntDesign } from '@expo/vector-icons';

import { FeedScreenProps } from "../types"
import { backgroundColor, formInputBackgroundColor, primaryFontColor } from "../colors"

const Feed = ( {route, navigation}: FeedScreenProps ) => {

  const userID = route.params.userID;

  return (
    <SafeAreaView style={styles.container}>
      <TouchableOpacity
        style={styles.makePostButton}
      >
        <AntDesign name="pluscircleo" size={50} color="white" />
        <Text style={styles.makePostText}>Make new post</Text>
      </TouchableOpacity>
      <View>
        <Text>Feed</Text>
        <Button
          title="Go to About"
          onPress={() => navigation.navigate("About", {
            title: "Testing 1",
            body: "Testing 2"
          })}
        />

      </View>
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: backgroundColor,
    justifyContent: "flex-start",
    alignItems: "center",
  },
  makePostButton: {
    width: "90%",
    height: 120,
    borderRadius: 8,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: formInputBackgroundColor,
  },
  makePostText: {
    marginTop: 10,
    color: primaryFontColor

  }
})

export default Feed