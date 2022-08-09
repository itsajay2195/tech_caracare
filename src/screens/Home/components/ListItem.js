import {
	StyleSheet,
	Text,
	View,
	Animated,
	Image,
	Dimensions,
} from "react-native";
import React, { useRef, useState, useCallback, useEffect } from "react";
import { TouchableOpacity } from "react-native-gesture-handler";
import LottieView from "lottie-react-native";

const SPACING = 20;
const AVATAR_SIZE = 70;
const BG_IMG =
	"https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQI085rp63b7TRPEmAzAaPnahzOU1A_l9FhXg&usqp=CAU";
const { height, width } = Dimensions.get("screen");

const ListItem = ({ item, gridView }) => {
	const animationHeight = useRef(new Animated.Value(0)).current;
	const [collapsed, setCollapsed] = useState(true);

	const toggleCollapsed = () => {
		setCollapsed(!collapsed);
	};

	const collapseView = useCallback(() => {
		Animated.timing(animationHeight, {
			duration: 100,
			toValue: gridView ? 200 :120,
			useNativeDriver: false,
		}).start();
	}, [animationHeight]);

	const expandView = useCallback(() => {
		// setMaxLines(null);
		Animated.timing(animationHeight, {
			duration: 100,
			toValue: gridView ? 250 : 189,
			useNativeDriver: false,
		}).start();
	}, [animationHeight]);

	useEffect(() => {
		if (collapsed) {
			collapseView();
		} else {
			expandView();
		}
	}, [collapsed]);
	return (
		<>
			{gridView ? (
				<Animated.View
					style={{
						padding: SPACING,
						height: 200,
						width: gridView ? (width - SPACING) / 2 : width - SPACING,
						marginBottom: SPACING,
						shadowColor: "#000",
						backgroundColor: "white",
						borderRadius: 12,
						// shadowOffset: {
						// 	width: 0,
						// 	height: 10,
						// },
						shadowOpacity: 0.3,
						shadowRadius: 20,
						justifyContent: "center",
					}}
				>
					<TouchableOpacity style={{ position: "absolute" }}>
						<Image
							style={{
								height: 20,
								width: 20,
							}}
							source={require("../../../assets/like-icnon.png")}
						/>
					</TouchableOpacity>
					<View style={{ flex: 1, alignItems: "center" }}>
						<Image
							source={{ uri: item.image }}
							style={{
								width: AVATAR_SIZE,
								height: AVATAR_SIZE,
								borderRadius: AVATAR_SIZE,
								marginBottom: SPACING,
							}}
						/>
					</View>

					<View
						style={{ flex: 2, justifyContent: "center", alignItems: "center" }}
					>
						<Text
							numberOfLines={1}
							style={{ fontSize: gridView ? 14 : 22, fontWeight: "700" }}
						>
							{item.name}
						</Text>
						<Text
							numberOfLines={gridView ? 1 : null}
							style={{ fontSize: gridView ? 12 : 18, opacity: 0.7 }}
						>
							{item.status}
						</Text>
						<Text
							numberOfLines={gridView ? 1 : null}
							style={{
								fontSize: gridView ? 10 : 14,
								opacity: 0.8,
								color: "#0099cc",
							}}
						>
							{item.origin.name}
						</Text>
					</View>
				
						<LottieView
							style={{
								height: 20,
								alignSelf: "center",
							}}
							loop={true}
							speed={0.5}
							source={require("../../../assets/animations/down-arrow.json")}
							autoPlay={true}
						/>
				
				</Animated.View>
			) : (
				<Animated.View
					style={{
						padding: gridView ? SPACING : SPACING,
						width: gridView ? (width - SPACING) / 2 : width - SPACING,
						height: animationHeight,
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
					<View style={{ flexDirection: "row", alignItems: "center" }}>
						<View style={{ flex: 1 }}>
							<Image
								source={{ uri: item.image }}
								style={{
									width: gridView ? AVATAR_SIZE / 2 : AVATAR_SIZE,
									height: gridView ? AVATAR_SIZE / 2 : AVATAR_SIZE,
									borderRadius: gridView ? AVATAR_SIZE / 2 : AVATAR_SIZE,
									marginRight: gridView ? SPACING / 2 : SPACING,
								}}
							/>
						</View>

						<View style={{ flex: 2, paddingLeft: gridView ? 5 : 10 }}>
							<Text
								numberOfLines={1}
								style={{ fontSize: gridView ? 14 : 22, fontWeight: "700" }}
							>
								{item.name}
							</Text>
						</View>
						<TouchableOpacity
							style={{
								flex: 1,
								justifyContent: "center",
								alignItems: "center",
							}}
						>
							<Image
								style={{
									height: gridView ? 20 : 30,
									width: gridView ? 20 : 30,
								}}
								source={require("../../../assets/like-icnon.png")}
							/>
						</TouchableOpacity>
					</View>

					{!collapsed && (
						<View style={{justifyContent:'center',alignItems:'center'}}>
							<Text
								numberOfLines={gridView ? 1 : null}
								style={{ fontSize: gridView ? 12 : 18, opacity: 0.7 }}
							>
								{item.status}
							</Text>
							<Text
								numberOfLines={1}
								style={{
									fontSize: gridView ? 10 : 14,
									opacity: 0.8,
									color: "#0099cc",
								}}
							>
								{item.origin.name}
							</Text>
						</View>
					)}

					<TouchableOpacity onPress={() => toggleCollapsed()}>
						<LottieView
							style={{
								height: 25,
								alignSelf: "center",
							}}
							loop={true}
							speed={0.5}
							source={require("../../../assets/animations/down-arrow.json")}
							autoPlay={true}
						/>
					</TouchableOpacity>
				</Animated.View>
			)}
		</>
	);
};

export default ListItem;

const styles = StyleSheet.create({});
