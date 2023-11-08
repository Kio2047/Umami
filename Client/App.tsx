import React from "react";
import "react-native-gesture-handler";
// import { StatusBar } from "expo-status-bar";
import * as NavigationBar from "expo-navigation-bar";
import { SafeAreaProvider } from "react-native-safe-area-context";
import { StatusBar, Platform } from "react-native";
import {
  NavigationContainer,
  DarkTheme,
  DefaultTheme
} from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
// import { Provider } from "react-redux";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import ThemeProvider from "@react-navigation/native";

import type { RootStackParamList } from "./app/Types/NavigationTypes";
import colors from "./app/colors";
import LandingPage from "./app/screens/LandingPage/LandingPage";
import Login from "./app/screens/Login/Login";
import Register from "./app/screens/Register/Register";
// import Feed from "./app/screens/Feed/Feed";
import DetailedImage from "./app/screens/DetailedImage";
import CreateNewPost from "./app/screens/CreateNewPost";
import UserProfile from "./app/screens/UserProfile";
import RestaurantProfile from "./app/screens/RestaurantProfile";
import AddProfileImage from "./app/screens/AddProfileImage/AddProfileImage";
// import AppTabs from "./app/components/AppTabs/AppTabs";
import { AuthContextProvider } from "./app/contexts/AuthContext/AuthContextProvider";
import { Provider as PaperProvider } from "react-native-paper";

// import DetailedPost from "./app/components/Post";

NavigationBar.setBackgroundColorAsync(colors.backgroundColor);

const RootStack = createStackNavigator<RootStackParamList>();
const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 0,
      cacheTime: 60000
    }
  }
});

const MyTheme = {
  ...DefaultTheme,
  colors: {
    ...DefaultTheme.colors,
    primary: "rgb(255, 45, 85)",
    background: "#000000",
    secondaryContainer: "transparent"
  }
};

export default function App() {
  return (
    <QueryClientProvider client={queryClient}>
      {/* <PaperProvider> */}
      {/* context currently redundant - see API utils to do*/}
      <AuthContextProvider>
        <SafeAreaProvider>
          {/* <SafeAreaView style={styles.appContainer}> */}
          <StatusBar></StatusBar>
          {/* <Provider store={store}> */}
          <NavigationContainer theme={MyTheme}>
            {/* <NavigationContainer> */}
            <RootStack.Navigator
              initialRouteName="AppTabs"
              // initialRouteName="AppTabs"
              // initialRouteName={
              //   authData[0].status === "success" ? "Feed" : "LandingPage"
              // }
              screenOptions={{ headerShown: false }}
            >
              {/* initialParams={{user: "Dan"}} */}
              <RootStack.Screen name="LandingPage" component={LandingPage} />
              <RootStack.Screen name="Login" component={Login} />
              <RootStack.Screen name="Register" component={Register} />
              <RootStack.Screen
                name="AddProfileImage"
                component={AddProfileImage}
                initialParams={{ newUserName: "Kio Shiraz" }}
              />
              {/* <RootStack.Screen name="Feed" component={Feed} /> */}
              {/* <RootStack.Screen
                  name="AppTabs"
                  component={AppTabs}
                  options={{ headerShown: false }}
                /> */}
              {/* <RootStack.Screen name="DetailedPost" component={DetailedPost} /> */}
              <RootStack.Screen
                name="DetailedImage"
                component={DetailedImage}
              />
              <RootStack.Screen
                name="CreateNewPost"
                component={CreateNewPost}
              />
              <RootStack.Screen name="UserProfile" component={UserProfile} />
              <RootStack.Screen
                name="RestaurantProfile"
                component={RestaurantProfile}
              />
            </RootStack.Navigator>
          </NavigationContainer>
          {/* </Provider> */}
          {/* </SafeAreaView> */}
        </SafeAreaProvider>
      </AuthContextProvider>
      {/* </PaperProvider> */}
    </QueryClientProvider>
  );
}
