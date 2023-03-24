import "react-native-gesture-handler";
// import { StatusBar } from "expo-status-bar";
import * as NavigationBar from "expo-navigation-bar";
import { SafeAreaProvider } from "react-native-safe-area-context";
import { StatusBar, Platform } from "react-native";
import { NavigationContainer, DarkTheme } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import { Provider } from "react-redux";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { createContext } from "react";

import type { RootStackParamList } from "./app/Types/NavigationTypes";
import colors from "./app/colors";
import LandingPage from "./app/screens/LandingPage/LandingPage";
import Login from "./app/screens/Login/Login";
import Register from "./app/screens/Register/Register";
import Feed from "./app/screens/Feed";
import DetailedImage from "./app/screens/DetailedImage";
import CreateNewPost from "./app/screens/CreateNewPost";
import UserProfile from "./app/screens/UserProfile";
import RestaurantProfile from "./app/screens/RestaurantProfile";
import { store } from "./app/redux/store";
import AddProfileImage from "./app/screens/AddProfileImage/AddProfileImage";
import { useLocalStorageAuthData } from "./app/utils/customHooks";
import { AuthContext } from "./app/utils/appContext";

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

export default function App() {
  const authData = useLocalStorageAuthData();

  if (authData[0].status === "loading") {
    // TODO: add loading screen
    return <></>;
  }

  return (
    <QueryClientProvider client={queryClient}>
      <AuthContext.Provider value={authData}>
        <SafeAreaProvider>
          {/* <SafeAreaView style={styles.appContainer}> */}
          <StatusBar></StatusBar>
          <Provider store={store}>
            <NavigationContainer theme={DarkTheme}>
              <RootStack.Navigator
                // initialRouteName="LandingPage"
                initialRouteName={
                  authData[0].status === "success" ? "Feed" : "LandingPage"
                }
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
                <RootStack.Screen name="Feed" component={Feed} />
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
          </Provider>
          {/* </SafeAreaView> */}
        </SafeAreaProvider>
      </AuthContext.Provider>
    </QueryClientProvider>
  );
}
