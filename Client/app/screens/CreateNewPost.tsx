import { View, Text, StyleSheet, Button, Image, TextInput, TouchableOpacity, NativeSyntheticEvent, TextInputChangeEventData, ScrollView, KeyboardAvoidingView} from 'react-native'
import React, { useState } from 'react'
import { Rating } from 'react-native-ratings';
import * as ImagePicker from 'expo-image-picker';
import { AntDesign } from '@expo/vector-icons';

import { CreateNewPostScreenProps } from '../types';
import { SafeAreaView } from 'react-native-safe-area-context';
import { backgroundColor, primaryFontColor, formPlaceholderColor, formInputBackgroundColor, ratingsColor, bottomTabBorderColor, defaultButtonColor } from '../colors';
import type { NewPost, formTextFields, formRatingFields } from '../types';
import { sendNewPost, uploadImages } from '../apiClientService';

const CreateNewPost = ( {navigation, route}: CreateNewPostScreenProps ) => {

  const {profilePictureURL, authorID, setRefreshCount} = route.params;

  const [formEntries, setFormEntries] = useState<NewPost>({
    authorID,
    restaurantName: "",
    imageURLs: [],
    ratings: [0, 0, 0],
    title: "",
    text: "",
    others: [],
    timestamp: undefined
  });

  const pickImage = async () => {
    // No permissions request is necessary for launching the image library
    let result = await ImagePicker.launchImageLibraryAsync({
      allowsMultipleSelection: true,
      allowsEditing: true,
      quality: 1,
    });

    if (!result.cancelled) {
      const uri = result.uri
      setFormEntries((formEntries) => {
        const newState = {...formEntries};
        newState.imageURLs.push(uri);
        return newState;
      });
    }
  };

  const textInputChangeHandler = function (event: NativeSyntheticEvent<TextInputChangeEventData>, field: formTextFields) {
    setFormEntries({
      ...formEntries,
      [field]: event.nativeEvent.text
    })
  }

  const ratingInputChangeHandler = function (rating: number, field: formRatingFields) {
    if (field === "food") {
      setFormEntries((formEntries) => {
        const newState = {...formEntries}
        newState.ratings[0] = rating;
        return newState;
      })
      return;
    }
    if (field === "vibes") {
      setFormEntries((formEntries) => {
        const newState = {...formEntries}
        newState.ratings[1] = rating;
        return newState;
      })
      return;
    }
    setFormEntries((formEntries) => {
      const newState = {...formEntries}
        newState.ratings[2] = rating;
        return newState;
    })
  }

  return (
    <SafeAreaView style={styles.container}>
      {/* <KeyboardAvoidingView style={{ flex: 1, flexDirection: 'column', justifyContent: 'center', backgroundColor: "red"}} behavior="height" enabled keyboardVerticalOffset={50}> */}
      <ScrollView
      contentContainerStyle={styles.scrollViewList}
      style={styles.scrollview}
      >
        <View style={styles.newPostBanner}>
          <Text style={styles.newPostBannerText}>New Post</Text>
          <Image style={styles.newPostBannerImage} source={{ uri: profilePictureURL}}></Image>
        </View>

        <View style={styles.inputContainer}>
          <Text style={styles.inputLabel}>Where did you eat?</Text>
          <TextInput
            style={styles.eateryInput}
            placeholder='Restaurant / café'
            placeholderTextColor={formPlaceholderColor}
            value={formEntries.restaurantName}
            onChange={(event) => textInputChangeHandler(event, "restaurantName")}
          >
          </TextInput>
        </View>

        <View style={styles.inputContainer}>
          <Text style={styles.inputLabel}>What did you eat?</Text>
          <TouchableOpacity
            style={styles.addImagesButton}
            onPress={pickImage}
          >
            {/* <View style={styles.newPostIconAndText}> */}
            <AntDesign name="pluscircleo" size={35} color="white" />
            <Text
              style={styles.addImagesButtonText}
            >
              Add some pictures!
            </Text>
            {/* </View> */}

          </TouchableOpacity>
          {/* Disable ability to add same image twice */}
          {
          Boolean(formEntries.imageURLs.length) && <View style={styles.imageContainer}>
          {formEntries.imageURLs.map((uri) => (<Image key={uri} source={{uri}} style={styles.addedImage}></Image>))}
          </View>


          }

        </View>

        <View style={styles.inputContainer}>
          <Text style={styles.inputLabel}>How would you rate the...</Text>
          <View style={styles.ratingsContainer}>
            <View style={styles.ratingContainer}>
              <Text style={styles.ratingTitle}>Vibes</Text>
              <Rating
                type="custom"
                imageSize={28}
                // showRating
                onFinishRating={(rating: number) => ratingInputChangeHandler(rating, "vibes")}
                // readonly={true}
                jumpValue={0.5}
                fractions={1}
                tintColor={backgroundColor}
                ratingColor={ratingsColor}
                startingValue={formEntries.ratings[1]}
              />
            </View>
            <View style={styles.flexboxSpaceCreator}></View>
            <View style={styles.ratingContainer}>
              <Text style={styles.ratingTitle}>Value</Text>
              <Rating
                type="custom"
                imageSize={28}
                // showRating
                onFinishRating={(rating: number) => ratingInputChangeHandler(rating, "value")}
                // readonly={true}
                jumpValue={0.5}
                fractions={1}
                tintColor={backgroundColor}
                ratingColor={ratingsColor}
                startingValue={formEntries.ratings[2]}
              />
            </View>
            <View style={[styles.ratingContainer, {marginTop: 10}]}>
              <Text style={styles.ratingTitle}>Food</Text>
              <Rating
                type="custom"
                imageSize={28}
                // showRating
                onFinishRating={(rating: number) => ratingInputChangeHandler(rating, "food")}
                // readonly={true}
                jumpValue={0.5}
                fractions={1}
                tintColor={backgroundColor}
                ratingColor={ratingsColor}
                startingValue={formEntries.ratings[0]}
              />
            </View>
          </View>
        </View>

        <View style={styles.inputContainer}>
          <Text style={styles.inputLabel}>Share some details</Text>
          {/* Set max length for text fields and show remaining characters */}
          <TextInput
            style={styles.titleInput}
            placeholder='Title'
            placeholderTextColor={formPlaceholderColor}
            maxLength={25}
            value={formEntries.title}
            onChange={(event) => textInputChangeHandler(event, "title")}
          >
          </TextInput>
          {/* Using View as a border to avoid React Native resizing bug */}
          <View style={styles.titleBodySeparator}></View>
          <TextInput
            style={styles.bodyInput}
            placeholder='Body'
            placeholderTextColor={formPlaceholderColor}
            value={formEntries.text}
            onChange={(event) => textInputChangeHandler(event, "text")}
          >
          </TextInput>
        </View>

        <View style={styles.inputContainer}>
          <Text style={styles.inputLabel}>Who did you eat with?</Text>
          <TextInput
            style={styles.eateryInput}
            placeholder='List friends who joined you'
            placeholderTextColor={formPlaceholderColor}
            // value={formEntries.restaurantName}
            // onChange={(event) => textInputChangeHandler(event, "restaurantName")}
          >
          </TextInput>
        </View>

        <TouchableOpacity style={styles.submitButton}
        // onPress={async () => {
        //   const parsedReponse = await sendNewPost(formEntries);
        //   console.log(parsedReponse);
        // }}
          onPress={async () => {
          //   const parsedReponse = await uploadImages(formEntries.imageURLs);
          //   console.log(parsedReponse);
          //   const newPost = await sendNewPost(
          //     {
          //       ...formEntries,
          //       imageURLs: parsedReponse,
          //       timestamp: new Date(),
          //     }
          //   );
          // }}
            const newPost = await sendNewPost(
              {
                ...formEntries,
                imageURLs: ["https://media-cdn.tripadvisor.com/media/photo-w/11/69/6e/ed/photo1jpg.jpg", "https://media-cdn.tripadvisor.com/media/photo-p/19/58/92/70/photo1jpg.jpg", "https://media-cdn.tripadvisor.com/media/photo-w/0f/6e/a4/73/photo2jpg.jpg"],
                timestamp: new Date(),
              }
            )
            console.log(newPost);
            setRefreshCount((refreshCount) => refreshCount + 1);
          }}
        >
          <Text style={styles.submitButtonText}>Create post</Text>
        </TouchableOpacity>

      </ScrollView>
      {/* </KeyboardAvoidingView> */}
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  scrollview: {
    paddingHorizontal: 23,
  },
  scrollViewList: {
      paddingTop: 15,
      paddingBottom: 20,
  },
  newPostBanner: {
    flexDirection: 'row',
    justifyContent: "space-between",
    alignItems: "center",
    width: "100%",
  },
  newPostBannerImage: {
    width: 50,
    height: 50,
    borderRadius: 50 / 2,
  },
  newPostBannerText: {
    color: primaryFontColor,
    fontSize: 40,
    fontWeight: "600"
  },
  inputContainer: {
    marginTop: 20,
    marginBottom: 10,
    width: "100%",
  },
  inputLabel: {
    color: primaryFontColor,
    fontSize: 25,
    fontWeight: "500",
    marginBottom: 5
  },
  eateryInput: {
    color: primaryFontColor,
    backgroundColor: formInputBackgroundColor,
    width: "100%",
    height: 50,
    padding: 10,
    borderRadius: 7
  },
  addImagesButton: {
    backgroundColor: formInputBackgroundColor,
    // backgroundColor: defaultButtonColor,
    alignItems: "center",
    width: "100%",
    padding: 15,
    borderRadius: 6
  },
  addImagesButtonText: {
    color: primaryFontColor,
    marginTop: 5
  },
  imageContainer: {
    flexDirection: "row",
    flexWrap: "wrap",
  },
  addedImage: {
    width: 100,
    height: 100,
    borderRadius: 3,
    marginTop: 5,
    marginRight: 5
  },
  ratingsContainer: {
    flexDirection: "row",
    flexWrap: 'wrap-reverse',
    justifyContent: "center",
    marginTop: 5
  },
  ratingContainer: {
    width: "40%",
    alignItems: "center",
    justifyContent: "space-evenly",
  },
  ratingTitle: {
    color: primaryFontColor,
    fontSize: 18.5,
    fontWeight: "500"
  },
  flexboxSpaceCreator: {
    width: "10%",
    backgroundColor: backgroundColor
  },
  titleInput: {
    color: primaryFontColor,
    backgroundColor: formInputBackgroundColor,
    width: "100%",
    height: 50,
    padding: 10,
    borderTopLeftRadius: 6,
    borderTopRightRadius: 6,
  },
  titleBodySeparator: {
    height: 2,
    backgroundColor: bottomTabBorderColor,
  },
  bodyInput: {
    color: primaryFontColor,
    backgroundColor: formInputBackgroundColor,
    width: "100%",
    height: 120,
    padding: 10,
    borderBottomLeftRadius: 6,
    borderBottomRightRadius: 6,
    textAlignVertical: 'top'
  },
  submitButton: {
    justifyContent: "center",
    width: "100%",
    height: 70,
    backgroundColor: defaultButtonColor,
    borderRadius: 7,
    marginTop: 30
  },
  submitButtonText: {
    textAlign: "center",
    color: primaryFontColor,
    fontSize: 25,
    fontWeight: "500",
  },
})

export default CreateNewPost