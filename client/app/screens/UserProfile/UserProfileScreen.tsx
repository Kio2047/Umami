import {
  View,
  Text,
  Button,
  TouchableOpacity,
  Image,
  FlatList
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

import { useEffect, useState } from "react";

import Post from "../../components/Post/Post";
import type {
  UserProfileScreenProps,
  Post as PostType
} from "../../types/OtherTypes";
import { colors } from "../../constants/styles/styleConstants";
import { getPostsByUser } from "../../services/api/apiClient";

const UserProfileScreen = ({ route, navigation }: UserProfileScreenProps) => {
  // Rather than filtering the posts from the original feed, this should make another fetch using the userID and get posts from the user's posts field
  let { profileUserID, profileUserprofileImageURL, profileUserName } =
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
                source={{ uri: profileUserprofileImageURL }}
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

export default UserProfileScreen;
