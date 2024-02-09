import { StyleSheet } from "react-native";

import colors from "../../constants/colors";

export default StyleSheet.create({
  container: {
    flex: 1,
    // backgroundColor: colors.backgroundColor,
    paddingTop: 70,
    // justifyContent: "center",
    alignItems: "center"
  },
  // background: {
  //   position: "absolute",
  //   top: 0,
  //   left: 0,
  //   right: 0,
  //   bottom: 0,
  //   width: "100%"
  // },
  inputList: {
    gap: 20
  },
  logo: {
    width: 200,
    height: 200,
    marginBottom: 30
  },
  signUpButton: {
    justifyContent: "center",
    width: 330,
    height: 50,
    backgroundColor: colors.defaultButtonColor,
    borderRadius: 7,
    marginTop: 40
  },
  buttonText: {
    textAlign: "center",
    color: colors.primaryFontColor,
    fontWeight: "500"
  }
});
