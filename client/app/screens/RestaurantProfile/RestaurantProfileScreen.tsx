import {
  View,
  Text,
  Button,
  TouchableOpacity,
  Image,
  FlatList
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

import Post from "../../components/Post/Post";
import type {
  RestaurantProfileScreenProps,
  Post as PostType
} from "../../types/CredentialFormTypes";
import { colors } from "../../constants/styleConstants";

const RestaurantProfileScreen = ({
  route,
  navigation
}: RestaurantProfileScreenProps) => {
  // Rather than filtering the posts from the original feed, this should make another fetch using the restaurantID and get posts from the restaurant's posts field
  let { restaurantID, restaurantName, feedPosts } = route.params;

  const displayedPosts = feedPosts.filter(
    (post) => post.restaurantID._id === restaurantID
  );
  const postCount = displayedPosts.length;

  // const mockPosts = [mockPost];
  return (
    <SafeAreaView style={styles.container}>
      <FlatList
        style={styles.flatList}
        ListHeaderComponent={
          <View style={styles.feedBanner}>
            <Text style={styles.numberOfPosts}>
              {postCount} posts about{" "}
              <Text style={styles.restaurantName}>{restaurantName}</Text>
            </Text>
          </View>
        }
        contentContainerStyle={styles.postsContainer}
        data={displayedPosts}
        renderItem={({ item }) => (
          <Post postData={item} navigation={navigation} feedPosts={[]}></Post>
        )}
      />
    </SafeAreaView>
  );
};

export default RestaurantProfileScreen;
