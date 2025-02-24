import { StyleSheet } from "react-native";

import { colors } from "../../../../constants/styles/styleConstants";

export default StyleSheet.create({
  pressableWrapper: {
    flex: 1
  },
  container: {
    flex: 1,
    // justifyContent: "center",
    alignItems: "center",
    gap: 20,
    paddingTop: 60,
    paddingHorizontal: 20
  },
  logo: {
    width: 200,
    height: 200,
    marginBottom: 25
  },
  loginErrorText: {
    color: colors.errorColor,
    marginTop: -10,
    marginBottom: -11,
    padding: 0,
    maxWidth: 330,
    textAlign: "center"
  },
  loginButton: {
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
