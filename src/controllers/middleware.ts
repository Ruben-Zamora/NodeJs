import { Request, NextFunction, Response } from "express";
import jtw from "jsonwebtoken";
import config from "../config/config";

const verifiedToken = (req: Request, res: Response, next: NextFunction)=>{
    try {
        const authorization = req.header('authorization');
        const token = authorization?.split(' ')[1];
        if(!token){
            return res.status(400).json({error: "Access denied"});
        }
        jtw.verify(token || '',config.secrets.token);
        next();

    } catch (error) {
        return res.status(400).json({error: "Invalid token"});
    }
};

export default {verifiedToken}