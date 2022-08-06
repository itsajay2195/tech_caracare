import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import LottieView from "lottie-react-native";

const Home = () => {
  return (
    <View>
     
     <LottieView style={{ height: 50,alignSelf: 'center', marginBottom: 30 }}
                source={require("../../assets/animations/home.json")}
                autoPlay
                speed={0.25}
                loop={true} />
    </View>
  )
}

export default Home

const styles = StyleSheet.create({})