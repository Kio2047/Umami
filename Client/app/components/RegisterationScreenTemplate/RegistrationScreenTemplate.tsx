import {
  Keyboard,
  Pressable,
  StyleSheet,
  Text,
  TouchableOpacity,
  View
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useReducer } from "react";

import {
  FormState,
  RegisterFormField,
  RegistrationScreenConstants
} from "../../Types/CredentialFormTypes";
import CredentialTextInput from "../CredentialTextInput/CredentialTextInput";
import { reducer } from "../../screens/Register/formStateReducer";
import BottomTab from "../BottomTab/BottomTab";
import styles from "./RegistrationScreenTemplateStyles";
import { useNavigation } from "@react-navigation/native";
import { StackNavigationProp } from "@react-navigation/stack";

interface RegistrationScreenTemplateProps extends RegistrationScreenConstants {
  navigation: StackNavigationProp<ReactNavigation.RootParamList>;
  initialState: FormState<RegisterFormField>;
}

const RegistrationScreenTemplate = ({
  heading,
  additionalText,
  inputConstants,
  additionalContent,
  initialState
}: RegistrationScreenTemplateProps) => {
  const [formState, dispatch] = useReducer(reducer, initialState);

  const navigation = useNavigation();

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
          onPress={() => navigation.navigate("LandingPage")}
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
