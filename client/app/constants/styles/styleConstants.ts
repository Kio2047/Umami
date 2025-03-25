import { Dimensions, StatusBar } from "react-native";

export const navBarHeight = Math.max(
  Dimensions.get("screen").height -
    Dimensions.get("window").height -
    (StatusBar.currentHeight ?? 0),
  0
);

export const screenBottomPadding = navBarHeight + 50;

export const colors = {
  backgroundColor: "#0c0f14",
  primaryFontColor: "#fcfcfc",
  defaultButtonColor: "#096082",
  // defaultButtonColor: "#053837",
  // defaultButtonColor: "#1e4aba",
  formInputBackgroundColor: "#11242b",
  fieldPlaceholderColor: "#9e9e9e",
  fieldFocusedPlaceholderColor: "#fcfcfc",
  fieldFocusedBorderColor: "#fcfcfc",
  fieldHighlightedPlaceholderColor: "#ff4d27",
  fieldHighlightedBorderColor: "#ff4d27",
  bottomTabBorderColor: "#2b2b2b",
  ratingsColor: "#ff9d0a",
  errorColor: "#ed4956",
  modalBackground: "#00000080"
};
