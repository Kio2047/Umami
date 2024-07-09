import "react-native-gesture-handler";
// import { StatusBar } from "expo-status-bar";
import { SafeAreaProvider } from "react-native-safe-area-context";
import { StatusBar } from "react-native";
import {
  NavigationContainer,
  DarkTheme,
  DefaultTheme
} from "@react-navigation/native";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import ThemeProvider from "@react-navigation/native";

import { AuthContextProvider } from "./app/contexts/AuthContext/AuthContextProvider";
import { Provider as PaperProvider } from "react-native-paper";
import useNavigationBarConfig from "./app/hooks/useNavigationBarConfig";
import ScreenBackground from "./app/components/ScreenBackground/ScreenBackground";
import { useAuthContext } from "./app/hooks/useAuthContext";
import AuthScreens from "./app/navigators/AuthStackNavigator/AuthScreens";
import AppTabs from "./app/navigators/BottomTabNavigator/AppTabs";

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

const AppNavigator = () => {
  const [authData] = useAuthContext();
  return (
    <NavigationContainer theme={MyTheme}>
      {authData.status === "authenticated" ? <AuthScreens /> : <AppTabs />};
    </NavigationContainer>
  );
};

// TODO: add splash screen to application

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
        <AuthContextProvider>
          <SafeAreaProvider>
            {/* <SafeAreaView style={styles.appContainer}> */}
            <ScreenBackground
            // additionalStyles={{ paddingBottom: navigationBarHeight }}
            >
              <AppNavigator />
            </ScreenBackground>
            {/* </SafeAreaView> */}
          </SafeAreaProvider>
        </AuthContextProvider>
        {/* </PaperProvider> */}
      </QueryClientProvider>
    </>
  );
}
