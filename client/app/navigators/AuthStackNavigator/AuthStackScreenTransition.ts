import {
  StackCardInterpolatedStyle,
  StackCardInterpolationProps
} from "@react-navigation/stack";
import { Animated, Easing } from "react-native";

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
