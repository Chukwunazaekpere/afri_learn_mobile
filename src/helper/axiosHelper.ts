import axios from "axios";
import envs from "../config/envs";


interface AxiosHelperInterface {
    action: "get" | "post" | "put" | "delete"
    postOrPutObject?: any,
    routename: string
}
const axiosHelper = async(props: AxiosHelperInterface) => {
    const token = `jkkkkkkkdfgfdgfgd`;
    const { APP_ENV, BASE_URL } = envs;
    console.log("\n\t BASE_URL: ", BASE_URL)
    try {
        switch(props.action){
            case "get":
                const getResponse = await axios.get(`${BASE_URL}/${props.routename}`, {
                    headers: {
                        "Content-Type": "application/json",
                        Authorization: `Bearer ${token}`
                    }
                });
                return getResponse;
            case "post":
                const postResponse = await axios.post(`${BASE_URL}/${props.routename}`, {...props.postOrPutObject}, {
                    headers: {
                        "Content-Type": "application/json",
                        Authorization: `Bearer ${token}`
                    }
                });
                return postResponse;
            case "put":
                const putResponse = await axios.put(`${BASE_URL}/${props.routename}`, {...props.postOrPutObject}, {
                    headers: {
                        "Content-Type": "application/json",
                        Authorization: `Bearer ${token}`
                    }
                });
                return putResponse;
            default:
                const deleteResponse = await axios.delete(`${BASE_URL}/${props.routename}`, {
                    headers: {
                        "Content-Type": "application/json",
                        Authorization: `Bearer ${token}`
                    }
                });
                return deleteResponse;
                
        }
    } catch (error) {
        console.info("\n\t Axios-helper error: ", error)
    }
};

export default axiosHelper;