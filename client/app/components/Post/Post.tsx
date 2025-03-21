import {
  View,
  Text,
  Image,
  FlatList,
  Dimensions,
  NativeSyntheticEvent,
  NativeScrollEvent
} from "react-native";
import React, { useState } from "react";
import { Rating, AirbnbRating } from "react-native-ratings";
import ReadMore from "react-native-read-more-text";

import styles from "./Post.styles";
import type { Post as PostType } from "../../types/OtherTypes";
import { colors } from "../../constants/styles/styleConstants";
import { calculatePostTimestamp } from "../../utils/utils";
import { TouchableOpacity } from "react-native-gesture-handler";
import PostRating from "../PostRating/PostRating";
// import { PostNavigationProp } from "../../types/OtherTypes";

const { width: screenWidth } = Dimensions.get("screen");

const Post = ({ post }: { post: PostType }) => {
  const [currentIndex, setCurrentIndex] = useState(0);

  const onMomentumScrollEnd = (
    event: NativeSyntheticEvent<NativeScrollEvent>
  ) => {
    const index = Math.floor(event.nativeEvent.contentOffset.x / screenWidth);
    setCurrentIndex(index);
  };

  const {
    imageURLs,
    createdAt,
    title,
    text,
    others,
    scores: {
      food: foodScore,
      atmosphere: atmosphereScore,
      service: serviceScore
    },
    restaurant: { name, _id: restaurantId },
    author: { username, profileImageURL, _id: userId }
  } = post;

  const renderedTimestamp = calculatePostTimestamp(createdAt);

  return (
    <View style={[styles.container, { width: screenWidth }]}>
      <View style={styles.postBannerContainer}>
        <View style={styles.postInfo}>
          {/* <TouchableOpacity
              onPress={() =>
                navigation.navigate("UserProfile", {
                  profileUserID: author,
                  profileUserprofileImageURL: authorprofileImageURL,
                  profileUserName: authorName
                })
              }
            > */}
          <Image
            style={styles.profilePicture}
            source={{ uri: profileImageURL }}
          ></Image>
          {/* </TouchableOpacity> */}
          <View style={styles.postBannerTextContainer}>
            <Text style={styles.authorName}>{username}</Text>
            <Text style={styles.subheading}>
              was at{" "}
              <Text
                style={styles.restaurantName}
                // onPress={() => {
                //   navigation.navigate("RestaurantProfile", {
                //     restaurantID: restaurant._id,
                //     restaurantName: restaurant.name
                //   });
                // }}
              >
                {name + " "}
              </Text>
              {Boolean(others.length) && (
                <Text style={styles.subheading}>
                  {"with "}
                  {others.map((friend) => (
                    <Text key={friend._id} style={styles.otherProfiles}>
                      {friend.username}
                    </Text>
                  ))}
                </Text>
              )}
            </Text>
          </View>
        </View>
        <Text style={styles.postDate}>{renderedTimestamp}</Text>
      </View>

      <FlatList
        horizontal
        pagingEnabled
        showsHorizontalScrollIndicator={false}
        data={imageURLs}
        keyExtractor={(item) => item}
        onMomentumScrollEnd={onMomentumScrollEnd}
        renderItem={({ item }) => {
          return (
            // <TouchableOpacity

            // >
            <Image
              style={[
                {
                  width: screenWidth,
                  height: screenWidth
                  // resizeMode: "cover"
                },
                styles.postImage
              ]}
              source={{ uri: item }}
              //
            ></Image>
            // </TouchableOpacity>
          );
        }}
      />
      {imageURLs.length > 1 && (
        <View style={styles.dotsContainer}>
          {imageURLs.map((_, index) => (
            <View
              key={index}
              style={[styles.dot, currentIndex === index && styles.activeDot]}
            />
          ))}
        </View>
      )}

      <View style={styles.ratingsContainer}>
        <PostRating title="Food" score={foodScore} />
        <PostRating title="Vibes" score={atmosphereScore} />
        <PostRating title="Service" score={serviceScore} />
      </View>

      <View style={styles.reviewTextContainer}>
        <Text style={styles.reviewTitle}>{title}</Text>
        <Text style={styles.reviewMainText}>{text}</Text>
      </View>
    </View>
  );
};

export default Post;
