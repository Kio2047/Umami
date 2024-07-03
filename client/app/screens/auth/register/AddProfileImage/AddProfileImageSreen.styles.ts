import { StyleSheet } from "react-native";
import { colors } from "../../../../constants/styles/styleConstants";

export default StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "space-evenly",
    alignItems: "center",
    // paddingTop: 0,
    paddingHorizontal: 30
  },
  greetingText: {
    color: colors.primaryFontColor,
    fontSize: 40,
    textAlign: "center",
    marginBottom: 5
  },
  addPictureText: {
    color: colors.primaryFontColor,
    fontSize: 18,
    textAlign: "center"
  },
  addPictureButton: {},
  addPictureButtonPlus: {
    position: "absolute",
    bottom: 10,
    right: 10,
    backgroundColor: colors.primaryFontColor,
    borderColor: colors.defaultButtonColor,
    borderWidth: 3,
    height: 65,
    width: 65,
    borderRadius: 32.5,
    justifyContent: "center",
    alignItems: "center"
  },
  addPictureButtonPlusText: {
    position: "relative",
    bottom: 7,
    fontSize: 50,
    color: colors.defaultButtonColor
  },
  skipButtonText: {
    color: colors.primaryFontColor,
    fontSize: 16,
    fontWeight: "500",
    textAlign: "center"
  },
  continueButton: {
    justifyContent: "center",
    width: 330,
    height: 50,
    backgroundColor: colors.defaultButtonColor,
    borderRadius: 7
  },
  skipButton: {},
  skipButtonImageSelected: {
    marginTop: 20
  },
  continueButtonText: {
    textAlign: "center",
    color: colors.primaryFontColor,
    fontWeight: "500",
    fontSize: 16
  },
  profileImage: {
    height: 200,
    width: 200,
    borderRadius: 100
  }
});
