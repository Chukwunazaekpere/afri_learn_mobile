import React from "react";
import { View, Dimensions, StyleSheet, StatusBar, Text } from "react-native";
import colors from "../assets/colors";
import { } from "react-native-vector-icons/FontAwesome"

export const dimension = Dimensions.get("screen");
interface HeaderInterafce {
    title: string
}
const Header = (props: HeaderInterafce) => {
    return(
        <View style={styles.container}>
            <StatusBar backgroundColor={colors.green} barStyle={"dark-content"} />
            <Text style={styles.headerText}>{props.title}</Text>
        </View>
    )
};

const styles = StyleSheet.create({
    container:{
        backgroundColor: colors.green,
        height: dimension.height/12
    },
    headerText: {
        fontSize: 23,
        fontWeight: "600",
        textAlign: "center",
        marginTop: 15
    }
})
export default Header;