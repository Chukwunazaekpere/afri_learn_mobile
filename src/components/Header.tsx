import React from "react";
import { View, Dimensions, StyleSheet, StatusBar, Text } from "react-native";
import colors from "../assets/colors";
import AntDesign from "react-native-vector-icons/AntDesign";
// const { } = AntDesign;

export const dimension = Dimensions.get("screen");
interface HeaderInterafce {
    title: string
    headerIconHandler: Function
}
const Header = (props: HeaderInterafce) => {
    return(
        <View style={styles.container}>
            <StatusBar backgroundColor={colors.green} barStyle={"dark-content"} />
            <View style={{flexDirection: "row", alignItems: "center"}}>
                <AntDesign onPress={() => props.headerIconHandler()} style={{marginTop: 17, marginLeft: 12}} name="leftcircle" size={30} />
                <Text style={styles.headerText}>{props.title}</Text>
            </View>
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
        marginTop: 15,
        marginLeft: 80
        // alignItems: "center"
    }
})
export default Header;