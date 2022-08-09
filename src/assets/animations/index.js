import React from "react";
import LottieView from "lottie-react-native";
import {Image} from 'react-native'

export const CustomTab = ({ focused, color, size, route }) => {
	const ref = React.useRef();
	let filePath;
	React.useLayoutEffect(() => {
		if (focused && ref.current) {
			ref.current?.play();
		}
	}, [focused, ref.current]);

	switch (route.name) {
		case "Home":
			filePath = {
				0: require("../animations/home.json"),
				1: require("../home.png"),
			};
		break;
        case "Favourites":
            filePath = {
                0: require("../animations/favourites.json"),
                1: require("../favourites.png"),
            };
            
        break;
		case "Down-Arrow":
			filePath = {
                0: require("../animations/down-arrow.json"),
            };
		break;
	}

	if (!focused  ) {
		return (
			<Image
				style={{ tintColor:'gray',height: 30, width: 30, alignSelf: "center" }}
				source={filePath[1]}
			/>
		);
	} else {
		return (
			<LottieView
				style={{ height: route.name === 'Home' ? 40 : 80, alignSelf: "center" }}
				loop={focused}
                speed={0.5}
				source={filePath[0]}
				autoPlay={true}
			/>
		);
	}
};
