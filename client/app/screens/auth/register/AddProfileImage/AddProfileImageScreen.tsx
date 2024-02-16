import { View, Text } from "react-native";
import React, { useContext, useEffect, useRef, useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { TouchableOpacity } from "react-native-gesture-handler";
import * as ImagePicker from "expo-image-picker";
import { useMutation, useQuery } from "@tanstack/react-query";

import { StackScreenProps } from "../../../../types/NavigationTypes";
import styles from "./AddProfileImageSreen.styles";
import {
  getURLSignature,
  updateUserProfileImageURL,
  uploadCloudinaryMedia
} from "../../../../services/api/apiClient";
import { AuthContext } from "../../../../contexts/AuthContext/AuthContext";

const AddProfileImageScreen = ({
  navigation,
  route
}: StackScreenProps<"AddProfileImage">) => {
  const [profileImage, setProfileImage] =
    useState<ImagePicker.ImagePickerAsset | null>(null);

  const { jwt, userID } = useContext(AuthContext)[0];

  const { refetch: getCloudinarySignature } = useQuery(
    ["profileImageUploadSignature"],
    getURLSignature,
    {
      enabled: false,
      retry: false,
      staleTime: 60 * 60 * 1000,
      cacheTime: 60 * 60 * 1000,
      onSuccess: (data) => {
        uploadImage.mutate({
          base64Image: `data:image/jpg;base64,${profileImage!.base64}`,
          signature: data.data.signature,
          timestamp: data.data.timestamp,
          api_key: 374689837836396,
          folder: "user_profile_images"
        });
      }
    }
  );
  // TODO: try useMutate to see optimistically update the profile image url in the DB before the image has been uploaded to Cloudinary
  const uploadImage = useMutation(uploadCloudinaryMedia, {
    onSuccess: (data) => {
      updateUserProfileImage.mutate({
        newImageURL: data.secure_url
      });
    }
  });

  const updateUserProfileImage = useMutation(updateUserProfileImageURL, {
    onSuccess: () => {
      navigation.reset({
        index: 0,
        routes: [
          {
            name: "AppTabs",
            params: {
              feedUserInfo: ""
            }
          }
        ]
      });
    }
  });

  const pickImage = async () => {
    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      // aspect:
      quality: 1
    });

    if (!result.canceled) {
      setProfileImage(result.assets[0]);
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

      {/* TODO: replace icon with user's profile picture upon selection */}
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
            style={[
              styles.continueButton
              // { marginTop: isFocusedOnInput ? 20 : 20 }
            ]}
            activeOpacity={0.5}
            // disabled={!(status === "success")}
            onPress={() => {
              getCloudinarySignature();
            }}
          >
            <Text style={styles.continueButtonText}>Continue</Text>
          </TouchableOpacity>
        )}
        <TouchableOpacity
          activeOpacity={0.5}
          onPress={() => {
            navigation.reset({
              index: 0,
              routes: [
                {
                  name: "AppTabs",
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

export default AddProfileImageScreen;
