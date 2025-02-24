import { useState } from "react";
import { View, Text } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { TouchableOpacity } from "react-native-gesture-handler";
import * as ImagePicker from "expo-image-picker";
import { Image } from "expo-image";
import * as NavigationBar from "expo-navigation-bar";

import styles from "./AddProfileImageSreen.styles";
import useProfileImageUpload from "./useProfileImageUpload";
import LoadingModal from "../../../../components/LoadingModal/LoadingModal";
import useUser from "../../../../contexts/UserContext/useUser";

const AddProfileImageScreen = () => {
  const [profileImage, setProfileImage] =
    useState<ImagePicker.ImagePickerAsset | null>(null);

  const { user, utilities } = useUser();
  if (!user)
    throw new Error("Inconsistent application state: user not yet initialised");

  const { fetchSignature, loading, setLoading, status } = useProfileImageUpload(
    profileImage,
    utilities.updateUser
  );

  const pickImage = async () => {
    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ["images"],
      allowsEditing: true,
      aspect: [1, 1],
      quality: 0.5
    });

    if (!result.canceled) {
      setProfileImage(result.assets[0]);
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <View>
        <Text style={styles.greetingText}>
          Hey {user.data.name.split(" ")[0]}!
        </Text>
        <Text style={styles.addPictureText}>
          How about adding a profile picture to help your friends recognize you?
        </Text>
      </View>

      <TouchableOpacity
        style={styles.addPictureButton}
        onPress={pickImage}
        activeOpacity={0.5}
      >
        {profileImage ? (
          <Image
            style={styles.profileImage}
            source={{ uri: profileImage.uri }}
            contentFit="cover"
            transition={200}
          />
        ) : (
          <>
            <MaterialCommunityIcons
              name="account-circle-outline"
              size={180}
              color="white"
            />
            <View style={styles.addPictureButtonPlus}>
              <Text style={styles.addPictureButtonPlusText}>+</Text>
            </View>
          </>
        )}
      </TouchableOpacity>

      <View>
        {profileImage && (
          <TouchableOpacity
            style={styles.continueButton}
            activeOpacity={0.5}
            disabled={loading}
            onPress={async () => {
              setLoading(true);
              fetchSignature();
            }}
          >
            <Text style={styles.continueButtonText}>Continue</Text>
          </TouchableOpacity>
        )}
        <TouchableOpacity
          activeOpacity={0.5}
          onPress={() => {
            utilities.updateUser({
              metadata: {
                completedAddProfileImageScreen: true
              }
            });
          }}
          style={profileImage && styles.skipButtonImageSelected}
        >
          <Text style={styles.skipButtonText}>Skip</Text>
        </TouchableOpacity>
      </View>
      <LoadingModal isVisible={loading} text="Updating your profile..." />
    </SafeAreaView>
  );
};

export default AddProfileImageScreen;
