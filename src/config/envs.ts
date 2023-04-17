import {
    REMOTE_BASE_URL,
    LOCAL_BASE_URL,
} from "react-native-dotenv";


export const devEnvVariables = {
    BASE_URL: LOCAL_BASE_URL,
    APP_ENV: "development"
};

export const prodEnvVariables = {
    BASE_URL: REMOTE_BASE_URL,
    APP_ENV: "production"
}


export default __DEV__ ? devEnvVariables : prodEnvVariables;