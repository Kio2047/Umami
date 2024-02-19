import { StackNavigationProp } from "@react-navigation/stack";

import RegisterScreenTemplate from "../../../../components/RegisterScreenTemplate/RegisterScreenTemplate";
import { registerScreenConstants } from "../../../../constants/registerConstants";
import { initialState } from "../registerFormStateReducer";
import { formValidators } from "../../../../utils/authFormValidators";

const RegisterFullNameScreen = ({
  navigation
}: {
  navigation: StackNavigationProp<ReactNavigation.RootParamList>;
}) => {
  return (
    <RegisterScreenTemplate<"RegisterFullNameScreen">
      {...registerScreenConstants.RegisterFullNameScreen}
      initialState={initialState}
      navigation={navigation}
      inputValidator={formValidators.fullName}
    />
  );
};

export default RegisterFullNameScreen;
