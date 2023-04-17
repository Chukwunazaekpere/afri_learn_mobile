import React, { useEffect, useState } from "react";
import { ImageBackground, ScrollView, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import axiosHelper from "../helper/axiosHelper";
import Header, { dimension } from "../components/Header";
import Container from "../components/Container";
import colors from "../assets/colors";
import DetailsScreen from "./DetailsScreen";




interface SubjectActionsInterface {
    action: "subject-details" | "see topics" | "back",
    subjectName: string
}
interface SubjectInterface {
    handleTogglerActions: Function
}
const SubjectsScreen = (props: SubjectInterface) => {
    const [subjectState, setSubjectState] = useState({
        subjects: []as any[],
        subjectData: []as any[],
        showSubjects: true,
        showTopics: false,
        subjectId: "",
        subjectSelected: {}as any,
        showSubjectDetails: false,
        showTopicDetails: false,
        headerTitle: ""
    })
    useEffect(() => {
        (async() => {
            const subjectResponse = await axiosHelper({
                action: "get",
                routename: "/subjects/all"
            });
            if(subjectResponse && subjectResponse.status === 200){
                subjectState.subjects = [];
                const subjectResponseData = subjectResponse.data;
                subjectState.subjectData = subjectResponseData.data;
                subjectState.headerTitle = `Subjects: (${subjectResponseData.data.length})`;
                // console.log("\n\t subjectResponseData: ", subjectResponseData)
                subjectResponseData.data.forEach((data:any) => subjectState.subjects.push(data.description));
                // console.log("\n\t subjects: ", subjectState.subjects)
                setSubjectState({...subjectState});
            }

        })();
    }, []);
    const handleSubjectActions = (props: SubjectActionsInterface) => {
        if(props.action === "subject-details"){
            const subjectSelected = subjectState.subjectData.find((data:any) => data.description === props.subjectName);
            subjectState.showSubjectDetails = true;
            subjectState.subjectId = subjectSelected._id;
            subjectState.showSubjects = false;
            subjectState.subjectSelected = subjectSelected;
            subjectState.headerTitle = `${subjectSelected.description} - ${subjectSelected.subjectCode}`;
            console.log("\n\t subjectSelected: ", subjectSelected)
        }else if(props.action === "back"){
            subjectState.showSubjectDetails = false;
            subjectState.headerTitle = `Subjects: (${subjectState.subjects.length})`;
            subjectState.showSubjects = true;
        }else if(props.action === "see topics"){
            // subjectState.showSubjectDetails = false;
            subjectState.showSubjects = false;
            subjectState.showTopics = true;
        }
        return setSubjectState({...subjectState});
    }
    return(
        <Container style={styles.container}>
            <Header 
                headerIconHandler={subjectState.showSubjects ? () => props.handleTogglerActions() : () => handleSubjectActions({action: subjectState.showSubjectDetails ? "back" : "see topics", subjectName: "back"})}
                title={subjectState.headerTitle} 
            />
            <View style={styles.subjectListContainer}>
                {
                    subjectState.showSubjects ?
                    <ScrollView>
                        {
                            subjectState.subjects.length > 0 ? 
                            subjectState.subjects.map(sub => (
                                <TouchableOpacity onPress={() => handleSubjectActions({action: "subject-details", subjectName: sub})} style={styles.opacityContainer} key={sub}>
                                    <Text style={styles.headerText} >{sub}</Text>
                                </TouchableOpacity>
                            ))
                            :
                            <Text>No Subjects Yet...</Text>
                        }
                    </ScrollView>
                    :
                    subjectState.showSubjectDetails &&
                    <DetailsScreen 
                        routename={`/subjects/topic-details/${subjectState.subjectId}`} 
                        data={subjectState.subjectSelected}
                        actionHandler={handleSubjectActions}
                        showTopics={subjectState.showTopics}
                        showTopicDetails={subjectState.showTopicDetails}
                    />
                    // :
                    // subjectState.showTopics &&
                    // <TopicsScreen />


                }
            </View>
        </Container>
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
    headerText: {
        fontSize: 23,
        fontWeight: "600",
        color: colors.white,
        paddingVertical: 5
    },
    opacityContainer: {
        borderRadius: 20,
        borderBottomWidth: 2,
        borderBottomColor: colors.green,
        paddingHorizontal: 18,
        paddingVertical: 15,
        elevation: 12,
        width: dimension.width,
        shadowColor: colors.black
    }
})
export default SubjectsScreen;