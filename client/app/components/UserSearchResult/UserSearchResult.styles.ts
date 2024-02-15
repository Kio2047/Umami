import { StyleSheet } from "react-native";

export default StyleSheet.create({
  container: {
    // backgroundColor: "red",
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 10,
    // flex: 1
    height: 70,
    width: "100%",
    minWidth: "100%",
    gap: 10
  },
  profileImage: {
    width: 50,
    height: 50,
    borderRadius: 50
  },
  namesContainer: {},
  usernameText: {
    color: "white",
    fontWeight: "600"
  },
  nameText: {
    color: "white"
  }
});
