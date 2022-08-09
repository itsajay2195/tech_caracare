import {
	StyleSheet,
	Text,
	View,
	Alert,
	Image,
	Animated,
	TouchableOpacity,
} from "react-native";
import React, {
	useState,
	useEffect,
	useReducer,
	useCallback,
	useLayoutEffect,
	useRef
} from "react";
import { apiCall } from "../../services/moviesService";
import { homeReducer } from "../../reducers/homeReducer";
import ListItem from "./components/ListItem";
import SwitchSelector from "./components/SwitchSelector";
import AsyncStorage from "@react-native-async-storage/async-storage";
import SearchBar from "./components/SearchBar";


const BG_IMG =
	"https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQI085rp63b7TRPEmAzAaPnahzOU1A_l9FhXg&usqp=CAU";
//this is item Size(card size)
const SPACING = 20;
const AVATAR_SIZE = 70;
const ITEM_SIZE = AVATAR_SIZE + SPACING * 3;

const Home = ({ navigation }) => {
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
	const [gridView, setGridView] = useState(null);

	const loadMore = () => {
		setNextPage(state.nextPageToken.split("=")[1]);
	};

	const storeUserViewPreference = useCallback(
		async (value) => {
			try {
				await AsyncStorage.setItem("gridView", JSON.stringify(value));
			} catch (e) {
				console.log("error");
			}
		},
		[gridView]
	);

	const filterResults = (text) => {
		setSearchText(text);
		searchOperation(text);
	};
	const searchOperation = (text) => {
		if (text.length > 0) {
			const newData = state.data.filter((item) =>
				item.name.includes(text)
			);
			newData.length > 0
				? dispatch({ type: "SET_SEARCH_RESULTS", payload: newData })
				: dispatch({ type: "NO_RESULTS_FOUND" });
		} else {
			dispatch({ type: "SET_SEARCH_RESULTS", payload: state.data });
		}
	};

	useEffect(() => {
		if (nextPage !== null) {
			getData(nextPage);
		}
	}, [nextPage]);

	useLayoutEffect(() => {
		navigation.setOptions({
			title: "Home",
		});
		const getUserViewPreference = async () => {
			try {
				const value = await AsyncStorage.getItem("gridView");
				if (value !== null) {
					setGridView(JSON.parse(value));
				}
			} catch (e) {
				console.log("getUserViewPreference error");
			}
		};
		getUserViewPreference();
	}, []);

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

	useEffect(() => {
		getData();
	}, []);


	const changeView = useCallback(() => {
		setGridView(!gridView);
		storeUserViewPreference(!gridView);
	}, [gridView]);

	let AnimatedHeaderValue = new Animated.Value(0);
	const Header_Maximum_Height = 40;
	//Max Height of the Header
	const Header_Minimum_Height = 0;

	const animateHeaderHeight =
    AnimatedHeaderValue.interpolate({
      inputRange: [0, Header_Maximum_Height],
      outputRange: [Header_Maximum_Height, Header_Minimum_Height],
      extrapolate: 'clamp',
    });


	return (
		<>
			<View style={{ padding: SPACING - 15 }}>
				<SwitchSelector gridView={gridView} onPress={changeView} />
			</View>
		
			
			<Animated.View style={{height:animateHeaderHeight}}>
				<SearchBar  input={searchText} onChangeText={filterResults} />
			</Animated.View>
			{searchText.length > 0 && !state.isSearchResultNotFound > 0 && (
					<View
						style={{
							flexDirection: "row",
							justifyContent: "space-between",
							paddingVertical: 20,
						}}
					>
						<Text style={{ color: 'black' }}>Search Results</Text>
						<Text style={{ color:'black' }}>
							{state.filteredData.length} founds
						</Text>
					</View>
				)}
			<View style={{ flex: 1 }}>
				<Image
					source={{ uri: BG_IMG }}
					style={StyleSheet.absoluteFillObject}
					blurRadius={0}
				/>

				<View style={{ flex: 1 }}>
				{state.isSearchResultNotFound ? (
						<Text style={{ color: 'red'}}> No results found</Text>
					) : (
					<Animated.FlatList
						data={state.filteredData}
						key={gridView ? 1 : 0}
						numColumns={gridView ? 2 : 0}
						onEndReached={()=> !searchText.length > 0 ? loadMore : null}
						// onScroll={Animated.event(
						// 	[{ nativeEvent: { contentOffset: { y: scrollY } } }],
						// 	{ useNativeDriver: true }
						// )}
						onScroll={Animated.event(
							[{
							  nativeEvent: {
								contentOffset: { y: AnimatedHeaderValue }
							  }
							}],
							{ useNativeDriver: false }
						  )}
						keyExtractor={(item, index) => {
							return item.id;
						}}
						contentContainerStyle={{
							alignItems: "center",
							justifyContent: "space-between",
							paddingTop: 5,
						}}
						renderItem={({ item, index }) => {
							return (
								<>
									{gridView && <View style={{ width: 3 }}></View>}
									<ListItem item={item} gridView={gridView} />
									{gridView && <View style={{ width: 3 }}></View>}
								</>
							);
						}}
						// columnWrapperStyle={{justifyContent: 'space-evenly' }}
					/>)}
				</View>
			</View>
		</>
	);
};

export default Home;

const styles = StyleSheet.create({

});
