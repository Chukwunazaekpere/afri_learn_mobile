import React from "react";
import { StyleSheet, View } from "react-native";


interface ContainerInterface {
    children: any
    style?: any
}
const Container = (props: ContainerInterface) => {
    return(
        <View style={{...styles.container, ...props.style}}>
            {props.children}
        </View>
    )
};


const styles = StyleSheet.create({
    container: {
        flex: 1
    }
});

export default Container;