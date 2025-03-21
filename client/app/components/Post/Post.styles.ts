import { StyleSheet } from "react-native";

import { colors } from "../../constants/styles/styleConstants";

// const gap = 5;
const horizontalPadding = 15;
const imageSize = 350;

export default StyleSheet.create({
  container: {
    flexDirection: "column",
    gap: 10,
    marginTop: 15
    // borderBottomColor: bottomTabBorderColor,
    // borderBottomWidth: 2,
    // maxHeight: 500,
    // below should be converted to a percentage
    // borderRadius: 15,
    // borderColor: colors.bottomTabBorderColor,
    // borderWidth: 0.5,
    // paddingBottom: 10
  },
  postBannerContainer: {
    paddingHorizontal: horizontalPadding,
    // paddingVertical: 12,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center"
  },
  postInfo: {
    flexDirection: "row"
    // alignItems: "center"
  },
  profilePicture: {
    width: 35,
    height: 35,
    borderRadius: 35 / 2
  },
  postBannerTextContainer: {
    marginLeft: 10
  },
  authorName: {
    color: colors.primaryFontColor,
    fontWeight: "bold"
  },
  subheading: {
    // marginTop: -2,
    color: colors.primaryFontColor,
    fontSize: 12,
    fontWeight: "300"
  },
  restaurantName: {
    fontWeight: "500"
  },
  otherProfiles: {
    fontWeight: "500"
  },
  postDate: {
    color: colors.primaryFontColor
  },
  postImage: {},
  dotsContainer: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center"
  },
  dot: {
    width: 6,
    height: 6,
    borderRadius: 4,
    backgroundColor: "rgba(255, 255, 255, 0.5)",
    marginHorizontal: 3
  },
  activeDot: {
    backgroundColor: "#fff"
  },
  ratingsContainer: {
    paddingHorizontal: horizontalPadding,
    flexDirection: "row",
    justifyContent: "space-around"
  },
  reviewTextContainer: {
    width: "100%",
    paddingHorizontal: horizontalPadding
    // paddingBottom: 8,
  },
  reviewTitle: {
    color: colors.primaryFontColor,
    fontWeight: "bold",
    fontSize: 20
  },
  reviewMainText: {
    color: colors.primaryFontColor,
    lineHeight: 18
  }
});
