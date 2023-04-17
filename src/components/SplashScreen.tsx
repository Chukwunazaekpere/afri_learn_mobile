import React from "react";
import { Image, StatusBar, StyleSheet, Text, TouchableOpacity } from "react-native";
import Container from "./Container";
import colors from "../assets/colors";
const SplashGif = require("../assets/afri_book.gif");


interface SplashScreenInterface {
    actionToggler: Function
}
const SplashScreen = (props: SplashScreenInterface) => {
    return(
        <Container style={styles.container}>
            <Text style={styles.splashText}>Afri-Learn</Text>
            <StatusBar backgroundColor={colors.black} />
            <Image source={SplashGif} />
            <TouchableOpacity onPress={() =>props.actionToggler()} style={styles.opacityContainer}>
                <Text style={styles.opacityText}>Explore</Text>
            </TouchableOpacity>
        </Container>
    )
};
const styles = StyleSheet.create({
    container: {
        backgroundColor: colors.black,
        flex: 1,
        justifyContent: "center",
        alignItems: "center"
    },
    splashText: {
        color: colors.green,
        fontSize: 25,
        fontWeight: "bold",
        fontStyle: "italic"
    },
    opacityText: {
        color: colors.green,
        fontSize: 19,
        fontWeight: "500",
        // fontStyle: "italic"
    },
    opacityContainer: {
        borderRadius: 100,
        borderWidth: 2,
        borderColor: colors.green,
        paddingHorizontal: 40,
        paddingVertical: 7,
        elevation: 12,
        shadowColor: colors.black
    }
})

export default SplashScreen;