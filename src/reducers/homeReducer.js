export const homeReducer = (state, action) => {
	switch (action.type) {
		case "FETCH_DATA":
			return{...state, isLoading:true}
		case "FETCH_DATA_SUCCESS":
			return {
				...state,
				data:[...action.payload.results],
				filteredData:[...state.filteredData,...action.payload.results],
				nextPageToken: action.payload.next,
				isSearchResultNotFound: false,
				isLoading:false
			};
		case "FETCH_DATA_FAILURE":
			return { ...state, isError: true };
		case "DELETE_ITEM":
			return {
				...state,
				data:action.payload,
				filteredData: action.payload,
				isError: false,
				isSearchResultNotFound: false,
			};
		case "SET_SEARCH_RESULTS":
			return {
				...state,
				filteredData: action.payload,
				isSearchResultNotFound: false,
			};
		case "NO_RESULTS_FOUND":
			return { ...state, isSearchResultNotFound: true };
		default:
			return state;
	}
};
