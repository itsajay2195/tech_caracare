import { StyleSheet, Text, View } from 'react-native'
import React,{useState,useEffect,useReducer} from 'react'
import { apiCall } from '../../services/moviesService'
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

  
  useEffect(()=>{
    dispatch({ type: "FETCH_DATA" });
    apiCall('https://rickandmortyapi.com/api/character')
    .then((res) => res.json())
    .then((json) => dispatch({ type: "FETCH_DATA_SUCCESS", payload: json })) //setMessages(json.messages)
    .catch((err) => Alert.alert("Error", "Something went wrong"));
  },[])

  return (
    <>
       <View>
           
       </View>
    </>
  )
}

export default Home

const styles = StyleSheet.create({})