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

  postsContainer: {
    alignItems: "center"
  },
  noPostsContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    paddingHorizontal: 40,
    gap: 28
  },
  eatSleepRepeatIconsContainer: {
    flexDirection: "row",
    alignItems: "center",
    gap: 28
  },
  noFollowsYetHeading: {
    fontSize: 20,
    fontWeight: "600",
    color: colors.primaryFontColor,
    textAlign: "center"
  },
  noFollowsYetMessage: {
    fontSize: 15,
    fontWeight: "300",
    color: colors.primaryFontColor,
    textAlign: "center"
  },
  findFriendsButton: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    gap: 5,
    width: 300,
    height: 50,
    backgroundColor: colors.defaultButtonColor,
    borderRadius: 7
  },
  findFriendsButtonText: {
    color: colors.primaryFontColor,
    fontWeight: "600"
  }

  // leftIcon: {
  //   color: primaryFontColor
  // },
  // newPostIconAndText: {
  //   alignItems: "center"
  // },
  // rightIcon: {
  //   color: primaryFontColor,
  //   transform: [{scaleX: -1}]
  // },
  // makePostText: {
  //   marginTop: 10,
  //   color: primaryFontColor
  // }
});
