import React, { useEffect, useRef } from "react";
import {
  ActivityIndicator,
  Animated,
  TouchableWithoutFeedback,
  View,
  Text,
  TouchableOpacity
} from "react-native";
import MaterialCommunityIcons from "@expo/vector-icons/MaterialCommunityIcons";

import styles from "./ErrorModalStyles";

const ErrorModal = ({
  isVisible,
  title,
  body,
  errorType,
  reset
}: {
  isVisible: boolean;
  title: string;
  body: string;
  errorType: "user" | "app";
  reset: () => void;
}) => {
  const fadeAnim = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    if (isVisible) {
      Animated.timing(fadeAnim, {
        toValue: 1,
        duration: 200,
        useNativeDriver: true
      }).start();
    } else {
      Animated.timing(fadeAnim, {
        toValue: 0,
        duration: 200,
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
          {errorType === "user" ? (
            <MaterialCommunityIcons
              name="alert-circle-outline"
              size={40}
              color="black"
            />
          ) : (
            <MaterialCommunityIcons
              name="robot-confused-outline"
              size={40}
              color="black"
            />
          )}
          <Text style={styles.modalTitle}>{title}</Text>
          <Text style={styles.modalBody}>{body}</Text>
          <TouchableOpacity onPress={reset} style={styles.button}>
            <Text style={styles.buttonText}>TRY AGAIN</Text>
          </TouchableOpacity>
        </Animated.View>
      </View>
    </TouchableWithoutFeedback>
  );
};

export default ErrorModal;
