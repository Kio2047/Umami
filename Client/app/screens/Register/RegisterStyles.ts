import { StyleSheet } from "react-native";

import colors from "../../colors";

export default StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.testColor,
    justifyContent: "center",
    alignItems: "center"
  },
  logo: {
    width: 200,
    height: 200,
    marginBottom: 30
  }
});
