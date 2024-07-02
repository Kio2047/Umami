import { StyleSheet } from "react-native";

import { colors } from "../../constants/styles/styleConstants";

export default StyleSheet.create({
  modalContainer: {
    width: "80%",
    padding: 20,
    backgroundColor: colors.primaryFontColor,
    borderRadius: 10,
    alignItems: "center",
    justifyContent: "center",
    alignSelf: "center"
  },
  modalText: {
    marginTop: 15,
    fontSize: 16,
    color: "black"
  }
});
