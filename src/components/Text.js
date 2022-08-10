import { StyleSheet, Text, View } from "react-native";
import React from "react";

const TextLabel = ({label, value}) => {
	return (
		<Text
			numberOfLines={gridView ? 1 : null}
			style={{
				paddingTop: 10,
				fontSize: gridView ? 12 : 18,
				opacity: 0.7,
			}}
		>
			<Text style={{ fontWeight: "bold" }}>{label}:</Text> {value}
		</Text>
	);
};

export default TextLabel;

const styles = StyleSheet.create({});
