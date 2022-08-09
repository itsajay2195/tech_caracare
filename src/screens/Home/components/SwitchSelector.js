import { StyleSheet, Text, View, TouchableOpacity } from "react-native";
import React from "react";

const SwitchSelector = ({ gridView, onPress }) => {
	return (
		<View style={styles.container}>
			<TouchableOpacity
				onPress={onPress}
				style={[
					styles.selectorStyle,
					{ backgroundColor: gridView ? null : "rgb(72, 159, 157)" },
				]}
			>
				<Text style={{color:gridView ? null : 'white'}}>List</Text>
			</TouchableOpacity>

			<TouchableOpacity
				onPress={onPress}
				style={[
					styles.selectorStyle,
					{ backgroundColor: gridView ? "rgb(72, 159, 157)" : null },
				]}
			>
				<Text style={{color:gridView ?'white':null}}>Grid</Text>
			</TouchableOpacity>
		</View>
	);
};

export default SwitchSelector;

const styles = StyleSheet.create({
	container: {
		borderColor: "rgb(72, 159, 157)",
		padding: 5,
		width: "100%",
		height: 48,
		borderWidth: 1,
		borderRadius: 12,
		flexDirection: "row",
		backgroundColor: "#FFFFF",
		alignItems: "center",
	},
	selectorStyle: {
		width: "50%",
		height: 40,
		justifyContent: "center",
		alignItems: "center",
		borderRadius: 12,
	},
});
