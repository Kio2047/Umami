import { View, Text, StyleSheet, Button } from 'react-native'
import React from 'react'
import { Rating, AirbnbRating } from 'react-native-ratings';
import ReadMore from 'react-native-read-more-text';


import { AboutScreenProps } from '../types';

const About = ( {navigation, route}: AboutScreenProps ) => {

  const {title, body} = route.params;

  const ratingCompleted = function(rating: any) {
    console.log("Rating is: " + rating)
  }

  const yourText="Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aenean nec vehicula odio, a tristique eros. Aliquam fermentum feugiat nulla et vehicula. Pellentesque magna massa, hendrerit at ligula eget, fringilla tempor libero. Nulla non felis diam. Phasellus et neque a mi maximus faucibus auctor in sem. In hac habitasse platea dictumst. In hac habitasse platea dictumst. Nullam quis mi ipsum. Sed sed dui vitae nunc cursus dapibus ac iaculis enim. Nulla massa enim, imperdiet sit amet tellus ac, suscipit tempus leo. Vivamus vel justo ut nisi semper imperdiet et quis enim. Donec id gravida mi. Integer purus tortor, condimentum id dui vel, hendrerit maximus massa. Curabitur non eros ligula. Aenean cursus, lectus eu suscipit rutrum, purus velit ultrices elit, a dignissim risus neque at nisi. Duis porttitor auctor dui ac facilisis. Integer suscipit justo est, ac porttitor est posuere quis. Donec interdum tincidunt metus sed tempus. In a fringilla ex, faucibus placerat sem. Curabitur congue maximus enim et commodo. Class aptent taciti sociosqu ad litora torquent per conubia nostra, per inceptos himenaeos. Etiam pellentesque scelerisque gravida. Phasellus non euismod justo, nec tristique magna. Nulla condimentum interdum maximus. Vestibulum pretium convallis elementum. Vivamus id leo quis elit cursus malesuada nec ac risus."


  return (
    <View style={styles.container}>

{/*
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
/> */}

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