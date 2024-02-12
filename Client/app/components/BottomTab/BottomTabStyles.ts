import { StyleSheet } from "react-native";
import colors from "../../constants/colors";

export default StyleSheet.create({
  bottomTab: {
    position: "absolute",
    bottom: 0,
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
