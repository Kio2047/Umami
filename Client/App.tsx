import "react-native-gesture-handler";
// import { StatusBar } from "expo-status-bar";
import * as NavigationBar from "expo-navigation-bar"
import { SafeAreaView, StatusBar, StyleSheet, Platform } from "react-native";
import { NavigationContainer, DarkTheme } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import { Provider } from "react-redux";

import type { RootStackParamsList } from "./app/types";
import { backgroundColor } from "./app/colors";
import SignIn from "./app/screens/SignIn";
import Login from "./app/screens/Login";
import Register from "./app/screens/Register";
import Feed from "./app/screens/Feed";
import DetailedImage from "./app/screens/DetailedImage";
import CreateNewPost from "./app/screens/CreateNewPost";
import UserProfile from "./app/screens/UserProfile";
import RestaurantProfile from "./app/screens/RestaurantProfile";
import { store } from "./app/redux/store";

// import DetailedPost from "./app/components/Post";

NavigationBar.setBackgroundColorAsync(backgroundColor);
const RootStack = createStackNavigator<RootStackParamsList>();

export default function App() {
  return (
    <SafeAreaView style={styles.appContainer}>
    <StatusBar></StatusBar>
    <Provider store={store}>
      <NavigationContainer theme={DarkTheme}>
        <RootStack.Navigator initialRouteName="SignIn" screenOptions={{ headerShown: false }}>
          {/* initialParams={{user: "Dan"}} */}
          <RootStack.Screen name="SignIn" component={SignIn} />
          <RootStack.Screen name="Login" component={Login} />
          <RootStack.Screen name="Register" component={Register} />
          <RootStack.Screen name="Feed" component={Feed} />
          {/* <RootStack.Screen name="DetailedPost" component={DetailedPost} /> */}
          <RootStack.Screen name="DetailedImage" component={DetailedImage} />
          <RootStack.Screen name="CreateNewPost" component={CreateNewPost} />
          <RootStack.Screen name="UserProfile" component={UserProfile} />
          <RootStack.Screen name="RestaurantProfile" component={RestaurantProfile} />
        </RootStack.Navigator>
      </NavigationContainer>
    </Provider>
    </SafeAreaView>

  );
}

const styles = StyleSheet.create({
  appContainer: {
    flex: 1
  }
})