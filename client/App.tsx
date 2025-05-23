import React from "react";
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
import useConfigureNavbar from "./app/hooks/useConfigureNavbar";
import AuthScreenBackground from "./app/components/AuthScreenBackground/AuthScreenBackground";
import AppScreenBackground from "./app/components/AppScreenBackground/AppScreenBackground";
import useAuth from "./app/contexts/AuthContext/useAuth";
import AuthScreens from "./app/navigators/AuthStackNavigator/AuthScreens";
import useUser from "./app/contexts/UserContext/useUser";
import { UserProvider } from "./app/contexts/UserContext/UserProvider";
import AsyncStorage from "@react-native-async-storage/async-storage";
import AppTabs from "./app/navigators/BottomTabNavigator/AppTabs";
import { navBarHeight } from "./app/constants/styles/styleConstants";

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
  // AsyncStorage.clear();
  useConfigureNavbar(navBarHeight);
  const { status: authStatus } = useAuth();
  const { status: userStatus, user } = useUser();
  let content: React.JSX.Element;

  if (authStatus === "loading" || userStatus === "loading") {
    content = <Text style={{ color: "white", fontSize: 30 }}>Loading...</Text>;
  } else if (authStatus === "unauthenticated") {
    content = <AuthScreens initialRouteName="WelcomeScreen" />;
  } else if (!user) {
    content = <Text style={{ color: "white", fontSize: 30 }}>Loading...</Text>;
  } else if (!user.metadata.completedAddProfileImageScreen) {
    content = <AuthScreens initialRouteName="AddProfileImageScreen" />;
  } else {
    return (
      <AppScreenBackground>
        <AppTabs bottomSpacing={navBarHeight} />;
      </AppScreenBackground>
    );
  }
  return (
    <AuthScreenBackground additionalStyles={{ paddingBottom: navBarHeight }}>
      {content}
    </AuthScreenBackground>
  );
};

export default function App() {
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
              <NavigationContainer theme={MyTheme}>
                <AppContent />
              </NavigationContainer>
              {/* </SafeAreaView> */}
            </SafeAreaProvider>
          </UserProvider>
        </AuthProvider>
        {/* </PaperProvider> */}
      </QueryClientProvider>
    </>
  );
}
