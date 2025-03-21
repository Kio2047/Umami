import { View, Text, TouchableOpacity, Image } from "react-native";
import React from "react";
import { Ionicons } from "@expo/vector-icons";

import styles from "./FeedHeader.styles";
import useUser from "../../contexts/UserContext/useUser";

const FeedHeader = () => {
  const { user } = useUser();
  if (!user) throw new Error("Error - user not yet initialised");
  const { name, profileImageURL } = user.data;
  return (
    <View style={styles.feedBanner}>
      <Text style={styles.userGreeting}>
        Good evening, {name.split(" ")[0]}
      </Text>
      <View style={styles.feedIconsContainer}>
        <TouchableOpacity activeOpacity={0.5}>
          <Ionicons name="notifications-outline" size={26} color="white" />
        </TouchableOpacity>
        <TouchableOpacity activeOpacity={0.5}>
          <Ionicons name="settings-outline" size={26} color="white" />
        </TouchableOpacity>
      </View>
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
