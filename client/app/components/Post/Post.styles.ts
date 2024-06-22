import { StyleSheet } from "react-native";

import { colors } from "../../constants/styles/styleConstants";

const gap = 5;

export default StyleSheet.create({
  container: {
    // borderBottomColor: bottomTabBorderColor,
    // borderBottomWidth: 2,
    // maxHeight: 500,
    // below should be converted to a percentage
    width: 400,
    // borderRadius: 15,
    borderColor: colors.bottomTabBorderColor,
    borderWidth: 0.5,
    backgroundColor: colors.backgroundColor,
    paddingBottom: 10
  },
  postBanner: {
    paddingHorizontal: 10,
    paddingVertical: 12,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center"
    // backgroundColor: "red"
  },
  postInfo: {
    flexDirection: "row",
    alignItems: "center"
  },
  profilePicture: {
    width: 45,
    height: 45,
    borderRadius: 45 / 2
  },
  postBannerTextContainer: {
    marginLeft: 10
  },
  authorName: {
    color: colors.primaryFontColor,
    fontWeight: "bold"
  },
  subheading: {
    marginTop: -2,
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
  imageContainer: {
    flexDirection: "row",
    width: "100%",
    height: 500 / 3
    // overflow: "scroll"
  },
  postImage: {
    width: 500 / 3,
    height: 500 / 3,
    marginLeft: 10,
    borderRadius: 3
  },
  ratingsContainer: {
    flexDirection: "row",
    justifyContent: "space-evenly",
    marginTop: 10
  },
  ratingContainer: {
    alignItems: "center",
    paddingVertical: gap / -2,
    paddingHorizontal: 5
  },
  ratingTitle: {
    fontWeight: "700",
    color: colors.primaryFontColor,
    marginVertical: gap / 2
  },
  rating: {
    marginVertical: gap / 2
  },
  reviewTextContainer: {
    width: "100%",
    marginTop: 7,
    paddingHorizontal: 10,
    paddingBottom: 8
  },
  reviewTitle: {
    color: colors.primaryFontColor,
    fontWeight: "bold",
    fontSize: 20
  },
  reviewMainText: {
    color: colors.primaryFontColor
  }
});
