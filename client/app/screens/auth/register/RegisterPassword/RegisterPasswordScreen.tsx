import { StackNavigationProp } from "@react-navigation/stack";

import RegisterScreenTemplate from "../../../../components/RegisterScreenTemplate/RegisterScreenTemplate";
import { registerScreenConstants } from "../../../../constants/auth/registerConstants";
import { initialState } from "../registerFormStateReducer";
import { formValidators } from "../../../../utils/authFormValidators";

const RegisterPasswordScreen = ({
  navigation
}: {
  navigation: StackNavigationProp<AuthStackParamList>;
}) => {
  return (
    <RegisterScreenTemplate<"RegisterPasswordScreen">
      {...registerScreenConstants.RegisterPasswordScreen}
      initialState={initialState}
      navigation={navigation}
      inputValidator={formValidators.password}
    />
  );
};

export default RegisterPasswordScreen;
