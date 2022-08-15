import { StyleSheet, FlatList, View , Text, Image} from "react-native";
import React, { useEffect, useLayoutEffect,useState } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useIsFocused } from '@react-navigation/native';
import ListItem from '../Home/components/ListItem'


const Favourites = ({navigation}) => {
	const [favourites, setFavourites] = useState([]);
	const [loading, setLoading] = useState();
  const isFocused = useIsFocused();
  const BG_IMG =
	"https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQI085rp63b7TRPEmAzAaPnahzOU1A_l9FhXg&usqp=CAU";

		const getFavourites = async () => {
			try {
				setLoading(true);
				const value = await AsyncStorage.getItem("userFav");
				if (value !== null) {
					
					setFavourites(JSON.parse(value));
					// setFavourites('Hi')
					setLoading(false);
					// console.warn("get favourites success from fav screen", favourites);
				} else {
					// console.warn("it is actually null");
					setFavourites([]);
					setLoading(!loading);
				}
			} catch (e) {
				console.log("getFavourites error", e);
				setLoading(!loading);
			}
		};

		useLayoutEffect(()=>{
    			getFavourites()
  },[isFocused])

	return <View style={styles.container}>
		{!favourites.length>0 &&(<View style={styles.container}>
		
			 <Text>No records to display</Text>
		
		</View>)}
	
		{favourites.length>0 &&
		<>
					<Image
					source={{ uri: BG_IMG }}
					style={StyleSheet.absoluteFillObject}
					blurRadius={0}
				/>
		
		<FlatList
			data={favourites}
			keyExtractor={(item, index) => {
				return item.id;
			}}
			contentContainerStyle={{
				alignItems: "center",
				paddingBottom:80,
			}}
			renderItem={({item,index})=>{
				return(
					<ListItem item={item} navigation={navigation} favouriteIds={[]} isFavouritScreen={true}/>
				)
			}
			
		}
		/>
		
	</>}

  </View>;
};

export default Favourites;

const styles = StyleSheet.create({
	container:{flex:1,justifyContent:'center',alignItems:'center'}
});
