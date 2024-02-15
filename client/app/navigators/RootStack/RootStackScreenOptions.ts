import { StackNavigationOptions } from "@react-navigation/stack";
import {
  customTransitionSpec,
  screenSlideStyleInterpolator
} from "./RootStackScreenTransition";

export const stackScreenOptions: StackNavigationOptions = {
  headerShown: true,
  gestureEnabled: true,
  cardStyleInterpolator: screenSlideStyleInterpolator,
  transitionSpec: {
    open: customTransitionSpec,
    close: customTransitionSpec
  },
  headerStyle: {
    backgroundColor: "transparent",
    elevation: 0,
    shadowOpacity: 0
  },
  headerTitleStyle: {
    display: "none"
  },
  headerLeftContainerStyle: {
    marginTop: 3,
    marginLeft: 4
  },
  headerTintColor: "#fff",
  headerBackTitleVisible: false,
  headerTransparent: true
};
