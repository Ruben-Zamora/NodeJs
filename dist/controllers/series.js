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
const series_1 = __importDefault(require("../models/series"));
const getAll = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const series = yield series_1.default.find();
    res.status(200).json({ message: `Get All Series: ${series}` });
});
const get = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const id = req.params.id;
    const serieExist = yield series_1.default.findOne({ id }).exec();
    if (!serieExist) {
        return res.status(400).json({ message: `Serie doesn't exist` });
    }
    res.status(200).json({ message: `Get One Serie with id ${id}: ${serieExist}` });
});
const create = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { name, director, language, year, seasons } = req.body;
    if (name === '' || director === '' || seasons < 1 || seasons === null || !name || !director) {
        res.status(400).json({
            message: "Only year can be empty",
        });
        return;
    }
    const serieExist = yield series_1.default.findOne({ name }).exec();
    if (serieExist) {
        return res.status(400).json({ message: 'Serie already exist' });
    }
    const newSerie = new series_1.default({
        name,
        director,
        language,
        year,
        seasons
    });
    const result = yield newSerie.save();
    res.status(200).json({ message: `Create Serie`, data: newSerie });
});
const update = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const id = req.params.id;
    const serie = yield series_1.default.findOne({ id }).exec();
    res.status(200).json({ message: `Update Serie with id ${id}`, data: serie });
});
const remove = (req, res) => {
    const id = req.params.id;
    res.status(200).json({ message: `Remove Series with id ${id}` });
};
exports.default = { getAll, get, create, update, remove };
