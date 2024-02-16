import { StackNavigationProp } from "@react-navigation/stack";

import RegistrationScreenTemplate from "../../../../components/RegisterationScreenTemplate/RegistrationScreenTemplate";
import { registrationScreenConstants } from "../../../../constants/registerConstants";
import { initialState } from "../registerFormStateReducer";

const RegistrationEmailScreen = ({
  navigation
}: {
  navigation: StackNavigationProp<ReactNavigation.RootParamList>;
}) => {
  return (
    <RegistrationScreenTemplate<"RegistrationEmailScreen">
      {...registrationScreenConstants.emailScreen}
      initialState={initialState}
      navigation={navigation}
      nextScreen="RegistrationUsernameScreen"
    />
  );
};

export default RegistrationEmailScreen;
