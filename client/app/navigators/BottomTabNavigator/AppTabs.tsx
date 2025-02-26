import React from "react";
import { View, Text } from "react-native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { Ionicons } from "@expo/vector-icons";
import { StyleSheet } from "react-native";
import { LinearGradient } from "expo-linear-gradient";

import FeedScreen from "../../screens/Feed/FeedScreen";

const Tab = createBottomTabNavigator();

const CreatePostScreen = () => (
  <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
    <Text>Create Post Screen</Text>
  </View>
);

const ProfileScreen = () => (
  <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
    <Text>Profile Screen</Text>
  </View>
);

const tabHeight = 40;
const iconSize = 30;

const AppTabs = ({ bottomSpacing }: { bottomSpacing: number }) => {
  return (
    <Tab.Navigator
      initialRouteName="Feed"
      screenOptions={{
        tabBarStyle: {
          position: "absolute",
          backgroundColor: "transparent",
          borderTopWidth: 0,
          paddingTop: 20,
          height: bottomSpacing + tabHeight + 20,
          elevation: 0,
          gap: 20,
          flexDirection: "row",
          alignItems: "center",
          justifyContent: "center",
          paddingHorizontal: 30
        },
        tabBarIconStyle: {
          width: iconSize
        },
        tabBarItemStyle: {
          height: tabHeight,
          marginHorizontal: 18
          // backgroundColor: "green",
        },
        tabBarBackground: () => (
          <LinearGradient
            colors={["rgba(0,0,0,0)", "rgba(0,0,0,0.6)", "rgba(0,0,0,1)"]}
            locations={[0, 0.3, 0.8]}
            start={{ x: 0, y: 0 }}
            end={{ x: 0, y: 1 }}
            style={StyleSheet.absoluteFillObject}
          />
        ),
        tabBarShowLabel: false,
        headerShown: false,
        tabBarActiveTintColor: "#fff",
        tabBarInactiveTintColor: "#bbb"
      }}
    >
      <Tab.Screen
        name="Feed"
        component={FeedScreen}
        options={{
          tabBarIcon: ({ focused, color }) => (
            <Ionicons
              name={focused ? "home" : "home-outline"}
              color={color}
              size={iconSize}
            />
          )
        }}
      />
      <Tab.Screen
        name="CreatePost"
        component={CreatePostScreen}
        options={{
          tabBarIcon: ({ focused, color }) => (
            // "boxed plus" can be represented with a circle + outline icon
            <Ionicons
              name={focused ? "add-circle" : "add-circle-outline"}
              color={color}
              size={iconSize}
            />
          )
        }}
      />
      <Tab.Screen
        name="Profile"
        component={ProfileScreen}
        options={{
          tabBarIcon: ({ focused, color }) => (
            <Ionicons
              name={focused ? "person" : "person-outline"}
              color={color}
              size={iconSize}
            />
          )
        }}
      />
    </Tab.Navigator>
  );
};

export default AppTabs;
