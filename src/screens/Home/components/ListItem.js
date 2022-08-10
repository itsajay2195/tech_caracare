import {
	StyleSheet,
	Text,
	View,
	Animated,
	Image,
	Dimensions,
	TouchableOpacity
} from "react-native";
import React, { useRef, useState, useCallback, useEffect } from "react";
import LottieView from "lottie-react-native";

const SPACING = 20;
const AVATAR_SIZE = 70;
const BG_IMG =
	"https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQI085rp63b7TRPEmAzAaPnahzOU1A_l9FhXg&usqp=CAU";
const { height, width } = Dimensions.get("screen");

const ListItem = ({ item, gridView,setFavourites,favouriteIds }) => {
	const animationHeight = useRef(new Animated.Value(0)).current;
	const [collapsed, setCollapsed] = useState(true);
	let favourites = {}
	const toggleCollapsed = () => {
		setCollapsed(!collapsed);
	};

	const collapseView = useCallback(() => {
		Animated.timing(animationHeight, {
			duration: 100,
			toValue: gridView ? 200 : 120,
			useNativeDriver: false,
		}).start();
	}, [animationHeight]);

	const expandView = useCallback(() => {
		// setMaxLines(null);
		Animated.timing(animationHeight, {
			duration: 100,
			toValue: gridView ? 250 : 200,
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
						height: animationHeight,
						width: gridView ? (width - SPACING) / 2 : width - SPACING,
						marginBottom: SPACING,
						shadowColor: "#000",
						backgroundColor: "white",
						elevation: 3,
						borderRadius: 12,
						// shadowOffset: {
						// 	width: 0,
						// 	height: 10,
						// },
						shadowOpacity: 0.3,
						shadowRadius: 20,
						// justifyContent: "center",
					}}
				>
					<TouchableOpacity style={{ position: "absolute",top:10,left:5,right:0,bottom:0 }} onPress={()=>{
						
						setFavourites(item)
						}}>
						<Image
							style={{
								height: 20,
								width: 20,
							}}
							source={favouriteIds.includes(item.id) ? require("../../../assets/icons/like-fill-icon.png") :  require("../../../assets/icons/like-icnon.png")}
						/>
					</TouchableOpacity>
					<View style={{ height: AVATAR_SIZE, alignItems: "center" }}>
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
						style={{ justifyContent: "center", alignItems: "center" }}
					>
							<Text>{item.id}</Text>
							<Text
								numberOfLines={1}
								style={{paddingTop: 10, fontSize: gridView ? 14 : 22, fontWeight: "700" }}
							>
								{item.name}
							</Text>
						<Text
							numberOfLines={gridView ? 1 : null}
							style={{
								paddingTop: 10,
								fontSize: gridView ? 12 : 18,
								opacity: 0.7,
							}}
						>
							<Text style={{ fontWeight: "bold" }}>Status:</Text> {item.status}
						</Text>

						<Text
							numberOfLines={gridView ? 1 : null}
							style={{
								paddingTop: 10,
								fontSize: gridView ? 12 : 18,
								opacity: 0.7,
							}}
						>
							<Text style={{ fontWeight: "bold" }}>Species:</Text>{" "}
							{item.species}
						</Text>
						<View
							style={{
								flexDirection: "row",
								justifyContent: "space-around",
								alignItems: "center",
								paddingTop: 10,
							}}
						>
							<Image
								style={{ tintColor: "red", height: 20, width: 20 }}
								source={require("../../../assets/icons/location.png")}
							/>
							<Text
								numberOfLines={1}
								style={{
									fontSize: gridView ? 10 : 14,
									opacity: 0.8,
									color: "#0099cc",
								}}
							>
								{item.origin.name.includes("(")
									? item.origin.name.split("(")[0]
									: item.origin.name}
							</Text>
						</View>
					</View>
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
						elevation: 3,
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
							<Text>{item.id}</Text>
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
							onPress={()=>{
								setFavourites(item)
								}}
						>
							<Image
								style={{
									height: 30,
									width: 30,
								}}
								source={favouriteIds.includes(item.id) ? require("../../../assets/icons/like-fill-icon.png") :  require("../../../assets/icons/like-icnon.png")}
							/>
						</TouchableOpacity>
					</View>

					{!collapsed && (
						<View style={{ justifyContent: "center", alignItems: "center" }}>
							<Text
								numberOfLines={gridView ? 1 : null}
								style={{ fontSize: gridView ? 12 : 18, opacity: 0.7 }}
							>
								<Text style={{ fontWeight: "bold" }}>Status:</Text>{" "}
								{item.status}
							</Text>

							<Text
								numberOfLines={gridView ? 1 : null}
								style={{ fontSize: gridView ? 12 : 18, opacity: 0.7 }}
							>
								<Text style={{ fontWeight: "bold" }}>Species:</Text>{" "}
								{item.species}
							</Text>
							<View
								style={{
									flexDirection: "row",
									justifyContent: "space-around",
									alignItems: "center",
								}}
							>
								<Image
									style={{ tintColor: "red", height: 20, width: 20 }}
									source={require("../../../assets/icons/location.png")}
								/>
								<Text
									numberOfLines={1}
									style={{
										fontSize: gridView ? 10 : 14,
										opacity: 0.8,
										color: "#0099cc",
									}}
								>
									{item.origin.name.includes("(")
										? item.origin.name.split("(")[0]
										: item.origin.name}
								</Text>
							</View>
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
