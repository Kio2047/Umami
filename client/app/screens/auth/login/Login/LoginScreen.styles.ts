import { StyleSheet } from "react-native";

import { colors } from "../../../../constants/styles/styleConstants";

export default StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.backgroundColor,
    justifyContent: "center",
    alignItems: "center"
  },
  logo: {
    width: 200,
    height: 200,
    marginBottom: 25
  },
  loginErrorText: {
    color: "red",
    marginTop: -10,
    marginBottom: -11,
    padding: 0,
    maxWidth: 330,
    textAlign: "center"
  },
  loginButton: {
    justifyContent: "center",
    width: 330,
    height: 50,
    backgroundColor: colors.defaultButtonColor,
    borderRadius: 7
  },
  buttonText: {
    textAlign: "center",
    color: colors.primaryFontColor,
    fontWeight: "500"
  }
});
