import { View, Text } from "react-native";
import React, { useEffect, useRef, useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { TouchableOpacity } from "react-native-gesture-handler";
import * as ImagePicker from "expo-image-picker";
import { v2 as cloudinary } from "cloudinary";

import { StackScreenProps } from "../../Types/NavigationTypes";
import styles from "./AddProfilePictureStyles";
import { getJWT } from "../../services/deviceStorageClient";
import { useMutation, useQuery } from "@tanstack/react-query";
import {
  getURLSignature,
  updateUserProfileImageURL,
  uploadCloudinaryMedia,
  uploadImage
} from "../../services/api/apiClient";
import { ImagePickerAsset } from "expo-image-picker";

const AddProfilePicture = ({
  navigation,
  route
}: StackScreenProps<"AddProfilePicture">) => {
  const [profileImage, setProfileImage] = useState<ImagePickerAsset | null>(
    null
  );

  const jwt = useRef<string | null>(null);

  useEffect(() => {
    (async () => {
      jwt.current = await getJWT();
    })();
  }, []);

  const { refetch: getCloudinarySignature } = useQuery(
    ["cloudinarySignature", jwt.current],
    getURLSignature,
    {
      enabled: false,
      retry: false,
      staleTime: Infinity,
      cacheTime: Infinity,
      onSuccess(data) {
        uploadImage.mutate({
          base64Image: `data:image/jpg;base64,${profileImage!.base64}`,
          signature: data.signature,
          timestamp: data.timestamp,
          api_key: 374689837836396,
          folder: "user_profile_pictures"
        });
      }
    }
  );
  // try using usemutate to see if there's an optimistic way of updating the profile picture url in the db before the image has been uploaded to cloudinary
  const uploadImage = useMutation(uploadCloudinaryMedia, {});

  // const { data, isSuccess: uploadImageSuccess } = useQuery(
  //   [
  //     "uploadedImageData",
  //     {
  //       base64Image: `data:image/jpg;base64,${profileImage!.base64}`,
  //       signature: CloudinarySignature!.signature,
  //       timestamp: CloudinarySignature!.timestamp,
  //       api_key: 374689837836396,
  //       folder: "user_profile_pictures"
  //     }
  //   ],
  //   uploadCloudinaryMedia,
  //   {
  //     enabled: !!CloudinarySignature && !!profileImage,
  //     retry: false,
  //     cacheTime: 0
  //   }
  // );

  // if (getCloudinarySignatureSuccess && profileImage) {
  //   const base64Image = ;

  // }

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

      {/* TODO: Replace icon with user's profile picture upon selection */}
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
            onPress={() => {
              getCloudinarySignature();
            }}
          >
            <Text style={styles.continueButtonText}>Continue</Text>
          </TouchableOpacity>
        )}
        <TouchableOpacity
          activeOpacity={0.5}
          // onPress={() => {
          //   navigation.reset({
          //     index: 0,
          //     routes: [
          //       {
          //         name: "Feed",
          //         params: {
          //           feedUserInfo: ""
          //         }
          //       }
          //     ]
          //   });
          // }}
          onPress={() => setProfileImage((state) => state + "w")}
        >
          <Text style={styles.skipButtonText}>Skip{" >"}</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

export default AddProfilePicture;
