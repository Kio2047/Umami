import { StyleSheet } from "react-native";
import colors from "../../colors";

export default StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "flex-start",
    paddingTop: 15,
    // paddingHorizontal: 10,
    backgroundColor: colors.backgroundColor
  },
  searchContainer: {
    // flex: 1,
    // backgroundColor: "red",
    paddingHorizontal: 10,
    flexDirection: "row",
    alignItems: "center"
  },
  searchBarContainer: {
    flex: 1,
    paddingLeft: 10,
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: colors.formInputBackgroundColor,
    borderRadius: 10
  },
  searchBar: {
    flex: 1,
    color: colors.primaryFontColor,
    backgroundColor: colors.formInputBackgroundColor,
    // width: 330,
    // height: 50,
    padding: 10,
    // marginBottom: 15,
    borderRadius: 10
  },
  cancelButton: {
    paddingHorizontal: 10
    // flex: 1,
  },
  cancelButtontext: {
    color: colors.primaryFontColor
  }
});
