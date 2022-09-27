"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const body_parser_1 = __importDefault(require("body-parser"));
const express_1 = __importDefault(require("express"));
const config_1 = __importDefault(require("./config/config"));
const logger_1 = __importDefault(require("./config/logger"));
const series_1 = __importDefault(require("./routes/series"));
const users_1 = __importDefault(require("./routes/users"));
const middleware_1 = __importDefault(require("./controllers/middleware"));
const mongoose_1 = __importDefault(require("mongoose"));
const app = (0, express_1.default)();
mongoose_1.default
    .connect(config_1.default.mongo.url)
    .then((result) => {
    logger_1.default.info("Mongo is conected");
}).catch((error) => {
    logger_1.default.error(error.message, error);
});
app.use(body_parser_1.default.urlencoded({ extended: true }));
app.use(body_parser_1.default.json());
app.use((req, res, next) => {
    logger_1.default.info(`METHOD: [${req.method}] - URL - [${req.url}] - IP [${req.socket.remoteAddress}]`);
    res.on('finish', () => {
        logger_1.default.info(`METHOD: [${req.method}] - URL - [${req.url}] - STATUS [${res.statusCode}] - IP [${req.socket.remoteAddress}]`);
    });
    next();
});
app.use("/api", users_1.default);
app.use("/api", middleware_1.default.verifiedToken, series_1.default);
app.use((req, res) => {
    const error = new Error('notFound');
    logger_1.default.error(error.message);
    res.status(404).json({ message: error.message });
});
app.listen(parseInt(config_1.default.server.port), () => {
    console.log(`api is runing in ${config_1.default.server.hostname} on port: ${config_1.default.server.port}`);
});
