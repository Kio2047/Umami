import {
  View,
  Text,
  Button,
  TouchableOpacity,
  Image,
  FlatList,
  ScrollView
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import React, { useContext, useEffect, useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { Ionicons } from "@expo/vector-icons";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { FontAwesome } from "@expo/vector-icons";

import { useTheme } from "@react-navigation/native";

import Post from "../../components/Post";
// import type { Post as PostType, FeedScreenProps } from "../../types";
// import { getFeedPosts, getUserInfo } from "../../services/api/apiClient";
import colors from "../../colors";
import { AppTabProps, StackScreenProps } from "../../Types/NavigationTypes";
import { AuthContext } from "../../contexts/AuthContext";
import styles from "./FeedStyles";
import { GetUserCardInfoResponse } from "../../Types/APIResponseTypes";
import FeedHeader from "../../components/FeedHeader/FeedHeader";

const Feed = ({
  navigation
}: {
  navigation: AppTabProps<"Feed">["navigation"];
}) => {
  // const { colors } = useTheme();
  // console.log(colors);
  // console.log("hey");
  const { userID } = useContext(AuthContext)[0];

  // const userInfo = useQuery(["userInfo", userID], getUserInfo);
  // const feedPosts = useQuery(["feedPosts"], getFeedPosts);

  // let { _id, name, profileImageURL, posts, friends } =
  //   route.params.feedUserInfo;
  // const firstName = name.match(/[a-z]+/i);

  const [userDetails, setUserDetails] = useState<GetUserCardInfoResponse>({
    // email: "heyo",
    // followers: [],
    // following: [],
    name: "Kio Shiraz",
    profileImageURL:
      "https://scontent.flhr4-3.fna.fbcdn.net/v/t31.18172-8/10450103_513118792154440_1378950822863431258_o.jpg?_nc_cat=101&ccb=1-7&_nc_sid=09cbfe&_nc_ohc=rBWtA6N7D9EAX91YHpj&_nc_ht=scontent.flhr4-3.fna&oh=00_AfC3_mWZtocBh9PPXfvgf2lJeRYOaOnzIb_uyj55R8JQdg&oe=644931C5",
    username: "Halloumi_King"
  });

  const [isLoading, setIsLoading] = useState(true);
  // const [posts, setPosts] = useState<PostType[]>([]);
  const [posts, setPosts] = useState<any[]>([]);
  const [refreshCount, setRefreshCount] = useState<number>(0);

  useEffect(() => {
    // (async () => {
    //   const posts = await getFeedPosts(_id);
    //   // TODO: deal with timestamps not getting converted into Date objects + also edit timestamp utils file when this is done
    //   posts.sort(
    //     (a: PostType, b: PostType) =>
    //       new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime()
    //   );
    //   setFeedPosts(posts);
    // })();
    setTimeout(() => {
      setIsLoading(false);
      setPosts([]);
    }, 1000);
  }, [refreshCount]);

  // console.log("feed posts are:", feedPosts);

  // const mockPosts = [mockPost];
  if (!posts.length) {
    return (
      <SafeAreaView style={styles.container}>
        <FeedHeader
          userInfo={{
            name: userDetails.name,
            profileImageURL: userDetails.profileImageURL
          }}
        />
        <View style={styles.noPostsContainer}>
          <View style={styles.eatSleepRepeatIconsContainer}>
            <Ionicons name="fast-food-outline" size={60} color="white" />
            <MaterialCommunityIcons name="sleep" size={60} color="white" />
            <FontAwesome name="repeat" size={60} color="white" />
          </View>
          <View>
            <Text style={styles.noFollowsYetHeading}>Welcome to Umami</Text>
            <Text style={styles.noFollowsYetMessage}>
              Follow your friends and start sharing your food experiences!
            </Text>
          </View>
          <TouchableOpacity
            style={styles.findFriendsButton}
            activeOpacity={0.5}
            onPress={() => navigation.navigate("Search")}
          >
            <Ionicons name="search" size={24} color="white" />
            <Text style={styles.findFriendsButtonText}>Find your friends</Text>
          </TouchableOpacity>
        </View>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={styles.container}>
      <FlatList
        style={styles.flatList}
        ListHeaderComponent={FeedHeader}
        contentContainerStyle={styles.postsContainer}
        data={posts}
        renderItem={({ item }) => (
          <View></View>
          // <Post postData={item} navigation={navigation}></Post>
        )}
      />
    </SafeAreaView>
  );
};

export default Feed;
