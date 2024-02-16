import { Text, View } from "react-native";
import React from "react";
import { StackNavigationProp } from "@react-navigation/stack";
import RegistrationScreenTemplate from "../../../../components/RegisterationScreenTemplate/RegistrationScreenTemplate";
import { registrationScreenConstants } from "../../../../constants/registerConstants";
import { initialState } from "../registerFormStateReducer";

const RegistrationFullNameScreen = ({
  navigation
}: {
  navigation: StackNavigationProp<ReactNavigation.RootParamList>;
}) => {
  return (
    <RegistrationScreenTemplate<"RegistrationFullNameScreen">
      {...registrationScreenConstants.fullNameScreen}
      initialState={initialState}
      navigation={navigation}
      nextScreen="RegistrationEmailScreen"
    />
  );
};

export default RegistrationFullNameScreen;
