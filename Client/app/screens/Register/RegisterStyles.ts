import { StyleSheet } from "react-native";

import colors from "../../colors";

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
    marginBottom: 30
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
  passwordStrengthText: {
    marginTop: -12,
    fontSize: 12,
    width: 330
  },
  signUpButton: {
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
