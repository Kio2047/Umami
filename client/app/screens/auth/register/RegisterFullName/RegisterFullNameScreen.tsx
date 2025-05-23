import { StackNavigationProp } from "@react-navigation/stack";

import RegisterScreenTemplate from "../../../../components/RegisterScreenTemplate/RegisterScreenTemplate";
import { registerScreenConstants } from "../../../../constants/auth/registerConstants";
import { initialState } from "../registerFormStateReducer";
import { registerFormValidators } from "../../../../utils/authFormValidators";
import { AuthStackParamList } from "../../../../types/NavigationTypes";

const RegisterFullNameScreen = ({
  navigation
}: {
  navigation: StackNavigationProp<AuthStackParamList>;
}) => {
  return (
    <RegisterScreenTemplate<"RegisterFullNameScreen">
      {...registerScreenConstants.RegisterFullNameScreen}
      initialState={initialState}
      navigation={navigation}
      inputValidator={registerFormValidators.fullName}
    />
  );
};

export default RegisterFullNameScreen;
