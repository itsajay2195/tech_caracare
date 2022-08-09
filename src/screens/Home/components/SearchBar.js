import {
	StyleSheet,
	Text,
	View,
	TouchableOpacity,
	TextInput,
} from "react-native";
import Ionicons from "react-native-vector-icons/Ionicons";
import React from "react";

const SearchBar = ({ style, input, onChangeText }) => {
	return (
		<View style={[styles.container, style]}>
			<TextInput
				style={styles.textInput}
				value={input}
				onChangeText={(text) => onChangeText(text)}
				placeholder="Search..."
				placeholderTextColor={"black"}
			/>
			<View style={{ justifyContent: "center", paddingHorizontal: 5 }}>
				<Ionicons name="search" size={24} color={"grey"}></Ionicons>
			</View>
		</View>
	);
};

export default SearchBar;

const styles = StyleSheet.create({
	container: {
		flexDirection: "row",
		height: 40,
		width: "100%",
		backgroundColor: "#F5F5F5",
		borderRadius: 10,
		justifyContent: "space-between",
	},
	textInput: {
		width:'80%',
		paddingHorizontal: 10,
		color: "#000000",
	},
});
