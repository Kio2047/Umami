import { View, Text } from "react-native";
import React, { useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { TouchableOpacity } from "react-native-gesture-handler";
import * as ImagePicker from "expo-image-picker";

import { StackScreenProps } from "../../Types/NavigationTypes";
import styles from "./AddProfilePictureStyles";

const AddProfilePicture = ({
  navigation,
  route
}: StackScreenProps<"AddProfilePicture">) => {
  const [profileImage, setProfileImage] = useState("");

  const pickImage = async () => {
    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      // aspect:
      quality: 1
    });

    console.log(result);

    if (!result.canceled) {
      setProfileImage(result.assets[0].uri);
      console.log(profileImage);
    }
  };

  const { newUserName } = route.params;
  return (
    <SafeAreaView style={styles.container}>
      <View>
        <Text style={styles.greetingText}>
          Hey {newUserName.split(" ")[0]}!
        </Text>
        <Text style={styles.addPictureText}>
          How about adding a profile picture so your friends can recognize you?
        </Text>
      </View>

      <TouchableOpacity
        style={styles.addPictureButton}
        onPress={pickImage}
        activeOpacity={0.5}
      >
        <MaterialCommunityIcons
          name="account-circle-outline"
          size={200}
          color="white"
        />
        <View style={styles.addPictureButtonPlus}>
          <Text style={styles.addPictureButtonPlusText}>+</Text>
        </View>
      </TouchableOpacity>

      <View>
        {profileImage && (
          <TouchableOpacity
            activeOpacity={0.5}
            onPress={() => {
              navigation.reset({
                index: 0,
                routes: [
                  {
                    name: "Feed",
                    params: {
                      feedUserInfo: ""
                    }
                  }
                ]
              });
            }}
          >
            <Text style={styles.skipButtonText}>Skip{" >"}</Text>
          </TouchableOpacity>
        )}
        <TouchableOpacity
          activeOpacity={0.5}
          onPress={() => {
            navigation.reset({
              index: 0,
              routes: [
                {
                  name: "Feed",
                  params: {
                    feedUserInfo: ""
                  }
                }
              ]
            });
          }}
        >
          <Text style={styles.skipButtonText}>Skip{" >"}</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

export default AddProfilePicture;
