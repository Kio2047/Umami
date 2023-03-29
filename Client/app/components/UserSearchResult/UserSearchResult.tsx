import { Image, Text, View } from "react-native";
import React from "react";

import styles from "./UserSearchResultStyles";
import { TouchableOpacity } from "react-native-gesture-handler";

const UserSearchResult = ({
  profileImageURL,
  name,
  username
}: Record<"profileImageURL" | "name" | "username", string>) => {
  return (
    <TouchableOpacity style={styles.container} activeOpacity={0.5}>
      <Image style={styles.profileImage} source={{ uri: profileImageURL }} />
      <View>
        <Text style={styles.usernameText}>{username}</Text>
        <Text style={styles.nameText}>{name}</Text>
      </View>
    </TouchableOpacity>
  );
};

export default UserSearchResult;
