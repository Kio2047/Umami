import React, { useEffect, useRef } from "react";
import {
  ActivityIndicator,
  Animated,
  TouchableWithoutFeedback,
  View,
  Text
} from "react-native";

import styles from "./LoadingModalStyles";

const LoadingModal = ({
  isVisible,
  text
}: {
  isVisible: boolean;
  text: string;
}) => {
  const fadeAnim = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    if (isVisible) {
      Animated.timing(fadeAnim, {
        toValue: 1,
        duration: 300,
        useNativeDriver: true
      }).start();
    } else {
      Animated.timing(fadeAnim, {
        toValue: 0,
        duration: 300,
        useNativeDriver: true
      }).start();
    }
  }, [isVisible]);

  if (!isVisible) {
    return null;
  }

  return (
    <TouchableWithoutFeedback>
      <View style={styles.overlay}>
        <Animated.View style={[styles.modalContainer, { opacity: fadeAnim }]}>
          <ActivityIndicator size="large" color="#0000ff" />
          <Text style={styles.modalText}>{text}</Text>
        </Animated.View>
      </View>
    </TouchableWithoutFeedback>
  );
};

export default LoadingModal;
