import { StyleSheet } from "react-native";

import colors from "../../colors";

export default StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.backgroundColor,
    alignItems: "center",
    justifyContent: "center"
  },
  logo: {
    width: 200,
    height: 200,
    marginBottom: 25
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
    borderRadius: 7,
    marginTop: 20
  },
  buttonText: {
    textAlign: "center",
    color: colors.primaryFontColor,
    fontWeight: "500"
  }
});
