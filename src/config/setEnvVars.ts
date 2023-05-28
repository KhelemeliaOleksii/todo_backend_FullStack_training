import path from "path";
import dotenv from 'dotenv';

//console.log(path.join(__dirname));

const setEnvVars = () => {
    dotenv.config({
        path: path.join(__dirname, '.env'), 
    })
}

export default setEnvVars;