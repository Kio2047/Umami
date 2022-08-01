import { View, Text, Image, StyleSheet } from "react-native";
import React from "react";
import { Rating, AirbnbRating } from 'react-native-ratings';
import ReadMore from 'react-native-read-more-text';

import type { Post as PostType } from "../types";
import { backgroundColor, bottomTabBorderColor, primaryFontColor } from "../colors";
import { calculatePostTimestamp } from "../utils";


const Post = ( {postData}: {postData: PostType} ) => {

  const {
    _id,
    authorID,
    restaurantID,
    ratings,
    imageURLs,
    timestamp,
    title,
    text,
    others,
    authorName,
    authorProfilePictureURL
  } = postData

  const renderedimageURLs = imageURLs.slice(0, 3);
  const renderedTimestamp = calculatePostTimestamp(timestamp);

  return (

    <View style={styles.container}>

      <View style={styles.postBanner}>
        <View style={styles.postInfo}>
          <Image style={styles.profilePicture} source={{ uri: authorProfilePictureURL }}></Image>
          <View style={styles.bannerTextContainer}>
            <Text style={styles.authorName}>{authorName}</Text>
            <Text style={styles.subheading}>was at <Text style={styles.restaurantName}>{restaurantID.name}</Text> {others.length && <Text style={styles.subheading}>with {others?.map((friend) => <Text key={friend._id} style={styles.otherProfiles}>{friend.name}</Text>)}</Text>}</Text>
          </View>
        </View>
        <Text style={styles.postDate}>{renderedTimestamp}</Text>
      </View>

      <View style={styles.imageContainer}>
        {renderedimageURLs.map((imageURL) => <Image style={styles.postImage} key={imageURL} source={{ uri: imageURL }} resizeMode="cover"></Image>)}
      </View>

      <View style={styles.ratingsContainer}>

        <View style={styles.ratingContainer}>
          <Text style={styles.ratingTitle}>Food</Text>
          <View style={styles.ratingCardLinebreak}/>
          <Rating
            style={styles.rating}
            readonly={true}
            showReadOnlyText={false}
            tintColor= {backgroundColor}
            imageSize = {24}
            startingValue={ratings[0]}
          />
        </View>

        <View style={styles.ratingContainer}>
          <Text style={styles.ratingTitle}>Vibes</Text>
          <View style={styles.ratingCardLinebreak}/>
          <Rating
            style={styles.rating}
            readonly={true}
            showReadOnlyText={false}
            tintColor= {backgroundColor}
            imageSize = {24}
            startingValue={ratings[1]}
          />
        </View>

        <View style={styles.ratingContainer}>
          <Text style={styles.ratingTitle}>Value</Text>
          <View style={styles.ratingCardLinebreak}/>
          <Rating
            style={styles.rating}
            readonly={true}
            showReadOnlyText={false}
            tintColor= {backgroundColor}
            imageSize = {24}
            startingValue={ratings[2]}
          />
        </View>

      </View>

      <View style={styles.reviewTextContainer}>
        <Text style={styles.reviewTitle}>{title}</Text>

        { text.length > 50 ?
        <ReadMore
          numberOfLines={5}
          renderTruncatedFooter={(handlePress: any) => { return <Text onPress={handlePress} style={{ color: 'grey' }}>more</Text> }}
          renderRevealedFooter={(handlePress: any) => { return <Text onPress={handlePress} style={{ color: 'grey' }}>less</Text> }}
        >
          <Text style={styles.reviewMainText}>{text}</Text>
        </ReadMore>
        :
        <Text style={styles.reviewMainText}>{text}</Text>
        }
      </View>

    </View>
  )
}

const gap = 5

const styles = StyleSheet.create({
  container: {
     // borderBottomColor: bottomTabBorderColor,
    // borderBottomWidth: 2,
    // maxHeight: 500,
    // below should be converted to a percentage
    width: 400,
    // borderRadius: 15,
    borderTopWidth: 2,
    borderColor: bottomTabBorderColor,
    borderWidth: 1,
    backgroundColor: backgroundColor,
    // paddingTop: 10
  },
  postBanner: {
    paddingHorizontal: 5,
    paddingVertical: 10,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    // backgroundColor: "red"
  },
  postInfo: {
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
  postDate: {
    color: primaryFontColor,
  },
  imageContainer: {
    flexDirection: "row",
    width: "100%",
    height: 400/3,
    // overflow: "scroll"
  },
  postImage: {
    width: 400/3,
    height: 400/3,
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
    marginTop: 7,
    paddingBottom: 5
  },
  reviewTitle: {
    color: primaryFontColor,
    fontWeight: "bold",
    fontSize: 20,
  },
  reviewMainText: {
    color: primaryFontColor,
  }
})

export default Post