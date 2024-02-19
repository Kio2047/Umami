import { View, Text, Image, FlatList } from "react-native";
import React from "react";
import { Rating, AirbnbRating } from "react-native-ratings";
import ReadMore from "react-native-read-more-text";

import type { Post as PostType } from "../../types/OtherTypes";
import { colors } from "../../constants/styleConstants";
import { calculatePostTimestamp } from "../../utils/utils";
import { TouchableOpacity } from "react-native-gesture-handler";
import { PostNavigationProp } from "../../types/OtherTypes";

const Post = ({
  postData,
  navigation
}: {
  postData: PostType;
  navigation: PostNavigationProp;
}) => {
  const {
    _id,
    author,
    restaurant,
    ratings,
    imageURLs,
    timestamp,
    title,
    text,
    others,
    authorName,
    authorprofileImageURL
  } = postData;

  const renderedimageURLs = imageURLs.slice(0, 3);
  const renderedTimestamp = calculatePostTimestamp(timestamp);

  return (
    <View style={styles.container}>
      <View style={styles.postBanner}>
        <View style={styles.postInfo}>
          <TouchableOpacity
            onPress={() =>
              navigation.navigate("UserProfile", {
                profileUserID: author,
                profileUserprofileImageURL: authorprofileImageURL,
                profileUserName: authorName
              })
            }
          >
            <Image
              style={styles.profilePicture}
              source={{ uri: authorprofileImageURL }}
            ></Image>
          </TouchableOpacity>
          <View style={styles.postBannerTextContainer}>
            <Text style={styles.authorName}>{authorName}</Text>
            <Text style={styles.subheading}>
              was at{" "}
              <Text
                style={styles.restaurantName}
                onPress={() => {
                  navigation.navigate("RestaurantProfile", {
                    restaurantID: restaurant._id,
                    restaurantName: restaurant.name
                  });
                }}
              >
                {restaurant.name}
              </Text>{" "}
              {Boolean(others.length) && (
                <Text style={styles.subheading}>
                  with{" "}
                  {others?.map((friend) => (
                    <Text key={friend._id} style={styles.otherProfiles}>
                      {friend.name}
                    </Text>
                  ))}
                </Text>
              )}
            </Text>
          </View>
        </View>
        <Text style={styles.postDate}>{renderedTimestamp}</Text>
      </View>

      <View style={styles.imageContainer}>
        <FlatList
          horizontal={true}
          data={renderedimageURLs}
          renderItem={({ item }) => {
            return (
              <TouchableOpacity
                onPress={() =>
                  navigation.navigate("DetailedImage", {
                    imageURL: item
                  })
                }
                key={item}
              >
                <Image
                  key={item}
                  style={styles.postImage}
                  source={{ uri: item }}
                  resizeMode="cover"
                ></Image>
              </TouchableOpacity>
            );
          }}
        ></FlatList>

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
            tintColor={colors.backgroundColor}
            imageSize={20}
            startingValue={ratings[0]}
            ratingColor={colors.ratingsColor}
            ratingBackgroundColor={colors.backgroundColor}
          />
        </View>

        <View style={styles.ratingContainer}>
          <Text style={styles.ratingTitle}>Vibes</Text>
          <Rating
            type="custom"
            style={styles.rating}
            readonly={true}
            showReadOnlyText={false}
            tintColor={colors.backgroundColor}
            imageSize={20}
            startingValue={ratings[1]}
            ratingColor={colors.ratingsColor}
            ratingBackgroundColor={colors.backgroundColor}
          />
        </View>

        <View style={styles.ratingContainer}>
          <Text style={styles.ratingTitle}>Value</Text>
          <Rating
            type="custom"
            style={styles.rating}
            readonly={true}
            showReadOnlyText={false}
            tintColor={colors.backgroundColor}
            imageSize={20}
            startingValue={ratings[2]}
            ratingColor={colors.ratingsColor}
            ratingBackgroundColor={colors.backgroundColor}
          />
        </View>
      </View>

      <View style={styles.reviewTextContainer}>
        <Text style={styles.reviewTitle}>{title}</Text>

        {text.length > 50 ? (
          <ReadMore
            numberOfLines={5}
            renderTruncatedFooter={(handlePress: any) => {
              return (
                <Text onPress={handlePress} style={{ color: "grey" }}>
                  more
                </Text>
              );
            }}
            renderRevealedFooter={(handlePress: any) => {
              return (
                <Text onPress={handlePress} style={{ color: "grey" }}>
                  less
                </Text>
              );
            }}
          >
            <Text style={styles.reviewMainText}>{text}</Text>
          </ReadMore>
        ) : (
          <Text style={styles.reviewMainText}>{text}</Text>
        )}
      </View>
    </View>
  );
};

export default Post;
