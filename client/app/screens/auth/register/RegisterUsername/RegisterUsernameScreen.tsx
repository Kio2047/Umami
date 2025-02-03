import { StackNavigationProp } from "@react-navigation/stack";

import RegisterScreenTemplate from "../../../../components/RegisterScreenTemplate/RegisterScreenTemplate";
import { registerScreenConstants } from "../../../../constants/auth/registerConstants";
import { initialState } from "../registerFormStateReducer";
import { registerFormValidators } from "../../../../utils/authFormValidators";
import { AuthStackParamList } from "../../../../types/NavigationTypes";

const RegisterUsernameScreen = ({
  navigation
}: {
  navigation: StackNavigationProp<AuthStackParamList>;
}) => {
  return (
    <RegisterScreenTemplate<"RegisterUsernameScreen">
      {...registerScreenConstants.RegisterUsernameScreen}
      initialState={initialState}
      navigation={navigation}
      inputValidator={registerFormValidators.username}
    />
  );
};

export default RegisterUsernameScreen;
