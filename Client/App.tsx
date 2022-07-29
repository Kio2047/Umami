import 'react-native-gesture-handler';
// import { StatusBar } from 'expo-status-bar';
import * as NavigationBar from 'expo-navigation-bar'
import { SafeAreaView, StatusBar, StyleSheet, Platform } from 'react-native';
import { NavigationContainer, DarkTheme } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

import type { RootStackParamsList } from './app/types';
import { backgroundColor } from './app/colors';
import SignIn from './app/screens/SignIn';
import Login from './app/screens/Login';
import Register from './app/screens/Register';
import Home from './app/screens/Home';
import Post from './app/components/Post';
import About from './app/screens/About';

NavigationBar.setBackgroundColorAsync(backgroundColor);
const RootStack = createStackNavigator<RootStackParamsList>();

export default function App() {
  return (
    <SafeAreaView style={styles.appContainer}>
    <StatusBar></StatusBar>
    <NavigationContainer theme={DarkTheme}>
      <RootStack.Navigator initialRouteName="SignIn" screenOptions={{ headerShown: false }}>
        {/* initialParams={{user: "Dan"}} */}
        <RootStack.Screen name="SignIn" component={SignIn} />
        <RootStack.Screen name="Login" component={Login} />
        <RootStack.Screen name="Register" component={Register} />
        <RootStack.Screen name="Home" component={Home} />
        <RootStack.Screen name="Post" component={Post} />
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