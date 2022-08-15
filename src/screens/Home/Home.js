import {
	StyleSheet,
	Text,
	View,
	Alert,
	Image,
	Animated,
	ActivityIndicator
} from "react-native";
import React, {
	useState,
	useEffect,
	useReducer,
	useCallback,
	useLayoutEffect,

} from "react";
import { apiCall } from "../../services/moviesService";
import { homeReducer } from "../../reducers/homeReducer";
import ListItem from "./components/ListItem";
import SwitchSelector from "./components/SwitchSelector";
import AsyncStorage from "@react-native-async-storage/async-storage";
import SearchBar from "./components/SearchBar";
import { theme } from "../../constants";

const BG_IMG =
	"https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQI085rp63b7TRPEmAzAaPnahzOU1A_l9FhXg&usqp=CAU";
//this is item Size(card size)
const SPACING = 20;

const Home = ({ navigation, route }) => {
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
	const [searchText, setSearchText] = useState('');
	const [nextPage, setNextPage] = useState(null);
	const [gridView, setGridView] = useState(null);
	const [favourites,setFavourites] = useState([])
	const [favouritesIds,setFavouritesIds]= useState([])

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
			const newData = state.data.filter((item) => item.name.includes(text));
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

	const getFavourites = async () => {
		try {
			const favouriteValues = await AsyncStorage.getItem("userFav");
			const favouriteIds = await AsyncStorage.getItem("userFavIds");
			// console.warn('getfa',favouriteValues)
			if (favouriteValues !== null) {
				setFavourites(JSON.parse(favouriteValues))
				setFavouritesIds(JSON.parse(favouriteIds))
				// console.warn('get favourites success',favourites)
			}else{
				// console.warn('it is actually null')
				setFavourites([])
				setFavouritesIds([])
			}
		} catch (e) {
			console.log("getFavourites error",e);
		}
	};

	const addToFavourites = async (value) => {
		try {
		
			if(favourites.length > 0){
				let filter 
				let filteredIds 
				let newData=[],newIds=[]
				if (!favouritesIds.includes(parseInt(value.id))){
					
					 newData = [...favourites, value];
					 newIds = [...favouritesIds,value.id]
				}else{
					
					filter = favourites.filter(item => parseInt(item.id) !== parseInt(value.id))
					filteredIds = favouritesIds.filter(item => item != value.id)
					newData = [...filter];
					newIds = [...filteredIds]
				
				}
	
				
				
				setFavourites(newData)
				await AsyncStorage.setItem("userFav",JSON.stringify(newData));
				setFavouritesIds(newIds);
				await AsyncStorage.setItem("userFavIds", JSON.stringify(newIds));
				
			}	else{
				let newData = [...favourites, value];
				setFavourites(newData);
				await AsyncStorage.setItem("userFav", JSON.stringify(newData));
				let newIDs = [...favouritesIds, value.id];
				setFavouritesIds(newIDs);
			
				await AsyncStorage.setItem("userFavIds", JSON.stringify(newIDs));
				
			

			}
			
		} catch (e) {
			console.log("error addToFavourites",e);
		}
	}

	useEffect(() => {
		getData();
		getFavourites()
	}, []);

	const changeView = useCallback(() => {
		setGridView(!gridView);
		storeUserViewPreference(!gridView);
	}, [gridView]);

	let AnimatedHeaderValue = new Animated.Value(0);
	const Header_Maximum_Height = 40;
	//Max Height of the Header
	const Header_Minimum_Height = 0;

	const animateHeaderHeight = AnimatedHeaderValue.interpolate({
		inputRange: [0, Header_Maximum_Height],
		outputRange: [Header_Maximum_Height, Header_Minimum_Height],
		extrapolate: "clamp",
	});


	return (
		<>
			<View style={styles.SwitchSelectorWrapper}>
				<SwitchSelector gridView={gridView} onPress={changeView} />
			</View>

			<Animated.View style={{ height: animateHeaderHeight }}>
				<SearchBar input={searchText} onChangeText={filterResults} />
			</Animated.View>
			{searchText.length > 0 && !state.isSearchResultNotFound > 0 && (
				<View
					style={styles.searchResultTextWrapper}
				>
					<Text style={{ color: "black" }}>Search Results</Text>
					<Text style={{ color: "black" }}>
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
			{state.isLoading ? (<ActivityIndicator size={"large"} color={theme.COLORS.primaryBgColor}/>): (
				<View style={{ flex: 1 }}>
					{state.isSearchResultNotFound ? (
						<Text style={{ color: "red" }}> No results found</Text>
					) : (
						<Animated.FlatList
							data={state.filteredData}
							key={gridView ? 1 : 0}
							numColumns={gridView ? 2 : 0}
							onEndReached={() => !searchText && loadMore()}
							// onScroll={Animated.event(
							// 	[{ nativeEvent: { contentOffset: { y: scrollY } } }],
							// 	{ useNativeDriver: true }
							// )}
							onScroll={Animated.event(
								[
									{
										nativeEvent: {
											contentOffset: { y: AnimatedHeaderValue },
										},
									},
								],
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
										<ListItem item={item} gridView={gridView} navigation={navigation} setFavourites={addToFavourites} favouriteIds={favouritesIds}/>
										{gridView && <View style={{ width: 3 }}></View>}
									</>
								);
							}}
							// columnWrapperStyle={{justifyContent: 'space-evenly' }}
						/>
					)}
				</View>)}
			</View>
		</>
	);
};

export default Home;

const styles = StyleSheet.create({
	SwitchSelectorWrapper:{ padding: SPACING - 15 },
	searchResultTextWrapper:{
		flexDirection: "row",
		justifyContent: "space-between",
		paddingVertical: 20,
	},
});
