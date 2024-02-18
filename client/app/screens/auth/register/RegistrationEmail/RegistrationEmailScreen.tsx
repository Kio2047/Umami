import { StackNavigationProp } from "@react-navigation/stack";

import RegistrationScreenTemplate from "../../../../components/RegisterationScreenTemplate/RegistrationScreenTemplate";
import { registrationScreenConstants } from "../../../../constants/registerConstants";
import { initialState } from "../registerFormStateReducer";
import { formValidations } from "../../../../utils/utils";

const RegistrationEmailScreen = ({
  navigation
}: {
  navigation: StackNavigationProp<ReactNavigation.RootParamList>;
}) => {
  return (
    <RegistrationScreenTemplate<"RegistrationEmailScreen">
      {...registrationScreenConstants.RegistrationEmailScreen}
      initialState={initialState}
      navigation={navigation}
      inputValidator={formValidations.email}
    />
  );
};

export default RegistrationEmailScreen;
