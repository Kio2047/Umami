import { StyleSheet } from "react-native";
import colors from "../../constants/colors";

export default StyleSheet.create({
  bottomTab: {
    position: "absolute",
    // TODO: calculate the height of the navigation bar on android and add bottom global app padding
    bottom: 50,
    justifyContent: "center",
    alignItems: "center",
    width: "100%",
    height: 50,
    borderTopColor: colors.bottomTabBorderColor,
    borderTopWidth: 1
  },
  bottomTabText: {
    color: colors.primaryFontColor
  },
  registerLink: {
    color: colors.primaryFontColor,
    textDecorationLine: "underline",
    fontWeight: "bold"
  }
});
