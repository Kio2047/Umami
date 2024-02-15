import { Image, Text, View } from "react-native";
import React from "react";

import styles from "./UserSearchResultStyles";
import { TouchableOpacity } from "react-native-gesture-handler";
import { MaterialIcons } from "@expo/vector-icons";

const UserSearchResult = ({
  profileImageURL,
  name,
  username,
  followed
}: Record<"profileImageURL" | "name" | "username", string> & {
  followed: boolean;
}) => {
  return (
    <TouchableOpacity style={styles.container} activeOpacity={0.7}>
      <Image style={styles.profileImage} source={{ uri: profileImageURL }} />
      <View style={styles.namesContainer}>
        <Text style={styles.usernameText}>{username}</Text>
        <Text style={styles.nameText}>{name}</Text>
      </View>
      <TouchableOpacity>
        {followed ? (
          <MaterialIcons name="person-remove" size={24} color="white" />
        ) : (
          <MaterialIcons name="person-add" size={24} color="white" />
        )}
      </TouchableOpacity>
    </TouchableOpacity>
  );
};

export default UserSearchResult;
