import { cleanEnv,str,port } from "envalid";
export default  cleanEnv(process.env, {
    MONGO_URL:str(),
    SECRET:str(),
    PORT:port(),
    GOOGLE_CLIENT_SECRET:str(),
    GOOGLE_CLIENT_ID:str(),
    CLIENT_URL:str()

});

