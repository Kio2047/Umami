import { StyleSheet, Image } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import React from "react";
import type { DetailedImageScreenProps } from "../../types/CredentialFormTypes";

const DetailedImage = ({ route, navigation }: DetailedImageScreenProps) => {
  const { imageURL } = route.params;

  return (
    <SafeAreaView style={styles.container}>
      <Image
        style={styles.image}
        source={{ uri: imageURL }}
        resizeMode="contain"
      ></Image>
    </SafeAreaView>
  );
};

export default DetailedImage;
