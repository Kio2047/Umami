import { Keyboard, Pressable, Text, TouchableOpacity } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useReducer } from "react";
import { StackNavigationProp } from "@react-navigation/stack";

import CredentialTextInput from "../CredentialTextInput/CredentialTextInput";
import { reducer } from "../../screens/auth/register/registerFormStateReducer";
import BottomTab from "../BottomTab/BottomTab";
import styles from "./RegistrationScreenTemplate.styles";
import { RootStackParamList } from "../../types/NavigationTypes";
import { ValueOf } from "../../types/UtilTypes";
import {
  FormState,
  ValidationResultsMap,
  NextScreenMap,
  RegisterFormField,
  ScreenConstants
} from "../../types/auth/AuthTypes";

interface RegistrationScreenTemplateProps<
  T extends keyof NextScreenMap & keyof RootStackParamList
> extends ScreenConstants<T> {
  additionalContent?: React.ReactNode;
  initialState: FormState<RegisterFormField>;
  navigation: StackNavigationProp<ReactNavigation.RootParamList>;
  inputValidator: (input: string) => ValidationResultsMap[T];
}

const RegistrationScreenTemplate = <
  T extends keyof NextScreenMap & keyof RootStackParamList
>({
  heading,
  additionalText,
  inputConstants,
  nextScreen,
  additionalContent,
  initialState,
  navigation,
  inputValidator
}: RegistrationScreenTemplateProps<T>) => {
  const [formState, dispatch] = useReducer(reducer, initialState);

  // useEffect(() => {
  //   if inputValidator(formState[inputConstants.formField].value);
  // }, [formState[inputConstants.formField].value]);

  // TODO: why doesn't typing nextScreen as nextScreen: NextScreenMap[T] (as above) work here?
  const nextButtonOnPressHandler = (nextScreen: ValueOf<NextScreenMap>) => {
    switch (nextScreen) {
      case "AddProfileImageScreen":
        navigation.navigate(nextScreen, {
          newUserName: formState.fullName.value
        });
        break;
      default:
        navigation.navigate(nextScreen);
    }
  };

  return (
    <Pressable style={styles.pressableWrapper} onPress={Keyboard.dismiss}>
      <SafeAreaView style={styles.container}>
        <Text style={styles.heading}>{heading}</Text>
        {additionalText && (
          <Text style={styles.additionalText}>{additionalText}</Text>
        )}
        <CredentialTextInput<RegisterFormField>
          {...inputConstants}
          formFieldState={formState[inputConstants.formField]}
          stateActionDispatcher={dispatch}
        />
        <TouchableOpacity
          style={styles.submitButton}
          onPress={() => nextButtonOnPressHandler(nextScreen)}
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
