"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
const express_1 = __importDefault(require("express"));
const series_1 = __importDefault(require("../controllers/series"));
const router = express_1.default.Router();
router
    .get('/series', series_1.default.getAll)
    .get('/series/:id', series_1.default.get)
    .post('/series', series_1.default.create)
    .patch('/series/:id', series_1.default.update)
    .delete('/series/:id', series_1.default.remove);
module.exports = router;
