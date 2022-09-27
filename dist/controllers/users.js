"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const bcrypt_1 = __importDefault(require("bcrypt"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const config_1 = __importDefault(require("../config/config"));
const users_1 = __importDefault(require("../models/users"));
const mongoose_1 = __importDefault(require("mongoose"));
const login = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { username, password } = req.body;
    //TODO validation
    if (!username || !password) {
        res.status(400).json({
            message: "info cannot be empty",
        });
        return;
    }
    const user = yield users_1.default.findOne({ username }).exec();
    if (!user) {
        return res.status(400).json({ error: 'Invalid username or password' });
    }
    const validPassword = yield bcrypt_1.default.compare(password, user.password);
    if (!validPassword) {
        return res.status(400).json({ error: 'Invalid username or password' });
    }
    const token = jsonwebtoken_1.default.sign({
        username: user.username,
        id: user._id,
    }, config_1.default.secrets.token);
    return res.status(200).json({
        message: "login success", token,
    });
});
const register = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { username, password } = req.body;
    if (username === '' || password === '' || !username || !password) {
        res.status(400).json({
            message: "info cannot be empty",
        });
        return;
    }
    const salt = yield bcrypt_1.default.genSalt(10);
    const passwordHash = yield bcrypt_1.default.hash(password, salt);
    //TODO if username exist ERROR
    const userExist = yield users_1.default.findOne({ username }).exec();
    if (userExist) {
        return res.status(400).json({ message: 'Username already exist' });
    }
    const user = new users_1.default({
        _id: new mongoose_1.default.Types.ObjectId(),
        username,
        password: passwordHash,
    });
    const result = yield user.save();
    //TODO insert db
    return res.status(200).json({
        message: 'Register user success',
        user: {
            username: result.username,
            id: result.id,
        }
    });
});
exports.default = { login, register };
