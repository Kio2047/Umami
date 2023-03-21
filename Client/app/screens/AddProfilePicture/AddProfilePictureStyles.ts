import { StyleSheet } from "react-native";
import colors from "../../colors";

export default StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.backgroundColor,
    justifyContent: "space-between",
    alignItems: "center",
    paddingTop: 80,
    paddingBottom: 70
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
  addPictureButton: {
    // position: "relative"
    marginBottom: 40
  },
  addPictureButtonPlus: {
    position: "absolute",
    bottom: 10,
    right: 10,
    backgroundColor: "white",
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
    bottom: 10,
    fontSize: 50,
    color: colors.defaultButtonColor
  },
  skipButtonText: {
    color: colors.defaultButtonColor,
    fontSize: 18,
    fontWeight: "500",
    textAlign: "center"
    // marginTop: 40
  }
});
