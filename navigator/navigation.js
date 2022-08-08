import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { NavigationContainer } from "@react-navigation/native";
import { KeyboardAvoidingView, Platform } from "react-native";
import Home from "../src/screens/Home/Home";
import Favourites from "../src/screens/Favourites/Favourites";
import { CustomTab } from "../src/assets/animations";
import React,{useState} from 'react'


const Tab = createBottomTabNavigator();


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
						headerStyle:{backgroundColor: 'rgb(72, 159, 157)'},
            tabBarActiveTintColor:'#FFFFFF',
            tabBarInactiveTintColor:'#3A4A4A',
						tabBarStyle: {
							height: 90,
							paddingHorizontal: 5,
							paddingTop: 0,
							backgroundColor: 'rgb(72, 159, 157)',
							position: "absolute",
							borderTopWidth: 0,
						},
					})}
				>
					<Tab.Screen
						name="Home"
						component={Home}
						options={({ route }) => ({
							tabBarIcon: ({focused}) => {
								return <CustomTab route={route} focused={focused} />;
							},
						})}
					/>
          	<Tab.Screen
						name="Favourites"
						component={Favourites}
						options={({ route }) => ({
							tabBarIcon: ({focused}) => {
								return <CustomTab route={route} focused={focused} />;
							},
						})}
					/>
				</Tab.Navigator>
			</KeyboardAvoidingView>
		</NavigationContainer>
	);
}
