import { StyleSheet } from "react-native";

import { colors } from "../../constants/styles/styleConstants";

export default StyleSheet.create({
  overlay: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: colors.modalBackground
  },
  modalContainer: {
    width: "80%",
    padding: 20,
    backgroundColor: colors.primaryFontColor,
    borderRadius: 10,
    alignItems: "center"
  },
  modalText: {
    marginTop: 10,
    fontSize: 16,
    textAlign: "center"
  }
});
