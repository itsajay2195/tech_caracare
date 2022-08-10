import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { NavigationContainer } from "@react-navigation/native";
import { KeyboardAvoidingView, Platform } from "react-native";
import Home from "../src/screens/Home/Home";
import Favourites from "../src/screens/Favourites/Favourites";
import { CustomTab } from "../src/assets/animations";
import React, { useState } from "react";
import DetailsScreen from "../src/screens/Details/DetailsScreen";
import { createStackNavigator } from "@react-navigation/stack";
import { theme } from "../src/constants";
const Tab = createBottomTabNavigator();
const HomeStack = createStackNavigator();

function HomeStackScreen() {
	return (
		<HomeStack.Navigator screenOptions={()=>({headerShown:false})}>
			<HomeStack.Screen name="Home" component={Home} />
			<HomeStack.Screen name="Details" component={DetailsScreen} />
		</HomeStack.Navigator>
	);
}

export default function RootNavigation() {


	return (
		<NavigationContainer>
			<KeyboardAvoidingView
				behavior={Platform.OS === "ios" ? "padding" : "height"}
				keyboardVerticalOffset={Platform.OS === "ios" ? -64 : 0}
				style={{ flex: 1 }}
			>
				<Tab.Navigator
					initialRouteName="Home"
					screenOptions={({ route }) => ({
						headerShown: true,
						headerStyle: { backgroundColor: theme.COLORS.primaryBgColor },
						tabBarActiveTintColor:theme.COLORS.white,
						tabBarInactiveTintColor: "#3A4A4A",
						tabBarStyle: {
							height: 90,
							paddingHorizontal: 5,
							paddingTop: 0,
							backgroundColor:  theme.COLORS.primaryBgColor ,
							position: "absolute",
							borderTopWidth: 0,
						},
					})}
				>
					<Tab.Screen
						name="Home"
						component={HomeStackScreen}
						options={({ route }) => ({
							tabBarIcon: ({ focused }) => {
								return <CustomTab route={route} focused={focused} />;
							},
						})}
					/>
					<Tab.Screen
						name="Favourites"
						component={Favourites}
						options={({ route }) => ({
							tabBarIcon: ({ focused }) => {
								return <CustomTab route={route} focused={focused} />;
							},
						})}
					/>
				</Tab.Navigator>
			</KeyboardAvoidingView>
		</NavigationContainer>
	);
}
