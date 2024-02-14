import { StyleSheet } from "react-native";

import colors from "../../constants/colors";

export default StyleSheet.create({
  pressableWrapper: {
    flex: 1
  },
  container: {
    flex: 1,
    // backgroundColor: colors.backgroundColor,
    paddingTop: 60,
    paddingHorizontal: 20,
    // justifyContent: "center",
    alignItems: "center",
    gap: 23,
    width: "100%"
  },
  heading: {
    color: colors.primaryFontColor,
    alignSelf: "flex-start",
    fontSize: 28,
    fontWeight: "500",
    margin: 0
    // lineHeight: 30
    // backgroundColor: "#00FFFF"
  },
  additionalText: {
    color: colors.primaryFontColor,
    alignSelf: "flex-start",
    fontSize: 14.1,
    lineHeight: 18,
    marginTop: -8
    // backgroundColor: "#00FFFF"
  },
  submitButton: {
    justifyContent: "center",
    width: "100%",
    height: 50,
    backgroundColor: colors.defaultButtonColor,
    borderRadius: 7
  },
  buttonText: {
    color: colors.primaryFontColor,
    fontSize: 16,
    textAlign: "center",
    fontWeight: "500"
  }
});
