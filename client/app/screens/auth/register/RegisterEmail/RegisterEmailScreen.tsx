import { StackNavigationProp } from "@react-navigation/stack";

import RegisterScreenTemplate from "../../../../components/RegisterScreenTemplate/RegisterScreenTemplate";
import { registerScreenConstants } from "../../../../constants/auth/registerConstants";
import { initialState } from "../registerFormStateReducer";
import { registerFormValidators } from "../../../../utils/authFormValidators";
import { AuthStackParamList } from "../../../../types/NavigationTypes";

const RegisterEmailScreen = ({
  navigation
}: {
  navigation: StackNavigationProp<AuthStackParamList>;
}) => {
  return (
    <RegisterScreenTemplate<"RegisterEmailScreen">
      {...registerScreenConstants.RegisterEmailScreen}
      initialState={initialState}
      navigation={navigation}
      inputValidator={registerFormValidators.email}
    />
  );
};

export default RegisterEmailScreen;
