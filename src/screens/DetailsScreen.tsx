import React, { useEffect, useState } from "react";
import { ScrollView, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import axiosHelper from "../helper/axiosHelper";
import colors from "../assets/colors";
import { dimension } from "../components/Header";
import { camelCaseSeparator } from "../helper/strings";


interface DetailsScreenInterface {
    routename: string
    data: any
    actionHandler: Function
}
const DetailsScreen = (props: DetailsScreenInterface) => {
    const [detailsState, setDetailsState] = useState({
        detailKeys: []as string[],
        data: {}as any,
        topicsData: []as any[]
    })
    useEffect(() => {
        (async() => {
            console.log("\n\t detailsResponse-routename: ", props.routename);
            const detailsResponse = await axiosHelper({
                routename: props.routename,
                action: "get",
            });
            if(detailsResponse && detailsResponse.status === 200){
                // console.log("\n\t detailsResponse: ", detailsResponse.data);
                const responseData = detailsResponse.data.data;
                console.log("\n\t detailsResponse-responseData: ", responseData[0]);
                if(responseData.length > 0){
                    const data = {
                        ...props.data,
                        topics: responseData.length
                    }
                    detailsState.data = data;
                    const detailKeysData = Object.keys(data);
                    detailsState.detailKeys = detailKeysData;
                    detailsState.topicsData = responseData;
                    console.log("\n\t data: ", data);
                }
                setDetailsState({...detailsState})
                console.log("\n\t detailKeysData: ", detailsState.detailKeys);
            }
        })();
    }, []);
    const exclusions = ["_id", "__v", "createdby", "updatedby", "dateupdated", "datecreated"]
    return(
        <View>
            <ScrollView>
                <TouchableOpacity style={styles.opacityContainer} >
                    <View style={styles.contentContainer}>
                        {
                            detailsState.detailKeys.length > 0 ?
                            detailsState.detailKeys.map(act => (
                                <React.Fragment key={act}>
                                    {
                                        !exclusions.includes(act.toLowerCase()) && 
                                        <View style={styles.content} key={act}>
                                            <Text style={styles.headerText}>{camelCaseSeparator(act)}:</Text>
                                            <Text style={styles.headerText}>{detailsState.data[act]}</Text>
                                        </View>
                                    }
                                </React.Fragment>
                            ))
                            :
                            <Text style={styles.headerText}>No Content</Text>
                        }

                    </View>
                    <View style={styles.actionContainer}>
                        {
                            ["Back", "See Topics"].slice(0, detailsState.detailKeys.length > 0 ? undefined : 1).map(act => (
                                <TouchableOpacity style={styles.actionContainer} key={act}>
                                    <Text 
                                        onPress={() => props.actionHandler({action: act.toLowerCase(), subjectName: act})}
                                        style={styles.headerTextForActionButtons}>
                                        {act}
                                    </Text>
                                </TouchableOpacity>
                            ))
                        }
                    </View>
                </TouchableOpacity>
            </ScrollView>
        </View>
    )
};

const styles = StyleSheet.create({
    container:{
        backgroundColor: colors.black,
        flex: 1
        // height: dimension.height/12
    },
    subjectListContainer:{
        backgroundColor: colors.black,
        flex: 1,
        marginTop: 15,
        alignItems: "flex-start",
        paddingHorizontal: 10
        // height: dimension.height/12
    },
    content: {
        paddingVertical: 20,
        borderBottomColor: colors.green,
        borderBottomWidth: 2,
        elevation: 12,
        borderRadius: 2,
        flexDirection: "row",
        width: dimension.width
    },
    headerText: {
        fontSize: 18,
        fontWeight: "600",
        color: colors.white,
        // borderRadius: 20,
        paddingHorizontal: 5
    },
    headerTextForActionButtons: {
        fontSize: 23,
        fontWeight: "700",
        color: colors.green,
        paddingVertical: 20,
        borderBottomColor: colors.white,
        borderBottomWidth: 2,
        paddingHorizontal: dimension.width/4,
        elevation: 12,
        borderRadius: 20,
    },
    contentContainer: {
        borderWidth: 2,
        borderRadius: 10,
        // borderColor: colors.green,
        // justifyContent: "center",
        alignItems: "flex-start",
        // height: dimension.height/3,
        // marginHorizontal: 12,
        // width: dimension.width
    },
    opacityContainer: {
        width: dimension.width,
        shadowColor: colors.black
    },
    actionContainer: {
        marginTop: 20,
        justifyContent: "center",
        alignItems: "center",
    }
})
export default DetailsScreen;