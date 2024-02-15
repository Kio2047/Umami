import { Keyboard, Pressable, Text, TouchableOpacity } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useReducer } from "react";
import { useNavigation } from "@react-navigation/native";
import { StackNavigationProp } from "@react-navigation/stack";

import {
  FormState,
  RegisterFormField,
  RegistrationScreenConstants
} from "../../types/CredentialFormTypes";
import CredentialTextInput from "../CredentialTextInput/CredentialTextInput";
import { reducer } from "../../screens/auth/register/registerFormStateReducer";
import BottomTab from "../BottomTab/BottomTab";
import styles from "./RegistrationScreenTemplate.styles";

interface RegistrationScreenTemplateProps extends RegistrationScreenConstants {
  navigation: StackNavigationProp<ReactNavigation.RootParamList>;
  initialState: FormState<RegisterFormField>;
}

const RegistrationScreenTemplate = ({
  heading,
  additionalText,
  inputConstants,
  additionalContent,
  initialState,
  navigation
}: RegistrationScreenTemplateProps) => {
  const [formState, dispatch] = useReducer(reducer, initialState);

  return (
    <Pressable style={styles.pressableWrapper} onPress={Keyboard.dismiss}>
      <SafeAreaView style={styles.container}>
        <Text style={styles.heading}>{heading}</Text>
        <Text style={styles.additionalText}>{additionalText}</Text>
        <CredentialTextInput
          {...inputConstants}
          formFieldState={formState[inputConstants.formField]}
          stateActionDispatcher={dispatch}
        />
        <TouchableOpacity
          style={styles.submitButton}
          onPress={() => navigation.navigate("WelcomeScreen")}
        >
          <Text style={styles.buttonText}>Next</Text>
        </TouchableOpacity>
        {additionalContent}
        <BottomTab
          message="Already have an account? Sign in&nbsp;"
          navigation={navigation}
          navigateTo="Login"
        />
      </SafeAreaView>
    </Pressable>
  );
};

export default RegistrationScreenTemplate;
