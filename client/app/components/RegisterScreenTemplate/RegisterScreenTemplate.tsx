import { Keyboard, Pressable, Text, TouchableOpacity } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useReducer, useState } from "react";
import { StackNavigationProp } from "@react-navigation/stack";
import { useMutation } from "@tanstack/react-query";

import {
  NewUserCredentials,
  NextScreenTypeMap,
  RegisterField,
  RegisterScreen,
  RegisterScreenConstants,
  ValidatorResultsTypeMap
} from "../../types/auth/RegisterTypes";
import { FormState } from "../../types/auth/CommonAuthTypes";
import { Entries, ValueOf } from "../../types/UtilTypes";
import { AuthStackParamList } from "../../types/NavigationTypes";
import CredentialTextInput from "../CredentialTextInput/CredentialTextInput";
import { reducer } from "../../screens/auth/register/registerFormStateReducer";
import BottomTab from "../BottomTab/BottomTab";
import styles from "./RegisterScreenTemplate.styles";
import { createNewUser } from "../../services/api/apiClient";
import useAuth from "../../contexts/AuthContext/useAuth";

// TODO: create a prop for a function that runs on submission prior to navigating
// to next page. said function can include fetches to server to see if credentials
// are already associated with account, so that users don't need to complete the
// entire form prior to being informed an account already exists

interface RegisterScreenTemplateProps<
  T extends keyof NextScreenTypeMap & keyof AuthStackParamList
> extends RegisterScreenConstants<T> {
  additionalContent?: React.ReactNode;
  initialState: FormState<RegisterField>;
  navigation: StackNavigationProp<AuthStackParamList>;
  inputValidator: (input: string) => ValidatorResultsTypeMap[T];
}

const RegisterScreenTemplate = <
  T extends RegisterScreen & keyof AuthStackParamList
>({
  heading,
  additionalText,
  inputConstants,
  nextScreen,
  errorMessages,
  additionalContent,
  initialState,
  navigation,
  inputValidator
}: RegisterScreenTemplateProps<T>) => {
  const [formState, dispatch] = useReducer(reducer, initialState);
  const [disableButton, setDisableButton] = useState(false);
  const {
    utilities: { login }
  } = useAuth();
  const { mutate } = useMutation(createNewUser, {
    retry: false,
    onSuccess: async (data) => {
      try {
        await login(data.data.token);
        // TODO: TypeScript not enforcing params type below
        navigation.reset({
          index: 0,
          routes: [
            {
              name: "AddProfileImageScreen",
              params: {
                userFirstName: formState.fullName.value.split(" ")[0]
              }
            }
          ]
        });
      } catch (err) {
        () => setDisableButton(false);
      }
    },
    onError: () => setDisableButton(false)
  });

  // TODO: why doesn't typing nextScreen as nextScreen: NextScreenMap[T] (as above) work here?

  const nextButtonOnPressHandler = async (
    nextScreen: ValueOf<NextScreenTypeMap>
  ) => {
    const validationStatus = inputValidator(
      formState[inputConstants.formField].value
    );

    if (validationStatus !== 0) {
      dispatch({
        type: "add_invalid_warning",
        field: inputConstants.formField,
        invalidMessage: errorMessages[validationStatus]
      });
    } else {
      if (nextScreen === "AddProfileImageScreen") {
        setDisableButton(true);
        const newUserCredentials = (
          Object.entries(formState) as Entries<FormState<RegisterField>>
        ).reduce<NewUserCredentials>(
          (accumulator, [field, values]) => {
            accumulator[field] = values.value;
            return accumulator;
          },
          {
            email: "",
            username: "",
            password: "",
            fullName: ""
          }
        );
        mutate(newUserCredentials);
      } else {
        navigation.navigate(nextScreen);
      }
    }
  };

  return (
    <Pressable style={styles.pressableWrapper} onPress={Keyboard.dismiss}>
      <SafeAreaView style={styles.container}>
        <Text style={styles.heading}>{heading}</Text>
        {additionalText && (
          <Text style={styles.additionalText}>{additionalText}</Text>
        )}
        <CredentialTextInput<RegisterField>
          {...inputConstants}
          formFieldState={formState[inputConstants.formField]}
          stateActionDispatcher={dispatch}
        />
        <TouchableOpacity
          style={[
            styles.submitButton,
            disableButton && styles.submitButtonDisabled
          ]}
          onPress={() => nextButtonOnPressHandler(nextScreen)}
        >
          <Text style={styles.buttonText}>
            {nextScreen === "AddProfileImageScreen" ? "Register" : "Next"}
          </Text>
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

export default RegisterScreenTemplate;
