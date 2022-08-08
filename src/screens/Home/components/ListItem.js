import { StyleSheet, Text, View, Animated, Image, Dimensions } from "react-native";
import React, { useRef, useState, useCallback, useEffect } from "react";
import { TouchableOpacity } from "react-native-gesture-handler";

const SPACING = 20;
const AVATAR_SIZE = 70;
const BG_IMG =
	"https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQI085rp63b7TRPEmAzAaPnahzOU1A_l9FhXg&usqp=CAU";
const {height,width} = Dimensions.get('screen')

const ListItem = ({ item ,gridView}) => {
	const animationHeight = useRef(new Animated.Value(0)).current;
	const [collapsed, setCollapsed] = useState(true);

	const toggleCollapsed = () => {
		setCollapsed(!collapsed);
	};

	const collapseView = useCallback(() => {
		Animated.timing(animationHeight, {
			duration: 100,
			toValue: 72,
			useNativeDriver: false,
		}).start();
	}, [animationHeight]);

	const expandView = useCallback(() => {
		// setMaxLines(null);
		Animated.timing(animationHeight, {
			duration: 100,
			toValue: 189,
			useNativeDriver: false,
		}).start();
	}, [animationHeight]);

	useEffect(() => {
		if (collapsed) {
			collapseView();
		} else {
			expandView();
			inputRef.current.focus();
		}
	}, [collapsed]);
	return (
		<Animated.View
			style={{
				flexDirection: "row",
				padding: gridView ? SPACING : SPACING,
				width:gridView ? (width - SPACING)/2 : width - SPACING,
				marginBottom: SPACING,
				shadowColor: "#000",
				backgroundColor: "white",
				borderRadius: 12,
				justifyContent: "space-between",
				// shadowOffset: {
				// 	width: 0,
				// 	height: 10,
				// },
				shadowOpacity: 0.3,
				shadowRadius: 20,
				
			}}
		>
			<View  style={{flex:1}}>
				<Image
					source={{ uri: item.image }}
					style={{
						width: gridView ?  AVATAR_SIZE /2 :AVATAR_SIZE,
						height: gridView ?  AVATAR_SIZE /2 :AVATAR_SIZE,
						borderRadius: gridView ?  AVATAR_SIZE /2 :AVATAR_SIZE,
						marginRight: gridView ? SPACING/2 : SPACING,
					}}
				/>
			</View>

			<View style={{ flex:2, paddingLeft:gridView ?5 :10,}}>
				<Text
					numberOfLines={1}
					style={{ fontSize:gridView ? 14 : 22, fontWeight: "700" }}
				>
					{item.name}
				</Text>
				<Text numberOfLines={gridView ? 1 :null} style={{ fontSize: gridView ?12: 18, opacity: 0.7 }}>{item.status}</Text>
				<Text  numberOfLines={gridView ? 1 :null} style={{ fontSize: gridView ? 10:14, opacity: 0.8, color: "#0099cc" }}>
					{item.origin.name}
				</Text>
			
			</View>
			<TouchableOpacity style={{ flex:1}}>
				<Image
					style={{ height: gridView ?20: 30, width:gridView? 20: 30 }}
					source={require("../../../assets/like-icnon.png")}
				/>
			</TouchableOpacity>

		
		</Animated.View>
	);
};

export default ListItem;

const styles = StyleSheet.create({});
