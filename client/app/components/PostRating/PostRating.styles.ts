import { StyleSheet } from "react-native";
import { colors } from "../../constants/styles/styleConstants";

export default StyleSheet.create({
  container: {
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center"
  },
  ratingTitle: {
    fontWeight: "700",
    color: colors.primaryFontColor,
    textAlign: "center"
  },
  scoreContainer: {
    flexDirection: "row",
    alignItems: "flex-end"
  },
  score: {
    color: colors.primaryFontColor,
    fontSize: 28,
    fontWeight: "bold"
  },
  separator: {
    color: colors.primaryFontColor,
    fontSize: 16,
    fontWeight: "normal",
    position: "relative",
    top: 1
  }
});
