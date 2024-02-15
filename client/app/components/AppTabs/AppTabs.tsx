import { View, Text, SafeAreaView } from "react-native";
import React from "react";
import { createMaterialBottomTabNavigator } from "@react-navigation/material-bottom-tabs";

import { MaterialCommunityIcons } from "@expo/vector-icons";

import styles from "./AppTabs.styles";
import Feed from "../../screens/Feed/Feed";
import { StackScreenProps } from "../../types/NavigationTypes";
import App from "../../../App";
import Search from "../../screens/Search/Search";

const Tab = createMaterialBottomTabNavigator();

const AppTabs = ({ navigation, route }: StackScreenProps<"AppTabs">) => {
  return (
    // <SafeAreaView>
    <Tab.Navigator
      opti
      // labeled={false}
      shifting={true}
      backBehavior="initialRoute"
      initialRouteName="Feed"
      activeColor="#f0edf6"
      // activeColor="#f0edf6"
      inactiveColor="#f0edf6"
      barStyle={styles.tabNavigatorStyles}
    >
      <Tab.Screen
        name="Feed"
        component={Feed}
        options={{
          // unmountOnBlur: true,
          tabBarLabel: undefined,
          tabBarIcon: ({ color, focused }) => (
            <MaterialCommunityIcons
              name={focused ? "home" : "home-outline"}
              color={color}
              size={30}
            />
          )
        }}
      />

      <Tab.Screen
        name="Map"
        component={Feed}
        options={{
          tabBarLabel: undefined,
          tabBarIcon: ({ color, focused }) => (
            <MaterialCommunityIcons
              name={focused ? "map-search" : "map-search-outline"}
              color={color}
              size={30}
            />
          )
        }}
      />
      <Tab.Screen
        name="Create Post"
        component={Feed}
        options={{
          tabBarLabel: undefined,
          tabBarIcon: ({ color, focused }) => (
            <MaterialCommunityIcons
              name={focused ? "plus-box" : "plus-box-outline"}
              color={color}
              size={30}
            />
          )
        }}
      />
      <Tab.Screen
        name="Search"
        component={Search}
        options={{
          tabBarLabel: undefined,
          tabBarIcon: ({ color, focused }) => (
            <MaterialCommunityIcons
              name={focused ? "magnify" : "magnify"}
              color={color}
              size={30}
            />
          )
        }}
      />
      <Tab.Screen
        name="Profile"
        component={Feed}
        options={{
          tabBarLabel: undefined,
          tabBarIcon: ({ color, focused }) => (
            <MaterialCommunityIcons
              name={focused ? "account" : "account-outline"}
              color={color}
              size={30}
            />
          )
        }}
      />
    </Tab.Navigator>
    // </SafeAreaView>
  );
};

// <Tab.Navigator
//   // initialRouteName="Feed"
//   activeColor="#f0edf6"
//   inactiveColor="#3e2465"
//   barStyle={{ backgroundColor: "#694fad" }}
//   // barStyle={{ paddingBottom: 48 }}
// >
//   <Tab.Screen name="Feed" component={Feed} />
//   {/* <Tab.Screen name="Settings" component={SettingsScreen} /> */}
// </Tab.Navigator>

export default AppTabs;
