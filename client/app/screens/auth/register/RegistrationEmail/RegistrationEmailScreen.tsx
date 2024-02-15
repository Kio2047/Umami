import { StackNavigationProp } from "@react-navigation/stack";

import RegistrationScreenTemplate from "../../../../components/RegisterationScreenTemplate/RegistrationScreenTemplate";
import { registrationScreenConstants } from "../../../../constants/registerConstants";
import { initialState } from "../registerFormStateReducer";

const RegistrationEmail = ({
  navigation
}: {
  navigation: StackNavigationProp<ReactNavigation.RootParamList>;
}) => {
  return (
    <RegistrationScreenTemplate
      {...registrationScreenConstants.emailScreen}
      initialState={initialState}
      navigation={navigation}
    />
  );
};

export default RegistrationEmail;
