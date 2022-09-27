const getTimeStamp = (): String =>{
    return new Date().toISOString();
};

const info = (message: String, object?: any ): void =>{
    if(object){
        console.info(`[${getTimeStamp()}] [INFO] [${message}]`, object);
    }else{
        console.info(`[${getTimeStamp()}] [INFO] [${message}]`);
    }
};

const error = (message: String, object?: any ): void =>{
    if(object){
        console.info(`[${getTimeStamp()}] [ERROR] [${message}]`, object);
    }else{
        console.info(`[${getTimeStamp()}] [ERROR] [${message}]`);
    }
};

export default {info,error};