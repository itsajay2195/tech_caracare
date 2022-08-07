import {
	StyleSheet,
	Text,
	View,
	Alert,
	Image,
	Animated,
} from "react-native";
import React, { useState, useEffect, useReducer, useCallback } from "react";
import { apiCall } from "../../services/moviesService";
import { homeReducer } from "../../reducers/homeReducer";

const SPACING = 20;
const AVATAR_SIZE = 70;
const BG_IMG =
	"https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQI085rp63b7TRPEmAzAaPnahzOU1A_l9FhXg&usqp=CAU";
const ITEM_SIZE = AVATAR_SIZE + SPACING * 3; //this is item Size(card size)

const Home = () => {
	const initialState = {
		data: [],
		filteredData: [],
		nextPageToken: "",
		isLoading: false,
		isError: false,
		isSearchResultNotFound: false,
	};
	const [state, dispatch] = useReducer(homeReducer, initialState);
	const [searchText, setSearchText] = useState("");
	const [nextPage, setNextPage] = useState(null);

	const loadMore = useCallback(() => {
		setNextPage(state.nextPageToken.split('=')[1]);
	}, [state.nextPageToken]);

	useEffect(() => {
		if (nextPage !== null) {
			getData(nextPage);
		}
	}, [nextPage]);

	const getData = useCallback((nextPageToken = "") => {
		dispatch({ type: "FETCH_DATA" });
		apiCall(`https://rickandmortyapi.com/api/character?page=${nextPageToken}`)
			.then((res) => res.json())
			.then((json) => dispatch({ type: "FETCH_DATA_SUCCESS", payload: json }))
			.catch((err) => Alert.alert("Error", "Something went wrong"));
	}, [nextPage]);

	useEffect(() => {

		getData();
	}, []);
	const scrollY = React.useRef(new Animated.Value(0)).current;
	return (
		<>
			<View style={{ flex: 1 }}>
				<Image
					source={{ uri: BG_IMG }}
					style={StyleSheet.absoluteFillObject}
					blurRadius={0}
				/>
				<View style={{flex:1}}>
					<Animated.FlatList
						data={state.filteredData}
            onEndReached={loadMore}
						onScroll={Animated.event(
							[{ nativeEvent: { contentOffset: { y: scrollY } } }],
							{ useNativeDriver: true }
						)}
						keyExtractor={(item) => item.key}
						contentContainerStyle={{
							padding: SPACING,
              paddingBottom:ITEM_SIZE
						}}
						renderItem={({ item, index }) => {
							// The purpose of user useRef in the below line is to make sure that react keep tracks of the
							// value and doesn't lose the initial value as it renders
							// Also it remains the same during the lifecycle
							const inputRange = [
								-1,
								0,
								ITEM_SIZE * index,
								ITEM_SIZE * (index +2),
							];
							// when the range is between -1 to 0, the scale is going to remain the same
							// beyond -1 it says the same
							// when at 0 and item is at edge the animatin starts
							// the animation stops when reaches the item size

							const scale = scrollY.interpolate({
								inputRange,
								outputRange: [1, 1,1, 0],
							});

              // const opacityInputRange = [
							// 	-1,
							// 	0,
							// 	ITEM_SIZE * index,
							// 	ITEM_SIZE * (index + 2),
							// ];

              // const opacity = scrollY.interpolate({
							// 	inputRange:opacityInputRange,
							// 	outputRange: [1, 1, 1, 0],
							// });

							return (
								<Animated.View
									style={{
										flexDirection: "row",
										padding: SPACING,
										marginBottom: SPACING,
										shadowColor: "#000",
										backgroundColor: "white",
										borderRadius: 12,
										shadowOffset: {
											width: 0,
											height: 10,
										},
										shadowOpacity: 0.3,
										shadowRadius: 20,
										transform: [{ scale }],
                    // opacity:opacity
									}}
								>
									<Text>{item.id}</Text>
									<Image
										source={{ uri: item.image }}
										style={{
											width: AVATAR_SIZE,
											height: AVATAR_SIZE,
											borderRadius: AVATAR_SIZE,
											marginRight: SPACING / 2,
										}}
									/>
									<View>
										<Text
											numberOfLines={1}
											style={{ fontSize: 22, width: "80%", fontWeight: "700" }}
										>
											{item.name}
										</Text>
										<Text style={{ fontSize: 18, opacity: 0.7 }}>
											{item.status}
										</Text>
										<Text
											style={{ fontSize: 14, opacity: 0.8, color: "#0099cc" }}
										>
											{item.origin.name}
										</Text>
										<Text>{item.location.name}</Text>
									</View>
								</Animated.View>
							);
						}}
					/>
				</View>
			</View>
		</>
	);
};

export default Home;

const styles = StyleSheet.create({});
