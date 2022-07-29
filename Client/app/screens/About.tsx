import { View, Text, StyleSheet, Button } from 'react-native'
import React from 'react'
import { Rating, AirbnbRating } from 'react-native-ratings';

import { AboutScreenProps } from '../types';

const About = ( {navigation, route}: AboutScreenProps ) => {

  const {title, body} = route.params;

  const ratingCompleted = function(rating: any) {
    console.log("Rating is: " + rating)
  }

  return (
    <View style={styles.container}>



<AirbnbRating />

<AirbnbRating
  isDisabled={true}
  count={11}
  reviews={["Terrible", "Bad", "Meh", "OK", "Good", "Hmm...", "Very Good", "Wow", "Amazing", "Unbelievable", "Jesus"]}
  defaultRating={11}
  size={20}
/>

<Rating
  // readonly={true}
  showReadOnlyText={false}
  // showRating
  onFinishRating={ratingCompleted}
  style={{ paddingVertical: 10 }}
/>

<Rating
  type='heart'
  ratingCount={3}
  imageSize={60}
  showRating
  onFinishRating={ratingCompleted}
  readonly={true}
  showReadOnlyText={false}
  startingValue={1}
/>

      {/* <Text>About</Text>
      <Text>{title}</Text>
      <Text>{body}</Text>
      <Button
        title="Go to Feed"
        onPress={() => navigation.navigate("Feed")}
      /> */}
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