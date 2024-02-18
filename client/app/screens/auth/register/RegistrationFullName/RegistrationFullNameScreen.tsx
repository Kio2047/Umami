import { StackNavigationProp } from "@react-navigation/stack";

import RegistrationScreenTemplate from "../../../../components/RegisterationScreenTemplate/RegistrationScreenTemplate";
import { registrationScreenConstants } from "../../../../constants/registerConstants";
import { initialState } from "../registerFormStateReducer";
import { formValidations } from "../../../../utils/utils";

const RegistrationFullNameScreen = ({
  navigation
}: {
  navigation: StackNavigationProp<ReactNavigation.RootParamList>;
}) => {
  return (
    <RegistrationScreenTemplate<"RegistrationFullNameScreen">
      {...registrationScreenConstants.RegistrationFullNameScreen}
      initialState={initialState}
      navigation={navigation}
      inputValidator={formValidations.fullName}
    />
  );
};

export default RegistrationFullNameScreen;
