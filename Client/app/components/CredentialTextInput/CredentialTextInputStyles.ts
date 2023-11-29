import { StyleSheet } from "react-native";
import colors from "../../colors";

export default StyleSheet.create({
  container: {
    height: 58,
    width: 330,
    marginBottom: 20
  },
  pressable: {
    flex: 1,
    backgroundColor: colors.formInputBackgroundColor,
    borderRadius: 6,
    borderWidth: 0.4
  },
  placeholder: {
    position: "absolute",
    left: 12,
    zIndex: 1
  },
  highlightedPressable: {
    color: colors.primaryFontColor,
    borderColor: colors.fieldHighlightedBorderColor
  },
  focusedPressable: {
    color: colors.primaryFontColor,
    borderColor: colors.fieldFocusedBorderColor
  },
  input: {
    flex: 1,
    height: 50,
    position: "absolute",
    padding: 12,
    bottom: 0,
    color: colors.primaryFontColor,
    backgroundColor: "transparent"
  }
});
