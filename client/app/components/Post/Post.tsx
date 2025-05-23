import {
  View,
  Text,
  Image,
  FlatList,
  Dimensions,
  NativeSyntheticEvent,
  NativeScrollEvent,
  TouchableOpacity
} from "react-native";
import React, { useState } from "react";

import styles from "./Post.styles";
import type { Post as PostType } from "../../types/OtherTypes";
import { calculatePostTimestamp } from "../../utils/utils";
import PostRating from "../PostRating/PostRating";

const TEXT_TRUNCATE_LIMIT = 300;
const { width: screenWidth } = Dimensions.get("screen");

const Post = ({ post }: { post: PostType }) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isExpanded, setIsExpanded] = useState(false);

  const toggleExpanded = () => setIsExpanded((prev) => !prev);

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
      <View style={styles.banner}>
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
        <View style={styles.bannerTextContainer}>
          <View style={styles.bannerUsernameAndDateContainer}>
            <Text style={styles.authorName}>{username}</Text>
            <Text style={styles.postDate}>{renderedTimestamp}</Text>
          </View>
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
            />
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
        <Text style={styles.reviewMainText}>
          {isExpanded || text.length <= TEXT_TRUNCATE_LIMIT
            ? `${text} `
            : `${text.slice(0, TEXT_TRUNCATE_LIMIT).trim()}... `}
          {text.length > TEXT_TRUNCATE_LIMIT && (
            <Text style={styles.readMoreLessText} onPress={toggleExpanded}>
              {isExpanded ? "less" : "more"}
            </Text>
          )}
        </Text>
      </View>
    </View>
  );
};

export default Post;
