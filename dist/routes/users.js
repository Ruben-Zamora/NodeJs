"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
const express_1 = __importDefault(require("express"));
const users_1 = __importDefault(require("../controllers/users"));
const router = express_1.default.Router();
router
    .post("/login", users_1.default.login)
    .post("/register", users_1.default.register);
module.exports = router;
