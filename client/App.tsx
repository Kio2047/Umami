import "react-native-gesture-handler";
// import { StatusBar } from "expo-status-bar";
import { SafeAreaProvider } from "react-native-safe-area-context";
import { StatusBar, Text } from "react-native";
import {
  NavigationContainer,
  DarkTheme,
  DefaultTheme
} from "@react-navigation/native";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import ThemeProvider from "@react-navigation/native";

import { AuthProvider } from "./app/contexts/AuthContext/AuthProvider";
import { Provider as PaperProvider } from "react-native-paper";
import useNavigationBarConfig from "./app/hooks/useNavigationBarConfig";
import ScreenBackground from "./app/components/ScreenBackground/ScreenBackground";
import useAuth from "./app/contexts/AuthContext/useAuth";
import AuthScreens from "./app/navigators/AuthStackNavigator/AuthScreens";
import AppTabs from "./app/navigators/BottomTabNavigator/AppTabs";
import { assertUnreachable } from "./app/utils/utils";
import useUser from "./app/contexts/UserContext/useUser";
import { User } from "./app/types/UserTypes";
import { UserProvider } from "./app/contexts/UserContext/UserProvider";

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

const AppContent = () => {
  const { status: authStatus } = useAuth();
  const { status: userStatus, user } = useUser();
  if (authStatus === "loading" || userStatus === "loading") {
    return <Text>Loading...</Text>;
  }
  if (authStatus === "unauthenticated") {
    if (user)
      throw new Error(
        `Inconsistent local storage state: authStatus=${authStatus}, user=${JSON.stringify(
          user
        )}`
      );
    return <AuthScreens initialRouteName="WelcomeScreen" />;
  }
  if (!user)
    throw new Error(
      `Inconsistent local storage state: authStatus=${authStatus}, user=${JSON.stringify(
        user
      )}`
    );
  if (!user.metadata.completedAddProfileImageScreen) {
    return <AuthScreens initialRouteName="AddProfileImageScreen" />;
  }
  return <AppTabs />;
};

export default function App() {
  const navigationBarHeight = useNavigationBarConfig();
  return (
    <>
      <StatusBar
        backgroundColor="transparent"
        translucent
        // TODO: If dark mode use light-content, else...
        barStyle="light-content"
      />
      <QueryClientProvider client={queryClient}>
        {/* <PaperProvider> */}
        <AuthProvider>
          <UserProvider>
            <SafeAreaProvider>
              {/* <SafeAreaView style={styles.appContainer}> */}
              <ScreenBackground
                additionalStyles={{ paddingBottom: navigationBarHeight }}
              >
                <NavigationContainer theme={MyTheme}>
                  <AppContent />
                </NavigationContainer>
              </ScreenBackground>
              {/* </SafeAreaView> */}
            </SafeAreaProvider>
          </UserProvider>
        </AuthProvider>
        {/* </PaperProvider> */}
      </QueryClientProvider>
    </>
  );
}
