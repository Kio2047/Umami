import { useState } from "react";
import { useMutation, useQuery } from "@tanstack/react-query";
import { ImagePickerAsset } from "expo-image-picker";
import { StackNavigationProp } from "@react-navigation/stack";

import {
  getProfileImageUploadSignature,
  updateUserProfileImageURL,
  uploadMedia
} from "../../../../services/api/apiClient";

const useProfileImageUpload = (
  profileImage: ImagePickerAsset | null,
  navigation: StackNavigationProp<AuthStackParamList>
) => {
  const [loading, setLoading] = useState(false);
  const [uploadURL, setUploadURL] = useState<string | null>(null);

  // TODO: handle if profileImage is null...
  const { refetch: fetchSignature } = useQuery(
    ["profileImageUploadSignature"],
    getProfileImageUploadSignature,
    {
      enabled: false,
      retry: false,
      staleTime: 60 * 60 * 1000,
      cacheTime: 60 * 60 * 1000,
      onSuccess: ({ data: { signature, timestamp } }) => {
        if (!profileImage) {
          setLoading(false);
          return;
        }
        uploadImageMutate({
          base64Image: `data:image/jpg;base64,${profileImage!.base64}`,
          signature: signature,
          timestamp: timestamp,
          api_key: 374689837836396,
          folder: "user_profile_images"
        });
      },
      onError: (error) => {
        console.error("Error getting Cloudinary signature:", error);
        setLoading(false);
      }
    }
  );
  const { mutate: uploadImageMutate } = useMutation(uploadMedia, {
    onSuccess: ({ secure_url }) => {
      setUploadURL(secure_url);
      updateImageURLMutate({ newImageURL: secure_url });
    },
    onError: (error) => {
      console.error("Error uploading image to Cloudinary:", error);
      setLoading(false);
    }
  });
  const { mutate: updateImageURLMutate, status } = useMutation(
    updateUserProfileImageURL,
    {
      onSuccess: () => {
        navigation.reset({
          index: 0,
          routes: [{ name: "AppTabs", params: { feedUserInfo: "" } }]
        });
      },
      onError: (error) => {
        console.error("Error updating profile image URL:", error);
        setLoading(false);
      }
    }
  );
  return {
    fetchSignature,
    loading,
    setLoading,
    uploadURL,
    status
  };
};

export default useProfileImageUpload;

// TODO: try useMutate to see optimistically update the profile image url in the DB before the image has been uploaded to Cloudinary
