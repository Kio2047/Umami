import { View, Text, StyleSheet, Button, SafeAreaView, TouchableOpacity, Image, FlatList } from "react-native"

import Post from "../components/Post";
import type { UserProfileScreenProps, Post as PostType } from "../types";
import { backgroundColor, bottomTabBorderColor, defaultButtonColor, formInputBackgroundColor, formPlaceholderColor, primaryFontColor } from "../colors"

const UserProfile = ( {route, navigation}: UserProfileScreenProps ) => {

  // Rather than filtering the posts from the original feed, this should make another fetch using the userID and get posts from the user's posts field
  let { profileUserID, profileUserProfilePictureURL, profileUserName, feedPosts } = route.params;

  const displayedPosts = feedPosts.filter((post) => post.authorID === profileUserID);
  const postCount = displayedPosts.length;

  // const mockPosts = [mockPost];
  return (
    <SafeAreaView style={styles.container}>

      <FlatList
        style={styles.flatList}
        ListHeaderComponent={
        <View style={styles.feedBanner}>
          <View style={styles.feedBannerTop}>
            <Image style={styles.profilePicture} source={{ uri: profileUserProfilePictureURL }}></Image>
            <Text style={styles.name}>{profileUserName}</Text>
            <TouchableOpacity style={styles.removeFriendButton}>
              <Text style={styles.removeFriendButtonText}>Remove friend</Text>
            </TouchableOpacity>
          </View>
          <Text style={styles.numberOfPosts}>{postCount} posts</Text>
        </View>
      }
        contentContainerStyle={styles.postsContainer}
        data={displayedPosts}
        renderItem={({item}) => <Post postData={item} navigation={navigation} feedPosts={[]}></Post>}
      />
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: backgroundColor,
    justifyContent: "flex-start",
    alignItems: "center",
    overflow: "scroll",
  },
  flatList: {
    width: "100%",
    borderBottomLeftRadius: 10,
    borderBottomRightRadius: 10,
    // backgroundColor: "blue",
    paddingVertical: 10,
    paddingHorizontal: 10,
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
    alignItems: "center",
  },
  profilePicture: {
    width: 60,
    height: 60,
    borderRadius: 60 / 2
  },
  name: {
    color: primaryFontColor,
    fontSize: 20,
    marginLeft: 10,
    fontWeight: "500"
  },
  removeFriendButton: {
    justifyContent: "center",
    width: 150,
    height: 40,
    backgroundColor: defaultButtonColor,
    borderRadius: 7,
    marginLeft: 72
  },
  removeFriendButtonText: {
    color: primaryFontColor,
    textAlign: "center"
  },
  numberOfPosts: {
    color: primaryFontColor,
    marginTop: 10,
    fontSize: 30
  },
  makeNewPostText: {
    color: formPlaceholderColor,
    marginLeft: 10
  },
  postsContainer: {
    alignItems: "center",
  },

})

export default UserProfile