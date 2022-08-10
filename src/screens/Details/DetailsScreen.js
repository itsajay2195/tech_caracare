import { StyleSheet, Text, Image, Easing, View, Animated , TouchableOpacity} from "react-native";
import React, { useEffect } from "react";
import { theme } from "../../constants";
import Ionicons from "react-native-vector-icons/Ionicons";

const DetailsScreen = ({ route,navigation }) => {
	const { item } = route.params;
	const animatedValue1 = new Animated.Value(0);
	const animatedValue2 = new Animated.Value(0);
	const animatedValue3 = new Animated.Value(0);

	const animate = () => {
		animatedValue1.setValue(0);
		animatedValue2.setValue(0);
		animatedValue3.setValue(0);
		const createAnimation = function (value, duration, easing, delay = 0) {
			return Animated.timing(value, {
				toValue: 1,
				duration,
				easing,
				delay,
			});
		};
		Animated.parallel([
			createAnimation(animatedValue1, 2000, Easing.ease),
			createAnimation(animatedValue2, 1000, Easing.ease, 1000),
			createAnimation(animatedValue3, 1000, Easing.ease, 2000),
		]).start();
	};

	const scaleText = animatedValue1.interpolate({
		inputRange: [0, 1],
		outputRange: [0.5, 1.5],
	});
	const spinText = animatedValue2.interpolate({
		inputRange: [0, 1],
		outputRange: ["0deg", "720deg"],
	});
	const introButton = animatedValue3.interpolate({
		inputRange: [0, 1],
		outputRange: [-100, 400],
	});

	useEffect(() => {
		animate();
	}, []);

	return (
		<View style={{ flex: 1 }}>
			<Animated.View
				style={{
					height: 250,
					justifyContent: "center",
					alignItems: "center",
					paddingTop: 50,
					transform: [{ scale: scaleText }],
				}}
			>
				<Image
					style={{ height: 70, width: 70, borderRadius: 20 }}
					source={{ uri: item.image }}
				/>
				<Text
					numberOfLines={1}
					style={{
						paddingTop: theme.SIZES.padding / 2,
						fontSize: theme.SIZES.h2,
						fontWeight: "700",
					}}
				>
					{item.name}
				</Text>
			</Animated.View>
			<View style={{ flex: 1, alignItems: "center" }}>
				<Text
					numberOfLines={1}
					style={{
						paddingTop: theme.SIZES.padding / 2,
						fontSize: theme.SIZES.body3,
						opacity: 0.7,
					}}
				>
					<Text style={{ fontWeight: "bold" }}>Status:</Text> {item.status}
				</Text>

				<Text
					numberOfLines={1}
					style={{
						paddingTop: theme.SIZES.padding / 2,
						fontSize: theme.SIZES.body3,
						opacity: 0.7,
					}}
				>
					<Text style={{ fontWeight: "bold" }}>Species:</Text> {item.species}
				</Text>

				<Text
					numberOfLines={1}
					style={{
						paddingTop: theme.SIZES.padding / 2,
						fontSize: theme.SIZES.body3,
						opacity: 0.7,
					}}
				>
					<Text style={{ fontWeight: "bold" }}>Gender:</Text> {item.gender}
				</Text>

				<View
					style={{
						flexDirection: "row",
						justifyContent: "space-around",
						alignItems: "center",
						paddingTop: theme.SIZES.padding / 2,
					}}
				>
					<Image
						style={{ tintColor: theme.COLORS.red, height: 20, width: 20 }}
						source={require("../../assets/icons/location.png")}
					/>
					<Text
						numberOfLines={1}
						style={{
							fontSize: theme.SIZES.h4,
							opacity: 0.8,
							color: "#0099cc",
						}}
					>
						{item.origin.name.includes("(")
							? item.origin.name.split("(")[0]
							: item.origin.name}
					</Text>
				</View>
				<Text
					numberOfLines={1}
					style={{
						paddingTop: theme.SIZES.padding / 2,
						fontSize: theme.SIZES.body3,
						opacity: 0.7,
					}}
				>
					<Text style={{ fontWeight: "bold" }}>No. Of Episodes:</Text>{" "}
					{item.episode.length}
				</Text>

				<View  style={{flex:0.65,justifyContent:'flex-end',}}>
				<TouchableOpacity
					onPress={() => navigation.navigate("Home")}
					style={{
						flexDirection: "row",
						
						alignItems: "center",
						paddingLeft: 10,
					}}
				>
					<Ionicons name="arrow-back" size={24} color={theme.COLORS.primaryBgColor}></Ionicons>
					{/* <Text style={{ fontSize: 18 }}>go Back</Text> */}
				</TouchableOpacity>
			</View>
			</View>


		</View>
	);
};

export default DetailsScreen;

const styles = StyleSheet.create({});
