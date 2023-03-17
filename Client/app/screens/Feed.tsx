import {
  View,
  Text,
  StyleSheet,
  Button,
  TouchableOpacity,
  Image,
  FlatList,
  ScrollView
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import React, { useEffect, useState } from "react";
import { Ionicons } from "@expo/vector-icons";

import Post from "../components/Post";
import type { Post as PostType, FeedScreenProps } from "../types";
import { getFeedPosts } from "../api/apiClientService";
import colors from "../colors";

const Feed = ({ route, navigation }: FeedScreenProps) => {
  let { _id, name, profilePictureURL, posts, friends } =
    route.params.feedUserInfo;
  const firstName = name.match(/[a-z]+/i);

  const [feedPosts, setFeedPosts] = useState<PostType[]>([]);
  const [refreshCount, setRefreshCount] = useState<number>(0);

  useEffect(() => {
    (async () => {
      const posts = await getFeedPosts(_id);
      // TODO: deal with timestamps not getting converted into Date objects + also edit timestamp utils file when this is done
      posts.sort(
        (a: PostType, b: PostType) =>
          new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime()
      );
      setFeedPosts(posts);
    })();
  }, [refreshCount]);

  console.log("feed posts are:", feedPosts);

  // const mockPosts = [mockPost];
  return (
    <SafeAreaView style={styles.container}>
      <FlatList
        style={styles.flatList}
        ListHeaderComponent={
          <View style={styles.feedBanner}>
            <View style={styles.feedBannerTop}>
              <Text style={styles.userGreeting}>Good evening, {firstName}</Text>
              <Ionicons name="settings-outline" size={26} color="white" />
            </View>
            <View style={styles.newPostField}>
              <Image
                style={styles.userProfilePicture}
                source={{ uri: profilePictureURL }}
              ></Image>
              <TouchableOpacity
                // style={styles.makePostButtonV2}
                onPress={() =>
                  navigation.navigate("CreateNewPost", {
                    profilePictureURL,
                    authorID: _id,
                    setRefreshCount
                  })
                }
              >
                <Text style={styles.makeNewPostText}>
                  Share a new eatery with your friends? 😋
                </Text>
              </TouchableOpacity>
            </View>
          </View>
        }
        contentContainerStyle={styles.postsContainer}
        data={feedPosts}
        renderItem={({ item }) => (
          <Post postData={item} navigation={navigation}></Post>
        )}
      />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.backgroundColor,
    justifyContent: "flex-start",
    alignItems: "center",
    overflow: "scroll"
  },
  flatList: {
    width: "100%",
    borderBottomLeftRadius: 10,
    borderBottomRightRadius: 10,
    // backgroundColor: "blue",
    paddingVertical: 10,
    paddingHorizontal: 10
  },
  feedBanner: {
    // width: "100%",
    minWidth: "97%",
    paddingVertical: 10,
    marginBottom: 2
  },
  feedBannerTop: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center"
  },
  userGreeting: {
    color: colors.primaryFontColor,
    fontSize: 23,
    fontWeight: "500"
  },
  newPostField: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: 10,
    paddingVertical: 20,
    paddingHorizontal: 15,
    backgroundColor: colors.formInputBackgroundColor,
    borderRadius: 10
  },
  userProfilePicture: {
    width: 45,
    height: 45,
    borderRadius: 45 / 2
  },
  // makePostButtonV2: {

  // },
  makeNewPostText: {
    color: colors.formPlaceholderColor,
    marginLeft: 10
  },
  postsContainer: {
    alignItems: "center"
  }

  // makePostButton: {
  //   width: 400,
  //   height: 113,
  //   borderTopLeftRadius: 10,
  //   borderTopRightRadius: 10,
  //   flexDirection: "row",
  //   justifyContent: "space-between",
  //   alignItems: "center",
  //   backgroundColor: formInputBackgroundColor,
  //   padding: 30,
  // },
  // leftIcon: {
  //   color: primaryFontColor
  // },
  // newPostIconAndText: {
  //   alignItems: "center"
  // },
  // rightIcon: {
  //   color: primaryFontColor,
  //   transform: [{scaleX: -1}]
  // },
  // makePostText: {
  //   marginTop: 10,
  //   color: primaryFontColor
  // }
});

export default Feed;
