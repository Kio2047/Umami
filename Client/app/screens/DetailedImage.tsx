import { StyleSheet, Image } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import React from "react";
import type { DetailedImageScreenProps } from "../Types/SharedTypes";

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

const styles = StyleSheet.create({
  container: {
    flex: 1
  },
  image: {
    flex: 1
  }
});

export default DetailedImage;
