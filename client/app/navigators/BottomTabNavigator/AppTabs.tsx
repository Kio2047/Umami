import { createMaterialBottomTabNavigator } from "@react-navigation/material-bottom-tabs";

import FeedScreen from "../../screens/Feed/FeedScreen";
import UserProfileScreen from "../../screens/UserProfile/UserProfileScreen";
import { AppTabParamList } from "../../types/NavigationTypes";

const Tab = createMaterialBottomTabNavigator<AppTabParamList>();

const AppTabs = () => {
  return (
    <Tab.Navigator>
      <Tab.Screen name="FeedScreen" component={FeedScreen} />
      <Tab.Screen name="UserProfileScreen" component={UserProfileScreen} />
    </Tab.Navigator>
  );
};

export default AppTabs;
