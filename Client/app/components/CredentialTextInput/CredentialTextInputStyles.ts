import { StyleSheet } from "react-native";
import colors from "../../colors";

export default StyleSheet.create({
  input: {
    color: colors.primaryFontColor,
    backgroundColor: colors.formInputBackgroundColor,
    width: 330,
    height: 50,
    padding: 10,
    marginBottom: 15,
    borderRadius: 3,
    // borderColor: "red",
    borderWidth: 0.5
  },
  highlightedInput: {
    color: colors.primaryFontColor,
    backgroundColor: colors.formInputBackgroundColor,
    width: 330,
    height: 50,
    padding: 10,
    marginBottom: 15,
    borderRadius: 3,
    borderColor: colors.formHighlightedBorderColor,
    borderWidth: 0.5
  }
});
