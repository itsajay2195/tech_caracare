import { StyleSheet, Text, View } from "react-native";
import React, { useEffect, useState } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useIsFocused } from '@react-navigation/native';


const Favourites = () => {
	const [favourites, setFavourites] = useState([]);
	const [loading, setLoading] = useState();
  const isFocused = useIsFocused();

		const getFavourites = async () => {
      console.warn('im caled in')
			try {
				setLoading(true);
				const value = await AsyncStorage.getItem("favouritesList2");
				if (value !== null) {
					setFavourites(JSON.parse(value));
					// setFavourites('Hi')
					setLoading(false);
					console.warn("get favourites success", value);
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

  useEffect(()=>{
    getFavourites()
  },[isFocused])

	return <>{favourites.length > 0 && 
    <>
    {favourites.map(item=> <Text>{item.id}</Text>)}
 
  </>
  }</>;
};

export default Favourites;

const styles = StyleSheet.create({});
