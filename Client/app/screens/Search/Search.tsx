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
import UserSearchResult from "../../components/UserSearchResult/UserSearchResult";
import { getJWT, setJWT } from "../../services/deviceStorageClient";

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
  console.log(searchResults.data);
  // const isFocused = useIsFocused();

  // setJWT(
  //   "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiI2NDEwNGVkMzFhZGQ0MDJiYTdmOWVjYjkiLCJpYXQiOjE2Nzg4MTE1MTA2NDl9.7yiqOTXVnu1wVApAgcTh8t1aZCbuIt-7HaFPdvGa1YY"
  // );

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
        style={styles.resultsList}
        // ListHeaderComponent={
        //   <View>
        //     <Text style={{ color: "white" }}>Hello</Text>
        //   </View>
        // }
        contentContainerStyle={styles.resultsContainer}
        data={searchResults.data?.data.matchedUsers}
        renderItem={({ item }) => (
          // <Text style={{ color: "white" }}>Bye Bye!</Text>
          <UserSearchResult
          profileImageURL={item.profileImageURL}
          username={item.username}
          name={item.name}
          followed={follo}
          key={item._id}
          />
        )}
      />
    </SafeAreaView>
  );
};

export default Search;
