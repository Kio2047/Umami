import { StyleSheet } from "react-native";

import colors from "../../colors";

export default StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.backgroundColor,
    alignItems: "center"
  },
  logo: {
    width: 200,
    height: 200
  },
  input: {
    color: colors.primaryFontColor,
    backgroundColor: colors.formInputBackgroundColor,
    width: 330,
    height: 50,
    padding: 10,
    marginBottom: 15,
    borderRadius: 3
  },
  invalidDetailsText: {
    color: "red",
    marginTop: -10,
    marginBottom: -11,
    padding: 0
  },
  loginButton: {
    justifyContent: "center",
    width: 330,
    height: 50,
    backgroundColor: colors.defaultButtonColor,
    borderRadius: 7
    // marginTop: 20
  },
  buttonText: {
    textAlign: "center",
    color: colors.primaryFontColor
  },
  bottomTab: {
    position: "absolute",
    bottom: 0,
    justifyContent: "center",
    alignItems: "center",
    width: "100%",
    height: 50,
    backgroundColor: colors.backgroundColor,
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
