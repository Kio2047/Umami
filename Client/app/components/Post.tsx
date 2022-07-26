import { View, Text, Image, StyleSheet, FlatList } from "react-native";
import React from "react";
import { Rating, AirbnbRating } from 'react-native-ratings';
import ReadMore from 'react-native-read-more-text';

import type { Post as PostType } from "../types";
import { backgroundColor, bottomTabBorderColor, primaryFontColor, ratingsColor } from "../colors";
import { calculatePostTimestamp } from "../utils";
import { TouchableOpacity } from "react-native-gesture-handler";
import { PostNavigationProp } from "../types";


const Post = ( {postData, navigation, feedPosts}: {postData: PostType, navigation: PostNavigationProp, feedPosts: PostType[]} ) => {
  // console.log("FEEDposts: ", feedPosts);

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
          <TouchableOpacity onPress={() => navigation.navigate("UserProfile", {
            profileUserID: authorID,
            profileUserProfilePictureURL: authorProfilePictureURL,
            profileUserName: authorName,
            feedPosts: feedPosts
          })}
          >
            <Image style={styles.profilePicture} source={{ uri: authorProfilePictureURL }}></Image>
          </TouchableOpacity>
          <View style={styles.postBannerTextContainer}>
            <Text style={styles.authorName}>{authorName}</Text>
            <Text style={styles.subheading}>was at <Text style={styles.restaurantName} onPress={() => {navigation.navigate("RestaurantProfile", {
              restaurantID: restaurantID._id,
              restaurantName: restaurantID.name,
              feedPosts
            })}}>{restaurantID.name}</Text> {Boolean(others.length) && <Text style={styles.subheading}>with {others?.map((friend) => <Text key={friend._id} style={styles.otherProfiles}>{friend.name}</Text>)}</Text>}</Text>
          </View>
        </View>
        <Text style={styles.postDate}>{renderedTimestamp}</Text>
      </View>

      <View style={styles.imageContainer}>
        <FlatList
          horizontal={true}
          data={renderedimageURLs}
          renderItem={({item}) => {
            return (<TouchableOpacity
            onPress={() => navigation.navigate("DetailedImage", {
              imageURL: item
            })}
            key={item}
          >
            <Image style={styles.postImage} source={{ uri: item }} resizeMode="cover"></Image>
          </TouchableOpacity>)
          }}
        >

        </FlatList>

        {/* {renderedimageURLs.map((imageURL) => {
          return (
            <TouchableOpacity
              onPress={() => navigation.navigate("DetailedImage", {
                imageURL: imageURL
              })}
              key={imageURL}
            >
              <Image style={styles.postImage} source={{ uri: imageURL }} resizeMode="cover"></Image>
            </TouchableOpacity>
          )
        })} */}
      </View>

      <View style={styles.ratingsContainer}>

        <View style={styles.ratingContainer}>
          <Text style={styles.ratingTitle}>Food</Text>
          <Rating
            type="custom"
            style={styles.rating}
            readonly={true}
            showReadOnlyText={false}
            tintColor= {backgroundColor}
            imageSize = {20}
            startingValue={ratings[0]}
            ratingColor={ratingsColor}
            ratingBackgroundColor={backgroundColor}
          />
        </View>

        <View style={styles.ratingContainer}>
          <Text style={styles.ratingTitle}>Vibes</Text>
          <Rating
            type="custom"
            style={styles.rating}
            readonly={true}
            showReadOnlyText={false}
            tintColor= {backgroundColor}
            imageSize = {20}
            startingValue={ratings[1]}
            ratingColor={ratingsColor}
            ratingBackgroundColor={backgroundColor}
          />
        </View>

        <View style={styles.ratingContainer}>
          <Text style={styles.ratingTitle}>Value</Text>
          <Rating
            type="custom"
            style={styles.rating}
            readonly={true}
            showReadOnlyText={false}
            tintColor= {backgroundColor}
            imageSize = {20}
            startingValue={ratings[2]}
            ratingColor={ratingsColor}
            ratingBackgroundColor={backgroundColor}
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
    borderColor: bottomTabBorderColor,
    borderWidth: 0.5,
    backgroundColor: backgroundColor,
    paddingBottom: 10
  },
  postBanner: {
    paddingHorizontal: 10,
    paddingVertical: 12,
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
  postBannerTextContainer: {
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
    height: 500/3,
    // overflow: "scroll"
  },
  postImage: {
    width: 500/3,
    height: 500/3,
    marginLeft: 10,
    borderRadius: 3
  },
  ratingsContainer: {
    flexDirection: "row",
    justifyContent: "space-evenly",
    marginTop: 10
  },
  ratingContainer: {
    alignItems: "center",
    paddingVertical: (gap / -2),
    paddingHorizontal: 5
  },
  ratingTitle: {
    fontWeight: "700",
    color: primaryFontColor,
    marginVertical: (gap / 2)
  },
  rating: {
    marginVertical: (gap / 2)
  },
  reviewTextContainer: {
    width: "100%",
    marginTop: 7,
    paddingHorizontal: 10,
    paddingBottom: 8
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