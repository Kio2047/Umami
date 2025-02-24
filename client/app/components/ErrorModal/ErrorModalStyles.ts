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
    backgroundColor: colors.modalBackground,
    zIndex: 1
  },
  modalContainer: {
    width: "80%",
    padding: 20,
    backgroundColor: colors.primaryFontColor,
    borderRadius: 4,
    alignItems: "center"
  },
  modalTitle: {
    marginTop: 10,
    fontSize: 22,
    fontWeight: 700,
    textAlign: "center"
  },
  modalBody: {
    marginTop: 10,
    fontSize: 16,
    textAlign: "left"
  },
  button: {
    marginTop: 10,
    alignSelf: "flex-end"
  },
  buttonText: {
    fontWeight: 700
  }
});
