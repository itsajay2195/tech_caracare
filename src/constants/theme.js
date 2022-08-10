import { Dimensions } from "react-native";
const { width, height } = Dimensions.get("window");

export const COLORS = {
    white: "#FFFFFF",
    red: "#FF0000",
    black: "#000000",
    primaryBgColor:'rgb(72, 159, 157)',
    gray: "#757575",
    borderGray:'#F5F5F5',
    transparentWhite: 'rgba(255, 255, 255, 0.2)',
    transparentBlack: 'rgba(0, 0, 0, 0.8)',
    transparentBlack1: 'rgba(0, 0, 0, 0.4)',
};
export const SIZES = {
    // global sizes
    base: 8,
    font: 14,
    radius: 12,
    padding: 20,

    // font sizes
    largeTitle: 40,
    h1: 30,
    h2: 22,
    h3: 16,
    h4: 14,
    h5: 12,
    body1: 30,
    body2: 22,
    body3: 18,
    body4: 14,
    body5: 12,

    // app dimensions
    width,
    height
};

const appTheme = { COLORS, SIZES};

export default appTheme;