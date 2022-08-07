import { StyleSheet, Text, View, FlatList, Image } from "react-native";
import React, { useState, useEffect, useReducer, useCallback } from "react";
import { apiCall } from "../../services/moviesService";
import { homeReducer } from "../../reducers/homeReducer";

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
		setNextPage(state.nextPageToken);
	}, [nextPage]);

	useEffect(() => {
		if (nextPage !== null) {
			getData(nextPage);
		}
	}, [nextPage]);

	const getData = useCallback((nextPageToken = "") => {
		dispatch({ type: "FETCH_DATA" });
		apiCall("https://rickandmortyapi.com/api/character")
			.then((res) => res.json())
			.then((json) => dispatch({ type: "FETCH_DATA_SUCCESS", payload: json }))
			.catch((err) => Alert.alert("Error", "Something went wrong"));
	}, []);

	useEffect(() => {
		getData();
	}, []);

	const SPACING = 20;
	const AVATAR_SIZE = 70;
  const BG_IMG = 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQI085rp63b7TRPEmAzAaPnahzOU1A_l9FhXg&usqp=CAU'
	return (
		<>
			<View style={{ flex: 1 }}>
        <Image
          source={{uri:BG_IMG}}
          style={StyleSheet.absoluteFillObject}
          blurRadius={0}
        />
				<FlatList
					data={state.data}
					keyExtractor={(item) => item.key}
					contentContainerStyle={{
						padding: SPACING,
					}}
					renderItem={({ item, index }) => {
						return (
							<View
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
									<Text numberOfLines={1} style={{ fontSize: 22, width:'80%',fontWeight: "700" }}>
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
							</View>
						);
					}}
				/>
			</View>
		</>
	);
};

export default Home;

const styles = StyleSheet.create({});
