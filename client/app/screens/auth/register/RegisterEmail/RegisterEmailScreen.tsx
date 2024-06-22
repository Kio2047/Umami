import { StackNavigationProp } from "@react-navigation/stack";

import RegisterScreenTemplate from "../../../../components/RegisterScreenTemplate/RegisterScreenTemplate";
import { registerScreenConstants } from "../../../../constants/auth/registerConstants";
import { initialState } from "../registerFormStateReducer";
import { formValidators } from "../../../../utils/authFormValidators";

const RegisterEmailScreen = ({
  navigation
}: {
  navigation: StackNavigationProp<ReactNavigation.RootParamList>;
}) => {
  return (
    <RegisterScreenTemplate<"RegisterEmailScreen">
      {...registerScreenConstants.RegisterEmailScreen}
      initialState={initialState}
      navigation={navigation}
      inputValidator={formValidators.email}
    />
  );
};

export default RegisterEmailScreen;
