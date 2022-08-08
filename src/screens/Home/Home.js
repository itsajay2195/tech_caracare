import {
	StyleSheet,
	Text,
	View,
	Alert,
	Image,
	Animated,
	Dimensions,
	TouchableOpacity,
} from "react-native";
import React, { useState, useEffect, useReducer, useCallback } from "react";
import { apiCall } from "../../services/moviesService";
import { homeReducer } from "../../reducers/homeReducer";
import ListItem from "./components/ListItem";

const BG_IMG =
	"https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQI085rp63b7TRPEmAzAaPnahzOU1A_l9FhXg&usqp=CAU";
//this is item Size(card size)
const SPACING = 20;
const AVATAR_SIZE = 70;
const ITEM_SIZE = AVATAR_SIZE + SPACING * 3;

const Home = () => {
	const initialState = {
		data: [],
		filteredData: [],
		nextPageToken: "",
		isLoading: false,
		isError: false,
		gridView: false,
		isSearchResultNotFound: false,
	};
	const [state, dispatch] = useReducer(homeReducer, initialState);
	const [searchText, setSearchText] = useState("");
	const [nextPage, setNextPage] = useState(null);
	const [gridView, setGridView] = useState(true);
	const loadMore = useCallback(() => {
		setNextPage(state.nextPageToken.split("=")[1]);
	}, [state.nextPageToken]);

	useEffect(() => {
		if (nextPage !== null) {
			getData(nextPage);
		}
	}, [nextPage]);

	const getData = useCallback(
		(nextPageToken = "") => {
			dispatch({ type: "FETCH_DATA" });
			apiCall(`https://rickandmortyapi.com/api/character?page=${nextPageToken}`)
				.then((res) => res.json())
				.then((json) => dispatch({ type: "FETCH_DATA_SUCCESS", payload: json }))
				.catch((err) => Alert.alert("Error", "Something went wrong"));
		},
		[nextPage]
	);
	const changeView = () => {
		setGridView(!gridView);
		// this.setState({ gridView: !this.state.gridView }, () => {
		// 	if (this.state.gridView) {
		// 		this.setState({ btnText: "Show List" });
		// 	} else {
		// 		this.setState({ btnText: "Show Grid" });
		// 	}
		// });
	};

	useEffect(() => {
		getData();
	}, []);
	const scrollY = React.useRef(new Animated.Value(0)).current;
	return (
		<>
			<TouchableOpacity onPress={()=>changeView()}>
				<Text>List View</Text>
			</TouchableOpacity>
			<View style={{ flex: 1 }}>
				<Image
					source={{ uri: BG_IMG }}
					style={StyleSheet.absoluteFillObject}
					blurRadius={0}
				/>
				<View style={{ flex: 1}}>
					<Animated.FlatList
						
						data={state.filteredData}
						key={gridView ? 1 : 0}
						numColumns={gridView ? 2 : 0}
						onEndReached={loadMore}
						onScroll={Animated.event(
							[{ nativeEvent: { contentOffset: { y: scrollY } } }],
							{ useNativeDriver: true }
						)}
						keyExtractor={(item, index) => {
							return item.id;
						}}
						contentContainerStyle={{
							alignItems: 'center',
							justifyContent:'space-between'
							
						}}
						renderItem={({ item, index }) => {
							return<>
							{gridView && <View style={{width:3}}></View>}
							 <ListItem item={item} gridView={gridView} />
							 {gridView && <View style={{width:3}}></View>}
							</>
						}}
						// columnWrapperStyle={{justifyContent: 'space-evenly' }}
						
					/>
				</View>
			</View>
		</>
	);
};

export default Home;

const styles = StyleSheet.create({});
