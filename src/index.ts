import bodyParser from "body-parser";
import express, { NextFunction, Request, Response } from "express";
import config from "./config/config";
import logger from "./config/logger";
import seriesRoutes from "./routes/series";
import userRoutes from "./routes/users";
import middleware from "./controllers/middleware";
import mongoose, { Mongoose } from "mongoose";

const app = express();

mongoose
    .connect(config.mongo.url)
    .then( (result: Mongoose) =>{
        logger.info("Mongo is conected");
    }).catch( (error) =>{
        logger.error(error.message,error);
});


app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());

app.use( (req: Request, res: Response, next: NextFunction)=>{
    logger.info(`METHOD: [${req.method}] - URL - [${req.url}] - IP [${req.socket.remoteAddress}]`);

    res.on('finish', ()=>{
        logger.info(`METHOD: [${req.method}] - URL - [${req.url}] - STATUS [${res.statusCode}] - IP [${req.socket.remoteAddress}]`);
    });

    next();
});

app.use("/api",userRoutes);
app.use("/api",middleware.verifiedToken,seriesRoutes);

app.use( (req: Request, res: Response) =>{
    const error=new Error('notFound');
    logger.error(error.message);
    res.status(404).json({message: error.message});
});



app.listen(parseInt(config.server.port), ()=>{
    console.log(`api is runing in ${config.server.hostname} on port: ${config.server.port}`);
});

