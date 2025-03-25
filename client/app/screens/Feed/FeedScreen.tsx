import { View, Text, FlatList } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import React, { useMemo } from "react";
import { useInfiniteQuery } from "@tanstack/react-query";
import { Ionicons } from "@expo/vector-icons";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { FontAwesome } from "@expo/vector-icons";
import { useTheme } from "@react-navigation/native";

import styles from "./FeedScreen.styles";
import FeedHeader from "../../components/FeedHeader/FeedHeader";
import { getFeedPosts } from "../../services/api/apiClient";
import Post from "../../components/Post/Post";

const FeedScreen = () => {
  const { data, status } = useInfiniteQuery(["feedPosts"], getFeedPosts, {
    getNextPageParam: (lastPage) => {
      return lastPage.data.lastCreatedAt;
    }
  });

  const flatPosts = useMemo(() => {
    return data ? data.pages.flatMap((page) => page.data.posts) : [];
  }, [data?.pages]);
  return (
    <SafeAreaView style={styles.container} edges={["top", "left", "right"]}>
      {status === "loading" ? (
        <Text>Loading!</Text>
      ) : (
        <>
          <FlatList
            style={styles.flatList}
            ListHeaderComponent={<FeedHeader />}
            contentContainerStyle={styles.postsContainer}
            data={flatPosts}
            renderItem={({ item }) => <Post post={item} />}
          />
          {!flatPosts.length && (
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
              {/* <TouchableOpacity
                style={styles.findFriendsButton}
                activeOpacity={0.5}
                onPress={() => navigation.navigate("SearchScreen")}
              >
                <Ionicons name="search" size={24} color="white" />
                <Text style={styles.findFriendsButtonText}>
                  Find your friends
                </Text>
              </TouchableOpacity> */}
            </View>
          )}
        </>
      )}
    </SafeAreaView>
  );
};

export default FeedScreen;
