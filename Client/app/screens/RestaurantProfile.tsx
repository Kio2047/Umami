import { View, Text, StyleSheet, Button, SafeAreaView, TouchableOpacity, Image, FlatList } from "react-native"

import Post from "../components/Post";
import type { RestaurantProfileScreenProps, Post as PostType } from "../types";
import { backgroundColor, bottomTabBorderColor, defaultButtonColor, formInputBackgroundColor, formPlaceholderColor, primaryFontColor } from "../colors"

const RestaurantProfile = ( {route, navigation}: RestaurantProfileScreenProps ) => {

  // Rather than filtering the posts from the original feed, this should make another fetch using the restaurantID and get posts from the restaurant's posts field
  let { restaurantID, restaurantName, feedPosts } = route.params;

  const displayedPosts = feedPosts.filter((post) => post.restaurantID._id === restaurantID);
  const postCount = displayedPosts.length;

  // const mockPosts = [mockPost];
  return (
    <SafeAreaView style={styles.container}>

      <FlatList
        style={styles.flatList}
        ListHeaderComponent={
        <View style={styles.feedBanner}>
          <Text style={styles.numberOfPosts}>{postCount} posts about <Text style={styles.restaurantName}>{restaurantName}</Text></Text>
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
  numberOfPosts: {
    color: primaryFontColor,
    marginTop: 10,
    marginBottom: 20,
    fontSize: 22
  },
  restaurantName: {
    fontWeight: "700"
  },
  makeNewPostText: {
    color: formPlaceholderColor,
    marginLeft: 10
  },
  postsContainer: {
    alignItems: "center",
  },

})

export default RestaurantProfile