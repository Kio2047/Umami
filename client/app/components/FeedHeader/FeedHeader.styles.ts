import { StyleSheet } from "react-native";

import { colors } from "../../constants/styles/styleConstants";

export default StyleSheet.create({
  feedBanner: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    width: "94%",
    paddingTop: 20
    // paddingVertical: 10
    // marginBottom: 2
  },
  // feedBannerTop: {
  //   flexDirection: "row"
  // },
  userGreeting: {
    color: colors.primaryFontColor,
    fontSize: 23,
    fontWeight: "500"
  },
  feedIconsContainer: {
    flexDirection: "row",
    gap: 10
  }
  // newPostField: {
  //   flexDirection: "row",
  //   justifyContent: "space-evenly",
  //   // alignItems: "center",
  //   marginTop: 10,
  //   // paddingVertical: 20,
  //   // paddingHorizontal: 15,
  //   backgroundColor: colors.formInputBackgroundColor
  //   // borderRadius: 10
  // },
  // userProfilePicture: {
  //   width: 45,
  //   height: 45,
  //   borderRadius: 45 / 2
  // },
  // makeNewPostText: {
  //   color: colors.formPlaceholderColor,
  //   marginLeft: 10
  // },
  // makePostButton: {
  //   width: 400,
  //   height: 113,
  //   borderTopLeftRadius: 10,
  //   borderTopRightRadius: 10,
  //   flexDirection: "row",
  //   justifyContent: "space-between",
  //   alignItems: "center"
  //   // padding: 30
  // }
  // makePostButtonV2: {

  // },
});
