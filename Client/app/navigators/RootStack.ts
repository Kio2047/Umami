import {
  StackCardInterpolatedStyle,
  StackCardInterpolationProps,
  StackNavigationOptions,
  createStackNavigator
} from "@react-navigation/stack";
import { Animated } from "react-native";
import { Easing } from "react-native";

import { RootStackParamList } from "../Types/NavigationTypes";

export const RootStack = createStackNavigator<RootStackParamList>();

export const screenSlideStyleInterpolator = ({
  current,
  next,
  inverted,
  layouts: { screen }
}: StackCardInterpolationProps): StackCardInterpolatedStyle => {
  const progress = Animated.add(
    current.progress.interpolate({
      inputRange: [0, 1],
      outputRange: [0, 1],
      extrapolate: "clamp"
    }),
    next
      ? next.progress.interpolate({
          inputRange: [0, 1],
          outputRange: [0, 1],
          extrapolate: "clamp"
        })
      : 0
  );

  return {
    cardStyle: {
      transform: [
        {
          translateX: Animated.multiply(
            progress.interpolate({
              inputRange: [0, 1, 2],
              outputRange: [screen.width, 0, screen.width * -1],
              extrapolate: "clamp"
            }),
            inverted
          )
        }
      ]
    }
  };
};

export const customTransitionSpec = {
  animation: "timing" as const,
  config: {
    easing: Easing.bezier(0.29, 0.72, 0.66, 0.95),
    duration: 250
  }
};

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
