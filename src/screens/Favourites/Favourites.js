import { StyleSheet, Text, View , ScrollView} from "react-native";
import React, { useEffect, useLayoutEffect,useState } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useIsFocused } from '@react-navigation/native';
import ListItem from '../Home/components/ListItem'


const Favourites = () => {
	const [favourites, setFavourites] = useState([]);
	const [loading, setLoading] = useState();
  const isFocused = useIsFocused();

		const getFavourites = async () => {
			try {
				setLoading(true);
				const value = await AsyncStorage.getItem("fav6");
				if (value !== null) {
					console.warn('in fav',value)
					setFavourites(JSON.parse(value));
					// setFavourites('Hi')
					setLoading(false);
					console.warn("get favourites success from fav screen", favourites);
				} else {
					console.warn("it is actually null");
					setFavourites([]);
					setLoading(!loading);
				}
			} catch (e) {
				console.warn("getFavourites error", e);
				setLoading(!loading);
			}
		};

		useLayoutEffect(()=>{
    getFavourites()
  },[isFocused])

	return <View style={{flex:1,justifyContent:'center',alignItems:'center'}}>{favourites.length > 0 && 
    <ScrollView style={{flex:1}}>
    {favourites.map(item=> (
										
							<ListItem item={item}  favouriteIds={[]}/>
										
	))
	}
 
  </ScrollView>
  }</View>;
};

export default Favourites;

const styles = StyleSheet.create({});
