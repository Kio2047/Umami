import { createStackNavigator } from "@react-navigation/stack";

import { AuthStackParamList } from "../../types/NavigationTypes";
import { stackScreenOptions } from "./AuthStackScreenOptions";
import WelcomeScreen from "../../screens/Welcome/WelcomeScreen";
import LoginScreen from "../../screens/auth/login/Login/LoginScreen";
import RegisterScreen from "../../screens/Register/RegisterScreen";
import RegisterFullNameScreen from "../../screens/auth/register/RegisterFullName/RegisterFullNameScreen";
import AddProfileImageScreen from "../../screens/auth/register/AddProfileImage/AddProfileImageScreen";
import RegisterEmailScreen from "../../screens/auth/register/RegisterEmail/RegisterEmailScreen";
import RegisterPasswordScreen from "../../screens/auth/register/RegisterPassword/RegisterPasswordScreen";
import RegisterUsernameScreen from "../../screens/auth/register/RegisterUsername/RegisterUsernameScreen";

const AuthStack = createStackNavigator<AuthStackParamList>();

const AuthScreens = ({
  initialRouteName
}: {
  initialRouteName: "WelcomeScreen" | "AddProfileImageScreen";
}) => {
  return (
    <AuthStack.Navigator
      initialRouteName={initialRouteName}
      screenOptions={stackScreenOptions}
    >
      {/* initialParams={{user: "Dan"}} */}
      <AuthStack.Screen name="WelcomeScreen" component={WelcomeScreen} />
      <AuthStack.Screen name="LoginScreen" component={LoginScreen} />
      <AuthStack.Screen
        name="RegisterFullNameScreen"
        component={RegisterFullNameScreen}
      />
      <AuthStack.Screen
        name="RegisterEmailScreen"
        component={RegisterEmailScreen}
      />
      <AuthStack.Screen
        name="RegisterUsernameScreen"
        component={RegisterUsernameScreen}
      />
      <AuthStack.Screen
        name="RegisterPasswordScreen"
        component={RegisterPasswordScreen}
      />
      <AuthStack.Screen
        name="AddProfileImageScreen"
        component={AddProfileImageScreen}
      />
    </AuthStack.Navigator>
  );
};

export default AuthScreens;
