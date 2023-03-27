import { View, Text, TouchableOpacity, Image } from "react-native";
import React from "react";
import { Ionicons } from "@expo/vector-icons";

import styles from "./FeedHeaderStyles";
import { StackScreenProps } from "../../Types/NavigationTypes";
import { SafeAreaView } from "react-native-safe-area-context";

const FeedHeader = ({
  navigation,
  userInfo
}: {
  navigation: StackScreenProps<"Feed">["navigation"];
  userInfo: { name: string; profileImageURL: string };
}) => {
  return (
    <View style={styles.feedBanner}>
      <Text style={styles.userGreeting}>
        Good evening, {userInfo.name.split(" ")[0]}
      </Text>
      <Ionicons name="settings-outline" size={26} color="white" />
      {/* <View style={styles.feedBannerTop}>

      </View> */}
      {/* <View style={styles.newPostField}>
        <Image
          style={styles.userProfilePicture}
          source={{ uri: userInfo.profileImageURL }}
        ></Image>
        <TouchableOpacity
          style={styles.makePostButton}
          // onPress={() =>
          //   navigation.navigate("CreateNewPost", {
          //     userInfo.profileImageURL,
          //     userInfo.setRefreshCount
          //   })
          // }
        >
          <Text style={styles.makeNewPostText}>
            Share a new eatery with your friends? 😋
          </Text>
        </TouchableOpacity>
      </View> */}
    </View>
  );
};

export default FeedHeader;
