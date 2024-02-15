import { StyleSheet } from "react-native";
import { colors } from "../../constants/styleConstants";

export default StyleSheet.create({
  container: {
    flex: 1
  },
  scrollview: {
    paddingHorizontal: 23
  },
  scrollViewList: {
    paddingTop: 15,
    paddingBottom: 20
  },
  newPostBanner: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    width: "100%"
  },
  newPostBannerImage: {
    width: 50,
    height: 50,
    borderRadius: 50 / 2
  },
  newPostBannerText: {
    color: colors.primaryFontColor,
    fontSize: 40,
    fontWeight: "600"
  },
  inputContainer: {
    marginTop: 20,
    marginBottom: 10,
    width: "100%"
  },
  inputLabel: {
    color: colors.primaryFontColor,
    fontSize: 25,
    fontWeight: "500",
    marginBottom: 5
  },
  eateryInput: {
    color: colors.primaryFontColor,
    backgroundColor: colors.formInputBackgroundColor,
    width: "100%",
    height: 50,
    padding: 10,
    borderRadius: 7
  },
  addImagesButton: {
    backgroundColor: colors.formInputBackgroundColor,
    // backgroundColor: defaultButtonColor,
    alignItems: "center",
    width: "100%",
    padding: 15,
    borderRadius: 6
  },
  addImagesButtonText: {
    color: colors.primaryFontColor,
    marginTop: 5
  },
  imageContainer: {
    flexDirection: "row",
    flexWrap: "wrap"
  },
  addedImage: {
    width: 100,
    height: 100,
    borderRadius: 3,
    marginTop: 5,
    marginRight: 5
  },
  ratingsContainer: {
    flexDirection: "row",
    flexWrap: "wrap-reverse",
    justifyContent: "center",
    marginTop: 5
  },
  ratingContainer: {
    width: "40%",
    alignItems: "center",
    justifyContent: "space-evenly"
  },
  ratingTitle: {
    color: colors.primaryFontColor,
    fontSize: 18.5,
    fontWeight: "500"
  },
  flexboxSpaceCreator: {
    width: "10%",
    backgroundColor: colors.backgroundColor
  },
  titleInput: {
    color: colors.primaryFontColor,
    backgroundColor: colors.formInputBackgroundColor,
    width: "100%",
    height: 50,
    padding: 10,
    borderTopLeftRadius: 6,
    borderTopRightRadius: 6
  },
  titleBodySeparator: {
    height: 2,
    backgroundColor: colors.bottomTabBorderColor
  },
  bodyInput: {
    color: colors.primaryFontColor,
    backgroundColor: colors.formInputBackgroundColor,
    width: "100%",
    height: 120,
    padding: 10,
    borderBottomLeftRadius: 6,
    borderBottomRightRadius: 6,
    textAlignVertical: "top"
  },
  submitButton: {
    justifyContent: "center",
    width: "100%",
    height: 70,
    backgroundColor: colors.defaultButtonColor,
    borderRadius: 7,
    marginTop: 30
  },
  submitButtonText: {
    textAlign: "center",
    color: colors.primaryFontColor,
    fontSize: 25,
    fontWeight: "500"
  }
});
