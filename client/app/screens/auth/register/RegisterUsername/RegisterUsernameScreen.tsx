import { StackNavigationProp } from "@react-navigation/stack";

import RegisterScreenTemplate from "../../../../components/RegisterScreenTemplate/RegisterScreenTemplate";
import { registerScreenConstants } from "../../../../constants/registerConstants";
import { initialState } from "../registerFormStateReducer";
import { formValidators } from "../../../../utils/authFormValidators";

const RegisterUsernameScreen = ({
  navigation
}: {
  navigation: StackNavigationProp<ReactNavigation.RootParamList>;
}) => {
  return (
    <RegisterScreenTemplate<"RegisterUsernameScreen">
      {...registerScreenConstants.RegisterUsernameScreen}
      initialState={initialState}
      navigation={navigation}
      inputValidator={formValidators.username}
    />
  );
};

export default RegisterUsernameScreen;
