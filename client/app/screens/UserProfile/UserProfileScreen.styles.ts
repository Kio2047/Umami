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
  feedBannerTop: {
    flexDirection: "row",
    justifyContent: "flex-start",
    alignItems: "center"
  },
  profilePicture: {
    width: 60,
    height: 60,
    borderRadius: 60 / 2
  },
  name: {
    color: colors.primaryFontColor,
    fontSize: 20,
    marginLeft: 10,
    fontWeight: "500"
  },
  removeFriendButton: {
    justifyContent: "center",
    width: 150,
    height: 40,
    backgroundColor: colors.defaultButtonColor,
    borderRadius: 7,
    marginLeft: 72
  },
  removeFriendButtonText: {
    color: colors.primaryFontColor,
    textAlign: "center"
  },
  numberOfPosts: {
    color: colors.primaryFontColor,
    marginTop: 10,
    fontSize: 30
  },
  makeNewPostText: {
    color: colors.formPlaceholderColor,
    marginLeft: 10
  },
  postsContainer: {
    alignItems: "center"
  }
});
