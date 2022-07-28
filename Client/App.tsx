import 'react-native-gesture-handler';
// import { StatusBar } from 'expo-status-bar';
import * as NavigationBar from 'expo-navigation-bar'
import { SafeAreaView, StatusBar, StyleSheet, Platform } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

import type { RootStackParamsList } from './app/navTypes';
import { backgroundColor } from './app/colors';
import SignIn from './app/screens/SignIn';
import Home from './app/screens/Home';
import About from './app/screens/About';
import Login from './app/screens/Login';

NavigationBar.setBackgroundColorAsync(backgroundColor);
const RootStack = createStackNavigator<RootStackParamsList>();

export default function App() {
  return (
    <SafeAreaView style={styles.appContainer}>
    <StatusBar></StatusBar>
    <NavigationContainer>
      <RootStack.Navigator initialRouteName="SignIn" screenOptions={{ headerShown: false }}>
        {/* initialParams={{user: "Dan"}} */}
        <RootStack.Screen name="SignIn" component={SignIn} />
        <RootStack.Screen name="Login" component={Login} />
        <RootStack.Screen name="Home" component={Home} />
        <RootStack.Screen name="About" component={About} />
      </RootStack.Navigator>
    </NavigationContainer>
    </SafeAreaView>

  );
}

const styles = StyleSheet.create({
  appContainer: {
    flex: 1
  }
})