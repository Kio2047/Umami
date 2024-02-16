import { Text, View } from "react-native";
import React from "react";
import { StackNavigationProp } from "@react-navigation/stack";
import RegistrationScreenTemplate from "../../../../components/RegisterationScreenTemplate/RegistrationScreenTemplate";
import { registrationScreenConstants } from "../../../../constants/registerConstants";
import { initialState } from "../registerFormStateReducer";

const RegistrationFullName = ({
  navigation
}: {
  navigation: StackNavigationProp<ReactNavigation.RootParamList>;
}) => {
  return (
    <RegistrationScreenTemplate<"RegistrationFullName">
      {...registrationScreenConstants.fullNameScreen}
      initialState={initialState}
      navigation={navigation}
      nextScreen="RegistrationEmail"
    />
  );
};

export default RegistrationFullName;
