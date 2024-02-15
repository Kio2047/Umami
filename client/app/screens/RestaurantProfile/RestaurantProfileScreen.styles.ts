import { StyleSheet } from "react-native";

import { colors } from "../../constants/styleConstants";

export default StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.backgroundColor,
    justifyContent: "flex-start",
    alignItems: "center",
    overflow: "scroll"
  },
  flatList: {
    width: "100%",
    borderBottomLeftRadius: 10,
    borderBottomRightRadius: 10,
    // backgroundColor: "blue",
    paddingVertical: 10,
    paddingHorizontal: 10
  },
  feedBanner: {
    // width: "100%",
    minWidth: "97%",
    paddingVertical: 10,
    marginBottom: 2,
    alignItems: "center"
  },
  numberOfPosts: {
    color: colors.primaryFontColor,
    marginTop: 10,
    marginBottom: 20,
    fontSize: 22
  },
  restaurantName: {
    fontWeight: "700"
  },
  makeNewPostText: {
    color: colors.formPlaceholderColor,
    marginLeft: 10
  },
  postsContainer: {
    alignItems: "center"
  }
});
