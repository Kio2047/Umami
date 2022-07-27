import 'react-native-gesture-handler';
// import { StatusBar } from 'expo-status-bar';
import * as NavigationBar from 'expo-navigation-bar'
import { SafeAreaView, StatusBar, StyleSheet, Platform } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';


import { backgroundColor } from './app/colors';
import SignIn from './app/screens/SignIn';
import Home from './app/screens/Home';
import About from './app/screens/About';

const Stack = createStackNavigator();
NavigationBar.setBackgroundColorAsync(backgroundColor);

export default function App() {
  return (
    <SafeAreaView style={styles.appContainer}>
    <StatusBar></StatusBar>
    <NavigationContainer>
      <Stack.Navigator initialRouteName="SignIn" screenOptions={{ headerShown: false }}>
        <Stack.Screen name="SignIn" component={SignIn} options={{ title: "SignIn" }} />
        <Stack.Screen name="Home" component={Home} options={{ title: "Home" }} />
        <Stack.Screen name="About" component={About} />
      </Stack.Navigator>
    </NavigationContainer>
    </SafeAreaView>

  );
}

const styles = StyleSheet.create({
  appContainer: {
    flex: 1
  }
})