import { View, Text, Image, StyleSheet } from "react-native";
import React from "react";
import { Rating, AirbnbRating } from 'react-native-ratings';
import ReadMore from 'react-native-read-more-text';

import type { Post as postDataType } from "../types";
import { backgroundColor, bottomTabBorderColor, formInputBackgroundColor, primaryFontColor } from "../colors";


const Post = ( {postData}: {postData: postDataType} ) => {

  const { userId, profilePicture, scores, images, title, text, restaurant, others} = postData
  const renderedImages = images.slice(0, 3);

  return (

    <View style={styles.container}>

      <View style={styles.banner}>
        <Image style={styles.profilePicture} source={profilePicture}></Image>
        <View style={styles.bannerTextContainer}>
          <Text style={styles.authorName}>{userId}</Text>
          <Text style={styles.subheading}>was at <Text style={styles.restaurantName}>{restaurant}</Text> {others && <Text style={styles.subheading}>with {others?.map((name) => <Text key={name} style={styles.otherProfiles}>{name}</Text>)}</Text>}</Text>
        </View>
      </View>

      <View style={styles.imageContainer}>
        {renderedImages.map((image) => <Image style={styles.postImage} key={image.toString()} source={image} resizeMode="cover"></Image>)}
      </View>

      <View style={styles.ratingsContainer}>

        <View style={styles.ratingContainer}>
          <Text style={styles.ratingTitle}>Food</Text>
          <View style={styles.ratingCardLinebreak}/>
          <Rating
            style={styles.rating}
            readonly={true}
            showReadOnlyText={false}
            tintColor= {formInputBackgroundColor}
            imageSize = {24}
            startingValue={scores.food}
          />
        </View>

        <View style={styles.ratingContainer}>
          <Text style={styles.ratingTitle}>Vibes</Text>
          <View style={styles.ratingCardLinebreak}/>
          <Rating
            style={styles.rating}
            readonly={true}
            showReadOnlyText={false}
            tintColor= {formInputBackgroundColor}
            imageSize = {24}
            startingValue={scores.vibes}
          />
        </View>

        <View style={styles.ratingContainer}>
          <Text style={styles.ratingTitle}>Value</Text>
          <View style={styles.ratingCardLinebreak}/>
          <Rating
            style={styles.rating}
            readonly={true}
            showReadOnlyText={false}
            tintColor= {formInputBackgroundColor}
            imageSize = {24}
            startingValue={scores.value}
          />
        </View>

      </View>

      <View style={styles.reviewTextContainer}>
        <Text style={styles.reviewTitle}>{title}</Text>
        <Text style={styles.reviewMainText}>{text}</Text>
      </View>

    </View>
  )
}

const gap = 5

const styles = StyleSheet.create({
  container: {
    maxHeight: 500,
    // below should be converted to a percentage
    width: 400,
    // overflow: "hidden",
    borderRadius: 15,
    borderColor: bottomTabBorderColor,
    borderWidth: 1,

    backgroundColor: formInputBackgroundColor
  },
  banner: {
    paddingHorizontal: 4.5,
    paddingVertical: 6,
    flexDirection: "row",
    alignItems: "center"
  },
  profilePicture: {
    width: 45,
    height: 45,
    borderRadius: 45 / 2
  },
  bannerTextContainer: {
    marginLeft: 10
  },
  authorName: {
    color: primaryFontColor,
    fontWeight: 'bold',
  },
  subheading: {
    marginTop: -2,
    color: primaryFontColor,
    fontSize: 12,
    fontWeight: "300"
  },
  restaurantName: {
    fontWeight: "500"
  },
  otherProfiles: {
    fontWeight: "500"
  },
  imageContainer: {
    flexDirection: "row",
    width: "100%",
    height: 400/3,
    // overflow: "scroll"
  },
  postImage: {
    // flex: 1,
    width: 400/3,
    height: 400/3,
    // maxWidth: 300,
    // maxHeight: 200,
    // height: undefined,
    // aspectRatio: 134 / 70,
    // height: "auto"
    // backgroundColor: "red"
  },
  ratingsContainer: {
    flexDirection: "row",
    justifyContent: "center",
    marginTop: 7
  },
  ratingContainer: {
    alignItems: "center",
    borderRightColor: bottomTabBorderColor,
    borderRightWidth: 1,
    paddingVertical: (gap / -2),
    paddingHorizontal: 5
  },
  ratingTitle: {
    color: primaryFontColor,
    marginVertical: (gap / 2)
  },
  ratingCardLinebreak: {
    height: 1,
    width: "80%",
    backgroundColor: bottomTabBorderColor,
    marginVertical: (gap / 2)
  },
  rating: {
    marginVertical: (gap / 2)
  },
  reviewTextContainer: {
    marginTop: 7
  },
  reviewTitle: {
    color: primaryFontColor,
    fontWeight: "bold",
    fontSize: 20,
  },
  reviewMainText: {
    color: primaryFontColor
  }
})

export default Post