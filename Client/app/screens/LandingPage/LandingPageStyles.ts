import { StyleSheet } from "react-native";

import colors from "../../constants/colors";

export default StyleSheet.create({
  container: {
    paddingHorizontal: 30,
    flex: 1,
    justifyContent: "center",
    alignItems: "center"
    // backgroundColor: colors.errorColor
    // backgroundColor: colors.backgroundColor
  },
  logo: {
    width: 200,
    height: 200,
    marginBottom: 30
  },
  buttonContainer: {
    alignItems: "center"
  },
  topButton: {
    justifyContent: "center",
    width: 300,
    height: 50,
    backgroundColor: colors.defaultButtonColor,
    marginBottom: 15,
    borderRadius: 7
  },
  bottomButton: {
    justifyContent: "center",
    width: 50,
    height: 50,
    marginBottom: 15,
    borderRadius: 7
  },
  topButtonText: {
    textAlign: "center",
    color: colors.primaryFontColor,
    fontWeight: "500"
  },
  bottomButtonText: {
    textAlign: "center",
    color: colors.defaultButtonColor,
    fontWeight: "500"
  },
  horizontalRuleContainer: {
    flexDirection: "row",
    alignItems: "center"
  },
  ruleLine: {
    flex: 1,
    height: 1,
    backgroundColor: colors.primaryFontColor
  },
  ruleText: {
    width: 50,
    textAlign: "center",
    color: colors.primaryFontColor
  }
});
