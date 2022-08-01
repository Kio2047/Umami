import { View, Text, StyleSheet, Button, SafeAreaView, TouchableOpacity, Image, FlatList, ScrollView } from "react-native"
import React, { useEffect, useState } from "react";
import { AntDesign } from '@expo/vector-icons';
import { MaterialCommunityIcons } from '@expo/vector-icons';

import Post from "../components/Post";
import type { Post as PostType, FeedScreenProps } from "../types";
import { loadFeed } from "../apiClientService";
import { backgroundColor, bottomTabBorderColor, formInputBackgroundColor, formPlaceholderColor, primaryFontColor } from "../colors"
import * as mockPost from "../assets/mockdata"

const Feed = ( {route, navigation}: FeedScreenProps ) => {

  const {_id, name, profilePictureURL, posts, friends} = route.params.feedUserInfo

  const [feedPosts, setFeedPosts] = useState<PostType[]>([]);

  useEffect(() => {
    (async () => {
      const posts = await loadFeed(_id);
      // console.log(posts);
      console.log(posts[0]);
      posts.sort((a: PostType, b: PostType) => new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime());
      setFeedPosts(posts);
    })();
  }, [])

  // const mockPosts = [mockPost];

  return (
    <SafeAreaView style={styles.container}>

      <FlatList
        style={styles.postList}
        ListHeaderComponent={<TouchableOpacity
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

        </TouchableOpacity>}
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
    paddingVertical: 10,
    paddingHorizontal: 5,
    overflow: "scroll"
  },
  postList: {
    borderBottomLeftRadius: 10,
    borderBottomRightRadius: 10,
  },
  makePostButton: {
    width: 400,
    height: 113,
    borderTopLeftRadius: 10,
    borderTopRightRadius: 10,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    backgroundColor: formInputBackgroundColor,
    padding: 30,
  },
  leftIcon: {
    color: primaryFontColor
  },
  newPostIconAndText: {
    alignItems: "center"
  },
  rightIcon: {
    color: primaryFontColor,
    transform: [{scaleX: -1}]
  },
  makePostText: {
    marginTop: 10,
    color: primaryFontColor
  }
})

export default Feed