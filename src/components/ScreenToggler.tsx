import React, { useState } from "react";
import SplashScreen from "./SplashScreen";
import SubjectsScreen from "../screens/SubjectsScreen";

interface ActionInterface {
    actionName: "hide-splash-screen" | "show-splash-screen"
}
const ScreenToggler = () => {
    const [togglerState, setTogglerState] = useState({
        showSplashScreen: true
    });
    const handleTogglerActions = (props: ActionInterface) => {
        if(props.actionName === "hide-splash-screen"){
            togglerState.showSplashScreen = false;
        }else{
            togglerState.showSplashScreen = true;
        }
        setTogglerState({...togglerState})
    }
    return(
        <React.Fragment>
            {
                togglerState.showSplashScreen ?
                <SplashScreen actionToggler={() => handleTogglerActions({actionName: "hide-splash-screen"})} />
                :
                <SubjectsScreen handleTogglerActions={() => handleTogglerActions({actionName: "show-splash-screen"})} />
            }
        </React.Fragment>
    )
};


export default ScreenToggler;