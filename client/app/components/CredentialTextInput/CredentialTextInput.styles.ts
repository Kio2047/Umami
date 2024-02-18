import { StyleSheet } from "react-native";
import { colors } from "../../constants/styleConstants";

export default StyleSheet.create({
  container: {
    width: "100%",
    gap: 10
  },
  pressable: {
    height: 58,
    backgroundColor: colors.formInputBackgroundColor,
    color: colors.primaryFontColor,
    borderRadius: 6,
    borderWidth: 0.4,
    // position: "relative",
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center"
  },
  highlightedPressable: {
    borderColor: colors.fieldHighlightedBorderColor
  },
  focusedPressable: {
    borderColor: colors.fieldFocusedBorderColor
  },
  errorPressable: {
    borderColor: colors.errorColor,
    color: colors.errorColor
  },
  placeholder: {
    position: "absolute",
    left: 12,
    zIndex: 1
  },
  input: {
    height: 50,
    paddingHorizontal: 12,
    width: "100%",
    color: colors.primaryFontColor,
    position: "relative",
    top: 4
  },
  // errorText: {
  //   color: colors.errorColor,
  //   position: "relative"
  //   // top: 40
  // },
  inputIcon: {
    position: "absolute",
    right: 10
  }
});
