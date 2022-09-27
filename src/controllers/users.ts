import { Request, Response } from "express";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import config from "../config/config";
import User from "../models/users";
import mongoose from "mongoose";

const login = async (req: Request, res: Response) =>{
    const {username, password} = req.body;

    //TODO validation
    if(!username || !password){
        res.status(400).json({
            message: "info cannot be empty",
        });
        return;
    }

    const user= await User.findOne({username}).exec();
    if(!user){
        return res.status(400).json({error: 'Invalid username or password'});
    }

    const validPassword = await bcrypt.compare(password, user.password);

    if(!validPassword){
        return res.status(400).json({error: 'Invalid username or password'});
    }

    const token=jwt.sign({
        username: user.username,
        id: user._id,
    },config.secrets.token);

    return res.status(200).json({
        message: "login success", token,
    });
};

const register = async (req: Request, res: Response) =>{

    const {username,password}=req.body;

    if(username==='' || password==='' || !username || !password){
        res.status(400).json({
            message: "info cannot be empty",
        });
        return;
    }

    const salt= await bcrypt.genSalt(10);
    const passwordHash = await bcrypt.hash(password, salt);

    //TODO if username exist ERROR
    const userExist= await User.findOne({username}).exec();
    if(userExist){
        return res.status(400).json({message: 'Username already exist'});
    }

    const user = new User({
        _id: new mongoose.Types.ObjectId(),
        username,
        password: passwordHash, 
    });

    const result = await user.save();

    //TODO insert db
    return res.status(200).json({
        message: 'Register user success',
        user: {
            username: result.username,
            id: result.id,
        }
    });
};

export default {login, register};