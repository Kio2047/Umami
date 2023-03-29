import { View, Text, Keyboard } from "react-native";
import {
  FlatList,
  TextInput,
  TouchableOpacity
} from "react-native-gesture-handler";
import React, { useEffect, useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
// import { useIsFocused } from "@react-navigation/native";

import { MaterialCommunityIcons } from "@expo/vector-icons";

import styles from "./SearchStyles";
import colors from "../../colors";
import { useQuery } from "@tanstack/react-query";
import { AppTabProps } from "../../Types/NavigationTypes";
import { searchForUsers } from "../../services/api/apiClient";

const Search = ({
  navigation
}: {
  navigation: AppTabProps<"Search">["navigation"];
}) => {
  const [searchInputText, setSearchInputText] = useState("");

  const searchResults = useQuery(["users", searchInputText], searchForUsers, {
    enabled: !!searchInputText,
    staleTime: 0,
    cacheTime: 1000 * 60 * 5
  });
  // const isFocused = useIsFocused();

  // if (!isFocused) return null;

  useEffect(() => {
    console.log("mounting!");
    return () => {
      console.log("unmounting!");
    };
  }, []);

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.searchContainer}>
        <View style={styles.searchBarContainer}>
          <MaterialCommunityIcons name="magnify" color="white" size={30} />
          <TextInput
            style={styles.searchBar}
            placeholder="Search"
            placeholderTextColor={colors.formPlaceholderColor}
            value={searchInputText}
            onChangeText={(text) => setSearchInputText(text)}
          />
        </View>
        <TouchableOpacity
          style={styles.cancelButton}
          onPress={() => {
            Keyboard.dismiss();
            setTimeout(() => navigation.navigate("Feed"), 150);
          }}
        >
          <Text style={styles.cancelButtontext}>Cancel</Text>
        </TouchableOpacity>
      </View>
      <FlatList
        // style={styles.searchResultsList}
        // ListHeaderComponent={}
        // contentContainerStyle={styles.postsContainer}
        data={searchResults.data}
        renderItem={({ item }) => (
          <View></View>
          // <Post postData={item} navigation={navigation}></Post>
        )}
      />
    </SafeAreaView>
  );
};

export default Search;
