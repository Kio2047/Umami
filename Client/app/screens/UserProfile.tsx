import {
  View,
  Text,
  StyleSheet,
  Button,
  TouchableOpacity,
  Image,
  FlatList
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

import { useEffect, useState } from "react";

import Post from "../components/Post";
import type { UserProfileScreenProps, Post as PostType } from "../types";
import colors from "../colors";
import { getPostsByUser } from "../api/apiClientService";

const UserProfile = ({ route, navigation }: UserProfileScreenProps) => {
  // Rather than filtering the posts from the original feed, this should make another fetch using the userID and get posts from the user's posts field
  let { profileUserID, profileUserProfilePictureURL, profileUserName } =
    route.params;

  const [posts, setPosts] = useState<PostType[]>([]);

  useEffect(() => {
    (async () => {
      const posts = await getPostsByUser(profileUserID);
      setPosts(posts);
    })();
  }, []);

  const postCount = posts.length;

  return (
    <SafeAreaView style={styles.container}>
      <FlatList
        style={styles.flatList}
        ListHeaderComponent={
          <View style={styles.feedBanner}>
            <View style={styles.feedBannerTop}>
              <Image
                style={styles.profilePicture}
                source={{ uri: profileUserProfilePictureURL }}
              ></Image>
              <Text style={styles.name}>{profileUserName}</Text>
              <TouchableOpacity style={styles.removeFriendButton}>
                <Text style={styles.removeFriendButtonText}>Remove friend</Text>
              </TouchableOpacity>
            </View>
            <Text style={styles.numberOfPosts}>{postCount} posts</Text>
          </View>
        }
        contentContainerStyle={styles.postsContainer}
        data={posts}
        renderItem={({ item }) => (
          <Post key={item._id} postData={item} navigation={navigation} />
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
    marginBottom: 2,
    alignItems: "center"
  },
  feedBannerTop: {
    flexDirection: "row",
    justifyContent: "flex-start",
    alignItems: "center"
  },
  profilePicture: {
    width: 60,
    height: 60,
    borderRadius: 60 / 2
  },
  name: {
    color: colors.primaryFontColor,
    fontSize: 20,
    marginLeft: 10,
    fontWeight: "500"
  },
  removeFriendButton: {
    justifyContent: "center",
    width: 150,
    height: 40,
    backgroundColor: colors.defaultButtonColor,
    borderRadius: 7,
    marginLeft: 72
  },
  removeFriendButtonText: {
    color: colors.primaryFontColor,
    textAlign: "center"
  },
  numberOfPosts: {
    color: colors.primaryFontColor,
    marginTop: 10,
    fontSize: 30
  },
  makeNewPostText: {
    color: colors.formPlaceholderColor,
    marginLeft: 10
  },
  postsContainer: {
    alignItems: "center"
  }
});

export default UserProfile;
