import "react-native-gesture-handler";
// import { StatusBar } from "expo-status-bar";
import { SafeAreaProvider } from "react-native-safe-area-context";
import { StatusBar } from "react-native";
import {
  NavigationContainer,
  DarkTheme,
  DefaultTheme
} from "@react-navigation/native";
// import { Provider } from "react-redux";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import ThemeProvider from "@react-navigation/native";

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
import { RootStack, stackScreenOptions } from "./app/navigators/RootStack";
import useNavigationBarConfig from "./app/hooks/useNavigationBarConfig";
import ScreenBackground from "./app/components/ScreenBackground/ScreenBackground";
import RegistrationEmail from "./app/screens/RegistrationEmail/RegistrationEmail";

// import DetailedPost from "./app/components/Post";

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
    // background: "#000000",
    background: "transparent",
    secondaryContainer: "transparent"
  }
};

// TODO: add splash screen to application

export default function App() {
  const navigationBarHeight = useNavigationBarConfig();
  return (
    <>
      <StatusBar
        backgroundColor="transparent"
        translucent
        // If dark mode use light-content, else...
        barStyle="light-content"
      />
      <QueryClientProvider client={queryClient}>
        {/* <PaperProvider> */}
        {/* context currently redundant - see API utils to do*/}
        <AuthContextProvider>
          <SafeAreaProvider>
            {/* <SafeAreaView style={styles.appContainer}> */}
            {/* <Provider store={store}> */}
            {/* <ScreenBackground styles={{}}> */}
            <ScreenBackground
              additionalStyles={{ paddingBottom: navigationBarHeight }}
            >
              <NavigationContainer theme={MyTheme}>
                {/* <NavigationContainer> */}
                <RootStack.Navigator
                  initialRouteName="LandingPage"
                  // initialRouteName="AppTabs"
                  // initialRouteName={
                  //   authData[0].status === "success" ? "Feed" : "LandingPage"
                  // }
                  screenOptions={stackScreenOptions}
                >
                  {/* initialParams={{user: "Dan"}} */}
                  <RootStack.Screen
                    name="LandingPage"
                    component={LandingPage}
                  />
                  <RootStack.Screen name="Login" component={Login} />
                  <RootStack.Screen name="Register" component={Register} />
                  <RootStack.Screen
                    name="RegistrationEmail"
                    component={RegistrationEmail}
                  />
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
                  <RootStack.Screen
                    name="UserProfile"
                    component={UserProfile}
                  />
                  <RootStack.Screen
                    name="RestaurantProfile"
                    component={RestaurantProfile}
                  />
                </RootStack.Navigator>
              </NavigationContainer>
            </ScreenBackground>
            {/* </ScreenBackground> */}
            {/* </Provider> */}
            {/* </SafeAreaView> */}
          </SafeAreaProvider>
        </AuthContextProvider>
        {/* </PaperProvider> */}
      </QueryClientProvider>
    </>
  );
}
