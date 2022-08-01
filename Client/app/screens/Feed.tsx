import { View, Text, StyleSheet, Button, SafeAreaView, TouchableOpacity, Image, FlatList, ScrollView } from "react-native"
import React, { useEffect, useState } from "react";
import { AntDesign, Ionicons, MaterialCommunityIcons } from '@expo/vector-icons';

import Post from "../components/Post";
import type { Post as PostType, FeedScreenProps } from "../types";
import { loadFeed } from "../apiClientService";
import { backgroundColor, bottomTabBorderColor, formInputBackgroundColor, formPlaceholderColor, primaryFontColor } from "../colors"
import * as mockPost from "../assets/mockdata"

const Feed = ( {route, navigation}: FeedScreenProps ) => {

  let {_id, name, profilePictureURL, posts, friends} = route.params.feedUserInfo
  const firstName = name.match(/[a-z]+/i);

  const [feedPosts, setFeedPosts] = useState<PostType[]>([]);

  useEffect(() => {
    (async () => {
      const posts = await loadFeed(_id);
      // TODO: deal with timestamps not getting converted into Date objects + also edit timestamp utils file when this is done
      posts.sort((a: PostType, b: PostType) => new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime());
      setFeedPosts(posts);
    })();
  }, [])

  // const mockPosts = [mockPost];
  return (
    <SafeAreaView style={styles.container}>

      <FlatList
        style={styles.flatList}
        ListHeaderComponent={
        <View style={styles.feedBanner}>
          <View style={styles.feedBannerTop}>
            <Text style={styles.userGreeting}>Good afternoon, {firstName}</Text>
            <Ionicons name="settings-outline" size={26} color="white" />
          </View>
          <View style={styles.newPostField}>
            <Image style={styles.userProfilePicture} source={{ uri: profilePictureURL }}></Image>
            <TouchableOpacity
              // style={styles.makePostButtonV2}
              onPress={() => navigation.navigate("About", {
                title: "Testing 1",
                body: "Testing 2"
              })}
            >
              <Text style={styles.makeNewPostText}>Share new eateries with your friends! 😋</Text>
            </TouchableOpacity>
          </View>



        {/* <TouchableOpacity
          style={styles.makePostButton}
          onPress={() => navigation.navigate("About", {
            title: "Testing 1",
            body: "Testing 2"
          })}
        >
          <MaterialCommunityIcons style={styles.leftIcon} name="silverware-fork" size={50} color="black" />
          <View style={styles.newPostIconAndText}>
            <AntDesign name="pluscircleo" size={50} color="white" />
            <Text style={styles.makePostText}>Make new post</Text>
          </View>
          <MaterialCommunityIcons style={styles.rightIcon} name="silverware-spoon" size={50} color="black" />

        </TouchableOpacity> */}
        </View>
      }
        contentContainerStyle={styles.postsContainer}
        data={feedPosts}
        renderItem={({item}) => <Post postData={item}></Post>}
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
    minWidth: "100%",
    // height: 200,
    paddingVertical: 10,
    // backgroundColor: "red"
  },
  feedBannerTop: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center"
  },
  userGreeting: {
    color: primaryFontColor,
    fontSize: 23,
    fontWeight: "500",
  },
  newPostField: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: 10,
    paddingVertical: 20,
    paddingHorizontal: 15,
    backgroundColor: formInputBackgroundColor,
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
    color: formPlaceholderColor,
    marginLeft: 10
  },
  postsContainer: {
    alignItems: "center"
  },

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
})

export default Feed